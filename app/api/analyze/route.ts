import { NextRequest, NextResponse } from "next/server";
import { analyzeIssue } from "@/lib/ai";
import { AnalyzeRequest } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as AnalyzeRequest;

    if (!body.message || typeof body.message !== "string" || !body.message.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const result = await analyzeIssue({
      message: body.message.trim(),
      language: body.language,
      location: body.location,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Analyze API error:", error);
    // Even on unexpected errors, return the demo fallback
    const { getDemoFallback } = await import("@/lib/demo-data");
    return NextResponse.json(getDemoFallback("fallback"));
  }
}
