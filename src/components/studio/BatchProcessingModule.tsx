import React, { useState } from "react";
import {
  UploadCloud,
  FileSpreadsheet,
  FileText,
  Presentation,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Download,
  Trash2,
  Database,
  Lock,
  FileCode,
  Layers,
  Sparkles,
  RefreshCw,
  ExternalLink,
} from "lucide-react";

interface BatchFileItem {
  id: string;
  name: string;
  size: string;
  type: "excel" | "pdf" | "ppt" | "json";
  progress: number;
  status: "uploading" | "processing" | "verified" | "error";
  extractedRows: number;
  metricCount: number;
}

interface ExportAuditLog {
  id: string;
  timestamp: string;
  actor: string;
  target: string;
  recordCount: number;
  sha256: string;
  complianceLevel: string;
  status: "SUCCESS" | "ENCRYPTED";
}

export const BatchProcessingModule: React.FC = () => {
  const [batchFiles, setBatchFiles] = useState<BatchFileItem[]>([
    {
      id: "f-1",
      name: "FY2025_Q4_Financial_Telemetry.xlsx",
      size: "2.4 MB",
      type: "excel",
      progress: 100,
      status: "verified",
      extractedRows: 14800,
      metricCount: 16,
    },
    {
      id: "f-2",
      name: "Executive_Board_Expansion_Deck.pptx",
      size: "8.1 MB",
      type: "ppt",
      progress: 100,
      status: "verified",
      extractedRows: 240,
      metricCount: 8,
    },
    {
      id: "f-3",
      name: "Regional_Logistics_Fulfillment_Audit.pdf",
      size: "4.7 MB",
      type: "pdf",
      progress: 85,
      status: "processing",
      extractedRows: 1250,
      metricCount: 11,
    },
  ]);

  const [auditLogs, setAuditLogs] = useState<ExportAuditLog[]>([
    {
      id: "LOG-8924",
      timestamp: "2026-03-12 10:24:18 UTC",
      actor: "system.service_account@mahagrowth.com",
      target: "Power BI Service (Production Workspace)",
      recordCount: 14800,
      sha256:
        "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
      complianceLevel: "SOC2 Type II / HIPAA Verified",
      status: "SUCCESS",
    },
    {
      id: "LOG-8923",
      timestamp: "2026-03-12 09:48:02 UTC",
      actor: "lead_architect@mahagrowth.com",
      target: "Snowflake Enterprise Data Warehouse",
      recordCount: 42500,
      sha256:
        "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
      complianceLevel: "ISO 27001 Compliant",
      status: "ENCRYPTED",
    },
    {
      id: "LOG-8922",
      timestamp: "2026-03-12 08:15:44 UTC",
      actor: "telemetry_daemon@mahagrowth.com",
      target: "Google BigQuery Real-Time Stream",
      recordCount: 89000,
      sha256:
        "4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a",
      complianceLevel: "GDPR / CCPA Audited",
      status: "SUCCESS",
    },
  ]);

  const [isSimulatingBatch, setIsSimulatingBatch] = useState(false);

  // Simulate bulk file addition
  const handleAddSampleBatch = () => {
    setIsSimulatingBatch(true);
    const newItems: BatchFileItem[] = [
      {
        id: `f-${Date.now()}-1`,
        name: "SaaS_Cohort_Retention_Matrix.csv",
        size: "1.8 MB",
        type: "excel",
        progress: 20,
        status: "uploading",
        extractedRows: 8200,
        metricCount: 9,
      },
      {
        id: `f-${Date.now()}-2`,
        name: "Enterprise_Ad_Spend_Breakdown.pdf",
        size: "3.2 MB",
        type: "pdf",
        progress: 15,
        status: "uploading",
        extractedRows: 450,
        metricCount: 6,
      },
    ];

    setBatchFiles((prev) => [...newItems, ...prev]);

    // Animate progress
    let p = 20;
    const interval = setInterval(() => {
      p += 25;
      setBatchFiles((current) =>
        current.map((item) => {
          if (item.id === newItems[0].id || item.id === newItems[1].id) {
            const nextP = Math.min(100, p);
            return {
              ...item,
              progress: nextP,
              status: nextP === 100 ? "verified" : "processing",
            };
          }
          return item;
        }),
      );

      if (p >= 100) {
        clearInterval(interval);
        setIsSimulatingBatch(false);

        // Append to audit logs
        const newLog: ExportAuditLog = {
          id: `LOG-${Math.floor(Math.random() * 8000 + 1000)}`,
          timestamp:
            new Date().toISOString().replace("T", " ").substring(0, 19) +
            " UTC",
          actor: "active_session.operator@mahagrowth.com",
          target: "Power BI Service Direct Pipeline",
          recordCount: 8650,
          sha256:
            "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
          complianceLevel: "SOC2 Type II Verified",
          status: "SUCCESS",
        };
        setAuditLogs((prev) => [newLog, ...prev]);
      }
    }, 450);
  };

  const handleClearCompleted = () => {
    setBatchFiles((prev) => prev.filter((f) => f.status !== "verified"));
  };

  const downloadComplianceLedger = () => {
    const dataStr = JSON.stringify(auditLogs, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mahagrowth_enterprise_export_compliance_ledger_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-neutral-900 dark:bg-white border border-neutral-800 space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white dark:text-neutral-900 flex items-center gap-2">
                <span>
                  Batch Ingestion Queue &amp; Enterprise Compliance Logs
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-400 font-semibold">
                  Audit Ready
                </span>
              </h3>
              <p className="text-xs text-neutral-400">
                Bulk ingestion for simultaneous PDFs, PPTXs, and Excel sheets
                with cryptographic SHA-256 compliance auditing.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAddSampleBatch}
              disabled={isSimulatingBatch}
              className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-neutral-900 dark:text-white text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer shadow-sm transition-all disabled:opacity-50"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${isSimulatingBatch ? "animate-spin" : ""}`}
              />
              <span>Simulate Bulk Ingest</span>
            </button>
            <button
              onClick={handleClearCompleted}
              className="px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Done</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Ingestion Queue List */}
      <div className="p-6 rounded-2xl bg-neutral-900 dark:bg-white border border-neutral-800 space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <h4 className="text-sm font-bold text-white dark:text-neutral-900 flex items-center gap-2">
            <UploadCloud className="w-4 h-4 text-cyan-400" />
            <span>
              Active Batch Processing Queue ({batchFiles.length} files)
            </span>
          </h4>
          <span className="text-[10px] font-mono text-neutral-400">
            Auto-Schema Alignment Active
          </span>
        </div>

        <div className="space-y-3">
          {batchFiles.map((file) => (
            <div
              key={file.id}
              className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-cyan-400 shrink-0">
                    {file.type === "excel" ? (
                      <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                    ) : file.type === "ppt" ? (
                      <Presentation className="w-4 h-4 text-amber-400" />
                    ) : (
                      <FileText className="w-4 h-4 text-rose-400" />
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white dark:text-neutral-900 font-mono">
                      {file.name}
                    </div>
                    <div className="text-[10px] font-mono text-neutral-400">
                      Size: {file.size} • Extracted{" "}
                      {file.extractedRows.toLocaleString()} rows •{" "}
                      {file.metricCount} continuous metrics
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                      file.status === "verified"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                    }`}
                  >
                    {file.status === "verified"
                      ? "Verified Clean"
                      : `Processing ${file.progress}%`}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    file.status === "verified"
                      ? "bg-emerald-500"
                      : "bg-cyan-400"
                  }`}
                  style={{ width: `${file.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance & Cryptographic Export Audit Log */}
      <div className="p-6 rounded-2xl bg-neutral-900 dark:bg-white border border-neutral-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-neutral-800 pb-3">
          <div>
            <h4 className="text-sm font-bold text-white dark:text-neutral-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>
                Verifiable Export Audit Ledger (Enterprise Compliance)
              </span>
            </h4>
            <p className="text-xs text-neutral-400">
              Tamper-evident logs with SHA-256 cryptographic signatures for
              SOC2, HIPAA, and GDPR audit verification.
            </p>
          </div>

          <button
            onClick={downloadComplianceLedger}
            className="px-3.5 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white dark:text-neutral-900 text-xs font-mono flex items-center gap-1.5 border border-neutral-700 cursor-pointer transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Download Ledger (.json)</span>
          </button>
        </div>

        {/* Audit Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-400 text-[10px] uppercase">
                <th className="py-2.5 px-3">Log Ref</th>
                <th className="py-2.5 px-3">Timestamp (UTC)</th>
                <th className="py-2.5 px-3">Export Destination</th>
                <th className="py-2.5 px-3">Volume</th>
                <th className="py-2.5 px-3">Cryptographic SHA-256 Checksum</th>
                <th className="py-2.5 px-3">Compliance</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              {auditLogs.map((log) => (
                <tr
                  key={log.id}
                  className="hover:bg-neutral-800/30 transition-colors"
                >
                  <td className="py-3 px-3 font-bold text-cyan-400">
                    {log.id}
                  </td>
                  <td className="py-3 px-3 text-neutral-300">
                    {log.timestamp}
                  </td>
                  <td className="py-3 px-3 text-white dark:text-neutral-900 font-medium">
                    {log.target}
                  </td>
                  <td className="py-3 px-3 text-neutral-300">
                    {log.recordCount.toLocaleString()} rows
                  </td>
                  <td
                    className="py-3 px-3 text-neutral-400 font-mono text-[10px] max-w-[180px] truncate"
                    title={log.sha256}
                  >
                    {log.sha256.substring(0, 16)}...
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                      {log.complianceLevel}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{log.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
