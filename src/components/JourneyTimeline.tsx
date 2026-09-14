import React, { useState } from "react";
import { JOURNEY_STAGES, FIVE_YEAR_ROADMAP } from "../data/companyData";
import { CheckCircle2, Flag } from "lucide-react";

export const JourneyTimeline: React.FC = () => {
  const [viewMode, setViewMode] = useState<"client" | "company">("client");
  const [selectedClientStage, setSelectedClientStage] =
    useState<string>("START");
  const [selectedRoadmapYear, setSelectedRoadmapYear] =
    useState<string>("Year 1");

  const activeStage =
    JOURNEY_STAGES.find((s) => s.id === selectedClientStage) ||
    JOURNEY_STAGES[0];
  const activeYear =
    FIVE_YEAR_ROADMAP.find((y) => y.year === selectedRoadmapYear) ||
    FIVE_YEAR_ROADMAP[0];

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-lg space-y-6 text-neutral-900 dark:text-white">
      {/* Mode Switcher */}
      <div className="p-5 bg-neutral-50 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-semibold">
            GROWTH EVOLUTION ARCHITECTURE
          </span>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white mt-0.5">
            {viewMode === "client"
              ? "Client Journey: START → GROW → AUTOMATE → SCALE"
              : "Company Vision: The 5-Year Service to SaaS Platform Model"}
          </h3>
        </div>

        <div className="flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl border border-neutral-300 dark:border-neutral-800 font-mono text-xs">
          <button
            onClick={() => setViewMode("client")}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              viewMode === "client"
                ? "bg-neutral-900 dark:bg-cyan-500 dark:bg-white text-white dark:text-neutral-900 font-semibold shadow-xs"
                : "text-neutral-600 hover:text-neutral-900 dark:hover:text-white dark:hover:text-neutral-900 dark:text-white dark:text-neutral-900 dark:text-white dark:text-neutral-900"
            }`}
          >
            Client Growth Journey
          </button>
          <button
            onClick={() => setViewMode("company")}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              viewMode === "company"
                ? "bg-neutral-900 dark:bg-cyan-500 dark:bg-white text-white dark:text-neutral-900 font-semibold shadow-xs"
                : "text-neutral-600 hover:text-neutral-900 dark:hover:text-white dark:hover:text-neutral-900 dark:text-white dark:text-neutral-900 dark:text-white dark:text-neutral-900"
            }`}
          >
            5-Year Platform Roadmap
          </button>
        </div>
      </div>

      {/* VIEW 1: CLIENT JOURNEY (START -> GROW -> AUTOMATE -> SCALE) */}
      {viewMode === "client" ? (
        <div className="p-6 lg:p-8 space-y-8">
          {/* Step Badges Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {JOURNEY_STAGES.map((st) => {
              const isSelected = selectedClientStage === st.id;
              return (
                <button
                  key={st.id}
                  onClick={() => setSelectedClientStage(st.id)}
                  className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden ${
                    isSelected
                      ? "bg-neutral-900 dark:bg-cyan-500 text-white dark:text-black border-neutral-900 dark:border-cyan-500 shadow-md"
                      : "bg-neutral-50 border-neutral-200 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 hover:text-neutral-900 dark:hover:text-white dark:bg-neutral-800"
                  }`}
                >
                  <div
                    className={`text-xs font-mono font-bold mb-1 ${isSelected ? "text-neutral-300" : "text-neutral-500"}`}
                  >
                    STAGE {st.step}
                  </div>
                  <div className="text-lg font-extrabold">{st.title}</div>
                  <div
                    className={`text-xs mt-0.5 truncate ${isSelected ? "text-neutral-300" : "text-neutral-500"}`}
                  >
                    {st.tagline}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Stage Deep Dive */}
          <div className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-neutral-600 dark:text-neutral-300 uppercase font-semibold">
                <span className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-cyan-500" />
                <span>
                  Stage {activeStage.step}: {activeStage.tagline}
                </span>
              </div>
              <h4 className="text-2xl font-bold text-neutral-900 dark:text-white">
                {activeStage.title}
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {activeStage.description}
              </p>

              <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 space-y-1">
                <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold">
                  Stage Objective:
                </div>
                <div className="text-xs text-neutral-800 dark:text-neutral-300">
                  {activeStage.focus}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-300 dark:border-neutral-800 space-y-4 shadow-xs">
              <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase border-b border-neutral-200 dark:border-neutral-800 pb-2">
                Core Deliverables in this Stage:
              </div>
              <div className="space-y-2.5">
                {activeStage.deliverables.map((d, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 text-xs text-neutral-800 dark:text-neutral-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-neutral-900 dark:text-white shrink-0 mt-0.5" />
                    <span className="font-medium">{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* VIEW 2: 5-YEAR COMPANY ROADMAP */
        <div className="p-6 lg:p-8 space-y-8">
          <div className="max-w-3xl space-y-2">
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              &ldquo;Start by helping businesses with services &rarr; learn
              their real problems &rarr; build repeatable solutions &rarr; turn
              those solutions into AI products &rarr; eventually create a
              complete business-growth platform.&rdquo;
            </p>
          </div>

          {/* Timeline Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {FIVE_YEAR_ROADMAP.map((yr) => {
              const isSelected = selectedRoadmapYear === yr.year;
              return (
                <button
                  key={yr.year}
                  onClick={() => setSelectedRoadmapYear(yr.year)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    isSelected
                      ? "bg-neutral-900 dark:bg-cyan-500 text-white dark:text-black border-neutral-900 dark:border-cyan-500 shadow-md"
                      : "bg-neutral-50 border-neutral-200 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 hover:text-neutral-900 dark:hover:text-white dark:bg-neutral-800"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span
                      className={`font-bold ${isSelected ? "text-white dark:text-neutral-900" : "text-neutral-600 dark:text-neutral-300"}`}
                    >
                      {yr.year}
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded ${
                        yr.status === "Active"
                          ? isSelected
                            ? "bg-neutral-800 text-white dark:text-neutral-900"
                            : "bg-neutral-900 dark:bg-cyan-500 dark:bg-white text-white dark:text-neutral-900"
                          : isSelected
                            ? "bg-neutral-800 text-neutral-300"
                            : "bg-neutral-200 text-neutral-700"
                      }`}
                    >
                      {yr.status}
                    </span>
                  </div>
                  <div className="text-base font-extrabold">{yr.phase}</div>
                  <div
                    className={`text-[11px] truncate mt-0.5 ${isSelected ? "text-neutral-300" : "text-neutral-500"}`}
                  >
                    {yr.headline}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Roadmap Deep Dive */}
          <div className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold">
                {activeYear.year} Strategy: {activeYear.phase}
              </div>
              <h4 className="text-2xl font-bold text-neutral-900 dark:text-white">
                {activeYear.headline}
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {activeYear.description}
              </p>
            </div>

            <div className="lg:col-span-5 bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-300 dark:border-neutral-800 space-y-3 shadow-xs">
              <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase border-b border-neutral-200 dark:border-neutral-800 pb-2">
                Execution Milestones:
              </div>
              <div className="space-y-2">
                {activeYear.milestones.map((m, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 text-xs text-neutral-800 dark:text-neutral-300"
                  >
                    <Flag className="w-3.5 h-3.5 text-neutral-900 dark:text-white shrink-0 mt-0.5" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
