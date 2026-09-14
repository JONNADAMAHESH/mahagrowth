import React, { useState } from "react";
import {
  Zap,
  BarChart3,
  GitFork,
  TrendingUp,
  DollarSign,
  Settings,
  ArrowDown,
  CheckCircle2,
  ChevronRight,
  Layers,
  Sparkles,
} from "lucide-react";
import { PageId } from "../types";

interface PlatformArchitectureDiagramProps {
  onNavigate?: (page: PageId, anchorId?: string) => void;
}

type NodeId =
  | "core"
  | "automation"
  | "analytics"
  | "workflows"
  | "marketing"
  | "sales"
  | "operations"
  | "outcome";

interface NodeDetail {
  id: NodeId;
  title: string;
  category: string;
  summary: string;
  replaces: string;
  metrics: string;
  bullets: string[];
}

const NODE_DETAILS: Record<NodeId, NodeDetail> = {
  core: {
    id: "core",
    title: "Maha Growth Platform",
    category: "The Unified Operating System",
    summary:
      "The single source of truth connecting your revenue engines, customer data, and execution stack.",
    replaces:
      "Juggling 8+ disconnected SaaS subscriptions and manual spreadsheet exports",
    metrics: "99.98% platform uptime • Sub-150ms event latency",
    bullets: [
      "Single synchronized data layer across customer touchpoints",
      "Centralized event pipeline with native API connectors",
      "Unified permissions and executive security controls",
    ],
  },
  automation: {
    id: "automation",
    title: "Intelligent Automation",
    category: "Autonomous Execution",
    summary:
      "Background triggers, AI customer concierges, and auto-responders that work 24/7 without fatigue.",
    replaces:
      "Manual email drafting, copy-paste lead entry, and repetitive tasks",
    metrics: "22+ weekly hours recovered per team member",
    bullets: [
      "24/7 AI lead qualification & calendar scheduling",
      "Automated multi-channel client nurture campaigns",
      "Error-free event synchronization between billing and CRM",
    ],
  },
  analytics: {
    id: "analytics",
    title: "Real-Time Analytics",
    category: "Intelligence & Telemetry",
    summary:
      "Clear, plain-English executive insights and financial metrics instead of confusing vanity dashboards.",
    replaces:
      "Scattered CSV exports, opaque Google Analytics, and end-of-month surprises",
    metrics: "100% data transparency • Instant query response",
    bullets: [
      "Multi-touch attribution tracking exact customer acquisition cost (CAC)",
      "Customer lifetime value (LTV) cohort predictions",
      "Real-time revenue velocity and pipeline conversion benchmarks",
    ],
  },
  workflows: {
    id: "workflows",
    title: "Frictionless Workflows",
    category: "Process Orchestration",
    summary:
      "Streamlined logic connecting marketing leads, closed deals, client onboarding, and billing into one flow.",
    replaces: "Broken handoffs between sales reps, engineers, and accounting",
    metrics: "4x faster onboarding turnaround",
    bullets: [
      "Stripe checkout auto-generates client workspace and ledger entry",
      "Contract signature triggers automated team task allocation",
      "Proactive churn alerts before clients experience delivery delays",
    ],
  },
  marketing: {
    id: "marketing",
    title: "Marketing Engine",
    category: "Demand & Conversion",
    summary:
      "High-speed web products, programmatic search authority, and high-converting funnel infrastructure.",
    replaces:
      "Generic templates with low conversion rates and unmeasured ad spend",
    metrics: "+64% avg lift in visitor-to-qualified lead rate",
    bullets: [
      "Conversion-rate optimized web apps built for sub-second loads",
      "Organic search authority systems targeting high-intent buyers",
      "Algorithmic budget balancing across ad channels",
    ],
  },
  sales: {
    id: "sales",
    title: "Sales Engine",
    category: "Pipeline Velocity",
    summary:
      "Automated deal qualification, instant appointment scheduling, and CRM velocity tracking.",
    replaces: "Cold leads going stale while waiting days for manual follow-up",
    metrics: "3-second inquiry response time",
    bullets: [
      "Immediate lead enrichment with company size and tech stack",
      "Autonomous booking links integrated directly into sales reps calendars",
      "Deal stagnation alerts with automated revival sequences",
    ],
  },
  operations: {
    id: "operations",
    title: "Operations Engine",
    category: "Delivery & Retention",
    summary:
      "Disciplined fulfillment systems, automated invoicing, and proactive customer retention loops.",
    replaces: "Chaotic manual client checklists and unbilled scope creep",
    metrics: "Zero dropped client deliverables",
    bullets: [
      "Standardized client onboarding milestones delivered instantly",
      "Automated recurring billing, receipts, and revenue reconciliation",
      "Client sentiment tracking and retention intervention queues",
    ],
  },
  outcome: {
    id: "outcome",
    title: "Sustainable Business Growth",
    category: "The Compounding Result",
    summary:
      "Predictable customer acquisition, healthy operating margins, and the freedom to scale with confidence.",
    replaces: "Unpredictable revenue dips and burnout from operational chaos",
    metrics: "Compounding ARR with disciplined profit margins",
    bullets: [
      "Scalable digital leverage without hiring linear headcount",
      "Clean executive visibility for founders, investors, and leadership",
      "A resilient business operating system built for long-term endurance",
    ],
  },
};

