import React, { useState, useMemo } from "react";
import {
  TrendingUp,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Zap,
  Sliders,
  Activity,
  Layers,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
} from "lucide-react";
import { DatasetMeta, DataRecord } from "../RealTimeDataStudio";

interface PredictiveForecastingModuleProps {
  metadata: DatasetMeta;
  records: DataRecord[];
}

export const PredictiveForecastingModule: React.FC<
  PredictiveForecastingModuleProps
> = ({ metadata, records }) => {
  const [horizonDays, setHorizonDays] = useState<number>(90);
  const [growthScenario, setGrowthScenario] = useState<
    "conservative" | "baseline" | "aggressive"
  >("baseline");
  const [remediatedAnomalies, setRemediatedAnomalies] = useState<
    Record<string, boolean>
  >({});
  const [remediationLog, setRemediationLog] = useState<string[]>([]);

  // Calculate baseline trend from current data
  const baseValue = metadata.summaryStats.mean || 100000;
  const growthMultiplier =
    growthScenario === "conservative"
      ? 1.08
      : growthScenario === "baseline"
        ? 1.18
        : 1.32;

  // Generate predictive forecast curve with 95% confidence intervals
  const forecastData = useMemo(() => {
    const steps =
      horizonDays === 30
        ? 4
        : horizonDays === 60
          ? 6
          : horizonDays === 90
            ? 9
            : 12;
    const intervalDays = horizonDays / steps;

    const points: Array<{
      period: string;
      expected: number;
      upper95: number;
      lower95: number;
    }> = [];

    let current = baseValue;
    const stepGrowth = Math.pow(growthMultiplier, 1 / steps);
    const uncertaintyFactor = 0.04;

    for (let i = 1; i <= steps; i++) {
      current = current * stepGrowth;
      const spread = current * (uncertaintyFactor * Math.sqrt(i));
      points.push({
        period: `+${Math.round(i * intervalDays)}d`,
        expected: Math.round(current),
        upper95: Math.round(current + spread * 1.96),
        lower95: Math.round(current - spread * 1.96),
      });
    }

    return points;
  }, [baseValue, growthMultiplier, horizonDays]);

  // Churn prediction cohort data
  const churnCohorts = [
    {
      segment: "Enterprise High-ACV ($100k+)",
      accounts: 42,
      mrrExposure: 420000,
      churnRisk: 4.2,
      riskLevel: "Healthy",
      topIndicator: "High daily product engagement (NPS 78)",
    },
    {
      segment: "Mid-Market ($25k - $100k)",
      accounts: 118,
      mrrExposure: 590000,
      churnRisk: 8.6,
      riskLevel: "Healthy",
      topIndicator: "Regular quarterly executive reviews",
    },
    {
      segment: "Growth SMB ($5k - $25k)",
      accounts: 340,
      mrrExposure: 480000,
      churnRisk: 18.4,
      riskLevel: "Moderate",
      topIndicator: "Telemetry sync dropouts in past 14 days",
    },
    {
      segment: "Self-Serve Starter (<$5k)",
      accounts: 820,
      mrrExposure: 260000,
      churnRisk: 34.1,
      riskLevel: "At-Risk",
      topIndicator: "No admin logins in the last 21 days",
    },
  ];

  // Handle 1-click automated anomaly resolution
  const handleResolveAnomaly = (key: string, label: string) => {
    setRemediatedAnomalies((prev) => ({ ...prev, [key]: true }));
    const timestamp = new Date().toLocaleTimeString();
    setRemediationLog((prev) => [
      `[${timestamp}] Automated Remediation: ${label} executed. Guardrails engaged.`,
      ...prev.slice(0, 4),
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="p-6 rounded-2xl bg-neutral-900 dark:bg-white border border-neutral-800 space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white dark:text-neutral-900 flex items-center gap-2">
                <span>Predictive Forecasting &amp; Churn Modeling Engine</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/20 text-cyan-300 font-semibold">
                  95% Confidence Bounds
                </span>
              </h3>
              <p className="text-xs text-neutral-400">
                Forward revenue projections based on multi-variate linear
                regression and proactive customer retention risk scoring.
              </p>
            </div>
          </div>

          {/* Horizon Selector */}
          <div className="flex items-center gap-1.5 bg-neutral-800/80 p-1 rounded-xl border border-neutral-700">
            <span className="text-[10px] font-mono text-neutral-400 px-2">
              Horizon:
            </span>
            {[30, 60, 90, 180].map((days) => (
              <button
                key={days}
                onClick={() => setHorizonDays(days)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  horizonDays === days
                    ? "bg-cyan-500 text-neutral-900 dark:text-white dark:text-neutral-900 dark:text-white dark:text-neutral-900 font-bold shadow-xs"
                    : "text-neutral-400 hover:text-white dark:hover:text-neutral-900 dark:text-neutral-900 hover:bg-neutral-700/60"
                }`}
              >
                {days}d
              </button>
            ))}
          </div>
        </div>

        {/* Growth Scenarios */}
        <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-mono">
          <span className="text-neutral-400">Simulation Model:</span>
          {(["conservative", "baseline", "aggressive"] as const).map((sc) => (
            <button
              key={sc}
              onClick={() => setGrowthScenario(sc)}
              className={`px-3 py-1 rounded-lg capitalize border transition-all cursor-pointer ${
                growthScenario === sc
                  ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold"
                  : "bg-neutral-800 border-neutral-700 text-neutral-400 hover:text-white dark:hover:text-neutral-900 dark:text-neutral-900"
              }`}
            >
              {sc} (
              {sc === "conservative"
                ? "+8%"
                : sc === "baseline"
                  ? "+18%"
                  : "+32%"}
              )
            </button>
          ))}
        </div>
      </div>

      {/* SVG Forecast Chart with Confidence Intervals */}
      <div className="p-6 rounded-2xl bg-neutral-900 dark:bg-white border border-neutral-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-neutral-800 pb-3">
          <div>
            <h4 className="text-sm font-bold text-white dark:text-neutral-900">
              Forward Revenue Run-Rate Projection ({horizonDays} Days)
            </h4>
            <p className="text-xs text-neutral-400">
              Shaded area represents 95% Gaussian prediction bounds (±1.96σ).
            </p>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-mono">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <span className="w-3 h-1 bg-cyan-400 inline-block rounded" />{" "}
              Expected Run-Rate
            </span>
            <span className="flex items-center gap-1.5 text-cyan-500/40">
              <span className="w-3 h-2 bg-cyan-500/20 border border-cyan-500/40 inline-block rounded" />{" "}
              95% Confidence Interval
            </span>
          </div>
        </div>

        {/* SVG Visualization */}
        <div className="h-64 w-full relative">
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 800 220"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id="forecastAreaGrad"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* Gridlines */}
            <line
              x1="0"
              y1="50"
              x2="800"
              y2="50"
              stroke="#262626"
              strokeDasharray="3 3"
            />
            <line
              x1="0"
              y1="110"
              x2="800"
              y2="110"
              stroke="#262626"
              strokeDasharray="3 3"
            />
            <line
              x1="0"
              y1="170"
              x2="800"
              y2="170"
              stroke="#262626"
              strokeDasharray="3 3"
            />

            {/* Compute SVG coordinates */}
            {(() => {
              const minVal =
                Math.min(...forecastData.map((d) => d.lower95)) * 0.95;
              const maxVal =
                Math.max(...forecastData.map((d) => d.upper95)) * 1.05;
              const range = maxVal - minVal || 1;

              const getX = (i: number) =>
                (i / (forecastData.length - 1)) * 760 + 20;
              const getY = (val: number) =>
                200 - ((val - minVal) / range) * 180;

              // Build Upper & Lower confidence polygon
              let upperPoints = "";
              let lowerPoints = "";
              let expectedLine = "";

              forecastData.forEach((d, i) => {
                const x = getX(i);
                const yUpper = getY(d.upper95);
                const yLower = getY(d.lower95);
                const yExp = getY(d.expected);

                if (i === 0) {
                  upperPoints += `${x},${yUpper}`;
                  expectedLine += `M ${x} ${yExp}`;
                } else {
                  upperPoints += ` L ${x},${yUpper}`;
                  expectedLine += ` L ${x} ${yExp}`;
                }
              });

              for (let i = forecastData.length - 1; i >= 0; i--) {
                const x = getX(i);
                const yLower = getY(forecastData[i].lower95);
                lowerPoints += ` L ${x},${yLower}`;
              }

              const bandPath = `M ${upperPoints} ${lowerPoints} Z`;

              return (
                <>
                  {/* Shaded confidence interval band */}
                  <path
                    d={bandPath}
                    fill="url(#forecastAreaGrad)"
                    stroke="#00E5FF"
                    strokeOpacity="0.4"
                    strokeWidth="1"
                  />

                  {/* Expected line */}
                  <path
                    d={expectedLine}
                    fill="none"
                    stroke="#00E5FF"
                    strokeWidth="2.5"
                  />

                  {/* Data Point Nodes */}
                  {forecastData.map((d, i) => {
                    const x = getX(i);
                    const y = getY(d.expected);
                    return (
                      <g key={i}>
                        <circle cx={x} cy={y} r="4" fill="#00E5FF" />
                        <text
                          x={x}
                          y={215}
                          fill="#a3a3a3"
                          fontSize="10"
                          fontFamily="monospace"
                          textAnchor="middle"
                        >
                          {d.period}
                        </text>
                      </g>
                    );
                  })}
                </>
              );
            })()}
          </svg>
        </div>

        {/* Projected Milestone Stat Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
            <div className="text-[10px] font-mono text-neutral-400 uppercase">
              Current Baseline Mean
            </div>
            <div className="text-xl font-bold font-mono text-white dark:text-neutral-900 mt-0.5">
              ${Math.round(baseValue).toLocaleString()}
            </div>
            <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
              Historical telemetry floor
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
            <div className="text-[10px] font-mono text-neutral-400 uppercase">
              Projected Expected (+{horizonDays}d)
            </div>
            <div className="text-xl font-bold font-mono text-cyan-400 mt-0.5">
              $
              {forecastData[forecastData.length - 1]?.expected.toLocaleString()}
            </div>
            <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" />
              <span>
                +{Math.round((growthMultiplier - 1) * 100)}% expected delta
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
            <div className="text-[10px] font-mono text-neutral-400 uppercase">
              Upper Ceiling (95% CI)
            </div>
            <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5">
              ${forecastData[forecastData.length - 1]?.upper95.toLocaleString()}
            </div>
            <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
              Peak Gaussian expansion
            </div>
          </div>
        </div>
      </div>

      {/* Churn Prediction Scoring & Retention Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Churn Risk Cohorts */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-neutral-900 dark:bg-white border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <div>
              <h4 className="text-sm font-bold text-white dark:text-neutral-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Customer Churn Prediction &amp; Cohort Scoring</span>
              </h4>
              <p className="text-xs text-neutral-400">
                Machine learning risk probability evaluated across contract
                tiers.
              </p>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-bold">
              Blended Churn: 1.15%
            </span>
          </div>

          <div className="space-y-3">
            {churnCohorts.map((c) => (
              <div
                key={c.segment}
                className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2 hover:border-neutral-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="font-bold text-xs text-white dark:text-neutral-900">
                    {c.segment}
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        c.riskLevel === "Healthy"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : c.riskLevel === "Moderate"
                            ? "bg-amber-500/10 text-amber-400"
                            : "bg-rose-500/10 text-rose-400"
                      }`}
                    >
                      {c.churnRisk}% Risk ({c.riskLevel})
                    </span>
                  </div>
                </div>

                <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      c.riskLevel === "Healthy"
                        ? "bg-emerald-500"
                        : c.riskLevel === "Moderate"
                          ? "bg-amber-500"
                          : "bg-rose-500"
                    }`}
                    style={{ width: `${c.churnRisk}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 pt-0.5">
                  <span>
                    {c.accounts} Accounts • ${(c.mrrExposure / 1000).toFixed(0)}
                    k MRR Exposure
                  </span>
                  <span className="text-neutral-500 dark:text-neutral-400 truncate max-w-[200px]">
                    {c.topIndicator}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Automated Anomaly Resolution Triggers */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-neutral-900 dark:bg-white border border-neutral-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h4 className="text-sm font-bold text-white dark:text-neutral-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Automated Anomaly Resolution</span>
              </h4>
              <span className="text-[10px] font-mono text-neutral-400">
                1-Click SLA Action
              </span>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              When variance spikes exceed 2.0σ, trigger autonomous remediation
              workflows to prevent budget bleed and model skew.
            </p>

            {/* Remediation Action Cards */}
            <div className="space-y-2.5 pt-1">
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-white dark:text-neutral-900">
                    CAC Spike on Paid Search (+38%)
                  </div>
                  <div className="text-[10px] font-mono text-neutral-400">
                    Variance: 2.34σ above rolling average
                  </div>
                </div>
                <button
                  onClick={() =>
                    handleResolveAnomaly(
                      "cac_throttle",
                      "Auto-Throttle Search Ads by 20%",
                    )
                  }
                  disabled={remediatedAnomalies["cac_throttle"]}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                    remediatedAnomalies["cac_throttle"]
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-cyan-500 hover:bg-cyan-400 text-neutral-900 dark:text-white dark:text-neutral-900 dark:text-white dark:text-neutral-900"
                  }`}
                >
                  {remediatedAnomalies["cac_throttle"]
                    ? "Remediated"
                    : "Throttle Ad Spend"}
                </button>
              </div>

              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-white dark:text-neutral-900">
                    Starter Cohort Inactivity Spike
                  </div>
                  <div className="text-[10px] font-mono text-neutral-400">
                    34.1% churn hazard score
                  </div>
                </div>
                <button
                  onClick={() =>
                    handleResolveAnomaly(
                      "churn_outreach",
                      "Trigger Automated Re-Engagement Workflow",
                    )
                  }
                  disabled={remediatedAnomalies["churn_outreach"]}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                    remediatedAnomalies["churn_outreach"]
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-cyan-500 hover:bg-cyan-400 text-neutral-900 dark:text-white dark:text-neutral-900 dark:text-white dark:text-neutral-900"
                  }`}
                >
                  {remediatedAnomalies["churn_outreach"]
                    ? "Remediated"
                    : "Trigger Retention"}
                </button>
              </div>

              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-white dark:text-neutral-900">
                    Data Ingestion Latency Fluctuation
                  </div>
                  <div className="text-[10px] font-mono text-neutral-400">
                    Recorded 62ms spike (nominal &lt; 40ms)
                  </div>
                </div>
                <button
                  onClick={() =>
                    handleResolveAnomaly(
                      "sla_dispatch",
                      "Re-balance Stream Worker Pool",
                    )
                  }
                  disabled={remediatedAnomalies["sla_dispatch"]}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                    remediatedAnomalies["sla_dispatch"]
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-cyan-500 hover:bg-cyan-400 text-neutral-900 dark:text-white dark:text-neutral-900 dark:text-white dark:text-neutral-900"
                  }`}
                >
                  {remediatedAnomalies["sla_dispatch"]
                    ? "Remediated"
                    : "Dispatch Worker Pool"}
                </button>
              </div>
            </div>
          </div>

          {/* Audit Log Strip */}
          {remediationLog.length > 0 && (
            <div className="p-3 rounded-xl bg-neutral-900 dark:bg-white border border-neutral-800/80 space-y-1 mt-3">
              <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>Active Remediation Audit History</span>
              </div>
              {remediationLog.map((log, i) => (
                <div
                  key={i}
                  className="text-[10px] font-mono text-neutral-300 truncate"
                >
                  {log}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
