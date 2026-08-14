import { AnalyzeResponse, CommunityReport } from "./types";

/**
 * Deterministic demo fallback for the blocked-drain / school scenario.
 * Always returned when no API key is configured or when the AI provider fails.
 */
export function getDemoFallback(message: string, location?: string): AnalyzeResponse {
  const resolvedLocation = location || "Model Town, Lahore";
  const caseId = `SS-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`;

  return {
    category: "Drainage",
    priority: "High",
    priorityReason:
      "Blocked drainage near a school entrance poses immediate risks to children's health and safety due to standing water and potential waterborne diseases.",
    title: "Blocked drainage near school",
    location: resolvedLocation,
    summaryEnglish:
      "A drain is blocked after rain, causing water to collect near a school entrance in " +
      resolvedLocation +
      ". Standing water may affect school access and sanitation for children and staff.",
    summaryUrdu:
      "بارش کے بعد نالہ بند ہو گیا ہے، جس کی وجہ سے " +
      resolvedLocation +
      " میں اسکول کے داخلی دروازے کے قریب پانی جمع ہو رہا ہے۔ کھڑا پانی بچوں اور عملے کی صفائی اور رسائی کو متاثر کر سکتا ہے۔",
    immediateActions: [
      "Keep children away from standing water.",
      "Place a temporary warning barrier if possible.",
      "Share this generated report with local authorities.",
    ],
    complaintEnglish: `Subject: Urgent — Blocked Drainage Causing Flooding Near School Entrance in ${resolvedLocation}

To Whom It May Concern,

I am writing to report a severely blocked drainage system in ${resolvedLocation}. Following recent rainfall, substantial standing water has accumulated directly in front of the local school entrance.

This presents an immediate sanitation hazard and significantly obstructs safe access for children and staff. Given the high foot traffic and potential health risks associated with stagnant water, I request urgent intervention from maintenance crews to clear the blockage and restore proper drainage.

Suggested department: Water and Sanitation Agency, Lahore.
Case Reference: ${caseId}`,
    complaintUrdu: `موضوع: فوری — ${resolvedLocation} میں اسکول کے داخلی دروازے کے قریب نالے کی بندش سے سیلاب

بسم اللہ الرحمن الرحیم

میں ${resolvedLocation} میں شدید طور پر بند نکاسی آب کے نظام کی اطلاع دینا چاہتا/چاہتی ہوں۔ حالیہ بارش کے بعد، مقامی اسکول کے داخلی دروازے کے بالکل سامنے کافی مقدار میں پانی جمع ہو گیا ہے۔

یہ صفائی کے لیے فوری خطرہ ہے اور بچوں اور عملے کی محفوظ رسائی میں نمایاں رکاوٹ ہے۔ راہگیروں کی زیادہ تعداد اور جمع پانی سے وابستہ صحت کے ممکنہ خطرات کو مدنظر رکھتے ہوئے، میں دیکھ بھال کے عملے سے فوری مداخلت کی درخواست کرتا/کرتی ہوں تاکہ رکاوٹ کو دور کیا جا سکے اور مناسب نکاسی بحال ہو سکے۔

تجویز کردہ محکمہ: واٹر اینڈ سینیٹیشن ایجنسی، لاہور۔
کیس حوالہ: ${caseId}`,
    caseId,
    isDemoFallback: true,
  };
}

/**
 * Seeded community reports for the dashboard prototype.
 */
export const communityReports: CommunityReport[] = [
  {
    id: "SS-2026-0184",
    title: "Blocked drainage near school",
    category: "Drainage",
    priority: "High",
    location: "Model Town",
    time: "2m ago",
    status: "Needs action",
  },
  {
    id: "SS-2026-0181",
    title: "Garbage uncollected for 7 days",
    category: "Garbage",
    priority: "Medium",
    location: "Gulberg",
    time: "34m ago",
    status: "Reviewing",
  },
  {
    id: "SS-2026-0178",
    title: "Large pothole on main road",
    category: "Road",
    priority: "High",
    location: "DHA Phase 5",
    time: "1h ago",
    status: "Needs action",
  },
  {
    id: "SS-2026-0175",
    title: "Streetlight not working for 2 weeks",
    category: "Streetlight",
    priority: "Medium",
    location: "Johar Town",
    time: "2h ago",
    status: "Logged",
  },
  {
    id: "SS-2026-0172",
    title: "Water pipe burst on main road",
    category: "Water",
    priority: "High",
    location: "Garden Town",
    time: "3h ago",
    status: "Reviewing",
  },
  {
    id: "SS-2026-0169",
    title: "Unsafe wall near playground",
    category: "Safety",
    priority: "High",
    location: "Iqbal Town",
    time: "5h ago",
    status: "Needs action",
  },
  {
    id: "SS-2026-0166",
    title: "Overflowing sewage manhole",
    category: "Drainage",
    priority: "High",
    location: "Samanabad",
    time: "6h ago",
    status: "Resolved",
  },
  {
    id: "SS-2026-0163",
    title: "Waste dumped in vacant plot",
    category: "Garbage",
    priority: "Low",
    location: "Wapda Town",
    time: "8h ago",
    status: "Logged",
  },
];

/**
 * Dashboard aggregate metrics (seeded).
 */
export const dashboardMetrics = {
  reportsToday: 32,
  highPriority: 8,
  highPriorityTrend: +2,
  resolvedPercent: 71,
};

/**
 * Category breakdown for the dashboard.
 */
export const categoryBreakdown = [
  { category: "Drainage", icon: "water_drop", count: 12, percent: 40, color: "#0060a7" },
  { category: "Garbage", icon: "delete", count: 8, percent: 25, color: "#00513a" },
  { category: "Road", icon: "add_road", count: 5, percent: 15, color: "#56615c" },
  { category: "Streetlight", icon: "lightbulb", count: 3, percent: 10, color: "#004880" },
  { category: "Water", icon: "water", count: 2, percent: 6, color: "#85d7b4" },
  { category: "Safety", icon: "health_and_safety", count: 2, percent: 4, color: "#ba1a1a" },
];
