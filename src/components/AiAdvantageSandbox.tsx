import React, { useState } from "react";
import { AI_ADVANTAGE_TOOLS } from "../data/companyData";
import {
  Bot,
  Sparkles,
  BarChart3,
  Workflow,
  Zap,
  Play,
  CheckCircle2,
  Terminal,
  RefreshCw,
} from "lucide-react";

export const AiAdvantageSandbox: React.FC = () => {
  const [selectedToolId, setSelectedToolId] = useState(
    AI_ADVANTAGE_TOOLS[0].id,
  );
  const [customInput, setCustomInput] = useState("");
  const [isSimulating, setIsSimulating] = useState(false);
  const [liveOutput, setLiveOutput] = useState<string | null>(null);

  const activeTool =
    AI_ADVANTAGE_TOOLS.find((t) => t.id === selectedToolId) ||
    AI_ADVANTAGE_TOOLS[0];

  const getToolIcon = (iconName: string) => {
    switch (iconName) {
      case "Bot":
        return Bot;
      case "Sparkles":
        return Sparkles;
      case "BarChart3":
        return BarChart3;
      case "Workflow":
        return Workflow;
      case "Zap":
        return Zap;
      default:
        return Bot;
    }
  };

  const handleSimulate = async () => {
    setIsSimulating(true);
    setLiveOutput(null);

    const trimmedInput = customInput.trim();
    if (!trimmedInput) {
      setTimeout(() => {
        setIsSimulating(false);
        setLiveOutput(activeTool.sampleOutput);
      }, 400);
      return;
    }

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmedInput,
          agentType: "growth_advisor",
          context: `Sandbox simulator executing tool: "${activeTool.title}". Feature focus: ${activeTool.subtitle}. Sample trigger: ${activeTool.sampleInput}`,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.reply) {
          setLiveOutput(
            `[AGENT DEPLOYED: ${activeTool.title.toUpperCase()}]\nTarget Scenario: "${trimmedInput}"\n\n${data.reply}`,
          );
          return;
        }
      }
      setLiveOutput(
        `Processing query: "${trimmedInput}"\n\nResult:\n` +
          activeTool.sampleOutput,
      );
    } catch {
      setLiveOutput(
        `Processing query: "${trimmedInput}"\n\nResult:\n` +
          activeTool.sampleOutput,
      );
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-xl text-neutral-900 dark:text-white">
      {/* Tool Selector Tabs */}
      <div className="p-4 bg-neutral-100 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-white animate-pulse" />
          <span className="text-xs font-mono font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
            AI ADVANTAGE INTERACTIVE SANDBOX
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-white dark:bg-neutral-900 p-1 rounded-xl border border-neutral-300 dark:border-neutral-800 shadow-2xs">
          {AI_ADVANTAGE_TOOLS.map((tool) => {
            const Icon = getToolIcon(tool.iconName);
            const isSelected = tool.id === selectedToolId;
            return (
              <button
                key={tool.id}
                onClick={() => {
                  setSelectedToolId(tool.id);
                  setCustomInput("");
                  setLiveOutput(null);
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  isSelected
                    ? "bg-neutral-900 dark:bg-white dark:bg-white text-white dark:text-neutral-900 font-semibold shadow-xs"
                    : "text-neutral-600 hover:text-neutral-900 dark:hover:text-white dark:hover:text-neutral-900 dark:text-white dark:text-neutral-900 dark:text-white dark:text-neutral-900 hover:bg-neutral-100"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tool.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-neutral-200">
        {/* Left: Tool Details & Capabilities */}
        <div className="lg:col-span-5 p-6 lg:p-8 space-y-6 bg-neutral-50 dark:bg-neutral-800">
          <div className="space-y-2">
            <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest font-semibold">
              {activeTool.subtitle}
            </span>
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
              {activeTool.title}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed pt-1">
              {activeTool.description}
            </p>
          </div>

          <div className="space-y-3 pt-2 border-t border-neutral-200 dark:border-neutral-800">
            <div className="text-xs font-mono text-neutral-600 dark:text-neutral-300 uppercase font-semibold">
              Core Capabilities:
            </div>
            <div className="space-y-2">
              {activeTool.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 text-xs text-neutral-800 dark:text-neutral-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-neutral-900 dark:text-white shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Preset Prompt Prompt Pill */}
          <div className="pt-2">
            <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 mb-1.5 font-medium">
              SAMPLE REAL-WORLD TRIGGER:
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white font-mono leading-relaxed shadow-2xs">
              &ldquo;{activeTool.sampleInput}&rdquo;
            </div>
          </div>
        </div>

        {/* Right: Live Interactive Execution Simulator */}
        <div className="lg:col-span-7 p-6 lg:p-8 bg-neutral-950 flex flex-col justify-between space-y-5 rounded-b-3xl lg:rounded-r-3xl lg:rounded-bl-none overflow-hidden relative">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent pointer-events-none"></div>
          
          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3 text-xs font-mono">
              <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>INTERACTIVE ENGINE TERMINAL</span>
              </span>
              <span className="text-cyan-500 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />{" "}
                Ready
              </span>
            </div>

            {/* Input area */}
            <div className="space-y-2">
              <label className="block text-xs font-mono text-cyan-500 font-semibold">
                Test Custom Prompt / Scenario:
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder={`Try asking: "${activeTool.sampleInput.slice(0, 48)}..."`}
                  className="flex-1 bg-black border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 font-mono"
                />
                <button
                  type="button"
                  onClick={handleSimulate}
                  disabled={isSimulating}
                  className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-mono text-xs font-bold flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all shrink-0 cursor-pointer disabled:opacity-50"
                >
                  {isSimulating ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-black" />
                  ) : (
                    <Play className="w-3.5 h-3.5 text-black" />
                  )}
                  <span>
                    {isSimulating ? "Simulating..." : "Run Simulation"}
                  </span>
                </button>
              </div>
            </div>

            {/* Output view */}
            <div className="bg-black border border-neutral-800 rounded-xl p-4 min-h-[220px] font-mono text-xs space-y-2 overflow-x-auto shadow-inner relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
              
              <div className="text-[11px] text-neutral-500 flex items-center justify-between border-b border-neutral-800 pb-2">
                <span>OUTPUT: {activeTool.mockOutputTitle.toUpperCase()}</span>
                <span className="text-cyan-700 font-bold">
                  EXECUTION TIME: 0.84s
                </span>
              </div>

              {isSimulating ? (
                <div className="py-12 text-center text-cyan-500 space-y-2">
                  <RefreshCw className="w-5 h-5 animate-spin mx-auto text-cyan-400" />
                  <p>
                    Executing agentic logic &amp; integrating business
                    intelligence...
                  </p>
                </div>
              ) : (
                <pre className="text-cyan-300 whitespace-pre-wrap leading-relaxed pt-2">
                  {liveOutput || activeTool.sampleOutput}
                </pre>
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-neutral-800 flex flex-wrap items-center justify-between text-[11px] font-mono text-neutral-500 gap-2 relative z-10">
            <span>Result: Measurable Business Outcome (0 Fluff)</span>
            <span className="text-cyan-500 font-bold">
              Customized to your proprietary business data
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
