import React, { useState } from "react";
import {
  Zap,
  BarChart3,
  TrendingUp,
  Cpu,
  Layers,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  FileSpreadsheet,
  Activity,
  Mic,
  Database,
  CheckCircle2,
  Users,
  Lock,
  Globe,
} from "lucide-react";

interface BentoServicesGridProps {
  onNavigateToStudio?: () => void;
  onNavigateToContact?: () => void;
}

export const BentoServicesGrid: React.FC<BentoServicesGridProps> = ({
  onNavigateToStudio,
  onNavigateToContact,
}) => {
  const [activeTile, setActiveTile] = useState<number | null>(null);

  return (
    <div className="w-full space-y-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 text-xs font-mono uppercase tracking-widest font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>2026 ARCHITECTURE &amp; CAPABILITIES</span>
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
          Core Services &amp; The AI Advantage
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          Engineered for high-growth enterprises. We replace fragmented agencies
          with an integrated data, intelligence, and software infrastructure.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
        {/* Tile 1 (Featured 2-column wide on large screens): Real-Time Data Studio & Power BI Direct Sync */}
        <div
          onMouseEnter={() => setActiveTile(1)}
          onMouseLeave={() => setActiveTile(null)}
          className="lg:col-span-2 group relative p-7 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-cyan-500/50 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-all" />

          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 flex items-center justify-center">
                <Database className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-600 border border-amber-500/20">
                Direct Power BI Sync
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
                Multi-Format Data Telemetry &amp; Power BI Export
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-xl">
                Ingest PDF audit decks, PowerPoint decks, Excel sheets (.xlsx,
                .csv), and live API feeds without ETL bottlenecks. Automatically
                generates normalized push datasets, verified schemas, and DAX
                measures.
              </p>
            </div>

            {/* Interactive Preview Bar */}
            <div className="grid grid-cols-3 gap-2.5 pt-2">
              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800">
                <div className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 uppercase">
                  Latency
                </div>
                <div className="text-base font-bold font-mono text-cyan-600">
                  &lt; 40 ms
                </div>
              </div>
              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800">
                <div className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 uppercase">
                  Formats
                </div>
                <div className="text-base font-bold font-mono text-neutral-900 dark:text-white">
                  PDF/PPT/XLS
                </div>
              </div>
              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800">
                <div className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 uppercase">
                  DAX Output
                </div>
                <div className="text-base font-bold font-mono text-emerald-600">
                  100% Automated
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 relative z-10 flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
              Live anomaly detection with 2.0σ Gaussian bounds
            </span>
            {onNavigateToStudio && (
              <button
                onClick={onNavigateToStudio}
                className="text-xs font-mono font-bold text-cyan-600 hover:text-cyan-500 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Launch Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Tile 2: Predictive Forecasting & Churn AI */}
        <div
          onMouseEnter={() => setActiveTile(2)}
          onMouseLeave={() => setActiveTile(null)}
          className="group relative p-7 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500/50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-600 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
                Predictive Forecasting &amp; Churn Risk
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Algorithmic revenue forecasting with 95% confidence bands,
                proactive churn cohort scoring, and automated remediation
                triggers.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/20 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-neutral-500 dark:text-neutral-400">Churn Risk Score:</span>
                <span className="text-emerald-500 font-bold">
                  12.4% (Low Risk)
                </span>
              </div>
              <div className="w-full bg-neutral-200 dark:bg-neutral-700 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[12.4%]" />
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center text-xs font-mono text-neutral-500 dark:text-neutral-400 gap-1">
            <Activity className="w-3.5 h-3.5 text-blue-500" />
            <span>90-Day ARR Projections</span>
          </div>
        </div>

        {/* Tile 3: Multimodal & Voice AI Copilots */}
        <div
          onMouseEnter={() => setActiveTile(3)}
          onMouseLeave={() => setActiveTile(null)}
          className="group relative p-7 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-purple-500/50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-600 flex items-center justify-center">
                <Mic className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/10 text-purple-600 border border-purple-500/20">
                Voice &amp; Vision
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
                Multimodal &amp; Voice Intelligence
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Dictate prompts hands-free with real-time speech recognition.
                Listen to verbalized Power BI telemetry summaries with neural
                voice synthesis.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-purple-500/5 border border-purple-500/20 flex items-center gap-2">
              <div className="flex gap-0.5 items-center h-4">
                <span className="w-1 h-2 bg-purple-500 rounded-full animate-pulse" />
                <span className="w-1 h-4 bg-purple-400 rounded-full animate-pulse delay-75" />
                <span className="w-1 h-3 bg-purple-500 rounded-full animate-pulse delay-150" />
                <span className="w-1 h-4 bg-purple-300 rounded-full animate-pulse delay-100" />
              </div>
              <span className="text-[11px] font-mono text-purple-600">
                "Growth AI, summarize Q3 CAC variance"
              </span>
            </div>
          </div>

          <div className="pt-4 text-xs font-mono text-neutral-500 dark:text-neutral-400">
            Web Speech API Native Support
          </div>
        </div>

        {/* Tile 4: Role-Based Personalization Engine */}
        <div
          onMouseEnter={() => setActiveTile(4)}
          onMouseLeave={() => setActiveTile(null)}
          className="group relative p-7 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-emerald-500/50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
                Role-Based Personalization
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Adaptive interfaces that re-render for executives (EBITDA, Rule
                of 40, valuation) or operators (task throughput, stream health,
                99.98% SLA).
              </p>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono">
              <span className="px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                Executive
              </span>
              <span className="px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                Operator
              </span>
              <span className="px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                Analyst
              </span>
            </div>
          </div>

          <div className="pt-4 text-xs font-mono text-neutral-500 dark:text-neutral-400">
            Context-Aware UI Reconfiguration
          </div>
        </div>

        {/* Tile 5: Enterprise Compliance & Cryptographic Export Logs */}
        <div
          onMouseEnter={() => setActiveTile(5)}
          onMouseLeave={() => setActiveTile(null)}
          className="group relative p-7 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-cyan-500/50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
                Compliance &amp; Export Audit Ledger
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Complete auditability for SOC2 and enterprise governance. Every
                Power BI or CSV extraction is stamped with row counts and
                SHA-256 signatures.
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 font-mono text-[10px] text-neutral-500 dark:text-neutral-400 truncate">
              SHA: e3b0c44298fc1c149afbf4c8996fb9...
            </div>
          </div>

          <div className="pt-4 flex items-center gap-1 text-xs font-mono text-emerald-600">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Verifiable Data Lineage</span>
          </div>
        </div>
      </div>

      {/* Bottom CTA Bar */}
      <div className="p-6 rounded-2xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
        <div className="space-y-0.5 text-center sm:text-left">
          <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
            Ready to upgrade your enterprise growth architecture?
          </h4>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Get your 90-Day Growth Blueprint and customized Power BI integration
            plan.
          </p>
        </div>
        {onNavigateToContact && (
          <button
            onClick={onNavigateToContact}
            className="px-5 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white dark:text-neutral-900 font-bold text-xs font-mono flex items-center gap-2 cursor-pointer shadow-md transition-all shrink-0"
          >
            <span>Book 30-Minute Walkthrough</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
