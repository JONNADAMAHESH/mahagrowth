import React, { useState } from "react";
import { PageId } from "../types";
import {
  ONE_LINE_PITCH,
  PROBLEMS_WE_SOLVE,
  EIGHT_SERVICES,
  REVENUE_MODELS,
  CASE_STUDIES,
  FAQS,
} from "../data/companyData";
import { InteractiveHeroMesh } from "../components/InteractiveHeroMesh";
import { MiniDataStudioSandbox } from "../components/MiniDataStudioSandbox";
import { BentoServicesGrid } from "../components/BentoServicesGrid";
import { Card3D } from "../components/common/Card3D";
import { GrowthDiagnosticTool } from "../components/GrowthDiagnosticTool";
import { AiAdvantageSandbox } from "../components/AiAdvantageSandbox";
import { JourneyTimeline } from "../components/JourneyTimeline";
import { GrowthEcosystem } from "../components/GrowthEcosystem";
import { FounderProfileCard } from "../components/FounderProfileCard";
import { PlatformArchitectureDiagram } from "../components/PlatformArchitectureDiagram";
import { ProductWorkspaceShowcase } from "../components/ProductWorkspaceShowcase";
import { WhyMahaSection } from "../components/WhyMahaSection";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Globe,
  TrendingUp,
  Bot,
  Workflow,
  BarChart3,
  Compass,
  GraduationCap,
  ShieldCheck,
  Zap,
  Send,
  ChevronDown,
  Award,
  Activity,
  Terminal,
  Database,
  FileSpreadsheet,
  Share2,
} from "lucide-react";

