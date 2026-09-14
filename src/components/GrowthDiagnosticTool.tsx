import React, { useState } from "react";
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  BarChart2,
  Clock,
  Zap,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface GrowthDiagnosticToolProps {
  onScheduleCall?: () => void;
}

export const GrowthDiagnosticTool: React.FC<GrowthDiagnosticToolProps> = ({
  onScheduleCall,
}) => {
  const { user, getAuthHeaders } = useAuth();
  const [stage, setStage] = useState<"START" | "GROW" | "AUTOMATE" | "SCALE">(
    "GROW",
  );
  const [industry, setIndustry] = useState<string>("B2B Services & Consulting");
  const [bottleneck, setBottleneck] = useState<string>("leads");
  const [teamSize, setTeamSize] = useState<string>("2-10 team members");
  const [calculating, setCalculating] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const stageData = {
    START: {
      label: "START (0 to $15k/mo)",
      focus: "Build modern digital presence & land first consistent clients",
      timeline: "14 - 21 Days",
      projectedRoi: "3.5x - 5x Revenue Velocity",
      hoursSaved: "12 hrs / week",
      recommended: [
        "Web & Product Engineering",
        "Brand Identity & Creative",
        "Growth Marketing Quickstart",
      ],
      keyAction:
        "Deploy high-converting conversion-engineered web app and validate customer acquisition channels.",
    },
    GROW: {
      label: "GROW ($15k to $60k/mo)",
      focus:
        "Scale customer acquisition & lower Customer Acquisition Cost (CAC)",
      timeline: "30 Days",
      projectedRoi: "+120% Qualified Pipeline Growth",
      hoursSaved: "22 hrs / week",
      recommended: [
        "Growth Marketing & Technical SEO",
        "AI Customer Agent (24/7 Lead Capture)",
        "Conversion Funnels",
      ],
      keyAction:
        "Deploy multi-channel SEO & ad acquisition funnels paired with an autonomous 24/7 AI lead qualification agent.",
    },
    AUTOMATE: {
      label: "AUTOMATE ($60k to $200k/mo)",
      focus: "Eliminate operational drag & automate manual busywork",
      timeline: "3 - 6 Weeks",
      projectedRoi: "$65,000+ Annual Operational Efficiency",
      hoursSaved: "35 hrs / week across team",
      recommended: [
        "Workflow & Process Automation",
        "Internal Team Copilots",
        "CRM & Invoicing Automation",
      ],
      keyAction:
        "Connect CRM, payments, client onboarding, and project dispatch into self-healing automated workflows.",
    },
    SCALE: {
      label: "SCALE ($200k+/mo)",
      focus: "Unified executive data intelligence & multi-market expansion",
      timeline: "6 - 8 Weeks",
      projectedRoi: "25% - 40% Net Profit Margin Expansion",
      hoursSaved: "50+ hrs / week",
      recommended: [
        "Data Intelligence & Dashboards",
        "Go-to-Market Strategy & Expansion",
        "AI Team Enablement",
      ],
      keyAction:
        "Implement real-time natural language business intelligence dashboards and train workforce on custom AI playbooks.",
    },
  };

  const handleGenerate = async (
    targetStage: "START" | "GROW" | "AUTOMATE" | "SCALE" = stage,
    targetIndustry: string = industry,
    targetBottleneck: string = bottleneck,
    targetTeamSize: string = teamSize,
  ) => {
    setCalculating(true);
    setSavedSuccess(false);
    try {
      const headers = getAuthHeaders();
      const currentConfig = stageData[targetStage];
      const res = await fetch("/api/diagnostics", {
        method: "POST",
        headers,
        body: JSON.stringify({
          clientName: user?.name || "Growth Diagnostic Inquirer",
          company: user?.company || `${targetIndustry} Enterprise`,
          stage: targetStage,
          bottlenecks: [targetBottleneck, targetTeamSize],
          computedRoi: currentConfig.projectedRoi,
          hoursRecoverable: currentConfig.hoursSaved,
          targetArr:
            targetStage === "START"
              ? "$180k ARR"
              : targetStage === "GROW"
                ? "$720k ARR"
                : targetStage === "AUTOMATE"
                  ? "$2.4M ARR"
                  : "$5M+ ARR",
          priorityStack: currentConfig.recommended,
        }),
      });
      if (res.ok) {
        setSavedSuccess(true);
      }
    } catch (e) {
      console.warn("Could not persist diagnostic:", e);
    } finally {
      setTimeout(() => {
        setCalculating(false);
      }, 350);
    }
  };

  const current = stageData[stage];

  return (
    <div className="bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-xl text-neutral-900 dark:text-white">
      {/* Top Header */}
      <div className="p-6 lg:p-8 bg-neutral-100 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-neutral-900/50 text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-800 text-xs font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
              <span>INTERACTIVE GROWTH DIAGNOSTIC ENGINE</span>
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
              Calculate Your Custom AI Growth Blueprint
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
              Select your company stage and primary operational bottlenecks to
              generate your tailored 90-day growth stack.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white dark:bg-neutral-900/50 px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-800 text-xs font-mono text-neutral-900 dark:text-white font-semibold shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-white animate-pulse" />
            <span>Matrix v3.2</span>
          </div>
        </div>
      </div>

      {/* Input Form & Real-Time Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-neutral-200">
        {/* Left: Input Selectors */}
        <div className="lg:col-span-6 p-6 lg:p-8 space-y-6 bg-neutral-50 dark:bg-neutral-800">
          {/* Step 1: Stage */}
          <div className="space-y-2.5">
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-300 font-semibold">
              1. What is your current business stage?
            </label>
            <div className="grid grid-cols-2 gap-2 font-mono text-xs">
              {(["START", "GROW", "AUTOMATE", "SCALE"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setStage(s);
                    handleGenerate(s, industry, bottleneck, teamSize);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    stage === s
                      ? "bg-black dark:bg-cyan-500 text-white dark:text-black font-bold shadow-xs border-black dark:border-cyan-500"
                      : "bg-white dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-700 hover:text-neutral-900 dark:hover:text-white"
                  }`}
                >
                  <div className="font-bold">{s}</div>
                  <div
                    className={`text-[10px] mt-0.5 truncate ${stage === s ? "text-neutral-300" : "text-neutral-500"}`}
                  >
                    {stageData[s].label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Industry */}
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-300 font-semibold">
              2. Your Primary Industry / Sector
            </label>
            <select
              value={industry}
              onChange={(e) => {
                const newIndustry = e.target.value;
                setIndustry(newIndustry);
                handleGenerate(stage, newIndustry, bottleneck, teamSize);
              }}
              className="w-full bg-white dark:bg-neutral-900/50 border border-neutral-300 dark:border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-900 font-mono cursor-pointer"
            >
              <option value="B2B Services & Consulting">
                B2B Services &amp; Consulting
              </option>
              <option value="E-Commerce & DTC Brands">
                E-Commerce &amp; DTC Brands
              </option>
              <option value="SaaS & Technology Startups">
                SaaS &amp; Technology Startups
              </option>
              <option value="Healthcare & Life Sciences">
                Healthcare &amp; Life Sciences
              </option>
              <option value="Logistics & Manufacturing">
                Logistics &amp; Manufacturing
              </option>
              <option value="Agencies & Creative Studios">
                Agencies &amp; Creative Studios
              </option>
            </select>
          </div>

          {/* Step 3: Primary Bottleneck */}
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-300 font-semibold">
              3. Biggest Operational or Growth Bottleneck
            </label>
            <div className="space-y-2 text-xs">
              {[
                {
                  id: "web",
                  label:
                    "Our website doesn’t convert visitors or looks outdated",
                },
                {
                  id: "leads",
                  label: "Need a predictable stream of qualified inbound leads",
                },
                {
                  id: "busywork",
                  label: "Team spends hours on repetitive manual data entry",
                },
                {
                  id: "data",
                  label:
                    "Flying blind — data scattered across multiple disconnected tools",
                },
                {
                  id: "ai",
                  label:
                    "Want to leverage AI practically, but don’t know where to start",
                },
              ].map((b) => (
                <div
                  key={b.id}
                  onClick={() => {
                    setBottleneck(b.id);
                    handleGenerate(stage, industry, b.id, teamSize);
                  }}
                  className={`flex items-center gap-3 p-2.5 rounded-xl border cursor-pointer transition-all ${
                    bottleneck === b.id
                      ? "bg-black dark:bg-cyan-500 text-white dark:text-black font-bold shadow-xs border-black dark:border-cyan-500"
                      : "bg-white dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-700 hover:text-neutral-900 dark:hover:text-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="bottleneck"
                    checked={bottleneck === b.id}
                    readOnly
                    className="accent-black pointer-events-none"
                  />
                  <span>{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Instant Blueprint Output */}
        <div className="lg:col-span-6 p-6 lg:p-8 bg-white dark:bg-neutral-900/50 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
              <span className="text-xs font-mono text-neutral-900 dark:text-white font-bold uppercase tracking-wider flex items-center gap-1.5">
                <BarChart2 className="w-4 h-4 text-neutral-900 dark:text-white" />
                <span>RECOMMENDED GROWTH BLUEPRINT</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    handleGenerate(stage, industry, bottleneck, teamSize)
                  }
                  disabled={calculating}
                  className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-800 text-[11px] font-mono flex items-center gap-1 transition-all cursor-pointer"
                  title="Recalculate Blueprint"
                >
                  <RefreshCw
                    className={`w-3 h-3 ${calculating ? "animate-spin" : ""}`}
                  />
                  <span>Sync</span>
                </button>
                <span className="text-xs font-mono text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded border border-neutral-300 dark:border-neutral-800 font-bold">
                  Stage: {stage}
                </span>
              </div>
            </div>

            {calculating ? (
              <div className="py-16 text-center space-y-3 font-mono text-xs text-neutral-500 dark:text-neutral-400">
                <RefreshCw className="w-6 h-6 animate-spin mx-auto text-neutral-900 dark:text-white" />
                <p>Synthesizing multi-variable growth model...</p>
              </div>
            ) : (
              <div className="space-y-5">
                <div>
                  <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase">
                    Core Strategic Focus
                  </div>
                  <h4 className="text-base font-bold text-neutral-900 dark:text-white mt-0.5">
                    {current.focus}
                  </h4>
                  <p className="text-xs text-neutral-700 dark:text-neutral-300 mt-1 leading-relaxed">
                    {current.keyAction}
                  </p>
                </div>

                {/* Key Metrics Strip */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 space-y-1">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-600 dark:text-neutral-300">
                      <Zap className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                      <span>Projected ROI Velocity</span>
                    </div>
                    <div className="text-sm font-bold text-neutral-900 dark:text-white font-mono">
                      {current.projectedRoi}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 space-y-1">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-600 dark:text-neutral-300">
                      <Clock className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                      <span>Estimated Time Saved</span>
                    </div>
                    <div className="text-sm font-bold text-neutral-900 dark:text-white font-mono">
                      {current.hoursSaved}
                    </div>
                  </div>
                </div>

                {/* Recommended Services to Deploy */}
                <div className="space-y-2 pt-2 border-t border-neutral-200 dark:border-neutral-800">
                  <div className="text-[11px] font-mono text-neutral-600 dark:text-neutral-300 uppercase font-semibold">
                    Recommended 3-Pillar Growth Stack:
                  </div>
                  <div className="space-y-2">
                    {current.recommended.map((rec, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2.5 p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white"
                      >
                        <CheckCircle2 className="w-4 h-4 text-neutral-900 dark:text-white shrink-0" />
                        <span className="font-semibold text-neutral-900 dark:text-white">
                          {rec}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-3">
            {savedSuccess && (
              <div className="p-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white text-xs font-mono flex items-center justify-between animate-fade-in">
                <span className="flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                  <span>Blueprint generated &amp; logged</span>
                </span>
                <span className="text-[10px] text-neutral-500 dark:text-neutral-400">
                  {user
                    ? `Linked to ${user.name}`
                    : "Ready for discovery session"}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between text-xs font-mono text-neutral-600 dark:text-neutral-300">
              <span>Implementation Horizon:</span>
              <span className="text-neutral-900 dark:text-white font-bold">
                {current.timeline}
              </span>
            </div>

            <button
              onClick={onScheduleCall}
              className="w-full py-3.5 rounded-xl bg-neutral-900 dark:bg-white hover:bg-neutral-800 text-white dark:text-neutral-900 font-semibold text-xs tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Get Your Free 30-Minute Growth Strategy Blueprint</span>
              <ArrowRight className="w-4 h-4 text-white dark:text-neutral-900" />
            </button>
            <p className="text-[11px] text-center text-neutral-500 dark:text-neutral-400 font-mono">
              Includes comprehensive technical audit + competitive analysis.
              Zero sales pressure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
