import React, { useState, useEffect } from "react";
import { AuthUser, PageId } from "../types";
import {
  ShieldCheck,
  Building,
  Mail,
  Activity,
  Workflow,
  Users,
  ArrowRight,
  LogOut,
  Play,
  RefreshCw,
  Sparkles,
  Database,
} from "lucide-react";

interface AuthWorkspaceViewProps {
  user: AuthUser;
  onNavigate: (page: PageId, anchorId?: string) => void;
  onLogout: () => void;
  getAuthHeaders: () => Record<string, string>;
}

export const AuthWorkspaceView: React.FC<AuthWorkspaceViewProps> = ({
  user,
  onNavigate,
  onLogout,
  getAuthHeaders,
}) => {
  const isAdmin = user.role === "admin";

  // Admin Data State
  const [leads, setLeads] = useState<any[]>([]);
  const [workflows, setWorkflows] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<any | null>(null);
  const [diagnostics, setDiagnostics] = useState<any[]>([]);

  const [loadingData, setLoadingData] = useState(false);
  const [triggeringWorkflowId, setTriggeringWorkflowId] = useState<
    string | null
  >(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Load telemetry and data
  const loadWorkspaceData = async () => {
    setLoadingData(true);
    try {
      const headers = getAuthHeaders();

      // Diagnostics for both admin & clients
      const diagRes = await fetch("/api/diagnostics", { headers });
      if (diagRes.ok) {
        const dData = await diagRes.json();
        setDiagnostics(dData.diagnostics || []);
      }

      if (isAdmin) {
        // Fetch CRM leads
        const leadsRes = await fetch("/api/crm/leads", { headers });
        if (leadsRes.ok) {
          const lData = await leadsRes.json();
          setLeads(lData.leads || []);
        }

        // Fetch Automations
        const wfRes = await fetch("/api/automations", { headers });
        if (wfRes.ok) {
          const wData = await wfRes.json();
          setWorkflows(wData.workflows || []);
        }

        // Fetch Metrics
        const mRes = await fetch("/api/monitoring/metrics", { headers });
        if (mRes.ok) {
          const mData = await mRes.json();
          setMetrics(mData);
        }
      }
    } catch (e) {
      console.error("Failed to fetch workspace data:", e);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    loadWorkspaceData();
  }, [user]);

  // Dispatch workflow
  const handleTriggerWorkflow = async (workflowId: string, name: string) => {
    setTriggeringWorkflowId(workflowId);
    setActionNotice(null);
    try {
      const headers = getAuthHeaders();
      const res = await fetch(`/api/automations/${workflowId}/trigger`, {
        method: "POST",
        headers,
      });
      const data = await res.json();
      if (res.ok) {
        setActionNotice(
          `Dispatched: "${name}". Execution ID: ${data.executionId}`,
        );
        // Refresh workflows
        loadWorkspaceData();
      } else {
        setActionNotice(
          `Workflow execution failed: ${data.error?.message || "Server error"}`,
        );
      }
    } catch (e: any) {
      setActionNotice(`Dispatch error: ${e.message}`);
    } finally {
      setTriggeringWorkflowId(null);
    }
  };

  // Update lead status
  const handleUpdateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      const headers = getAuthHeaders();
      const res = await fetch(`/api/crm/leads/${leadId}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setActionNotice(
          `Lead status updated to "${newStatus.replace("_", " ").toUpperCase()}".`,
        );
        loadWorkspaceData();
      }
    } catch (e: any) {
      setActionNotice(`Failed to update lead: ${e.message}`);
    }
  };

  // Toggle workflow status
  const handleToggleWorkflow = async (workflowId: string) => {
    try {
      const headers = getAuthHeaders();
      const res = await fetch(`/api/automations/${workflowId}/toggle`, {
        method: "POST",
        headers,
      });
      const data = await res.json();
      if (res.ok && data.workflow) {
        setActionNotice(
          `Workflow "${data.workflow.name}" is now ${data.workflow.status.toUpperCase()}.`,
        );
        loadWorkspaceData();
      }
    } catch (e: any) {
      setActionNotice(`Failed to toggle workflow: ${e.message}`);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in text-neutral-900 dark:text-white">
      {/* User Session Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 relative overflow-hidden shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-6 relative z-10">
          <div className="flex items-center gap-4">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-neutral-900 dark:border-white shadow-xs"
              />
            ) : (
              <div className="w-14 h-14 rounded-2xl bg-neutral-900 dark:bg-white border border-neutral-900 dark:border-white flex items-center justify-center text-white dark:text-neutral-900 font-extrabold text-xl font-mono">
                {user.name.charAt(0)}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
                  {user.name}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-neutral-900 dark:bg-white text-white dark:text-neutral-900">
                  {isAdmin ? "Founder & Admin" : user.role}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-600 dark:text-neutral-300 font-mono mt-1">
                <span className="flex items-center gap-1 text-neutral-900 dark:text-white font-medium">
                  <Mail className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
                  {user.email}
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1 text-neutral-900 dark:text-white font-medium">
                  <Building className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
                  {user.company || "Enterprise Partner"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadWorkspaceData}
              disabled={loadingData}
              className="p-2.5 rounded-xl bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white transition-all text-xs font-mono flex items-center gap-1.5 cursor-pointer shadow-2xs"
              title="Refresh Telemetry"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${loadingData ? "animate-spin text-neutral-900 dark:text-white" : "text-neutral-900 dark:text-white"}`}
              />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              onClick={onLogout}
              className="px-3.5 py-2 rounded-xl bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Security & Ownership Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono relative z-10">
          <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center gap-2.5 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-neutral-900 dark:text-white shrink-0" />
            <div>
              <div className="text-neutral-900 dark:text-white font-bold">
                100% Code &amp; Data Ownership
              </div>
              <div className="text-[10px] text-neutral-500 dark:text-neutral-400">
                Zero vendor lock-in &bull; Full IP rights
              </div>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center gap-2.5 shadow-2xs">
            <Database className="w-4 h-4 text-neutral-900 dark:text-white shrink-0" />
            <div>
              <div className="text-neutral-900 dark:text-white font-bold">
                Real State Persistence
              </div>
              <div className="text-[10px] text-neutral-500 dark:text-neutral-400">
                Encrypted JWT tokens &bull; Live DB sync
              </div>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center gap-2.5 shadow-2xs">
            <Sparkles className="w-4 h-4 text-neutral-900 dark:text-white shrink-0" />
            <div>
              <div className="text-neutral-900 dark:text-white font-bold">
                Autonomous Flywheel Active
              </div>
              <div className="text-[10px] text-neutral-500 dark:text-neutral-400">
                24/7 Agent Mesh &amp; CRM routing
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Notice Alert */}
      {actionNotice && (
        <div className="p-3.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white text-xs font-mono flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-neutral-900 dark:text-white animate-pulse" />
            <span>{actionNotice}</span>
          </div>
          <button
            onClick={() => setActionNotice(null)}
            className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white text-xs font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ADMIN COMMAND CENTER: Leads, Telemetry & Workflow Execution */}
      {/* ========================================================================= */}
      {isAdmin ? (
        <div className="space-y-8">
          {/* Executive Telemetry Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-1 shadow-xs">
              <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase">
                Active Pipeline Leads
              </div>
              <div className="text-2xl font-extrabold text-neutral-900 dark:text-white font-mono">
                {leads.length}
              </div>
              <div className="text-[10px] text-neutral-600 dark:text-neutral-300 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white animate-ping" />
                Live Inbound Intake
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-1 shadow-xs">
              <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase">
                Growth Blueprints
              </div>
              <div className="text-2xl font-extrabold text-neutral-900 dark:text-white font-mono">
                {diagnostics.length}
              </div>
              <div className="text-[10px] text-neutral-600 dark:text-neutral-300 font-mono">
                {metrics?.geminiStatus === "operational"
                  ? "Gemini AI Operational"
                  : "Offline Ready"}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-1 shadow-xs">
              <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase">
                Active Automations
              </div>
              <div className="text-2xl font-extrabold text-neutral-900 dark:text-white font-mono">
                {workflows.length}
              </div>
              <div className="text-[10px] text-neutral-600 dark:text-neutral-300 font-mono">
                {workflows.reduce((acc, w) => acc + (w.runsCount || 0), 0)}{" "}
                Total Runs Dispatched
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-1 shadow-xs">
              <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase">
                System Uptime
              </div>
              <div className="text-2xl font-extrabold text-neutral-900 dark:text-white font-mono">
                {metrics?.uptimeSeconds
                  ? `${Math.floor(metrics.uptimeSeconds / 60)}m ${metrics.uptimeSeconds % 60}s`
                  : "99.99%"}
              </div>
              <div className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono">
                Latency: {metrics?.avgLatencyMs || 38}ms
              </div>
            </div>
          </div>

          {/* Inbound Lead Pipeline Inspector */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 space-y-5 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <div>
                <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase font-bold flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                  <span>CRM LEADS &amp; INTAKE DOSSIERS</span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                  Live Enterprise Growth Inquiries
                </h3>
              </div>
              <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                {leads.length} Verified Records in Database
              </span>
            </div>

            <div className="space-y-3">
              {leads.length === 0 ? (
                <div className="p-6 text-center text-neutral-500 dark:text-neutral-400 font-mono text-xs">
                  No leads recorded yet. Submissions through the contact form or
                  diagnostic will populate here automatically.
                </div>
              ) : (
                leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-900 transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-neutral-900 dark:text-white">
                            {lead.name}
                          </span>
                          <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                            ({lead.company})
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-800">
                            {lead.priority} priority
                          </span>
                        </div>
                        <div className="text-xs text-neutral-600 dark:text-neutral-300 font-mono mt-0.5">
                          {lead.email}
                        </div>
                      </div>

                      {/* Status Selector */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 mr-1">
                          Status:
                        </span>
                        {(
                          [
                            "new",
                            "dossier_prepared",
                            "call_scheduled",
                            "active_sprint",
                            "closed_won",
                          ] as const
                        ).map((st) => (
                          <button
                            key={st}
                            onClick={() => handleUpdateLeadStatus(lead.id, st)}
                            className={`px-2 py-1 rounded text-[10px] font-mono transition-all cursor-pointer ${
                              lead.status === st
                                ? "bg-neutral-900 dark:bg-white dark:bg-white text-white dark:text-neutral-900 font-bold"
                                : "bg-white dark:bg-neutral-900 dark:bg-white text-neutral-600 hover:text-neutral-900 dark:hover:text-white dark:hover:text-neutral-900 dark:text-white dark:text-neutral-900 dark:text-white dark:text-neutral-900 border border-neutral-200"
                            }`}
                          >
                            {st.replace("_", " ")}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="text-xs font-sans bg-white dark:bg-neutral-900 p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800">
                      <div className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 mb-1">
                        Challenge:{" "}
                        <span className="text-neutral-900 dark:text-white font-medium">
                          {lead.primaryChallenge}
                        </span>{" "}
                        &bull; Stage:{" "}
                        <span className="text-neutral-700 dark:text-neutral-300">{lead.stage}</span>
                      </div>
                      <p className="text-neutral-700 dark:text-neutral-300 text-xs italic">
                        &ldquo;
                        {lead.message ||
                          lead.notes ||
                          "Inquiry registered from website."}
                        &rdquo;
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Autonomous Workflows Control Center */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 space-y-5 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <div>
                <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase font-bold flex items-center gap-1.5">
                  <Workflow className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                  <span>DISPATCH ENGINE</span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                  Automated Backend Operations
                </h3>
              </div>
              <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                Self-Executing Operational Pipelines
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {workflows.map((wf) => (
                <div
                  key={wf.id}
                  className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-neutral-900 dark:text-white uppercase font-bold px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-800">
                        {wf.category}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleToggleWorkflow(wf.id)}
                          className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider uppercase transition-all cursor-pointer ${
                            wf.status === "active"
                              ? "bg-neutral-900 dark:bg-white dark:bg-white text-white dark:text-neutral-900"
                              : "bg-neutral-200 text-neutral-600 border border-neutral-300"
                          }`}
                          title="Click to toggle Active/Paused status"
                        >
                          {wf.status}
                        </button>
                        <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
                          {wf.runsCount} runs
                        </span>
                      </div>
                    </div>

                    <div className="text-sm font-bold text-neutral-900 dark:text-white">
                      {wf.name}
                    </div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                      Trigger:{" "}
                      <span className="text-neutral-800 dark:text-neutral-300 font-medium">
                        {wf.trigger}
                      </span>
                    </div>
                    <div className="space-y-1 pt-1">
                      {wf.actions.map((act: string, idx: number) => (
                        <div
                          key={idx}
                          className="text-[10px] text-neutral-600 dark:text-neutral-300 flex items-center gap-1"
                        >
                          <span className="text-neutral-900 dark:text-white font-bold">
                            &bull;
                          </span>{" "}
                          {act}
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleTriggerWorkflow(wf.id, wf.name)}
                    disabled={triggeringWorkflowId === wf.id}
                    className="w-full mt-2 py-2 rounded-lg bg-neutral-900 dark:bg-white hover:bg-neutral-800 text-white dark:text-neutral-900 font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {triggeringWorkflowId === wf.id ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-white dark:text-neutral-900" />
                    ) : (
                      <Play className="w-3.5 h-3.5 text-white dark:text-neutral-900" />
                    )}
                    <span>Trigger Pipeline</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* CLIENT PORTAL: Diagnostic Blueprints & Custom Growth Roadmap */
        /* ========================================================================= */
        <div className="space-y-8">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <div>
                <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                  <span>CLIENT GROWTH DOSSIER</span>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                  Your Tailored 90-Day Blueprints
                </h3>
              </div>
              <button
                onClick={() => onNavigate("diagnostic")}
                className="px-3.5 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-mono font-semibold flex items-center gap-1.5 hover:bg-neutral-800 transition cursor-pointer"
              >
                <span>Run New Diagnostic</span>
                <ArrowRight className="w-3.5 h-3.5 text-white dark:text-neutral-900" />
              </button>
            </div>

            <div className="space-y-4">
              {diagnostics.length === 0 ? (
                <div className="p-8 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 text-center space-y-3">
                  <Sparkles className="w-8 h-8 text-neutral-900 dark:text-white mx-auto" />
                  <div className="text-sm font-bold text-neutral-900 dark:text-white">
                    No Growth Blueprint Created Yet
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 max-w-md mx-auto">
                    Use our interactive Growth Diagnostic Engine to analyze your
                    bottlenecks and formulate your priority 3-pillar growth
                    stack.
                  </p>
                  <button
                    onClick={() => onNavigate("diagnostic")}
                    className="px-4 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-mono text-xs font-semibold hover:bg-neutral-800 transition cursor-pointer"
                  >
                    Calculate Diagnostic Blueprint &rarr;
                  </button>
                </div>
              ) : (
                diagnostics.map((diag) => (
                  <div
                    key={diag.id}
                    className="p-5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-800 text-xs font-mono font-bold">
                          Stage: {diag.stage}
                        </span>
                        <span className="text-sm font-bold text-neutral-900 dark:text-white">
                          {diag.company}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
                        Generated{" "}
                        {new Date(diag.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                      <div className="p-2.5 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                        <div className="text-[10px] text-neutral-500 dark:text-neutral-400">
                          Projected Impact
                        </div>
                        <div className="font-bold text-neutral-900 dark:text-white">
                          {diag.computedRoi}
                        </div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                        <div className="text-[10px] text-neutral-500 dark:text-neutral-400">
                          Hours Recoverable
                        </div>
                        <div className="font-bold text-neutral-900 dark:text-white">
                          {diag.hoursRecoverable}
                        </div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                        <div className="text-[10px] text-neutral-500 dark:text-neutral-400">
                          Target ARR
                        </div>
                        <div className="font-bold text-neutral-900 dark:text-white">
                          {diag.targetArr}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                        Recommended Priority Stack:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {diag.priorityStack?.map((p: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-2 py-1 rounded bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-[11px] text-neutral-800 dark:text-neutral-300 font-mono"
                          >
                            ✓ {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Quick Launchpad Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => onNavigate("home", "ecosystem")}
          className="p-5 rounded-2xl bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-900 text-left transition-all group space-y-2 cursor-pointer shadow-xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 font-bold uppercase">
              AUTONOMOUS ECOSYSTEM
            </span>
            <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-1 transition-all" />
          </div>
          <div className="font-bold text-neutral-900 dark:text-white text-sm">
            Review 24/7 Growth Flywheel
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-300">
            Explore the 5 integrated layers that automate operations and expand
            market presence.
          </p>
        </button>

        <button
          onClick={() => onNavigate("ai-advantage")}
          className="p-5 rounded-2xl bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-900 text-left transition-all group space-y-2 cursor-pointer shadow-xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 font-bold uppercase">
              AI ADVANTAGE
            </span>
            <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-1 transition-all" />
          </div>
          <div className="font-bold text-neutral-900 dark:text-white text-sm">
            Interactive AI Sandbox
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-300">
            Simulate 24/7 concierges, marketing copilots, and executive
            intelligence query engines.
          </p>
        </button>

        <button
          onClick={() => onNavigate("contact")}
          className="p-5 rounded-2xl bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-900 text-left transition-all group space-y-2 cursor-pointer shadow-xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 font-bold uppercase">
              STRATEGY SESSION
            </span>
            <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-1 transition-all" />
          </div>
          <div className="font-bold text-neutral-900 dark:text-white text-sm">
            Schedule Strategy Call
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-300">
            Book a 30-minute walkthrough with our architects to audit your
            current stack.
          </p>
        </button>
      </div>
    </div>
  );
};
