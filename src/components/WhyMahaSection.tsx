import React from "react";
import {
  Layers,
  Zap,
  BarChart3,
  ShieldCheck,
  Cpu,
  Rocket,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { PageId } from "../types";

interface WhyMahaSectionProps {
  onNavigate?: (page: PageId, anchorId?: string) => void;
}

const VALUE_PROPOSITIONS = [
  {
    icon: Layers,
    title: "One Unified Platform",
    badge: "Consolidation",
    description:
      "Replace 10 disjointed tools, fragmented logins, and duplicate data with a single synchronized growth operating system.",
    metric: "10 &rarr; 1 tool stack",
  },
  {
    icon: Zap,
    title: "Intelligent Automation",
    badge: "24/7 Operations",
    description:
      "Autonomous lead capture, background CRM synchronization, and instant responses that execute 24/7 without manual intervention.",
    metric: "22+ hrs saved / wk",
  },
  {
    icon: BarChart3,
    title: "Real-Time Business Insights",
    badge: "Transparency",
    description:
      "Live revenue velocity, CAC:LTV attribution, and plain-English intelligence so you never fly blind or wait for end-of-month PDFs.",
    metric: "Sub-second telemetry",
  },
  {
    icon: Cpu,
    title: "Scalable Architecture",
    badge: "Engineering Standard",
    description:
      "Enterprise-grade cloud infrastructure, modern React & Node microservices designed to scale seamlessly from $10k to $10M+ ARR.",
    metric: "99.98% guaranteed SLA",
  },
  {
    icon: ShieldCheck,
    title: "Simple, Frictionless Workflows",
    badge: "Ease of Use",
    description:
      "No steep learning curves or complex training cycles. Intuitive, clean user interfaces built for founders, operators, and growth squads.",
    metric: "Day-one deployment",
  },
  {
    icon: Rocket,
    title: "Built for Growing Businesses",
    badge: "Aligned Incentives",
    description:
      "Flexible sprints, dedicated growth squads, and transparent pricing focused purely on compounding revenue and operational margin.",
    metric: "Compounding ROI",
  },
];

export const WhyMahaSection: React.FC<WhyMahaSectionProps> = ({
  onNavigate,
}) => {
  return (
    <section
      id="why-maha"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 text-neutral-900 dark:text-white"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-800 text-xs font-mono font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
          <span>THE STRATEGIC ADVANTAGE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
          Why Businesses Choose Maha Growth
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
          High-growth companies don&rsquo;t need another isolated subscription.
          They choose Maha Growth to replace operational fragmentation with a
          unified, intelligent growth engine.
        </p>
      </div>

      {/* 6 Value Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {VALUE_PROPOSITIONS.map((prop, idx) => {
          const Icon = prop.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 hover:border-neutral-900 transition-all duration-200 space-y-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 flex items-center justify-center text-neutral-900 dark:text-white">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-neutral-900 dark:text-white font-semibold px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800">
                  {prop.badge}
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                  {prop.title}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {prop.description}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-500 dark:text-neutral-400">Impact Metric:</span>
                <span
                  className="text-neutral-900 dark:text-white font-bold"
                  dangerouslySetInnerHTML={{ __html: prop.metric }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Direct Contrast Card: 10 Fragmented Tools vs 1 Maha Growth System */}
      <div className="rounded-3xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 p-6 sm:p-10 space-y-6 shadow-md">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase font-bold">
            THE REAL CHOICE
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
            Fragmented Software Stacks vs. The Maha Growth Operating System
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Fragmented Stack */}
          <div className="p-5 rounded-2xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 space-y-3">
            <div className="flex items-center gap-2 text-neutral-900 dark:text-white font-mono text-xs font-bold uppercase">
              <span className="w-2 h-2 rounded-full bg-neutral-500" />
              <span>10 Disconnected SaaS Tools &amp; Contractors</span>
            </div>
            <ul className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300">
              <li className="flex items-start gap-2">
                <span className="text-neutral-900 dark:text-white font-bold">
                  ✕
                </span>
                <span>
                  Disjointed customer data scattered across CRM, Stripe, Google
                  Analytics, and Zapier
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-900 dark:text-white font-bold">
                  ✕
                </span>
                <span>
                  Agencies and contractors pointing fingers when lead volume
                  drops
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-900 dark:text-white font-bold">
                  ✕
                </span>
                <span>
                  Paying $3,000–$8,000/month in overlapping SaaS seat licenses
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-900 dark:text-white font-bold">
                  ✕
                </span>
                <span>
                  Team spends 20+ hours a week on manual copy-pasting and data
                  synchronization
                </span>
              </li>
            </ul>
          </div>

          {/* Maha Growth System */}
          <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border-2 border-neutral-900 dark:border-white space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-neutral-900 dark:text-white font-mono text-xs font-bold uppercase">
              <CheckCircle2 className="w-4 h-4 text-neutral-900 dark:text-white" />
              <span>1 Unified Maha Growth Platform</span>
            </div>
            <ul className="space-y-2 text-xs text-neutral-800 dark:text-neutral-300">
              <li className="flex items-start gap-2">
                <span className="text-neutral-900 dark:text-white font-bold">
                  ✓
                </span>
                <span>
                  One synchronized operating system connecting marketing, sales,
                  and operations
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-900 dark:text-white font-bold">
                  ✓
                </span>
                <span>
                  Single-point strategic accountability with aligned revenue
                  targets
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-900 dark:text-white font-bold">
                  ✓
                </span>
                <span>
                  Predictable, transparent partnership model with zero hidden
                  seat taxes
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-900 dark:text-white font-bold">
                  ✓
                </span>
                <span>
                  Autonomous background workflows that run 24/7 without manual
                  friction
                </span>
              </li>
            </ul>
          </div>
        </div>

        {onNavigate && (
          <div className="text-center pt-2">
            <button
              id="btn-why-maha-cta"
              type="button"
              onClick={() => onNavigate("diagnostic")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 dark:bg-white hover:bg-neutral-800 text-white dark:text-neutral-900 font-mono text-xs font-bold transition shadow-md cursor-pointer"
            >
              <span>Audit Your Current Stack with Growth Diagnostic</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
