export type PageId =
  | "home"
  | "data-studio"
  | "services"
  | "ai-advantage"
  | "journey"
  | "pricing"
  | "case-studies"
  | "diagnostic"
  | "login"
  | "about"
  | "contact"
  | "portal";

export type UserRole = "admin" | "team" | "client";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  company: string;
  permissions: string[];
  token: string;
  avatar?: string;
}

export interface LeadRecord {
  id: string;
  name: string;
  email: string;
  company: string;
  stage: "START" | "GROW" | "AUTOMATE" | "SCALE" | string;
  primaryChallenge: string;
  status:
    | "new"
    | "dossier_prepared"
    | "call_scheduled"
    | "active_sprint"
    | "closed_won";
  priority: "high" | "medium" | "low";
  createdAt: string;
  assignedTo?: string;
  notes?: string;
  message?: string;
}

export interface SavedDiagnostic {
  id: string;
  clientName: string;
  company: string;
  stage: "START" | "GROW" | "AUTOMATE" | "SCALE";
  bottlenecks: string[];
  computedRoi: string;
  hoursRecoverable: string;
  targetArr: string;
  priorityStack: string[];
  createdAt: string;
  status: "draft" | "reviewed" | "presented";
}

export interface WorkflowRecord {
  id: string;
  name: string;
  trigger: string;
  actions: string[];
  status: "active" | "paused";
  runsCount: number;
  lastRunAt: string;
  category: "lead_enrichment" | "agent_dispatch" | "analytics_sync" | "nurture";
}

export interface SystemMetrics {
  uptimeSeconds: number;
  totalRequests: number;
  activeRateLimits: number;
  avgLatencyMs: number;
  dbRecords: {
    leads: number;
    diagnostics: number;
    conversations: number;
    workflows: number;
  };
  geminiStatus: "operational" | "fallback_mode";
  lastLog: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  category:
    | "Digital Presence"
    | "Customer Acquisition"
    | "AI & Automation"
    | "Intelligence & Scaling";
  deliverables: string[];
  businessImpact: string;
  iconName: string;
  badge?: string;
}

export interface AiAdvantageTool {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  description: string;
  features: string[];
  mockOutputTitle: string;
  sampleInput: string;
  sampleOutput: string;
}

export interface RoadmapYear {
  year: string;
  phase: string;
  headline: string;
  description: string;
  milestones: string[];
  status: "Active" | "Next" | "Roadmap";
}

export interface RevenueModel {
  stream: string;
  type: string;
  cadence: string;
  idealFor: string;
  description: string;
  features: string[];
  deliveryScope: string;
  popular?: boolean;
}

export interface DiagnosticResult {
  stage: "START" | "GROW" | "AUTOMATE" | "SCALE";
  primaryBottleneck: string;
  recommendedServices: string[];
  estimatedTimeframe: string;
  potentialRoi: string;
  aiOpportunity: string;
  actionPlan: string[];
}

export interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  stage: string;
  problem: string;
  solution: string;
  architecture: string[];
  timeline: string;
  metrics: { label: string; value: string }[];
  techStack: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}
