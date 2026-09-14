import React from "react";
import { PageId } from "../types";
import {
  COMPANY_NAME,
  ONE_LINE_PITCH,
  FIVE_YEAR_ROADMAP,
} from "../data/companyData";
import { ArrowRight, Compass, CheckCircle2, Sparkles } from "lucide-react";
import { FounderProfileCard } from "../components/FounderProfileCard";

export const AboutPage: React.FC<{ onNavigate: (page: PageId) => void }> = ({
  onNavigate,
}) => {
  return (
    <div className="pt-28 pb-20 px-4 lg:px-8 max-w-7xl mx-auto space-y-20 text-neutral-900 dark:text-white">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-semibold">
          About {COMPANY_NAME}
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-tight">
          The All-In-One AI-Powered Business Growth Platform
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
          {ONE_LINE_PITCH}
        </p>
      </div>

      {/* ============================================================ */}
      {/* FOUNDER & EXECUTIVE LEADERSHIP SPOTLIGHT */}
      {/* ============================================================ */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-900 dark:text-white font-semibold">
          <Sparkles className="w-4 h-4 text-neutral-900 dark:text-white" />
          <span>Executive Leadership & Founder</span>
        </div>
        <FounderProfileCard onNavigate={onNavigate} compact={false} />
      </section>

      {/* The Master Vision & Narrative */}
      <div className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 rounded-2xl p-8 lg:p-12 shadow-md space-y-8">
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-neutral-900 dark:text-white uppercase font-bold">
            <Compass className="w-4 h-4 text-neutral-900 dark:text-white" />
            <span>OUR CORE PHILOSOPHY &amp; VISION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white">
            We Are Not Just Another Web Agency. We Are Building the Future of
            Business Growth.
          </h2>
          <div className="space-y-4 text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed">
            <p>
              Many businesses have incredible products or ideas, but they
              struggle to scale because their digital presence, customer
              acquisition, AI adoption, data insights, and workflow automation
              are handled by five separate, disconnected vendors who blame each
              other when growth stalls.
            </p>
            <p className="p-4 rounded-xl bg-white dark:bg-neutral-900 border-l-4 border-neutral-900 dark:border-white border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white font-medium italic">
              &ldquo;Start by helping businesses with high-touch services &rarr;
              learn their deepest operational problems &rarr; build repeatable
              systems &rarr; turn those solutions into proprietary AI products
              &rarr; eventually create a complete unified business-growth
              platform.&rdquo;
            </p>
            <p>
              By acting as one strategic partner, we align your digital
              foundation, marketing engine, AI automations, and executive data
              intelligence to one standard: measurable revenue growth and
              reclaimed founder time.
            </p>
          </div>
        </div>

        {/* Founder & Leadership Model */}
        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-3">
            <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase font-bold">
              LEADERSHIP &amp; EXECUTION MODEL
            </div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
              Founder Vision + Dedicated Expert Squads
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Our leadership focuses relentlessly on Vision, Client Strategy,
              and Growth Economics. Supporting every client is an integrated
              external growth team covering:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs text-neutral-800 dark:text-neutral-300 pt-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                <span>Modern Web &amp; Product</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                <span>Growth Marketing &amp; SEO</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                <span>AI Agents &amp; Copilots</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                <span>Data Intelligence &amp; KPIs</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-xl p-6 space-y-3 font-mono text-xs shadow-xs">
            <div className="text-neutral-500 dark:text-neutral-400 uppercase font-bold">
              The Maha Growth Advantage:
            </div>
            <div className="space-y-2 text-neutral-800 dark:text-neutral-300">
              <div className="flex items-center justify-between p-2 rounded bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800">
                <span>Vendor Redundancy:</span>
                <span className="text-neutral-900 dark:text-white font-bold">
                  Reduced by 80%
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800">
                <span>Time to First Sprint:</span>
                <span className="text-neutral-900 dark:text-white font-bold">
                  14 Days
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800">
                <span>Data &amp; IP Ownership:</span>
                <span className="text-neutral-900 dark:text-white font-bold">
                  100% Client Owned
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Year Evolution Overview */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
            The 5-Year Master Roadmap
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
            Our structured transition from high-touch service to global SaaS
            ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {FIVE_YEAR_ROADMAP.map((yr, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 space-y-3 shadow-xs"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-900 dark:text-white font-bold">
                  {yr.year}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300">
                  {yr.status}
                </span>
              </div>
              <div className="text-lg font-extrabold text-neutral-900 dark:text-white">
                {yr.phase}
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {yr.headline}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 rounded-2xl p-8 lg:p-12 space-y-4 shadow-sm">
        <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
          Ready to Consolidate Your Growth with One Strategic Partner?
        </h3>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 max-w-xl mx-auto">
          Start with a complimentary 30-minute growth diagnostic to discover
          high-impact revenue bottlenecks and get your custom AI growth
          blueprint.
        </p>
        <button
          onClick={() => onNavigate("contact")}
          className="px-8 py-3.5 rounded-xl bg-neutral-900 dark:bg-white hover:bg-neutral-800 text-white dark:text-neutral-900 font-mono text-xs font-semibold shadow-md inline-flex items-center gap-2 cursor-pointer transition-all"
        >
          <span>Schedule Your Growth Diagnostic</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
