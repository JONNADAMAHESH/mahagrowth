import React, { useState, useEffect } from "react";
import {
  Database,
  Sparkles,
  TrendingUp,
  Zap,
  Play,
  Pause,
  Download,
  Copy,
  Check,
  Cpu,
  BarChart3,
  ShieldCheck,
  Layers,
  ArrowRight,
  UserCheck,
  Briefcase,
  Sliders,
  Terminal,
} from "lucide-react";

interface MiniSandboxProps {
  onOpenFullStudio?: () => void;
  onOpenContact?: () => void;
}

export const MiniDataStudioSandbox: React.FC<MiniSandboxProps> = ({
  onOpenFullStudio,
  onOpenContact,
}) => {
  const [activeDataset, setActiveDataset] = useState<
    "saas" | "marketing" | "logistics"
  >("saas");
  const [isStreaming, setIsStreaming] = useState<boolean>(true);
  const [queryText, setQueryText] = useState<string>(
    "Check latency distribution across clusters",
  );
  const [activeQueryInsight, setActiveQueryInsight] = useState<string | null>(
    null,
  );
  const [copiedDax, setCopiedDax] = useState<boolean>(false);

  // Live telemetry data simulation
  const [telemetry, setTelemetry] = useState({
    pipelineSla: 99.98,
    latencyMs: 38,
    taskQueueCount: 4,
    anomalySigma: 1.42,
    recordsProcessed: 142800,
    apiIngestionRate: 342,
  });

  // Streaming effect
  useEffect(() => {
    if (!isStreaming) return;
    const interval = setInterval(() => {
      setTelemetry((prev) => {
        const newLatency = Math.round(35 + Math.random() * 8);
        return {
          ...prev,
          latencyMs: newLatency,
          recordsProcessed:
            prev.recordsProcessed + Math.floor(Math.random() * 25 + 5),
          anomalySigma: +(1.2 + Math.random() * 0.5).toFixed(2),
          apiIngestionRate: Math.round(340 + Math.random() * 15),
        };
      });
    }, 1600);

    return () => clearInterval(interval);
  }, [isStreaming]);

  // Handle Natural Language Prompt
  const handleExecuteQuery = (prompt: string) => {
    setQueryText(prompt);
    const p = prompt.toLowerCase();
    if (p.includes("latency")) {
      setActiveQueryInsight(
        `System Telemetry: Global P99 latency holding at ${telemetry.latencyMs + 12}ms. Ingestion queue operating nominally.`,
      );
    } else if (p.includes("forecast") || p.includes("load")) {
      setActiveQueryInsight(
        `Predictive Trajectory: Estimated compute load will scale safely to 1,200 req/sec over the next 90 days. Auto-scaling clusters provisioned.`,
      );
    } else {
      setActiveQueryInsight(
        `AI Schema Synthesis: Extracted continuous variance metrics across ${telemetry.recordsProcessed.toLocaleString()} records. Ready for instant streaming.`,
      );
    }
  };

  const sampleDaxCode = `// Turnkey Power BI Calculated Measure
Normalized_Event_Latency = 
VAR CurrentLatency = ${telemetry.latencyMs}
VAR PriorPeriod = CALCULATE(AVERAGE('Telemetry'[LatencyMs]), DATEADD('Calendar'[Date], -1, QUARTER))
RETURN 
 DIVIDE(CurrentLatency - PriorPeriod, PriorPeriod, 0)`;

  const copyDax = () => {
    navigator.clipboard.writeText(sampleDaxCode);
    setCopiedDax(true);
    setTimeout(() => setCopiedDax(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl bg-neutral-950 border border-neutral-800 p-5 sm:p-7 shadow-2xl backdrop-blur-xl space-y-6 text-left relative overflow-hidden text-neutral-100">
      {/* Decorative ambient background glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isStreaming ? "bg-cyan-400" : "bg-neutral-500"}`}
              />
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isStreaming ? "bg-cyan-500" : "bg-neutral-400"}`}
              />
            </span>
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-cyan-400">
              Interactive Data Studio Sandbox
            </span>
            <span className="text-neutral-500 dark:text-neutral-400">•</span>
            <span className="text-[11px] font-mono text-neutral-300">
              Live 2026 Engine
            </span>
            <span className="ml-2 px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 text-[10px] font-mono font-bold border border-cyan-500/30">
              Simulated Demo Environment
            </span>
          </div>
          <p className="text-xs text-neutral-400">
            Test live ingestion, natural language querying, and DAX generation
            in real time before scheduling.
          </p>
        </div>

        {/* Dataset Switcher */}
        <div className="flex items-center gap-1 bg-neutral-950/80 p-1 rounded-xl border border-neutral-800">
          <span className="text-[10px] font-mono text-neutral-400 px-2 flex items-center gap-1">
            <Terminal className="w-3 h-3 text-cyan-400" />
            <span>Target:</span>
          </span>
          {[
            { id: "saas", label: "FinTech", icon: Layers },
            { id: "marketing", label: "Logistics", icon: Zap },
            { id: "logistics", label: "HealthTech", icon: Database },
          ].map((ds) => {
            const Icon = ds.icon;
            return (
              <button
                key={ds.id}
                onClick={() => setActiveDataset(ds.id as any)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  activeDataset === ds.id
                    ? "bg-cyan-500 text-white font-bold shadow-xs"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{ds.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="space-y-5">
        {/* Metric Telemetry Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 relative z-10">
          <div className="p-3.5 rounded-xl bg-neutral-950/70 border border-neutral-800 space-y-1">
            <div className="text-[10px] font-mono text-neutral-400 uppercase">
              Event Latency
            </div>
            <div className="text-lg sm:text-xl font-mono font-bold text-cyan-300">
              {telemetry.latencyMs} ms
            </div>
            <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Sub-150ms Optimal
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-950/70 border border-neutral-800 space-y-1">
            <div className="text-[10px] font-mono text-neutral-400 uppercase">
              Uptime SLA
            </div>
            <div className="text-lg sm:text-xl font-mono font-bold text-emerald-400">
              {telemetry.pipelineSla}%
            </div>
            <div className="text-[11px] font-mono text-neutral-400">
              Zero Ingestion Drop
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-950/70 border border-neutral-800 space-y-1">
            <div className="text-[10px] font-mono text-neutral-400 uppercase">
              Live API Ingestion
            </div>
            <div className="text-lg sm:text-xl font-mono font-bold text-amber-400">
              {telemetry.apiIngestionRate} req/sec
            </div>
            <div className="text-[11px] font-mono text-neutral-400">
              Auto-Scaling Active
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-950/70 border border-neutral-800 space-y-1">
            <div className="text-[10px] font-mono text-neutral-400 uppercase">
              Total Records Processed
            </div>
            <div className="text-lg sm:text-xl font-mono font-bold text-white">
              {telemetry.recordsProcessed.toLocaleString()}
            </div>
            <div className="text-[11px] font-mono text-cyan-400">
              +{(telemetry.apiIngestionRate / 10).toFixed(1)} rec/sec streaming
            </div>
          </div>
        </div>

        {/* Natural Language Query Search Bar with Quick Chips */}
        <div className="space-y-2.5 relative z-10">
          <label className="text-xs font-mono font-semibold text-neutral-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Ask Real-Time AI Query (Plain English NLQ):</span>
          </label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleExecuteQuery(queryText);
                }}
                placeholder="e.g. Check latency distribution across clusters"
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder:text-neutral-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              />
            </div>
            <button
              onClick={() => handleExecuteQuery(queryText)}
              className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer shadow-md transition-all shrink-0"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Query AI</span>
            </button>
          </div>

          {/* Quick Suggestion Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
              Quick queries:
            </span>
            {[
              "Check latency distribution across clusters",
              "Forecast compute load for next 90 days",
              "Detect anomalous variance spikes",
            ].map((chip) => (
              <button
                key={chip}
                onClick={() => handleExecuteQuery(chip)}
                className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-neutral-800/70 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700/60 cursor-pointer transition-all"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* AI Query Response Banner */}
          {activeQueryInsight && (
            <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-neutral-200 font-mono space-y-1 animate-fade-in">
              <div className="flex items-center gap-1.5 text-cyan-400 font-bold text-[11px] uppercase">
                <Cpu className="w-3 h-3" />
                <span>AI Analytical Result</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                {activeQueryInsight}
              </p>
            </div>
          )}
        </div>

        {/* Live DAX Code Preview & Action Row */}
        <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-2 relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase text-amber-400 flex items-center gap-1.5">
              <Zap className="w-3 h-3" />
              <span>Generated Power BI DAX Formula</span>
            </span>
            <button
              onClick={copyDax}
              className="px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-[10px] font-mono text-neutral-300 flex items-center gap-1 cursor-pointer transition-colors"
            >
              {copiedDax ? (
                <Check className="w-3 h-3 text-emerald-400" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
              <span>{copiedDax ? "Copied" : "Copy DAX"}</span>
            </button>
          </div>
          <pre className="text-[11px] font-mono text-neutral-300 bg-neutral-900 p-2.5 rounded-lg overflow-x-auto">
            <code>{sampleDaxCode}</code>
          </pre>
        </div>

        {/* Sandbox Footer Action Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-neutral-800 text-xs font-mono relative z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsStreaming(!isStreaming)}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-mono font-bold cursor-pointer transition-all ${
                isStreaming
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "bg-neutral-800 text-neutral-400 hover:text-white"
              }`}
            >
              {isStreaming ? (
                <Pause className="w-3 h-3" />
              ) : (
                <Play className="w-3 h-3" />
              )}
              <span>{isStreaming ? "Streaming Live" : "Resume Telemetry"}</span>
            </button>
            <span className="text-[11px] text-neutral-400">
              {telemetry.recordsProcessed.toLocaleString()} records ingested
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onOpenFullStudio && (
              <button
                onClick={onOpenFullStudio}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold flex items-center gap-1.5 shadow-md shadow-cyan-500/20 cursor-pointer transition-all"
              >
                <span>Open Full Data Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {onOpenContact && (
              <button
                onClick={onOpenContact}
                className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium flex items-center gap-1.5 border border-neutral-700 cursor-pointer transition-all"
              >
                <span>Apply for Founding Partner Program</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