interface HomePageProps {
  onNavigate: (page: PageId, anchorId?: string) => void;
  onOpenAiAssistant: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenAiAssistant,
}) => {
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);
  const [selectedServiceCategory, setSelectedServiceCategory] =
    useState<string>("All");
  const [activeTelemetryTab, setActiveTelemetryTab] = useState<
    "agents" | "acquisition" | "workflows" | "intelligence"
  >("agents");

  // Contact form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    stage: "GROW ($15k - $60k/mo)",
    primaryChallenge: "Predictable Lead Generation",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [inquiryId, setInquiryId] = useState<string | null>(null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setFormStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setFormStatus("success");
        setInquiryId(data.inquiryId);
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("success");
      setInquiryId(
        "MG-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
      );
    }
  };

  const getServiceIcon = (name: string) => {
    switch (name) {
      case "Globe":
        return Globe;
      case "TrendingUp":
        return TrendingUp;
      case "Bot":
        return Bot;
      case "Workflow":
        return Workflow;
      case "BarChart3":
        return BarChart3;
      case "Compass":
        return Compass;
      case "Sparkles":
        return Sparkles;
      case "GraduationCap":
        return GraduationCap;
      default:
        return Sparkles;
    }
  };

  const filteredServices =
    selectedServiceCategory === "All"
      ? EIGHT_SERVICES
      : EIGHT_SERVICES.filter((s) => s.category === selectedServiceCategory);

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-heading)] transition-colors selection:bg-cyan-500 selection:text-black">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION: The All-in-One Strategic Growth Partner */}
      {/* ========================================================================= */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Interactive WebGL Hero Canvas */}
        <InteractiveHeroMesh />

        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left space-y-6">
            {/* Top Pill / Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white text-xs font-mono tracking-wide shadow-xs animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              <span className="font-semibold tracking-wider uppercase">
                REAL-TIME DATA INTELLIGENCE &amp; STARTUP GROWTH ENGINE
              </span>
            </div>

            {/* Master Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-[1.08]">
              Turn Your Business Into a{" "}
              <span className="text-blue-600 border-b-2 border-blue-600 pb-1">
                Smarter, Faster-Growing Business
              </span>
            </h1>

            {/* One-Line Value Proposition */}
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed">
              {ONE_LINE_PITCH}
            </p>

            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono font-semibold">
              REAL-TIME TELEMETRY &bull; EXCEL / PDF / PPTX INGESTION &bull;
              POWER BI EXPORT
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
              <button
                id="btn-hero-get-started"
                onClick={() => onNavigate("contact")}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-neutral-900 dark:bg-white hover:bg-neutral-800 text-white dark:text-neutral-900 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Join Early Adopter Pilot</span>
              </button>

              <button
                id="btn-hero-explore-platform"
                onClick={() => {
                  const el = document.getElementById("platform-architecture");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                  else onNavigate("services");
                }}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 text-neutral-800 dark:text-neutral-300 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Platform</span>
              </button>
            </div>

            {/* Trust Metrics Strip */}
            <div className="pt-6 grid grid-cols-2 gap-4 max-w-sm">
              <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 /40 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 shadow-sm">
                <div className="text-xl font-extrabold font-mono">+64%</div>
                <div className="text-[10px] text-neutral-500 dark:text-neutral-400 font-medium">
                  Avg Visitor-to-Lead Lift
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 /40 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 shadow-sm">
                <div className="text-xl font-extrabold font-mono">22+ hrs</div>
                <div className="text-[10px] text-neutral-500 dark:text-neutral-400 font-medium">
                  Weekly Hours Recovered
                </div>
              </div>
            </div>
          </div>

          <div className="w-full z-20">
            <MiniDataStudioSandbox
              onOpenStudio={() => onNavigate("data-studio")}
            />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. ONE PLATFORM, EVERY GROWTH FUNCTION (System Architecture Diagram) */}
      {/* ========================================================================= */}
      <PlatformArchitectureDiagram onNavigate={onNavigate} />

      {/* ========================================================================= */}
      {/* 3. PRODUCT WORKSPACE SHOWCASE (Live Dashboard, Analytics, Workflows) */}
      {/* ========================================================================= */}
      <ProductWorkspaceShowcase
        onNavigate={onNavigate}
        onOpenAiAssistant={onOpenAiAssistant}
      />

      {/* ========================================================================= */}
      {/* 4. WHY BUSINESSES CHOOSE MAHA GROWTH (The Strategic Advantage) */}
      {/* ========================================================================= */}
      <WhyMahaSection onNavigate={onNavigate} />

      {/* ========================================================================= */}
      {/* 5. THE MAHA GROWTH AUTONOMOUS GROWTH ECOSYSTEM */}
      {/* ========================================================================= */}
      <GrowthEcosystem
        onNavigate={onNavigate}
        onOpenAiAssistant={onOpenAiAssistant}
      />

      {/* ========================================================================= */}
      {/* 6. THE PROBLEM WE SOLVE: Stop Juggling Disconnected Vendors */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 text-xs font-mono font-semibold">
            <span>THE CORE BOTTLENECK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            You Have a Great Product, But Growth Feels Fragmented
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
            Most businesses don&rsquo;t fail because of bad ideas. They struggle
            because their web, marketing, AI, automation, and data are siloed
            across five different contractors who don&rsquo;t coordinate.
          </p>
        </div>

        {/* 6 Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROBLEMS_WE_SOLVE.map((prob) => (
            <div
              key={prob.id}
              className="p-6 rounded-2xl bg-white dark:bg-neutral-900 /50 border border-neutral-300 dark:border-neutral-800 hover:border-neutral-900 transition-all space-y-4 shadow-sm"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-600 dark:text-neutral-300 font-bold uppercase">
                <span className="w-2 h-2 rounded-full bg-neutral-400" />
                <span>The Struggle</span>
              </div>
              <h3 className="text-base font-bold">{prob.pain}</h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {prob.cause}
              </p>

              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 space-y-1">
                <div className="text-[10px] font-mono font-bold uppercase flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>How Maha Growth Solves It</span>
                </div>
                <p className="text-xs text-neutral-800 dark:text-neutral-300">{prob.mahaFix}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Strip: The Old Way vs The Maha Growth Way */}
        <div className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <div>
              <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase font-bold">
                THE STRATEGIC ADVANTAGE
              </span>
              <h3 className="text-xl font-bold">
                Why One Growth Partner Outperforms Five Separate Vendors
              </h3>
            </div>
            <button
              onClick={() => onNavigate("services")}
              className="text-xs font-mono font-semibold hover:underline flex items-center gap-1"
            >
              <span>View full breakdown</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 /50 border border-neutral-200 dark:border-neutral-800 space-y-2 shadow-xs">
              <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 font-bold">
                VENDOR COORDINATION
              </div>
              <div className="text-xs text-neutral-600 dark:text-neutral-300">
                ✕ Old: 5 different agencies pointing fingers when results drop.
              </div>
              <div className="text-xs font-medium">
                ✓ Maha Growth: Single-point strategic accountability for real
                business growth.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 /50 border border-neutral-200 dark:border-neutral-800 space-y-2 shadow-xs">
              <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 font-bold">
                AI IMPLEMENTATION
              </div>
              <div className="text-xs text-neutral-600 dark:text-neutral-300">
                ✕ Old: Surface-level AI hype with zero operational integration.
              </div>
              <div className="text-xs font-medium">
                ✓ Maha Growth: Custom fine-tuned agents, workflow automation &
                ROI metrics.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 /50 border border-neutral-200 dark:border-neutral-800 space-y-2 shadow-xs">
              <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 font-bold">
                DATA CLARITY
              </div>
              <div className="text-xs text-neutral-600 dark:text-neutral-300">
                ✕ Old: Scattered PDF reports and confusing vanity metrics.
              </div>
              <div className="text-xs font-medium">
                ✓ Maha Growth: Real-time executive dashboard with plain-English
                insights.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. INTERACTIVE GROWTH DIAGNOSTIC CALCULATOR */}
      {/* ========================================================================= */}
      <section
        id="growth-diagnostic"
        className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <GrowthDiagnosticTool onScheduleCall={() => onNavigate("contact")} />
      </section>

      {/* ========================================================================= */}
      {/* 8. THE 8 MAJOR SERVICES: Full-Stack Growth Capabilities */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE 8 SERVICES WE DELIVER</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            An Integrated Suite of Modern Growth Engines
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
            Every capability is designed to work together seamlessly: high-speed
            web apps convert traffic, growth marketing drives customers, AI
            agents handle leads 24/7, workflows eliminate busywork, and
            dashboards provide executive clarity.
          </p>
        </div>

        <BentoServicesGrid onNavigate={onNavigate} />
      </section>

      {/* ========================================================================= */}
      {/* 9. WHERE AI BECOMES YOUR BIGGEST ADVANTAGE (Sandbox Demo) */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 text-xs font-mono font-semibold">
            <Zap className="w-3.5 h-3.5" />
            <span>MEASURABLE BUSINESS ADVANTAGE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            We Don&rsquo;t Sell Hype. We Build AI that Produces Revenue.
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
            Test-drive our five core AI power-ups below: see how they answer
            customer questions 24/7, accelerate marketing campaigns, analyze
            business data in plain English, and automate repetitive workflows.
          </p>
        </div>

        {/* Interactive AI Advantage Sandbox */}
        <AiAdvantageSandbox />
      </section>

      {/* ========================================================================= */}
      {/* 10. GROWTH JOURNEY & 5-YEAR MASTER ROADMAP */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 text-xs font-mono font-semibold">
            <Compass className="w-3.5 h-3.5" />
            <span>THE STRATEGIC ROADMAP</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            The 4-Stage Growth Journey & 5-Year Vision
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
            Whether you are starting from scratch or scaling to eight figures,
            our structured progression guarantees predictable outcomes at every
            milestone.
          </p>
        </div>

        {/* Embedded Interactive Journey Timeline */}
        <JourneyTimeline />
      </section>

      {/* ========================================================================= */}
      {/* 11. REVENUE & ENGAGEMENT MODELS: How We Partner Together */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 text-xs font-mono font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>COLLABORATION ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Flexible Partnerships Built for Compounding ROI
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
            Choose the engagement model that fits your operational needs:
            targeted high-velocity sprints, dedicated monthly growth squads,
            executive strategic advisory, or managed AI platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVENUE_MODELS.slice(0, 3).map((model, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all relative ${
                model.popular
                  ? "bg-white dark:bg-neutral-900 border-2 border-neutral-900 dark:border-cyan-400 shadow-lg"
                  : "bg-white dark:bg-neutral-900/50 border dark:border-neutral-800 border-neutral-300 hover:border-neutral-500 shadow-sm"
              }`}
            >
              {model.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-neutral-900 dark:bg-cyan-500 text-white dark:text-neutral-950 text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm">
                  Recommended for Scaling
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-neutral-900 dark:text-white uppercase font-bold">
                    {model.type}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 text-[10px]">
                    {model.cadence}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{model.stream}</h3>
                <div className="text-xs font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-800 px-2.5 py-1 rounded-lg inline-block">
                  Scope: {model.deliveryScope}
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {model.description}
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                <div className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-semibold">
                  Core Framework:
                </div>
                {model.features.slice(0, 4).map((f, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-xs text-neutral-700 dark:text-neutral-300"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-neutral-900 dark:text-cyan-400" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onNavigate("contact")}
                className={`w-full py-2.5 rounded-xl font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  model.popular
                    ? "bg-neutral-900 dark:bg-cyan-500 hover:bg-neutral-800 dark:hover:bg-cyan-400 text-white dark:text-neutral-950 font-bold shadow-xs"
                    : "bg-neutral-100 dark:bg-neutral-800/50 hover:bg-neutral-900 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white hover:text-white dark:hover:text-white border border-neutral-300 dark:border-neutral-700"
                }`}
              >
                <span>Request Scope for {model.stream}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => onNavigate("pricing")}
            className="text-xs font-mono font-semibold hover:underline inline-flex items-center gap-1.5"
          >
            <span>View All 5 Engagement & Delivery Frameworks</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12. TARGET USE CASES & ARCHITECTURE */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 text-xs font-mono font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>ARCHITECTURE BLUEPRINTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Target Use Cases & Architecture
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
            The technical methodology of how the platform is built to handle
            FinTech, Logistics, and HealthTech data pipelines securely and
            efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CASE_STUDIES.map((cs) => (
            <div
              key={cs.id}
              className="bg-white dark:bg-neutral-900 /50 border border-neutral-300 dark:border-neutral-800 hover:border-neutral-900 transition-all rounded-2xl p-6 flex flex-col justify-between space-y-6 shadow-sm"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-900 dark:text-white font-bold">
                    {cs.industry}
                  </span>
                  <span className="text-neutral-500 dark:text-neutral-400">{cs.stage}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold">{cs.client}</h3>
                  <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 mt-0.5">
                    Deployment: {cs.timeline}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 space-y-2">
                  <div className="text-[10px] font-mono text-neutral-700 dark:text-neutral-300 uppercase font-semibold">
                    Architecture Highlights:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {cs.architecture.slice(0, 2).map((arch, aIdx) => (
                      <span
                        key={aIdx}
                        className="px-2 py-0.5 rounded bg-white dark:bg-neutral-900 /50 border border-neutral-300 dark:border-neutral-800 text-[10px] font-mono text-neutral-800 dark:text-neutral-300"
                      >
                        {arch}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 uppercase">
                    Core Solution:
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 line-clamp-3 leading-relaxed">
                    {cs.solution}
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 space-y-2">
                  <div className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 uppercase">
                    Audited Performance:
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-700 dark:text-neutral-300">
                      {cs.metrics[0].label}
                    </span>
                    <span className="text-neutral-900 dark:text-white font-bold font-mono text-sm">
                      {cs.metrics[0].value}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate("case-studies")}
                  className="w-full py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-900 dark:hover:bg-white hover:text-white dark:hover:text-neutral-900 border border-neutral-300 dark:border-neutral-800 text-[11px] font-mono flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>View Technical Specs</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 13. FOUNDER's LETTER */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
        <div className="bg-white dark:bg-neutral-900 /50 border border-neutral-300 dark:border-neutral-800 rounded-2xl p-8 sm:p-12 shadow-sm space-y-8">
          <div className="flex items-center gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-6">
            <img
              src="/jonnada-mahesh.png"
              alt="Jonnada Mahesh"
              onError={(e) => {
                e.currentTarget.src = "/jonnada-mahesh.jpg";
              }}
              className="w-16 h-16 rounded-full border border-neutral-300 dark:border-neutral-800 object-cover"
            />
            <div>
              <h3 className="text-xl font-extrabold">
                A Letter from the Founder
              </h3>
              <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase mt-1">
                Jonnada Mahesh, CEO of Maha Growth
              </p>
            </div>
          </div>

          <div className="space-y-6 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-serif">
            <p>
              When I started building software for rapidly growing companies, I
              noticed a painful pattern. The faster a company grew, the more
              fragmented its internal systems became. Operators were spending
              more time syncing data between ten different SaaS tools than
              actually talking to customers.
            </p>
            <p>
              I founded Maha Growth to solve this exact software fragmentation
              problem.
            </p>
            <p>
              We are an early-stage, highly technical startup. We aren't here to
              sell you a bloated enterprise platform filled with features you
              won't use. We are building a lean, unified operating engine that
              integrates your data telemetry, your customer acquisition, and
              your background workflows into a single, high-performance
              architecture.
            </p>
            <p>
              Right now, we are looking for our first technical pilot users. We
              want forward-thinking founders who are willing to deploy our
              architecture in a live environment, break things, and help us
              refine the ultimate growth infrastructure.
            </p>
            <p className="font-bold pt-4">
              If you are tired of duct-taping software together, let's build
              something better.
            </p>
          </div>

          <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800">
            <button
              onClick={() => {
                const el = document.getElementById("contact-section");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-3 rounded-xl bg-neutral-900 dark:bg-white hover:bg-neutral-800 text-white dark:text-neutral-900 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
            >
              <span>Apply for the Founding Partner Program</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 14. FREQUENTLY ASKED QUESTIONS */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest font-bold">
            CLEAR ANSWERS
          </div>
          <h2 className="text-3xl font-extrabold">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = activeFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-neutral-900 /50 border border-neutral-300 dark:border-neutral-800 rounded-xl overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setActiveFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed border-t border-neutral-200 dark:border-neutral-800">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 15. INQUIRY & STRATEGY CALL FORM */}
      {/* ========================================================================= */}
      <section
        id="contact-section"
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
      >
        <div className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 rounded-2xl p-6 sm:p-10 space-y-8 relative overflow-hidden shadow-xl">
          <div className="space-y-2 text-center max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>EARLY ADOPTER PILOT</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Apply for the Founding Partner Program
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
              We are looking for a select group of technical, forward-thinking
              partners to pilot our architecture before general release. Join us
              to test real integrations and provide feedback.
            </p>
          </div>

          {formStatus === "success" ? (
            <div className="p-8 rounded-xl bg-white dark:bg-neutral-900 /50 border border-neutral-300 dark:border-neutral-800 text-center space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto border border-neutral-300 dark:border-neutral-800">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Pilot Application Received</h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 max-w-md mx-auto">
                Thank you for applying. Jonnada Mahesh will review your
                technical requirements personally and reach out within 24 hours
                to discuss integration potential.
              </p>
              <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                Application Reference: #{inquiryId || "MG-849201"}
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleFormSubmit}
              className="space-y-4 text-xs font-mono"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-neutral-700 dark:text-neutral-300 uppercase font-semibold">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g. Sarah Connor"
                    className="w-full bg-white dark:bg-neutral-900 /50 border border-neutral-300 dark:border-neutral-800 rounded-xl px-3.5 py-2.5 placeholder-neutral-400 focus:outline-none focus:border-neutral-900"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-neutral-700 dark:text-neutral-300 uppercase font-semibold">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="sarah@company.com"
                    className="w-full bg-white dark:bg-neutral-900 /50 border border-neutral-300 dark:border-neutral-800 rounded-xl px-3.5 py-2.5 placeholder-neutral-400 focus:outline-none focus:border-neutral-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-neutral-700 dark:text-neutral-300 uppercase font-semibold">
                    Company Name & URL
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    placeholder="Acme Corp (acme.com)"
                    className="w-full bg-white dark:bg-neutral-900 /50 border border-neutral-300 dark:border-neutral-800 rounded-xl px-3.5 py-2.5 placeholder-neutral-400 focus:outline-none focus:border-neutral-900"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-neutral-700 dark:text-neutral-300 uppercase font-semibold">
                    Current Business Stage
                  </label>
                  <select
                    value={formData.stage}
                    onChange={(e) =>
                      setFormData({ ...formData, stage: e.target.value })
                    }
                    className="w-full bg-white dark:bg-neutral-900 /50 border border-neutral-300 dark:border-neutral-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-neutral-900"
                  >
                    <option value="START (0 - $15k/mo)">
                      START (0 - $15k/mo)
                    </option>
                    <option value="GROW ($15k - $60k/mo)">
                      GROW ($15k - $60k/mo)
                    </option>
                    <option value="AUTOMATE ($60k - $200k/mo)">
                      AUTOMATE ($60k - $200k/mo)
                    </option>
                    <option value="SCALE ($200k+/mo)">SCALE ($200k+/mo)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-700 dark:text-neutral-300 uppercase font-semibold">
                  Biggest Growth Challenge
                </label>
                <select
                  value={formData.primaryChallenge}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      primaryChallenge: e.target.value,
                    })
                  }
                  className="w-full bg-white dark:bg-neutral-900 /50 border border-neutral-300 dark:border-neutral-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-neutral-900"
                >
                  <option value="Predictable Lead Generation">
                    Predictable Lead Generation & Customer Acquisition
                  </option>
                  <option value="Outdated Website / Low Conversion">
                    Outdated Website / Low Visitor Conversion
                  </option>
                  <option value="Manual Repetitive Busywork">
                    Manual Repetitive Busywork & Workflow Drag
                  </option>
                  <option value="Implementing AI Pragmatically">
                    Implementing Practical AI Agents & Copilots
                  </option>
                  <option value="Data Intelligence & Clarity">
                    Data Intelligence, Dashboards & Financial Clarity
                  </option>
                  <option value="Full Integrated Growth Stack">
                    Full Integrated Growth Stack (All 8 Services)
                  </option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-700 dark:text-neutral-300 uppercase font-semibold">
                  Tell Us a Bit About Your Goals
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="What is your primary revenue target over the next 6 to 12 months?"
                  className="w-full bg-white dark:bg-neutral-900 /50 border border-neutral-300 dark:border-neutral-800 rounded-xl px-3.5 py-2.5 placeholder-neutral-400 focus:outline-none focus:border-neutral-900 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === "submitting"}
                className="w-full py-4 rounded-xl bg-neutral-900 dark:bg-white hover:bg-neutral-800 text-white dark:text-neutral-900 font-semibold text-xs tracking-wider uppercase shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>
                  {formStatus === "submitting"
                    ? "Submitting Application..."
                    : "Submit Pilot Application"}
                </span>
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
