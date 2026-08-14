import "server-only";
import { AnalyzeRequest, AnalyzeResponse } from "./types";
import { getDemoFallback } from "./demo-data";

/**
 * Server-only AI analysis module.
 * Uses Gemini API when GEMINI_API_KEY is set; otherwise returns demo fallback.
 */

const SYSTEM_PROMPT = `You are SheharSuno AI, a Pakistani civic issue classifier. The user will describe a civic problem in English, Urdu, or Roman Urdu.

Return a JSON object with exactly these fields:
{
  "category": one of "Drainage" | "Garbage" | "Road" | "Streetlight" | "Water" | "Safety" | "Other",
  "priority": one of "High" | "Medium" | "Low",
  "priorityReason": why this priority was assigned (1-2 sentences),
  "title": short English title (5-8 words),
  "location": best guess location or "Lahore" if not specified,
  "summaryEnglish": 2-3 sentence English summary of the issue,
  "summaryUrdu": 2-3 sentence Urdu summary of the issue,
  "immediateActions": array of 3 recommended safety/next-step actions in English,
  "complaintEnglish": formal English complaint letter (3-4 paragraphs). End with "Suggested department: [relevant agency name], Lahore." and "Case Reference: [caseId]". Do NOT claim the report was sent to any agency,
  "complaintUrdu": formal Urdu complaint letter (3-4 paragraphs). End with "تجویز کردہ محکمہ: [relevant agency name]، لاہور۔" and "کیس حوالہ: [caseId]". Do NOT claim the report was sent to any agency
}

IMPORTANT:
- Do NOT claim any report was submitted to or received by any government body.
- Use "Suggested department:" wording, never "Submitted to:" or "Sent to:".
- Return ONLY valid JSON, no markdown fences.`;

export async function analyzeIssue(request: AnalyzeRequest): Promise<AnalyzeResponse> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return getDemoFallback(request.message, request.location);
  }

  try {
    const caseId = `SS-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`;

    const userMessage = [
      request.message,
      request.location ? `Location: ${request.location}` : "",
      `Case ID to use: ${caseId}`,
    ]
      .filter(Boolean)
      .join("\n");

    // Primary model as requested: gemini-3.1-flash-lite (with graceful fallback)
    const modelsToTry = [
      "gemini-3.1-flash-lite",
      "gemini-2.5-flash",
      "gemini-2.0-flash",
    ];

    let text: string | undefined;

    for (const model of modelsToTry) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              system_instruction: {
                parts: [{ text: SYSTEM_PROMPT }],
              },
              contents: [
                {
                  role: "user",
                  parts: [{ text: userMessage }],
                },
              ],
              generationConfig: {
                temperature: 0.3,
                responseMimeType: "application/json",
              },
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) break;
        }
      } catch (err) {
        console.warn(`Model ${model} attempt failed, trying next fallback...`, err);
      }
    }

    if (!text) {
      console.error("No text in Gemini response");
      return getDemoFallback(request.message, request.location);
    }

    const parsed = JSON.parse(text) as AnalyzeResponse;
    parsed.caseId = caseId;
    parsed.isDemoFallback = false;

    return parsed;
  } catch (error) {
    console.error("AI analysis failed, using demo fallback:", error);
    return getDemoFallback(request.message, request.location);
  }
}
