import React, { useState } from "react";
import { CASE_STUDIES } from "../data/companyData";
import { PageId } from "../types";
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Cpu,
  Terminal,
  Clock,
} from "lucide-react";

interface CaseStudiesPageProps {
  onNavigate: (page: PageId) => void;
}

export const CaseStudiesPage: React.FC<CaseStudiesPageProps> = ({
  onNavigate,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredStudies = CASE_STUDIES.filter((cs) => {
    if (activeFilter === "all") return true;
    return cs.id === activeFilter;
  });

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 text-neutral-900 dark:text-white">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-800 text-xs font-mono font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>VERIFIED SYSTEMS &amp; BENCHMARKS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          Engineering Architecture &amp; Growth Case Studies
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
          Detailed technical breakdowns of deployed web platforms, fine-tuned
          agent swarms, and autonomous workflow pipelines delivering measurable
          commercial ROI.
        </p>

        {/* Filter buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-4 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
              activeFilter === "all"
                ? "bg-black dark:bg-cyan-500 text-white dark:text-black font-bold shadow-xs"
                : "bg-neutral-100 dark:bg-neutral-800/50 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700"
            }`}
          >
            All Case Studies
          </button>
          {CASE_STUDIES.map((cs) => (
            <button
              key={cs.id}
              onClick={() => setActiveFilter(cs.id)}
              className={`px-4 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                activeFilter === cs.id
                  ? "bg-black dark:bg-cyan-500 text-white dark:text-black font-bold shadow-xs"
                  : "bg-neutral-100 dark:bg-neutral-800/50 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700"
              }`}
            >
              {cs.client}
            </button>
          ))}
        </div>
      </div>

      {/* Case Studies Grid */}
      <div className="space-y-10">
        {filteredStudies.map((cs) => (
          <div
            key={cs.id}
            className="bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-900 transition-all rounded-3xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative overflow-hidden shadow-sm"
          >
            {/* Left: Background, Problem, Solution, Architecture */}
            <div className="lg:col-span-7 space-y-6 relative z-10">
              <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
                <span className="px-3 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white font-semibold">
                  {cs.industry}
                </span>
                <span className="text-neutral-400">•</span>
                <span className="px-2.5 py-0.5 rounded-md bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300">
                  Growth Stage: {cs.stage}
                </span>
                <span className="text-neutral-400">•</span>
                <span className="px-2.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white flex items-center gap-1.5 font-medium">
                  <Clock className="w-3 h-3" />
                  <span>{cs.timeline}</span>
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                  {cs.client}
                </h3>
                <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400 mt-1">
                  Full-Stack Architecture &amp; Autonomous Pipeline
                  Transformation
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 space-y-2">
                  <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300 font-mono font-bold uppercase text-[11px]">
                    <div className="w-2 h-2 rounded-full bg-neutral-600" />
                    <span>Operational Drag</span>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {cs.problem}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 space-y-2">
                  <div className="flex items-center gap-2 text-neutral-900 dark:text-white font-mono font-bold uppercase text-[11px]">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Engineered Solution</span>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {cs.solution}
                  </p>
                </div>
              </div>

              {/* Deployed Architecture Stack */}
              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-600 dark:text-neutral-300 uppercase">
                  <Terminal className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    Deployed Production Architecture:
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {cs.architecture.map((arch, aIdx) => (
                    <div
                      key={aIdx}
                      className="p-2 rounded-lg bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 text-[11px] font-mono text-neutral-800 dark:text-neutral-300 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3 h-3 text-neutral-900 dark:text-white shrink-0" />
                      <span className="truncate">{arch}</span>
                    </div>
                  ))}
                </div>

                {/* Tech stack badges */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-neutral-200 dark:border-neutral-800">
                  <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 uppercase mr-1">
                    Stack:
                  </span>
                  {cs.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded bg-white dark:bg-neutral-900/50 text-[10px] font-mono text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Quantified Metrics Cards */}
            <div className="lg:col-span-5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6 relative z-10 shadow-xs">
              <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
                <div className="text-xs font-mono text-neutral-900 dark:text-white uppercase font-bold flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Audited Performance Metrics</span>
                </div>
                <span className="text-[10px] font-mono text-neutral-900 dark:text-white bg-neutral-200 dark:bg-neutral-700 px-2 py-0.5 rounded border border-neutral-300 dark:border-neutral-800 font-semibold">
                  Verified
                </span>
              </div>

              <div className="space-y-3.5">
                {cs.metrics.map((m, mIdx) => (
                  <div
                    key={mIdx}
                    className="p-4 rounded-xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between group hover:border-neutral-900 transition-all"
                  >
                    <div>
                      <div className="text-xs text-neutral-600 dark:text-neutral-300">{m.label}</div>
                      <div className="text-[10px] font-mono text-neutral-400">
                        Post-Deployment 90-Day Delta
                      </div>
                    </div>
                    <span className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white font-mono tracking-tight group-hover:scale-105 transition-transform">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate("contact")}
                  className="w-full py-3.5 rounded-xl bg-neutral-900 dark:bg-white hover:bg-neutral-800 text-xs font-mono font-bold text-white dark:text-neutral-900 flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <span>Build Similar Architecture For Your Company</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
