import React from "react";
import { Zap, ShieldCheck, Cpu, ArrowUpRight } from "lucide-react";

export const PartnerIntegrationsMarquee: React.FC = () => {
  const partners = [
    { name: "Google Ads", tag: "Search & PMax", color: "text-amber-400" },
    { name: "Meta Ads (CAPI)", tag: "Social & Dynamic", color: "text-blue-400" },
    { name: "Amazon Advertising", tag: "Retail Media & DSP", color: "text-orange-400" },
    { name: "OpenRTB DSP", tag: "< 15ms Bidder", color: "text-cyan-400" },
    { name: "Microsoft Power BI", tag: "DAX Auto-Push", color: "text-yellow-400" },
    { name: "Snowflake", tag: "Warehouse Sync", color: "text-sky-400" },
    { name: "Google BigQuery", tag: "Serverless SQL", color: "text-indigo-400" },
    { name: "Shopify Plus", tag: "E-Commerce CAPI", color: "text-emerald-400" },
    { name: "Stripe Billing", tag: "LTV & ARR Sync", color: "text-purple-400" },
    { name: "HubSpot & Salesforce", tag: "Closed-Loop CRM", color: "text-rose-400" },
  ];

  return (
    <div className="w-full py-8 border-y border-neutral-200 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono font-bold tracking-widest text-neutral-600 dark:text-neutral-400 uppercase">
            Certified AdTech &amp; Data Pipeline Connectors
          </span>
        </div>
        <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 font-medium">
          Zero-ETL Universal Webhooks &bull; Real-time CAPI
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 max-w-7xl mx-auto px-4">
        {partners.map((p, idx) => (
          <div
            key={idx}
            className="px-4 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs flex items-center gap-2.5 hover:border-cyan-500/40 transition-all group"
          >
            <span className={`text-xs font-mono font-bold ${p.color}`}>⚡</span>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-neutral-900 dark:text-white font-mono flex items-center gap-1">
                {p.name}
              </span>
              <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono">
                {p.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
