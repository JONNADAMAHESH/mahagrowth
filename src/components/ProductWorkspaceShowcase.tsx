import React, { useState } from "react";
import {
  LayoutDashboard,
  BarChart3,
  Workflow,
  Bot,
  Users,
  FileText,
  ArrowUpRight,
  Sparkles,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import { PageId } from "../types";

interface ProductWorkspaceShowcaseProps {
  onNavigate?: (page: PageId, anchorId?: string) => void;
  onOpenAiAssistant?: () => void;
}

type WorkspaceTab =
  | "dashboard"
  | "analytics"
  | "automation"
  | "assistant"
  | "pipeline"
  | "reports";

interface TabConfig {
  id: WorkspaceTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge: string;
  headline: string;
  description: string;
}

const TABS: TabConfig[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    badge: "Executive Command",
    headline: "Unified Command & Live Growth Telemetry",
    description:
      "Monitor MRR trajectory, pipeline health, inbound conversion velocity, and team efficiency in a single high-contrast pane.",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    badge: "Multi-Touch Data",
    headline: "Attribution, LTV Cohorts & CAC Optimization",
    description:
      "Know exactly where high-value customers come from. Track return-on-ad-spend (ROAS) and lifetime value without messy spreadsheets.",
  },
  {
    id: "automation",
    label: "Automation",
    icon: Workflow,
    badge: "Visual Builder",
    headline: "Autonomous Node-Based Workflow Builder",
    description:
      "Connect checkout events, CRM updates, client onboarding sequences, and internal notifications with zero manual busywork.",
  },
  {
    id: "assistant",
    label: "AI Copilot",
    icon: Bot,
    badge: "Natural Language",
    headline: "Executive Business Copilot & Knowledge Engine",
    description:
      "Ask plain-English questions about revenue velocity, churn risks, or draft enterprise proposals using your verified company knowledge.",
  },
  {
    id: "pipeline",
    label: "Pipeline",
    icon: Users,
    badge: "Deal Velocity",
    headline: "Intelligent Deal Stages & Account Enrichment",
    description:
      "Visual Kanban boards with automatic lead scoring, 3-second inquiry follow-ups, and calendar booking sync.",
  },
  {
    id: "reports",
    label: "Reports",
    icon: FileText,
    badge: "Audit & Export",
    headline: "One-Click Executive Audits & Weekly Digests",
    description:
      "Instant PDF-ready growth audits, board-level financial reports, and automated Monday morning performance summaries.",
  },
];

export const ProductWorkspaceShowcase: React.FC<
  ProductWorkspaceShowcaseProps