export const PlatformArchitectureDiagram: React.FC<
  PlatformArchitectureDiagramProps
> = ({ onNavigate }) => {
  const [activeNode, setActiveNode] = useState<NodeId>("core");

  const selected = NODE_DETAILS[activeNode];

  return (
    <section
      id="platform-architecture"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 text-neutral-900 dark:text-white"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-800 text-xs font-mono font-semibold">
          <Layers className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
          <span>SYSTEM ARCHITECTURE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
          One Platform. Every Growth Function.
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
          Instead of stitching together 10 different single-feature tools that
          don&rsquo;t talk to each other, Maha Growth provides an integrated
          architecture where automation, analytics, and workflows power your
          marketing, sales, and operations in unison.
        </p>
      </div>

      {/* Main Diagram Canvas */}
      <div className="rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left / Top (on mobile): The Interactive Hierarchical Diagram */}
          <div className="lg:col-span-7 flex flex-col items-center space-y-4">
            {/* Level 1: MAHA GROWTH CORE */}
            <button
              id="node-core"
              type="button"
              onClick={() => setActiveNode("core")}
              className={`w-full max-w-md p-4 rounded-2xl transition-all duration-200 flex items-center justify-between group cursor-pointer text-left ${
                activeNode === "core"
                  ? "bg-black dark:bg-cyan-500 text-white dark:text-black border-2 border-black dark:border-cyan-500 shadow-md"
                  : "bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700 text-neutral-800 dark:text-neutral-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                    activeNode === "core"
                      ? "bg-white/20 dark:bg-black/20 border-transparent text-white dark:text-black"
                      : "bg-white dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white"
                  }`}
                >
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div
                    className={`text-[10px] font-mono uppercase tracking-widest font-bold ${
                      activeNode === "core"
                        ? "text-neutral-300"
                        : "text-neutral-500"
                    }`}
                  >
                    UNIFIED OPERATING SYSTEM
                  </div>
                  <div className="text-base sm:text-lg font-extrabold font-mono">
                    MAHA GROWTH
                  </div>
                </div>
              </div>
              <div
                className={`text-[11px] font-mono px-2.5 py-1 rounded border hidden sm:block ${
                  activeNode === "core"
                    ? "bg-neutral-800 text-neutral-200 border-neutral-700"
                    : "bg-neutral-200 text-neutral-800 border-neutral-300"
                }`}
              >
                Core Engine
              </div>
            </button>

            {/* Vertical Connector Line */}
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-6 bg-neutral-300 dark:bg-neutral-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-400 dark:bg-neutral-600" />
              <div className="w-0.5 h-4 bg-neutral-300 dark:bg-neutral-700" />
            </div>

            {/* Horizontal Branch Bar */}
            <div className="w-full max-w-md relative flex items-center justify-between px-6">
              <div className="absolute top-0 left-8 right-8 h-0.5 bg-neutral-300 dark:bg-neutral-700" />
            </div>

            {/* Level 2: AUTOMATION | ANALYTICS | WORKFLOWS */}
            <div className="w-full grid grid-cols-3 gap-2.5 sm:gap-4 max-w-lg">
              {/* Automation */}
              <button
                id="node-automation"
                type="button"
                onClick={() => setActiveNode("automation")}
                className={`p-3 sm:p-4 rounded-xl text-center transition-all cursor-pointer ${
                  activeNode === "automation"
                    ? "bg-black dark:bg-cyan-500 text-white dark:text-black border-2 border-black dark:border-cyan-500 shadow-xs"
                    : "bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700 text-neutral-800 dark:text-neutral-200"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg border flex items-center justify-center mx-auto mb-2 ${
                    activeNode === "automation"
                      ? "bg-white/20 dark:bg-black/20 border-transparent text-white dark:text-black"
                      : "bg-white dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white"
                  }`}
                >
                  <Zap className="w-4 h-4" />
                </div>
                <div className="text-xs sm:text-sm font-bold font-mono">
                  AUTOMATION
                </div>
                <div
                  className={`text-[9px] sm:text-[10px] font-mono mt-0.5 ${
                    activeNode === "automation"
                      ? "text-neutral-300"
                      : "text-neutral-500"
                  }`}
                >
                  24/7 Execution
                </div>
              </button>

              {/* Analytics */}
              <button
                id="node-analytics"
                type="button"
                onClick={() => setActiveNode("analytics")}
                className={`p-3 sm:p-4 rounded-xl text-center transition-all cursor-pointer ${
                  activeNode === "analytics"
                    ? "bg-black dark:bg-cyan-500 text-white dark:text-black border-2 border-black dark:border-cyan-500 shadow-xs"
                    : "bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700 text-neutral-800 dark:text-neutral-200"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg border flex items-center justify-center mx-auto mb-2 ${
                    activeNode === "analytics"
                      ? "bg-white/20 dark:bg-black/20 border-transparent text-white dark:text-black"
                      : "bg-white dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white"
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div className="text-xs sm:text-sm font-bold font-mono">
                  ANALYTICS
                </div>
                <div
                  className={`text-[9px] sm:text-[10px] font-mono mt-0.5 ${
                    activeNode === "analytics"
                      ? "text-neutral-300"
                      : "text-neutral-500"
                  }`}
                >
                  Real-Time Data
                </div>
              </button>

              {/* Workflows */}
              <button
                id="node-workflows"
                type="button"
                onClick={() => setActiveNode("workflows")}
                className={`p-3 sm:p-4 rounded-xl text-center transition-all cursor-pointer ${
                  activeNode === "workflows"
                    ? "bg-black dark:bg-cyan-500 text-white dark:text-black border-2 border-black dark:border-cyan-500 shadow-xs"
                    : "bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700 text-neutral-800 dark:text-neutral-200"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg border flex items-center justify-center mx-auto mb-2 ${
                    activeNode === "workflows"
                      ? "bg-white/20 dark:bg-black/20 border-transparent text-white dark:text-black"
                      : "bg-white dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white"
                  }`}
                >
                  <GitFork className="w-4 h-4" />
                </div>
                <div className="text-xs sm:text-sm font-bold font-mono">
                  WORKFLOWS
                </div>
                <div
                  className={`text-[9px] sm:text-[10px] font-mono mt-0.5 ${
                    activeNode === "workflows"
                      ? "text-neutral-300"
                      : "text-neutral-500"
                  }`}
                >
                  Orchestration
                </div>
              </button>
            </div>

            {/* Vertical Flow Arrows to Engines */}
            <div className="w-full grid grid-cols-3 gap-2.5 sm:gap-4 max-w-lg text-center">
              <div className="flex justify-center text-neutral-900 dark:text-white">
                <ArrowDown className="w-4 h-4" />
              </div>
              <div className="flex justify-center text-neutral-900 dark:text-white">
                <ArrowDown className="w-4 h-4" />
              </div>
              <div className="flex justify-center text-neutral-900 dark:text-white">
                <ArrowDown className="w-4 h-4" />
              </div>
            </div>

            {/* Level 3: MARKETING | SALES | OPERATIONS */}
            <div className="w-full grid grid-cols-3 gap-2.5 sm:gap-4 max-w-lg">
              {/* Marketing */}
              <button
                id="node-marketing"
                type="button"
                onClick={() => setActiveNode("marketing")}
                className={`p-3 sm:p-4 rounded-xl text-center transition-all cursor-pointer ${
                  activeNode === "marketing"
                    ? "bg-black dark:bg-cyan-500 text-white dark:text-black border-2 border-black dark:border-cyan-500 shadow-xs"
                    : "bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700 text-neutral-800 dark:text-neutral-200"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg border flex items-center justify-center mx-auto mb-2 ${
                    activeNode === "marketing"
                      ? "bg-white/20 dark:bg-black/20 border-transparent text-white dark:text-black"
                      : "bg-white dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white"
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div className="text-xs sm:text-sm font-bold font-mono">
                  MARKETING
                </div>
                <div
                  className={`text-[9px] sm:text-[10px] font-mono mt-0.5 ${
                    activeNode === "marketing"
                      ? "text-neutral-300"
                      : "text-neutral-500"
                  }`}
                >
                  Demand Gen
                </div>
              </button>

              {/* Sales */}
              <button
                id="node-sales"
                type="button"
                onClick={() => setActiveNode("sales")}
                className={`p-3 sm:p-4 rounded-xl text-center transition-all cursor-pointer ${
                  activeNode === "sales"
                    ? "bg-black dark:bg-cyan-500 text-white dark:text-black border-2 border-black dark:border-cyan-500 shadow-xs"
                    : "bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700 text-neutral-800 dark:text-neutral-200"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg border flex items-center justify-center mx-auto mb-2 ${
                    activeNode === "sales"
                      ? "bg-white/20 dark:bg-black/20 border-transparent text-white dark:text-black"
                      : "bg-white dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white"
                  }`}
                >
                  <DollarSign className="w-4 h-4" />
                </div>
                <div className="text-xs sm:text-sm font-bold font-mono">
                  SALES
                </div>
                <div
                  className={`text-[9px] sm:text-[10px] font-mono mt-0.5 ${
                    activeNode === "sales"
                      ? "text-neutral-300"
                      : "text-neutral-500"
                  }`}
                >
                  Conversion
                </div>
              </button>

              {/* Operations */}
              <button
                id="node-operations"
                type="button"
                onClick={() => setActiveNode("operations")}
                className={`p-3 sm:p-4 rounded-xl text-center transition-all cursor-pointer ${
                  activeNode === "operations"
                    ? "bg-black dark:bg-cyan-500 text-white dark:text-black border-2 border-black dark:border-cyan-500 shadow-xs"
                    : "bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700 text-neutral-800 dark:text-neutral-200"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg border flex items-center justify-center mx-auto mb-2 ${
                    activeNode === "operations"
                      ? "bg-white/20 dark:bg-black/20 border-transparent text-white dark:text-black"
                      : "bg-white dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white"
                  }`}
                >
                  <Settings className="w-4 h-4" />
                </div>
                <div className="text-xs sm:text-sm font-bold font-mono">
                  OPERATIONS
                </div>
                <div
                  className={`text-[9px] sm:text-[10px] font-mono mt-0.5 ${
                    activeNode === "operations"
                      ? "text-neutral-300"
                      : "text-neutral-500"
                  }`}
                >
                  Fulfillment
                </div>
              </button>
            </div>

            {/* Convergence Connector */}
            <div className="w-full max-w-md relative flex items-center justify-center pt-2">
              <div className="w-48 h-0.5 bg-neutral-300 dark:bg-neutral-700" />
            </div>
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-4 bg-neutral-300 dark:bg-neutral-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-400 dark:bg-neutral-600" />
            </div>

            {/* Level 4: BUSINESS GROWTH OUTCOME */}
            <button
              id="node-outcome"
              type="button"
              onClick={() => setActiveNode("outcome")}
              className={`w-full max-w-md p-4 rounded-2xl transition-all duration-200 flex items-center justify-between group cursor-pointer text-left ${
                activeNode === "outcome"
                  ? "bg-black dark:bg-cyan-500 text-white dark:text-black border-2 border-black dark:border-cyan-500 shadow-md"
                  : "bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700 text-neutral-800 dark:text-neutral-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                    activeNode === "outcome"
                      ? "bg-white/20 dark:bg-black/20 border-transparent text-white dark:text-black"
                      : "bg-white dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white"
                  }`}
                >
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div
                    className={`text-[10px] font-mono uppercase tracking-widest font-bold ${
                      activeNode === "outcome"
                        ? "text-neutral-300"
                        : "text-neutral-500"
                    }`}
                  >
                    THE COMPOUNDING OUTCOME
                  </div>
                  <div className="text-base sm:text-lg font-extrabold font-mono">
                    SUSTAINABLE BUSINESS GROWTH
                  </div>
                </div>
              </div>
              <div
                className={`text-[11px] font-mono px-2.5 py-1 rounded border hidden sm:block ${
                  activeNode === "outcome"
                    ? "bg-neutral-800 text-neutral-200 border-neutral-700"
                    : "bg-neutral-200 text-neutral-800 border-neutral-300"
                }`}
              >
                Predictable ROI
              </div>
            </button>
          </div>

          {/* Right Column: Deep-Dive Node Inspection Panel */}
          <div className="lg:col-span-5 bg-neutral-50 dark:bg-neutral-800 rounded-2xl border border-neutral-300 dark:border-neutral-800 p-6 sm:p-7 space-y-5 shadow-sm text-neutral-900 dark:text-white">
            <div className="space-y-1.5 border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-600 dark:text-neutral-300 font-semibold uppercase tracking-wider">
                  {selected.category}
                </span>
                <span className="px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-[10px]">
                  Click any node to inspect
                </span>
              </div>
              <h3 className="text-2xl font-extrabold text-neutral-900 dark:text-white font-mono">
                {selected.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed pt-1">
                {selected.summary}
              </p>
            </div>

            {/* Replaces comparison box */}
            <div className="p-3.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 space-y-1">
              <div className="text-[10px] font-mono text-neutral-600 dark:text-neutral-300 uppercase font-bold">
                What this replaces:
              </div>
              <div className="text-xs text-neutral-800 dark:text-neutral-300">
                {selected.replaces}
              </div>
            </div>

            {/* Core Capabilities */}
            <div className="space-y-2">
              <div className="text-xs font-mono text-neutral-600 dark:text-neutral-300 uppercase font-semibold">
                Integrated Capabilities:
              </div>
              <div className="space-y-2">
                {selected.bullets.map((b, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 text-xs text-neutral-800 dark:text-neutral-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-neutral-900 dark:text-white shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Audited Metric */}
            <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-600 dark:text-neutral-300">
                Benchmark Performance:
              </span>
              <span className="text-xs font-mono font-bold text-neutral-900 dark:text-white">
                {selected.metrics}
              </span>
            </div>

            {/* Action CTA */}
            {onNavigate && (
              <button
                id="btn-inspect-architecture"
                type="button"
                onClick={() => onNavigate("services")}
                className="w-full py-2.5 rounded-xl bg-neutral-900 dark:bg-white hover:bg-neutral-800 text-xs font-mono text-white dark:text-neutral-900 font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
              >
                <span>Explore Full Technical Delivery</span>
                <ChevronRight className="w-3 h-3 text-white dark:text-neutral-900" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
