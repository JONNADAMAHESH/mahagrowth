import React, { useState } from "react";
import { GROWTH_ECOSYSTEM } from "../data/companyData";
import { PageId } from "../types";
import {
  Network,
  Zap,
  Activity,
  ArrowRight,
  CheckCircle2,
  Bot,
  TrendingUp,
  Workflow,
  BarChart3,
  ShieldCheck,
  Sparkles,
  Layers,
  Sliders,
} from "lucide-react";

interface GrowthEcosystemProps {
  onNavigate: (page: PageId, anchorId?: string) => void;
  onOpenAiAssistant?: () => void;
}

export const GrowthEcosystem: React.FC<GrowthEcosystemProps> = ({
  onNavigate,
}) => {
  const [activeLayerId, setActiveLayerId] = useState<string>("acquisition");
  const [activeArchetypeId, setActiveArchetypeId] = useState<string>("b2b");
  const [viewMode, setViewMode] = useState<"architecture" | "simulator">(
    "architecture",
  );

  const activeLayer =
    GROWTH_ECOSYSTEM.layers.find((l) => l.id === activeLayerId) ||
    GROWTH_ECOSYSTEM.layers[0];
  const activeArchetype =
    GROWTH_ECOSYSTEM.ecosystemArchetypes.find(
      (a) => a.id === activeArchetypeId,
    ) || GROWTH_ECOSYSTEM.ecosystemArchetypes[0];

  const getLayerIcon = (id: string) => {
    switch (id) {
      case "acquisition":
        return TrendingUp;
      case "agents":
        return Bot;
      case "workflows":
        return Workflow;
      case "intelligence":
        return BarChart3;
      case "strategy":
        return Zap;
      default:
        return Sparkles;
    }
  };

  return (
    <section
      id="ecosystem"
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        {/* Header Block */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white text-xs font-mono font-semibold tracking-wider uppercase shadow-2xs">
            <Network className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
            <span>THE MAHA GROWTH AUTONOMOUS FLYWHEEL</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-[1.12]">
            Building An Ecosystem That Works For You &amp; Helps Grow Your
            Business
          </h2>

          <p className="text-base sm:text-xl text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed">
            {GROWTH_ECOSYSTEM.subtitle}
          </p>

          {/* Mode Switcher */}
          <div className="flex items-center justify-center pt-2">
            <div className="inline-flex p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 shadow-2xs">
              <button
                onClick={() => setViewMode("architecture")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  viewMode === "architecture"
                    ? "bg-neutral-900 dark:bg-white dark:bg-white text-white dark:text-neutral-900 font-bold shadow-xs"
                    : "text-neutral-600 hover:text-neutral-900 dark:hover:text-white dark:hover:text-neutral-900 dark:text-white dark:text-neutral-900 dark:text-white dark:text-neutral-900"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>5-Layer Autonomous Stack</span>
              </button>
              <button
                onClick={() => setViewMode("simulator")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  viewMode === "simulator"
                    ? "bg-neutral-900 dark:bg-white dark:bg-white text-white dark:text-neutral-900 font-bold shadow-xs"
                    : "text-neutral-600 hover:text-neutral-900 dark:hover:text-white dark:hover:text-neutral-900 dark:text-white dark:text-neutral-900 dark:text-white dark:text-neutral-900"
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Industry ROI Simulator</span>
              </button>
            </div>
          </div>
        </div>

        {/* View Mode 1: 5-Layer Autonomous Architecture */}
        {viewMode === "architecture" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Interactive Layer Tabs */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between px-2 pb-1 text-xs font-mono text-cyan-600/70 uppercase tracking-wider">
                <span>Ecosystem Autonomous Layers</span>
                <span className="text-neutral-900 dark:text-white font-semibold">
                  Click to Inspect
                </span>
              </div>

              {GROWTH_ECOSYSTEM.layers.map((layer, idx) => {
                const Icon = getLayerIcon(layer.id);
                const isSelected = layer.id === activeLayerId;
                return (
                  <button
                    key={layer.id}
                    onClick={() => setActiveLayerId(layer.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 relative overflow-hidden group cursor-pointer ${
                      isSelected
                        ? "bg-white dark:bg-neutral-900 border-2 border-neutral-900 dark:border-cyan-500 shadow-md"
                        : "bg-neutral-50 dark:bg-neutral-900/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700"
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-neutral-900 dark:bg-white" />
                    )}

                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3.5">
                        <div
                          className={`p-2.5 rounded-xl border shrink-0 transition-colors ${
                            isSelected
                              ? "bg-black dark:bg-cyan-500 border-black dark:border-cyan-500 text-white dark:text-black"
                              : "bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white group-hover:border-neutral-900 dark:group-hover:border-cyan-400"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-neutral-900 dark:text-white font-bold">
                              0{idx + 1}
                            </span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-800 text-neutral-800 dark:text-neutral-300 font-mono">
                              {layer.badge}
                            </span>
                          </div>
                          <h3 className="text-sm font-bold text-neutral-900 dark:text-white transition-colors">
                            {layer.title}
                          </h3>
                          <p className="text-xs text-cyan-600/70 line-clamp-1">
                            {layer.tagline}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-mono font-bold text-neutral-900 dark:text-white block">
                          {layer.metrics.value}
                        </span>
                        <span className="text-[10px] text-cyan-600/70 block">
                          {layer.metrics.label}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Deep Layer Inspection Display */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
                {/* Sub-header */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white text-xs font-mono font-semibold">
                        LAYER SPECIFICATION
                      </span>
                      <span className="text-xs font-mono text-cyan-600/70">
                        Status: 24/7 Live Operational
                      </span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-neutral-900 dark:text-white">
                      {activeLayer.title}
                    </h3>
                  </div>

                  {/* Impact Metric Box */}
                  <div className="px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 text-right">
                    <div className="text-2xl font-extrabold text-neutral-900 dark:text-white font-mono">
                      {activeLayer.metrics.value}
                    </div>
                    <div className="text-[11px] text-cyan-600/70 font-medium">
                      {activeLayer.metrics.label} ({activeLayer.metrics.sub})
                    </div>
                  </div>
                </div>

                {/* Core Description */}
                <p className="text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed">
                  {activeLayer.description}
                </p>

                {/* The "How It Works For You" Highlight Box */}
                <div className="rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 p-4 sm:p-5 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
                    <Zap className="w-4 h-4 text-neutral-900 dark:text-white" />
                    <span>How This Layer Works For You 24/7</span>
                  </div>
                  <p className="text-sm text-neutral-800 dark:text-neutral-300 font-medium leading-relaxed">
                    {activeLayer.worksForYou}
                  </p>
                </div>

                {/* Automated Capabilities Grid */}
                <div className="space-y-3">
                  <div className="text-xs font-mono text-neutral-600 dark:text-neutral-300 uppercase tracking-wider font-semibold">
                    Autonomous Capabilities Included
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeLayer.capabilities.map((cap, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-800 dark:text-neutral-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-neutral-900 dark:text-white shrink-0 mt-0.5" />
                        <span className="leading-snug">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Activity Telemetry Log */}
                <div className="rounded-xl bg-neutral-950 border border-cyan-900/30 p-4 space-y-2 font-mono text-xs text-cyan-400 shadow-inner">
                  <div className="flex items-center justify-between text-[11px] text-neutral-400 border-b border-neutral-800 pb-2">
                    <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                      <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                      <span>LIVE ECOSYSTEM EVENT STREAM</span>
                    </div>
                    <span className="text-[10px] text-cyan-500 font-mono">
                      CONNECTED
                    </span>
                  </div>

                  <div className="space-y-1 text-cyan-300 text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-600/70">[00:14:22]</span>
                      <span className="text-cyan-500 font-semibold">
                        INGEST:
                      </span>
                      <span>
                        Visitor traffic channeled via programmatic SEO page
                        /growth-stack
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-600/70">[01:42:08]</span>
                      <span className="text-cyan-500 font-semibold">
                        AUTO-AGENT:
                      </span>
                      <span>
                        Concierge identified Enterprise prospect ($40k MRR);
                        booked diagnostic call
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-600/70">[03:11:50]</span>
                      <span className="text-cyan-500 font-semibold">
                        PIPELINE:
                      </span>
                      <span>
                        CRM deal stage auto-synced; tailored dossier dispatched
                        to executive calendar
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action CTA */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    onClick={() => onNavigate("diagnostic")}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-500 text-black hover:bg-cyan-400 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>Deploy This Layer In Your Business</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => onNavigate("services")}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-transparent hover:bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 hover:text-cyan-300 text-xs font-mono flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
                  >
                    <span>View All 8 Stack Services</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View Mode 2: Industry ROI Simulator */}
        {viewMode === "simulator" && (
          <div className="rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 p-6 sm:p-10 space-y-8 shadow-xl">
            <div className="max-w-3xl space-y-2">
              <span className="text-xs font-mono text-cyan-600/70 uppercase tracking-wider font-semibold">
                MODEL-SPECIFIC ECOSYSTEM SIMULATOR
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white">
                How The Ecosystem Accelerates Your Specific Business Model
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                Select your industry archetype to discover the exact automated
                workflows, recovered hours, and velocity compounding achieved
                with Maha Growth.
              </p>
            </div>

            {/* Archetype Selector Tabs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {GROWTH_ECOSYSTEM.ecosystemArchetypes.map((archetype) => {
                const isSelected = archetype.id === activeArchetypeId;
                return (
                  <button
                    key={archetype.id}
                    onClick={() => setActiveArchetypeId(archetype.id)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "bg-neutral-900 dark:bg-white dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white dark:border-neutral-900 dark:border-white dark:border-neutral-900 shadow-xs"
                        : "bg-neutral-50 border-neutral-200 text-neutral-700 hover:text-neutral-900 dark:hover:text-white dark:hover:text-neutral-900 dark:text-white dark:text-neutral-900 dark:text-white dark:text-neutral-900 hover:border-neutral-900 dark:border-white dark:border-neutral-900 dark:border-white dark:border-neutral-900"
                    }`}
                  >
                    <span className="text-xs font-mono font-bold block mb-1">
                      {archetype.name}
                    </span>
                    <span
                      className={`text-[11px] block line-clamp-1 ${isSelected ? "text-neutral-300" : "text-neutral-500"}`}
                    >
                      {archetype.focus}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Simulation Card */}
            <div className="rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-neutral-200 dark:border-neutral-800 pb-6">
                <div className="space-y-1">
                  <div className="text-xs font-mono text-cyan-600/70">
                    Weekly Hours Recovered
                  </div>
                  <div className="text-3xl font-extrabold text-neutral-900 dark:text-white font-mono">
                    {activeArchetype.hoursSaved}
                  </div>
                  <div className="text-[11px] text-cyan-600/70">
                    Manual administrative waste removed
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-mono text-cyan-600/70">
                    Lead Conversion Lift
                  </div>
                  <div className="text-3xl font-extrabold text-neutral-900 dark:text-white font-mono">
                    {activeArchetype.leadLift}
                  </div>
                  <div className="text-[11px] text-cyan-600/70">
                    From AI-powered capture &amp; nurturing
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-mono text-cyan-600/70">
                    Average ROI Payoff
                  </div>
                  <div className="text-3xl font-extrabold text-neutral-900 dark:text-white font-mono">
                    {activeArchetype.roiTimeframe}
                  </div>
                  <div className="text-[11px] text-cyan-600/70">
                    To full ecosystem implementation payoff
                  </div>
                </div>
              </div>

              {/* Primary Automation Pipeline */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-900 dark:text-white font-bold uppercase tracking-wider">
                  <Workflow className="w-4 h-4 text-neutral-900 dark:text-white" />
                  <span>Your Autonomous Growth Pipeline</span>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 font-mono text-xs text-neutral-900 dark:text-white leading-relaxed shadow-2xs">
                  {activeArchetype.keyAutomation}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="text-xs font-mono text-neutral-600 dark:text-neutral-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-neutral-900 dark:text-white" />
                  <span>
                    100% Client Code &amp; Data Ownership &bull; Zero Vendor
                    Lock-in
                  </span>
                </div>

                <button
                  onClick={() => onNavigate("diagnostic")}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-neutral-900 dark:bg-white hover:bg-neutral-800 text-white dark:text-neutral-900 font-bold text-xs font-mono transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Simulate Your Growth Blueprint</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Banner: Before vs With Maha Growth Ecosystem */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="rounded-2xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 p-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-neutral-600 dark:text-neutral-300 uppercase tracking-wider">
              <span>WITHOUT AN INTEGRATED ECOSYSTEM</span>
            </div>
            <ul className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300">
              <li className="flex items-start gap-2">
                <span className="text-neutral-900 dark:text-white font-bold mt-0.5">
                  &times;
                </span>
                <span>
                  5 separate contractors and agencies blaming each other for
                  missed revenue
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-900 dark:text-white font-bold mt-0.5">
                  &times;
                </span>
                <span>
                  20+ hours lost per week copying data across disconnected
                  software tools
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-900 dark:text-white font-bold mt-0.5">
                  &times;
                </span>
                <span>
                  Off-hours leads sit unanswered for 48 hours and go directly to
                  competitors
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-900 dark:text-white font-bold mt-0.5">
                  &times;
                </span>
                <span>
                  Zero predictability on customer acquisition cost or lifetime
                  value
                </span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-neutral-50 dark:bg-neutral-800 border-2 border-neutral-900 dark:border-white p-6 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
              <span>WITH THE MAHA GROWTH ECOSYSTEM</span>
            </div>
            <ul className="space-y-2 text-xs text-neutral-800 dark:text-neutral-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-neutral-900 dark:text-white mt-0.5 shrink-0" />
                <span>
                  One integrated strategic partner accountable for end-to-end
                  business growth
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-neutral-900 dark:text-white mt-0.5 shrink-0" />
                <span>
                  Autonomous operations recover 22+ hours every week for founder
                  &amp; leadership
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-neutral-900 dark:text-white mt-0.5 shrink-0" />
                <span>
                  AI conversational concierges greet, diagnose, and book
                  prospects within 3 seconds 24/7
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-neutral-900 dark:text-white mt-0.5 shrink-0" />
                <span>
                  Live executive telemetry dashboard with 100% transparent
                  pipeline visibility
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
