export type IssueCategory =
  | "Drainage"
  | "Garbage"
  | "Road"
  | "Streetlight"
  | "Water"
  | "Safety"
  | "Other";

export type Priority = "High" | "Medium" | "Low";

export type ReportStatus = "Needs action" | "Reviewing" | "Logged" | "Resolved";

export interface AnalyzeRequest {
  message: string;
  language?: "en" | "ur" | "roman-ur";
  location?: string;
  imageDataUrl?: string;
}

export interface AnalyzeResponse {
  category: IssueCategory;
  priority: Priority;
  priorityReason: string;
  title: string;
  location: string;
  summaryEnglish: string;
  summaryUrdu: string;
  immediateActions: string[];
  complaintEnglish: string;
  complaintUrdu: string;
  caseId: string;
  isDemoFallback?: boolean;
}

export interface CommunityReport {
  id: string;
  title: string;
  category: IssueCategory;
  priority: Priority;
  location: string;
  time: string;
  status: ReportStatus;
}
