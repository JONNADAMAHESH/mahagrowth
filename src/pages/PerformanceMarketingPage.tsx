import React, { useState } from "react";
import { PageId } from "../types";
import { PartnerIntegrationsMarquee } from "../components/PartnerIntegrationsMarquee";
import {
  Sparkles,
  Zap,
  Target,
  BarChart3,
  Cpu,
  Globe,
  Share2,
  ArrowRight,
  CheckCircle2,
  Layers,
  Search,
  Tag,
  RefreshCw,
  Server,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  Calculator,
} from "lucide-react";

interface PerformanceMarketingPageProps {
  onNavigate: (page: PageId) => void;
}

export const PerformanceMarketingPage: React.FC<PerformanceMarketingPageProps> = ({
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<"overview" | "dsp" | "bidding" | "attribution">("overview");
  const [monthlyAdSpend, setMonthlyAdSpend] = useState<number>(25000);

  // Math simulation for ROAS calculator
  const estimatedSavings = Math.round(monthlyAdSpend * 0.18);
  const extraConversions = Math.round((monthlyAdSpend / 75) * 0.28);
  const projectedExtraRevenue = Math.round(extraConversions * 420);
  const cacReductionPercent = monthlyAdSpend > 50000 ? 34 : 26;

  const technologies = [
    { title: "Performance Marketing Platform", desc: "End-to-end ROI optimization, budget allocation, and real-time scaling.", icon: Target, tag: "Core OS" },
    { title: "Universal Media Buying", desc: "Programmatic placement across premium inventory with unified pacing.", icon: Globe, tag: "Programmatic" },
    { title: "Search Marketing Platform", desc: "Advanced keyword clustering, ad group auto-expansion, and SERP dominance.", icon: Search, tag: "Search" },
    { title: "Universal Tag Management", desc: "Zero-latency container deployment for pixels, events, and conversion APIs.", icon: Tag, tag: "Tracking" },
    { title: "Search Auto-bidding", desc: "Algorithmic bidding algorithms optimizing CPA, ROAS, and target impression share.", icon: DollarSign, tag: "Automation" },
    { title: "Retargeting Engine", desc: "Behavioral audience segmentation and multi-touch cross-device remarketing.", icon: RefreshCw, tag: "Conversion" },
    { title: "Demand Side Platform (DSP - OSP)", desc: "Omnichannel programmatic bidding with custom OpenRTB bidding endpoints.", icon: Server, tag: "DSP / OSP" },
    { title: "Social Media Advertising", desc: "Native multi-variant ad creation and automated audience scaling.", icon: Share2, tag: "Social" },
    { title: "Online Media Inventory", desc: "Access to premium publishers, video networks, and native ad syndication.", icon: Layers, tag: "Inventory" },
    { title: "Google Ads Integration", desc: "Direct Search, Performance Max, YouTube, and Display API synchronization.", icon: Zap, tag: "Channel" },
    { title: "Facebook Ads Sync", desc: "CAPI integration, dynamic catalog ads, and lookalike audience automation.", icon: Target, tag: "Channel" },
    { title: "AI-Powered Optimization", desc: "Generative ad copy creation, predictive churn modeling, and auto-tuning.", icon: Cpu, tag: "Intelligence" },
    { title: "Cross Channel Advertising", desc: "Unified budget waterfall distributing spend dynamically to highest ROAS channels.", icon: BarChart3, tag: "Omnichannel" },
    { title: "Amazon Ads & DSP", desc: "Sponsored Products, Brands, Display, and DSP retail media optimization.", icon: Sparkles, tag: "Retail Media" },
    { title: "Marketplace Advertising", desc: "Multi-marketplace bidding and inventory sync across global retail networks.", icon: Globe, tag: "E-Commerce" },
    { title: "Multi-Touch Attribution", desc: "Data-driven attribution models (First-touch, Last-touch, Shapley value).", icon: CheckCircle2, tag: "Analytics" },
    { title: "Enterprise AdServer", desc: "High-throughput ad delivery, impression verification, and fraud protection.", icon: Server, tag: "Infrastructure" },
  ];

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 text-neutral-900 dark:text-white">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 text-xs font-mono font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>UNIFIED PERFORMANCE MARKETING &amp; OMNICHANNEL DSP</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          Autonomous Performance Marketing &amp; Media Buying Suite
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
          Execute, optimize, and attribute every ad dollar across Google, Facebook, Amazon, and programmatic DSPs with real-time AI auto-bidding and universal tag management.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <button
            onClick={() => onNavigate("contact")}
            className="px-6 py-3.5 rounded-xl bg-neutral-900 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-100 text-white dark:text-neutral-900 font-mono font-bold text-xs flex items-center gap-2 shadow-lg cursor-pointer transition-all"
          >
            <span>Deploy Performance Suite</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigate("portal")}
            className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-mono font-bold text-xs border border-cyan-500/30 cursor-pointer transition-all shadow-md"
          >
            Try Live Portal Demo
          </button>
        </div>
      </div>

      {/* Partner Marquee */}
      <PartnerIntegrationsMarquee />

      {/* Interactive ROAS & CAC Simulator */}
      <div className="p-8 sm:p-10 rounded-3xl bg-neutral-950 border border-neutral-800 text-white shadow-2xl relative overflow-hidden space-y-8">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10 border-b border-neutral-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
              <Calculator className="w-4 h-4" /> ROAS &amp; CAC Payback Engine
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Simulate Your Media Efficiency Gains
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Slide your current monthly ad spend to view estimated waste reduction and conversion expansion.
            </p>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-2xl shrink-0 font-mono text-center">
            <span className="text-[10px] text-neutral-500 uppercase block">Monthly Ad Spend</span>
            <span className="text-2xl font-extrabold text-cyan-400">${monthlyAdSpend.toLocaleString()}</span>
          </div>
        </div>

        {/* Spend Slider */}
        <div className="space-y-3 relative z-10">
          <div className="flex justify-between text-xs font-mono text-neutral-400">
            <span>$5,000/mo</span>
            <span>$50,000/mo</span>
            <span>$150,000+/mo</span>
          </div>
          <input
            type="range"
            min={5000}
            max={150000}
            step={2500}
            value={monthlyAdSpend}
            onChange={(e) => setMonthlyAdSpend(Number(e.target.value))}
            className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
        </div>

        {/* Calculated Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10 font-mono">
          <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
            <span className="text-neutral-500 text-[11px] block">Monthly Waste Filtered</span>
            <span className="text-xl font-bold text-emerald-400">+${estimatedSavings.toLocaleString()}/mo</span>
            <span className="text-[10px] text-neutral-400 block">Via auto-bidding &amp; bot shield</span>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
            <span className="text-neutral-500 text-[11px] block">Projected Extra Pipeline</span>
            <span className="text-xl font-bold text-cyan-400">+{extraConversions} Conversions</span>
            <span className="text-[10px] text-neutral-400 block">From lookalike &amp; CAPI cascades</span>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
            <span className="text-neutral-500 text-[11px] block">Blended CAC Drop</span>
            <span className="text-xl font-bold text-amber-400">-{cacReductionPercent}%</span>
            <span className="text-[10px] text-neutral-400 block">Shapley attribution balance</span>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1">
            <span className="text-neutral-500 text-[11px] block">Annualized Revenue Lift</span>
            <span className="text-xl font-bold text-purple-400">+${(projectedExtraRevenue * 12).toLocaleString()}</span>
            <span className="text-[10px] text-neutral-400 block">Estimated net new run-rate</span>
          </div>
        </div>
      </div>

      {/* Interactive Tabs */}
      <div className="flex justify-center border-b border-neutral-200 dark:border-neutral-800 gap-2 sm:gap-6 font-mono text-xs overflow-x-auto pb-px">
        {[
          { id: "overview", label: "Full Tech Stack (18 Modules)" },
          { id: "dsp", label: "Demand Side Platform (DSP-OSP)" },
          { id: "bidding", label: "Search & Auto-Bidding Engine" },
          { id: "attribution", label: "Attribution & AdServer" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 px-3 transition-colors border-b-2 font-bold whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? "border-cyan-500 text-cyan-600 dark:text-cyan-400"
                : "border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content: Overview */}
      {activeTab === "overview" && (
        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech, idx) => {
              const Icon = tech.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4 hover:border-cyan-500/40 transition-all shadow-sm group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 text-[10px] font-mono font-semibold">
                      {tech.tag}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-1">
                      {tech.title}
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      {tech.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab Content: DSP */}
      {activeTab === "dsp" && (
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-950 border border-neutral-800 text-white space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest">
              Programmatic Infrastructure
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Demand Side Platform (DSP - OSP) &amp; Universal Media Buying
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Our enterprise DSP provides direct OpenRTB bidder connectivity to major ad exchanges, video networks, and programmatic marketplaces. Automate bids with millisecond latency and zero leakage.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10 font-mono text-xs">
            <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
              <div className="text-cyan-400 font-bold">&lt; 15ms Bidding Latency</div>
              <div className="text-neutral-400">Blazing fast programmatic auctions with real-time budget pacing.</div>
            </div>
            <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
              <div className="text-emerald-400 font-bold">Cross-Channel Synergy</div>
              <div className="text-neutral-400">Sync Google Ads, Meta CAPI, and Amazon DSP in a single unified dashboard.</div>
            </div>
            <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
              <div className="text-amber-400 font-bold">Anti-Fraud Shield</div>
              <div className="text-neutral-400">Advanced bot filtration and IP verification protecting 100% of ad spend.</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Bidding */}
      {activeTab === "bidding" && (
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-950 border border-neutral-800 text-white space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest">
              Algorithmic Optimization
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Search Auto-Bidding &amp; Retargeting Engine
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Eliminate manual bid adjustments. Our reinforcement learning auto-bidding algorithms analyze conversion velocity, seasonality, and competitor CPC movements in real time to maximize ROAS.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10 font-mono text-xs">
            <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
              <div className="text-emerald-400 font-bold text-sm">Dynamic Keyword Auto-Bidding</div>
              <p className="text-neutral-400 leading-relaxed">
                Automatically scales bids on high-intent search terms across Google Ads and Amazon Ads while throttling unprofitable long-tail queries.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
              <div className="text-cyan-400 font-bold text-sm">Behavioral Retargeting Cascades</div>
              <p className="text-neutral-400 leading-relaxed">
                Deploys sequential ad creatives based on user drop-off points, boosting retargeting conversion rates by up to 310%.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Attribution */}
      {activeTab === "attribution" && (
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-950 border border-neutral-800 text-white space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="text-xs font-mono font-semibold text-purple-400 uppercase tracking-widest">
              Truth in Advertising
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Multi-Touch Attribution &amp; Enterprise AdServer
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Stop guessing which channel drove revenue. Our deterministic and probabilistic attribution engine maps every customer touchpoint from initial impression to closed-won enterprise deal.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10 font-mono text-xs">
            <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
              <div className="text-purple-400 font-bold">Shapley Value Attribution</div>
              <div className="text-neutral-400">Fair credit distribution across Google, Meta, and Amazon touchpoints.</div>
            </div>
            <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
              <div className="text-cyan-400 font-bold">Universal Tag Manager</div>
              <div className="text-neutral-400">1-click snippet deployment handling all pixels and conversion APIs.</div>
            </div>
            <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
              <div className="text-emerald-400 font-bold">First-Party Data Sync</div>
              <div className="text-neutral-400">Secure server-side event tracking compliant with modern privacy standards.</div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-600/20 via-cyan-600/10 to-transparent border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Ready to Supercharge Your Performance Marketing Stack?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 max-w-xl">
            Connect your Google Ads, Facebook Ads, and Amazon accounts in under 5 minutes and let our autonomous AI optimize your ROAS.
          </p>
        </div>
        <button
          onClick={() => onNavigate("contact")}
          className="px-6 py-3.5 rounded-xl bg-neutral-900 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-100 text-white dark:text-neutral-900 font-mono font-bold text-xs flex items-center gap-2 shadow-lg cursor-pointer transition-all shrink-0"
        >
          <span>Schedule Strategy Walkthrough</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