> = ({ onNavigate, onOpenAiAssistant }) => {
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("dashboard");
  const [interactiveFilter, setInteractiveFilter] = useState<
    "30d" | "90d" | "ytd"
  >("30d");
  const [automationSimRunning, setAutomationSimRunning] = useState(false);
  const [automationTriggerCount, setAutomationTriggerCount] = useState(1842);

  const currentTab = TABS.find((t) => t.id === activeTab) || TABS[0];

  const handleTriggerSim = () => {
    setAutomationSimRunning(true);
    setTimeout(() => {
      setAutomationTriggerCount((prev) => prev + 1);
      setAutomationSimRunning(false);
    }, 800);
  };

  return (
    <section
      id="product-workspace"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-800 text-xs font-mono font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
          <span>PRODUCTION INTERFACE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
          Everything Your Business Needs. One Workspace.
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
          Explore the live interface behind Maha Growth. Built for founders,
          operators, and growth leaders who want total visibility, reliable
          automation, and compounding revenue without tool clutter.
        </p>
      </div>

      {/* Interactive Tabs Bar */}
      <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 gap-2 scrollbar-none">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                isActive
                  ? "bg-black dark:bg-cyan-500 text-white dark:text-black font-bold shadow-xs border-transparent"
                  : "bg-neutral-100 dark:bg-neutral-900/50 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800"
              }`}
            >
              <Icon
                className={`w-3.5 h-3.5 ${isActive ? "text-white dark:text-black" : "text-neutral-500 dark:text-neutral-400"}`}
              />
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                  isActive
                    ? "bg-white/20 dark:bg-black/20 text-white dark:text-black"
                    : "bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700"
                }`}
              >
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Realistic Product Frame / UI Mockup Container */}
      <div className="rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 shadow-xl overflow-hidden">
        {/* Browser / Application Top Bar */}
        <div className="bg-neutral-100 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-800 px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          {/* Traffic Lights */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-neutral-300 inline-block border border-neutral-400" />
            <span className="w-3 h-3 rounded-full bg-neutral-400 inline-block border border-neutral-500" />
            <span className="w-3 h-3 rounded-full bg-neutral-900 dark:bg-white inline-block" />
            <span className="text-xs font-mono text-neutral-600 dark:text-neutral-300 ml-2 hidden sm:inline">
              app.mahagrowth.com / {activeTab}
            </span>
          </div>

          {/* Center Address / Status Badge */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-white animate-pulse" />
            <span className="text-neutral-900 dark:text-white font-semibold">
              {currentTab.headline}
            </span>
          </div>

          {/* Quick Right Controls */}
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-[10px] font-mono text-neutral-900 dark:text-white font-semibold shadow-2xs">
              Live Environment
            </span>
          </div>
        </div>

        {/* Screen Canvas Area */}
        <div className="p-4 sm:p-6 lg:p-8 min-h-[460px] bg-neutral-50 dark:bg-neutral-800">
          {/* TAB 1: EXECUTIVE COMMAND DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="space-y-6 animate-fade-in">
              {/* Top Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-1 shadow-xs">
                  <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase flex items-center justify-between">
                    <span>Monthly Run-Rate</span>
                    <span className="text-neutral-900 dark:text-white flex items-center text-xs font-bold">
                      +28.4%{" "}
                      <ArrowUpRight className="w-3 h-3 text-neutral-900 dark:text-white" />
                    </span>
                  </div>
                  <div className="text-2xl font-extrabold text-neutral-900 dark:text-white font-mono">
                    $184,500
                  </div>
                  <div className="text-[10px] text-neutral-500 dark:text-neutral-400">
                    Target: $200k/mo by Q4
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-1 shadow-xs">
                  <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase flex items-center justify-between">
                    <span>Active Deal Pipeline</span>
                    <span className="text-neutral-900 dark:text-white flex items-center text-xs font-bold">
                      14 deals
                    </span>
                  </div>
                  <div className="text-2xl font-extrabold text-neutral-900 dark:text-white font-mono">
                    $412,000
                  </div>
                  <div className="text-[10px] text-neutral-500 dark:text-neutral-400">
                    Weighted Forecast: $285k
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-1 shadow-xs">
                  <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase flex items-center justify-between">
                    <span>Visitor-to-Lead Rate</span>
                    <span className="text-neutral-900 dark:text-white flex items-center text-xs font-bold">
                      +64% lift
                    </span>
                  </div>
                  <div className="text-2xl font-extrabold text-neutral-900 dark:text-white font-mono">
                    4.82%
                  </div>
                  <div className="text-[10px] text-neutral-500 dark:text-neutral-400">
                    Industry avg: 1.8%
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-1 shadow-xs">
                  <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase flex items-center justify-between">
                    <span>Hours Saved / Week</span>
                    <span className="text-neutral-900 dark:text-white flex items-center text-xs font-bold">
                      Autonomous
                    </span>
                  </div>
                  <div className="text-2xl font-extrabold text-neutral-900 dark:text-white font-mono">
                    24.5 hrs
                  </div>
                  <div className="text-[10px] text-neutral-500 dark:text-neutral-400">
                    Workflow agent leverage
                  </div>
                </div>
              </div>

              {/* Main Split: Growth Velocity Chart & Live Activity Stream */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Visual Chart Mockup */}
                <div className="lg:col-span-8 p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 font-bold uppercase">
                        REVENUE VELOCITY
                      </div>
                      <div className="text-lg font-bold text-neutral-900 dark:text-white">
                        Trailing 12-Month Compounding ARR
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-lg border border-neutral-200 dark:border-neutral-800 text-[11px] font-mono">
                      {(["30d", "90d", "ytd"] as const).map((period) => (
                        <button
                          key={period}
                          onClick={() => setInteractiveFilter(period)}
                          className={`px-2 py-0.5 rounded cursor-pointer transition ${
                            interactiveFilter === period
                              ? "bg-black dark:bg-cyan-500 text-white dark:text-black font-bold"
                              : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                          }`}
                        >
                          {period.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* SVG Line Graph */}
                  <div className="h-44 w-full relative flex items-end pt-4 pb-2">
                    <svg
                      className="w-full h-full overflow-visible"
                      viewBox="0 0 500 140"
                      fill="none"
                    >
                      <defs>
                        <linearGradient
                          id="velocityGrad"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#000000"
                            stopOpacity="0.12"
                          />
                          <stop
                            offset="100%"
                            stopColor="#000000"
                            stopOpacity="0.0"
                          />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0,120 Q80,110 160,85 T320,50 T450,25 T500,12 L500,140 L0,140 Z"
                        fill="url(#velocityGrad)"
                      />
                      <path
                        d="M0,120 Q80,110 160,85 T320,50 T450,25 T500,12"
                        stroke="#000000"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <circle cx="500" cy="12" r="5" fill="#000000" />
                    </svg>
                  </div>

                  <div className="grid grid-cols-4 text-center text-[10px] font-mono text-neutral-500 dark:text-neutral-400 border-t border-neutral-200 dark:border-neutral-800 pt-2">
                    <span>Q1: Foundation</span>
                    <span>Q2: System Launch</span>
                    <span>Q3: Auto-Scale</span>
                    <span className="text-neutral-900 dark:text-white font-bold">
                      Q4: Target Achieved
                    </span>
                  </div>
                </div>

                {/* Real-time Event Feed */}
                <div className="lg:col-span-4 p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between text-xs font-mono border-b border-neutral-200 dark:border-neutral-800 pb-2">
                    <span className="text-neutral-900 dark:text-white font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-white animate-pulse" />
                      Live Growth Stream
                    </span>
                    <span className="text-neutral-400 text-[10px]">
                      Real-time
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs font-mono">
                    <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-neutral-500 dark:text-neutral-400">
                        <span className="text-neutral-900 dark:text-white font-bold">
                          Inbound Qualified
                        </span>
                        <span>1m ago</span>
                      </div>
                      <div className="text-neutral-800 dark:text-neutral-300 text-[11px]">
                        Apex Logistics booked demo call ($48k contract).
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-neutral-500 dark:text-neutral-400">
                        <span className="text-neutral-900 dark:text-white font-bold">
                          Workflow Executed
                        </span>
                        <span>4m ago</span>
                      </div>
                      <div className="text-neutral-800 dark:text-neutral-300 text-[11px]">
                        Stripe subscription renewed &amp; CRM updated.
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-neutral-500 dark:text-neutral-400">
                        <span className="text-neutral-900 dark:text-white font-bold">
                          AI Concierge
                        </span>
                        <span>8m ago</span>
                      </div>
                      <div className="text-neutral-800 dark:text-neutral-300 text-[11px]">
                        Answered enterprise SLA questions in 142ms.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: REAL-TIME GROWTH ANALYTICS */}
          {activeTab === "analytics" && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-1 shadow-xs">
                  <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase">
                    Customer Acquisition Cost (CAC)
                  </div>
                  <div className="text-2xl font-extrabold text-neutral-900 dark:text-white font-mono">
                    $184
                  </div>
                  <div className="text-[10px] text-neutral-600 dark:text-neutral-300 font-mono">
                    -42% vs industry average benchmark
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-1 shadow-xs">
                  <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase">
                    Lifetime Value (LTV)
                  </div>
                  <div className="text-2xl font-extrabold text-neutral-900 dark:text-white font-mono">
                    $4,820
                  </div>
                  <div className="text-[10px] text-neutral-600 dark:text-neutral-300 font-mono">
                    LTV:CAC Ratio = 26.2x
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-1 shadow-xs">
                  <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase">
                    Multi-Touch Attribution Accuracy
                  </div>
                  <div className="text-2xl font-extrabold text-neutral-900 dark:text-white font-mono">
                    99.4%
                  </div>
                  <div className="text-[10px] text-neutral-600 dark:text-neutral-300 font-mono">
                    First-party server-side tracking
                  </div>
                </div>
              </div>

              {/* Attribution Channel Performance Table */}
              <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-mono text-neutral-900 dark:text-white font-bold">
                    Acquisition Channel Performance &amp; Yield
                  </div>
                  <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                    Live ROI Audit
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 text-[11px]">
                        <th className="pb-3 font-semibold">Channel</th>
                        <th className="pb-3 font-semibold">Attributed Leads</th>
                        <th className="pb-3 font-semibold">Spend</th>
                        <th className="pb-3 font-semibold">Cost / Lead</th>
                        <th className="pb-3 font-semibold">Pipeline Created</th>
                        <th className="pb-3 font-semibold">ROAS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 text-neutral-800 dark:text-neutral-300">
                      <tr>
                        <td className="py-3 font-bold text-neutral-900 dark:text-white">
                          Organic SEO &amp; Programmatic Authority
                        </td>
                        <td className="py-3">412</td>
                        <td className="py-3 text-neutral-500 dark:text-neutral-400">$2,400</td>
                        <td className="py-3 font-semibold">$5.82</td>
                        <td className="py-3 font-bold">$184,000</td>
                        <td className="py-3 text-neutral-900 dark:text-white font-bold">
                          76.6x
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 font-bold text-neutral-900 dark:text-white">
                          High-Intent B2B Search
                        </td>
                        <td className="py-3">186</td>
                        <td className="py-3 text-neutral-500 dark:text-neutral-400">$4,800</td>
                        <td className="py-3 font-semibold">$25.80</td>
                        <td className="py-3 font-bold">$122,000</td>
                        <td className="py-3 text-neutral-900 dark:text-white font-bold">
                          25.4x
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 font-bold text-neutral-900 dark:text-white">
                          AI Customer Concierge Conversions
                        </td>
                        <td className="py-3">294</td>
                        <td className="py-3 text-neutral-500 dark:text-neutral-400">$850</td>
                        <td className="py-3 font-semibold">$2.89</td>
                        <td className="py-3 font-bold">$148,500</td>
                        <td className="py-3 text-neutral-900 dark:text-white font-bold">
                          174.7x
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: VISUAL WORKFLOW BUILDER */}
          {activeTab === "automation" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
                <div>
                  <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 font-bold uppercase">
                    WORKFLOW PIPELINE #W-204
                  </div>
                  <div className="text-sm font-bold text-neutral-900 dark:text-white">
                    Enterprise Inbound Deal &rarr; Instant Fulfillment &amp;
                    Ledger Sync
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-xs font-mono text-neutral-600 dark:text-neutral-300">
                    Executions Today:{" "}
                    <span className="text-neutral-900 dark:text-white font-bold">
                      {automationTriggerCount}
                    </span>
                  </div>
                  <button
                    onClick={handleTriggerSim}
                    disabled={automationSimRunning}
                    className="px-3.5 py-1.5 rounded-lg bg-neutral-900 dark:bg-white hover:bg-neutral-800 text-white dark:text-neutral-900 font-mono text-xs font-bold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw
                      className={`w-3 h-3 ${automationSimRunning ? "animate-spin" : ""}`}
                    />
                    <span>
                      {automationSimRunning
                        ? "Executing..."
                        : "Simulate Trigger"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Node-Based Visual Canvas */}
              <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-xs">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
                  {/* Step 1: Trigger */}
                  <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 space-y-2 relative">
                    <div className="text-[10px] font-mono text-neutral-600 dark:text-neutral-300 uppercase font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-white" />{" "}
                      TRIGGER
                    </div>
                    <div className="text-xs font-bold text-neutral-900 dark:text-white font-mono">
                      Webhook: Stripe Invoice Paid
                    </div>
                    <div className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono">
                      Payload: $12,500 enterprise onboarding fee
                    </div>
                  </div>

                  {/* Step 2: Intelligent Filter */}
                  <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 space-y-2 relative">
                    <div className="text-[10px] font-mono text-neutral-600 dark:text-neutral-300 uppercase font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-neutral-600" />{" "}
                      FILTER &amp; ENRICH
                    </div>
                    <div className="text-xs font-bold text-neutral-900 dark:text-white font-mono">
                      Classify Tier-1 Enterprise
                    </div>
                    <div className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono">
                      Enrich domain with verified customer intel
                    </div>
                  </div>

                  {/* Step 3: Workspace Provisioning */}
                  <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 space-y-2 relative">
                    <div className="text-[10px] font-mono text-neutral-600 dark:text-neutral-300 uppercase font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-neutral-800" />{" "}
                      EXECUTE ACTION
                    </div>
                    <div className="text-xs font-bold text-neutral-900 dark:text-white font-mono">
                      Provision Client Workspace
                    </div>
                    <div className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono">
                      Generate Slack connect + secure access tokens
                    </div>
                  </div>

                  {/* Step 4: Ledger & Audit */}
                  <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-900 dark:border-white space-y-2 relative shadow-2xs">
                    <div className="text-[10px] font-mono text-neutral-900 dark:text-white uppercase font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-white" />{" "}
                      RECORD &amp; NOTIFY
                    </div>
                    <div className="text-xs font-bold text-neutral-900 dark:text-white font-mono">
                      Reconcile Ledger &amp; Alert Team
                    </div>
                    <div className="text-[10px] text-neutral-900 dark:text-white font-mono font-semibold">
                      Completed in 118ms (0 error)
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-600 dark:text-neutral-300">
                  <span>
                    Reliability Guarantee: Automatic idempotency checks + retry
                    failover queue
                  </span>
                  <span className="text-neutral-900 dark:text-white font-semibold">
                    Zero dropped data points
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: AI BUSINESS COPILOT */}
          {activeTab === "assistant" && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-xs">
                <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-neutral-900 dark:text-white" />
                    <span className="text-sm font-mono font-bold text-neutral-900 dark:text-white">
                      Maha Growth Executive Copilot
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded border border-neutral-300 dark:border-neutral-800 font-semibold">
                    Trained on Verified Company Data
                  </span>
                </div>

                {/* Simulated Conversation */}
                <div className="space-y-3 font-mono text-xs">
                  {/* User Question */}
                  <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white space-y-1">
                    <div className="text-[10px] text-neutral-500 dark:text-neutral-400 font-bold uppercase">
                      Executive Query:
                    </div>
                    <div>
                      &quot;What was our highest-margin customer acquisition
                      channel this month, and which deals in pipeline are at
                      risk of slipping?&quot;
                    </div>
                  </div>

                  {/* Copilot Answer */}
                  <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white space-y-2">
                    <div className="text-[10px] text-neutral-900 dark:text-white font-bold uppercase flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />{" "}
                      Copilot Executive Analysis:
                    </div>
                    <div className="space-y-2 text-neutral-800 dark:text-neutral-300 leading-relaxed text-[11px]">
                      <p>
                        1.{" "}
                        <strong className="text-neutral-900 dark:text-white">
                          Highest Margin Channel:
                        </strong>{" "}
                        Organic Programmatic Search generated{" "}
                        <strong className="text-neutral-900 dark:text-white">
                          $184,000 in pipeline
                        </strong>{" "}
                        on only $2,400 direct infrastructure cost (76.6x ROAS).
                      </p>
                      <p>
                        2.{" "}
                        <strong className="text-neutral-900 dark:text-white">
                          Deals at Risk:
                        </strong>{" "}
                        Two accounts have had no contact activity in &gt;7 days:{" "}
                        <span className="text-neutral-900 dark:text-white font-bold underline">
                          Vanguard Retail ($34k)
                        </span>{" "}
                        and{" "}
                        <span className="text-neutral-900 dark:text-white font-bold underline">
                          Helios Media ($28k)
                        </span>
                        .
                      </p>
                      <p>
                        3.{" "}
                        <strong className="text-neutral-900 dark:text-white">
                          Recommended Action:
                        </strong>{" "}
                        Automated re-engagement sequence drafted and queued for
                        account executive review.
                      </p>
                    </div>

                    <div className="pt-2 flex gap-2">
                      <button
                        onClick={onOpenAiAssistant}
                        className="px-3 py-1.5 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-[11px] font-bold hover:bg-neutral-800 transition flex items-center gap-1 cursor-pointer"
                      >
                        <span>Open Live Assistant Modal</span>
                        <ChevronRight className="w-3 h-3 text-white dark:text-neutral-900" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PIPELINE & CUSTOMER OPS */}
          {activeTab === "pipeline" && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                {/* Column 1: Inbound & Qual */}
                <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300">
                    <span>New Leads (5)</span>
                    <span className="text-[10px] text-neutral-900 dark:text-white font-bold">
                      $98,000
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 space-y-1.5 text-xs font-mono">
                    <div className="font-bold text-neutral-900 dark:text-white">
                      Quantum Logistics
                    </div>
                    <div className="text-[10px] text-neutral-500 dark:text-neutral-400">
                      Score: 98/100 • 350 employees
                    </div>
                    <div className="text-[10px] text-neutral-900 dark:text-white font-bold">
                      $42,000
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 space-y-1.5 text-xs font-mono">
                    <div className="font-bold text-neutral-900 dark:text-white">
                      Aura Health Tech
                    </div>
                    <div className="text-[10px] text-neutral-500 dark:text-neutral-400">
                      Score: 91/100 • 80 employees
                    </div>
                    <div className="text-[10px] text-neutral-900 dark:text-white font-bold">
                      $24,000
                    </div>
                  </div>
                </div>

                {/* Column 2: Discovery Call */}
                <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300">
                    <span>Discovery (4)</span>
                    <span className="text-[10px] text-neutral-900 dark:text-white font-bold">
                      $142,000
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 space-y-1.5 text-xs font-mono">
                    <div className="font-bold text-neutral-900 dark:text-white">
                      Apex Supply Chain
                    </div>
                    <div className="text-[10px] text-neutral-500 dark:text-neutral-400">
                      Scheduled for Thursday 2 PM
                    </div>
                    <div className="text-[10px] text-neutral-900 dark:text-white font-bold">
                      $58,000
                    </div>
                  </div>
                </div>

                {/* Column 3: Proposal Sent */}
                <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300">
                    <span>Proposal (3)</span>
                    <span className="text-[10px] text-neutral-900 dark:text-white font-bold">
                      $118,000
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 space-y-1.5 text-xs font-mono">
                    <div className="font-bold text-neutral-900 dark:text-white">
                      NovaFin Capital
                    </div>
                    <div className="text-[10px] text-neutral-500 dark:text-neutral-400">
                      Contract in final legal review
                    </div>
                    <div className="text-[10px] text-neutral-900 dark:text-white font-bold">
                      $74,000
                    </div>
                  </div>
                </div>

                {/* Column 4: Won & Onboarding */}
                <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-900 border-2 border-neutral-900 dark:border-white space-y-3 shadow-xs">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-neutral-900 dark:text-white">
                    <span>Closed / Won (2)</span>
                    <span className="text-[10px] text-neutral-900 dark:text-white font-bold">
                      $54,000
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 space-y-1.5 text-xs font-mono">
                    <div className="font-bold text-neutral-900 dark:text-white">
                      Stratos Retail Group
                    </div>
                    <div className="text-[10px] text-neutral-600 dark:text-neutral-300 font-bold">
                      Auto-onboarding completed
                    </div>
                    <div className="text-[10px] text-neutral-900 dark:text-white font-bold">
                      $54,000 paid
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: EXECUTIVE REPORTS & AUDITS */}
          {activeTab === "reports" && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 font-bold uppercase">
                      EXECUTIVE AUDIT SUMMARY
                    </div>
                    <div className="text-base font-bold text-neutral-900 dark:text-white">
                      Maha Growth Performance Dossier — Q3 Audit
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate && onNavigate("diagnostic")}
                    className="px-3 py-1.5 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-mono text-xs font-bold hover:bg-neutral-800 transition cursor-pointer"
                  >
                    Run Your Custom Audit
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 space-y-1">
                    <div className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
                      Platform Efficiency Score
                    </div>
                    <div className="text-xl font-bold font-mono text-neutral-900 dark:text-white">
                      94.8 / 100
                    </div>
                    <div className="text-[10px] text-neutral-500 dark:text-neutral-400">
                      Top 5% of tested SaaS ecosystems
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 space-y-1">
                    <div className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
                      Net Customer Retention
                    </div>
                    <div className="text-xl font-bold font-mono text-neutral-900 dark:text-white">
                      114.2%
                    </div>
                    <div className="text-[10px] text-neutral-500 dark:text-neutral-400">
                      Driven by compounding workflow stickiness
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 space-y-1">
                    <div className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
                      Security &amp; Compliance
                    </div>
                    <div className="text-xl font-bold font-mono text-neutral-900 dark:text-white">
                      SOC-2 Type II Ready
                    </div>
                    <div className="text-[10px] text-neutral-500 dark:text-neutral-400">
                      100% client code &amp; data isolation
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Workspace Action Strip */}
        <div className="bg-neutral-100 dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-800 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-neutral-600 dark:text-neutral-300 font-mono font-medium">
            Ready to replace disconnected vendors with one growth system?
          </div>
          {onNavigate && (
            <div className="flex items-center gap-3">
              <button
                id="btn-workspace-get-started"
                type="button"
                onClick={() => onNavigate("contact")}
                className="px-4 py-2 rounded-xl bg-neutral-900 dark:bg-white hover:bg-neutral-800 text-white dark:text-neutral-900 font-bold text-xs font-mono transition cursor-pointer shadow-xs"
              >
                Schedule 30-Min Demo
              </button>
              <button
                id="btn-workspace-diagnostic"
                type="button"
                onClick={() => onNavigate("diagnostic")}
                className="px-4 py-2 rounded-xl bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-800 font-mono text-xs font-semibold transition cursor-pointer shadow-2xs"
              >
                Calculate Growth Blueprint &rarr;
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
