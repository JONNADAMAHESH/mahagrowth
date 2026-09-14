import React from "react";
import { PageId } from "../types";
import { RealTimeDataStudio } from "../components/RealTimeDataStudio";
import {
  Sparkles,
  Database,
  Share2,
  FileSpreadsheet,
  FileText,
  Presentation,
  ShieldCheck,
  Zap,
  ArrowRight,
  TrendingUp,
  Cpu,
  Layers,
} from "lucide-react";

interface DataStudioPageProps {
  onNavigate: (page: PageId) => void;
}

export const DataStudioPage: React.FC<DataStudioPageProps> = ({
  onNavigate,
}) => {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>REAL-TIME DATA INTELLIGENCE &amp; POWER BI ENGINE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
          Real-Time Data Analytics for High-Growth Startups
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
          Ingest real-world business spreadsheets, executive PDFs, and slide
          decks in real time. Instantly analyze statistical variances, detect
          anomaly spikes, and export normalized datasets and DAX formulas
          straight into Microsoft Power BI.
        </p>

        {/* Feature Highlights Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2 text-xs font-mono">
          <span className="px-3 py-1 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-300 flex items-center gap-1.5">
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" /> Excel
            (.xlsx, .csv)
          </span>
          <span className="px-3 py-1 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-300 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-rose-400" /> PDF Audits
          </span>
          <span className="px-3 py-1 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-300 flex items-center gap-1.5">
            <Presentation className="w-3.5 h-3.5 text-amber-400" /> PowerPoint
            (.pptx)
          </span>
          <span className="px-3 py-1 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-amber-300 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" /> 1-Click Power BI
            Export
          </span>
        </div>
      </div>

      {/* Main Studio Interactive Workspace */}
      <RealTimeDataStudio />

      {/* Enterprise Technical Pipeline Architecture Specs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
            <Database className="w-4 h-4" />
          </div>
          <h4 className="text-base font-bold text-neutral-900 dark:text-white">
            Multi-Format Ingestion
          </h4>
          <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
            Eliminates manual re-typing. The engine accepts arbitrary tabular
            Excel sheets, financial PDF statements, and slide presentations,
            resolving columns and types automatically.
          </p>
          <div className="text-[10px] font-mono text-cyan-400 pt-1">
            Sub-second client parsing
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Share2 className="w-4 h-4" />
          </div>
          <h4 className="text-base font-bold text-neutral-900 dark:text-white">
            Power BI DAX &amp; Push API
          </h4>
          <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
            Generates turnkey Power BI schemas, calculated DAX measures (YoY
            growth, rolling averages, anomaly thresholds), and normalized
            datasets ready for instant enterprise import.
          </p>
          <div className="text-[10px] font-mono text-amber-400 pt-1">
            Zero ETL transformation overhead
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h4 className="text-base font-bold text-neutral-900 dark:text-white">
            Automated Anomaly Defense
          </h4>
          <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
            Statistical deviation tracking flags margin erosions and transaction
            spikes beyond 2.0 sigma before they contaminate executive dashboards
            or financial forecasts.
          </p>
          <div className="text-[10px] font-mono text-emerald-400 pt-1">
            99.4% precision outlier detection
          </div>
        </div>
      </div>

      {/* Bottom Growth CTA */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-600/20 via-cyan-600/10 to-transparent border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Need Custom Real-Time Telemetry for Your Company?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 max-w-xl">
            We architect and deploy custom enterprise data pipelines, real-time
            Power BI workspaces, and automated ingestion systems tailored to
            your exact stack.
          </p>
        </div>
        <button
          onClick={() => onNavigate("contact")}
          className="px-6 py-3.5 rounded-xl bg-white dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-900 dark:text-white font-mono font-bold text-xs flex items-center gap-2 shadow-lg cursor-pointer transition-all shrink-0"
        >
          <span>Schedule Technical Architecture Call</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
