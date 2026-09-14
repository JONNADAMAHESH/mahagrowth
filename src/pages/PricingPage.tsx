import React, { useState } from "react";
import { REVENUE_MODELS } from "../data/companyData";
import { PageId } from "../types";
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Layers,
  Zap,
} from "lucide-react";

interface PricingPageProps {
  onNavigate: (page: PageId) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate }) => {
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "sprint" | "retainer" | "advisory"
  >("all");

  const filteredModels = REVENUE_MODELS.filter((m) => {
    if (selectedFilter === "sprint")
      return m.type.toLowerCase().includes("milestone");
    if (selectedFilter === "retainer")
      return m.type.toLowerCase().includes("retainer");
    if (selectedFilter === "advisory")
      return (
        m.type.toLowerCase().includes("transformation") ||
        m.type.toLowerCase().includes("infrastructure")
      );
    return true;
  });

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 text-neutral-900 dark:text-white">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-800 text-xs font-mono font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>COLLABORATION ARCHITECTURE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          Flexible Engagement &amp; Delivery Models
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
          Rather than rigid commoditized packages, our partnerships are
          engineered around verified outcomes, rapid sprint velocity, and
          continuous compound growth.
        </p>

        {/* Filter Pills */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
          {[
            { id: "all", label: "All Frameworks" },
            { id: "sprint", label: "Targeted Sprints" },
            { id: "retainer", label: "Dedicated Squads" },
            { id: "advisory", label: "Advisory & Systems" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id as any)}
              className={`px-4 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                selectedFilter === f.id
                  ? "bg-black dark:bg-cyan-500 text-white dark:text-black font-bold shadow-xs"
                  : "bg-neutral-100 dark:bg-neutral-800/50 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModels.map((model, idx) => (
          <div
            key={idx}
            className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all relative ${
              model.popular
                ? "bg-white dark:bg-neutral-900 border-2 border-neutral-900 dark:border-cyan-400 shadow-lg"
                : "bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 shadow-sm"
            }`}
          >
            {model.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-neutral-900 dark:bg-cyan-500 text-white dark:text-neutral-950 text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm">
                Recommended for Rapid Scaling
              </div>
            )}

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                  <span className="text-neutral-900 dark:text-white uppercase font-bold">
                    {model.type}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 text-[10px]">
                    {model.cadence}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mt-1 text-neutral-900 dark:text-white">
                  {model.stream}
                </h3>
                <div className="mt-2 text-xs font-mono text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 rounded-lg px-2.5 py-1 inline-block">
                  Scope: {model.deliveryScope}
                </div>
              </div>

              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {model.description}
              </p>

              <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 text-[11px] text-neutral-600 dark:text-neutral-300">
                <span className="text-neutral-900 dark:text-white font-semibold font-mono">
                  Best For:
                </span>{" "}
                {model.idealFor}
              </div>

              {/* Feature Checklist */}
              <div className="space-y-2 pt-2 border-t border-neutral-200 dark:border-neutral-800">
                <div className="text-[11px] font-mono uppercase text-neutral-500 dark:text-neutral-400 font-semibold">
                  Core Deliverables &amp; Specs:
                </div>
                <div className="space-y-2">
                  {model.features.map((feat, fIdx) => (
                    <div
                      key={fIdx}
                      className="flex items-start gap-2 text-xs text-neutral-700 dark:text-neutral-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-neutral-900 dark:text-white shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <button
                onClick={() => onNavigate("contact")}
                className={`w-full py-3 rounded-xl font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  model.popular
                    ? "bg-neutral-900 dark:bg-cyan-500 hover:bg-neutral-800 dark:hover:bg-cyan-400 text-white dark:text-neutral-950 font-bold shadow-xs"
                    : "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-900 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white hover:text-white dark:hover:text-white border border-neutral-300 dark:border-neutral-700"
                }`}
              >
                <span>Request Scope for {model.stream}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Engagement Guarantees */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 flex items-center justify-center text-neutral-900 dark:text-white">
            <Zap className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-neutral-900 dark:text-white">
            100% IP &amp; Code Ownership
          </h4>
          <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
            All codebases, fine-tuned agent prompts, design assets, and workflow
            blueprints remain your exclusive intellectual property from day one.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 flex items-center justify-center text-neutral-900 dark:text-white">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-neutral-900 dark:text-white">
            Single-Point Accountability
          </h4>
          <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
            No fragmented agencies pointing fingers. A senior growth architect
            coordinates your engineering, marketing, and AI squads with unified
            KPIs.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 flex items-center justify-center text-neutral-900 dark:text-white">
            <Layers className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-neutral-900 dark:text-white">
            Transparent Sprint Cadence
          </h4>
          <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
            Live sprint boards, bi-weekly video debriefs, dedicated Slack
            integration, and real-time executive dashboard telemetry.
          </p>
        </div>
      </div>

      {/* Bottom Diagnostic Banner */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-sm">
        <div className="space-y-2 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-neutral-900 dark:text-white font-bold uppercase">
            <ShieldCheck className="w-4 h-4 text-neutral-900 dark:text-white" />
            <span>Strategic Alignment First</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
            Need Guidance on Scope and Milestone Timing?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
            Schedule a 30-minute Growth Diagnostic. We analyze your digital
            architecture, sales pipelines, and workflow friction, then recommend
            the exact engagement structure.
          </p>
        </div>

        <button
          onClick={() => onNavigate("contact")}
          className="relative z-10 px-6 py-3.5 rounded-xl bg-neutral-900 dark:bg-white hover:bg-neutral-800 text-white dark:text-neutral-900 font-mono text-xs font-bold shrink-0 shadow-sm flex items-center gap-2 cursor-pointer transition-all"
        >
          <span>Schedule Strategy Consultation</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
