import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTenantData } from "../hooks/useTenantData";
import { 
  BarChart, 
  Settings, 
  LogOut, 
  CheckCircle2, 
  Activity, 
  TrendingUp, 
  Zap, 
  AlertTriangle,
  FolderLock,
  RefreshCw,
  Database,
  TerminalSquare
} from "lucide-react";
import { PageId } from "../types";

export const ClientPortalPage: React.FC<{ onNavigate: (page: PageId) => void }> = ({ onNavigate }) => {
  const { user, logout } = useAuth();
  const { 
    workspace, 
    integrations, 
    aiActions, 
    isLoading, 
    updateActionStatus,
    connectIntegration,
    refreshData
  } = useTenantData();
  
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleLogout = () => {
    logout();
    onNavigate("home");
  };

  if (!user) {
    onNavigate("login");
    return null;
  }

  // Filter actions for the dashboard view
  const pendingActions = aiActions.filter(a => a.status === 'pending');
  const actionHistory = aiActions.filter(a => a.status !== 'pending');

  const ALL_INTEGRATIONS = [
    { id: 'google_analytics', name: 'Google Analytics', icon: BarChart },
    { id: 'google_ads', name: 'Google Ads', icon: Activity },
    { id: 'meta_ads', name: 'Meta Ads', icon: Activity },
    { id: 'stripe', name: 'Stripe', icon: Database },
    { id: 'hubspot', name: 'HubSpot CRM', icon: FolderLock },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="lg:w-64 shrink-0 space-y-6">
            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4 relative z-10">
                <FolderLock className="w-6 h-6 text-cyan-500" />
              </div>
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white truncate relative z-10">
                {workspace?.company_name || user.company || "My Workspace"}
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 truncate relative z-10">
                {user.email}
              </p>
              
              <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800 space-y-2 relative z-10">
                <button 
                  onClick={() => setActiveTab("dashboard")}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${activeTab === "dashboard" ? "bg-black dark:bg-white text-white dark:text-black" : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"}`}
                >
                  <BarChart className="w-4 h-4" />
                  Diagnostic Engine
                </button>
                <button 
                  onClick={() => setActiveTab("integrations")}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${activeTab === "integrations" ? "bg-black dark:bg-white text-white dark:text-black" : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"}`}
                >
                  <Database className="w-4 h-4" />
                  Unified Data
                </button>
                <button 
                  onClick={() => setActiveTab("actions")}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors ${activeTab === "actions" ? "bg-black dark:bg-white text-white dark:text-black" : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"}`}
                >
                  <div className="flex items-center gap-3">
                    <TerminalSquare className="w-4 h-4" />
                    AI Actions
                  </div>
                  {pendingActions.length > 0 && (
                    <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                      {pendingActions.length}
                    </span>
                  )}
                </button>
                <button 
                  onClick={() => setActiveTab("settings")}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${activeTab === "settings" ? "bg-black dark:bg-white text-white dark:text-black" : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"}`}
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors mt-4"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 space-y-6">
            
            {/* Show setup warning if workspace fetch failed (needs SQL schema run) */}
            {!workspace && !isLoading && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex gap-3 text-amber-700 dark:text-amber-400 text-sm">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <div>
                  <strong className="block font-bold">Database Configuration Required</strong>
                  To activate Phase 2 (Multi-Tenant SaaS Data Layer), you must run the provided <code className="bg-amber-500/20 px-1 py-0.5 rounded">supabase/schema.sql</code> file in your Supabase SQL Editor. 
                  Currently running in fallback presentation mode.
                </div>
              </div>
            )}

            {activeTab === "dashboard" && (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Welcome back, {user.name}</h1>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">Here is your live growth diagnostic overview.</p>
                  </div>
                  <button 
                    onClick={refreshData}
                    disabled={isLoading}
                    className="px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-mono text-xs font-bold rounded-xl hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors shadow-sm flex items-center gap-2 disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                    Sync Data
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
                    <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 text-xs font-mono mb-3">
                      <TrendingUp className="w-4 h-4" />
                      <span>Growth Score</span>
                    </div>
                    <div className="text-3xl font-bold text-neutral-900 dark:text-white">
                      {workspace?.growth_score || 0}<span className="text-sm text-neutral-400 font-normal">/100</span>
                    </div>
                    <div className="mt-2 text-xs text-emerald-500 font-medium flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> +12% this month
                    </div>
                  </div>
                  
                  <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
                    <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 text-xs font-mono mb-3">
                      <Activity className="w-4 h-4" />
                      <span>Active Integrations</span>
                    </div>
                    <div className="text-3xl font-bold text-neutral-900 dark:text-white">
                      {integrations.length}
                    </div>
                    <div className="mt-2 text-xs text-neutral-500 font-medium">
                      Feeding unified data layer
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
                    <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 text-xs font-mono mb-3">
                      <AlertTriangle className="w-4 h-4" />
                      <span>AI Recommendations</span>
                    </div>
                    <div className="text-3xl font-bold text-neutral-900 dark:text-white">
                      {pendingActions.length}
                    </div>
                    <div className="mt-2 text-xs text-amber-500 font-medium">
                      Pending approval
                    </div>
                  </div>
                </div>

                {/* Diagnostic Insights View */}
                <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 shadow-xl overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
                  
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 relative z-10">
                    <Zap className="w-5 h-5 text-cyan-400" />
                    Growth Diagnostic Engine
                  </h3>
                  
                  <div className="space-y-4 relative z-10">
                    {pendingActions.slice(0,2).map(action => (
                      <div key={action.id} className="p-4 rounded-xl border border-neutral-800 bg-neutral-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                            <h4 className="font-semibold text-white text-sm">{action.title}</h4>
                          </div>
                          <p className="text-xs text-neutral-400 mt-1">{action.description}</p>
                          <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/20">
                            <TrendingUp className="w-3 h-3" /> {action.impact_estimate}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button 
                            onClick={() => updateActionStatus(action.id, 'dismissed')}
                            className="px-3 py-1.5 rounded-lg border border-neutral-700 text-xs font-medium text-neutral-400 hover:bg-neutral-800 transition-colors"
                          >
                            Dismiss
                          </button>
                          <button 
                            onClick={() => updateActionStatus(action.id, 'approved')}
                            className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold transition-colors shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                          >
                            Approve Action
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    {pendingActions.length === 0 && (
                      <div className="text-center py-8 text-neutral-500 text-sm">
                        All diagnostics clear. The AI Engine is monitoring your data.
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {activeTab === "actions" && (
              <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">AI Action Governance</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">Review, approve, and audit AI-generated interventions for your business.</p>
                
                <div className="space-y-6">
                  {/* Pending Approvals */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-white border-b border-neutral-100 dark:border-neutral-800 pb-2">Awaiting Approval</h4>
                    {pendingActions.length > 0 ? pendingActions.map(action => (
                       <div key={action.id} className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <h4 className="font-semibold text-neutral-900 dark:text-white text-sm">{action.title}</h4>
                          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">{action.description}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button 
                            onClick={() => updateActionStatus(action.id, 'dismissed')}
                            className="px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                          >
                            Reject
                          </button>
                          <button 
                            onClick={() => updateActionStatus(action.id, 'approved')}
                            className="px-3 py-1.5 rounded-lg bg-black dark:bg-white text-white dark:text-black text-xs font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
                          >
                            Authorize
                          </button>
                        </div>
                       </div>
                    )) : (
                      <p className="text-xs text-neutral-500 italic">No pending actions.</p>
                    )}
                  </div>

                  {/* History */}
                  <div className="space-y-3 pt-4">
                     <h4 className="text-sm font-bold text-neutral-900 dark:text-white border-b border-neutral-100 dark:border-neutral-800 pb-2">Execution History</h4>
                     {actionHistory.length > 0 ? actionHistory.map(action => (
                       <div key={action.id} className="p-3 rounded-lg border border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                         <div className="flex items-center gap-3">
                           {action.status === 'approved' ? (
                             <div className="w-8 h-8 rounded bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                               <CheckCircle2 className="w-4 h-4" />
                             </div>
                           ) : (
                             <div className="w-8 h-8 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 flex items-center justify-center">
                               <LogOut className="w-4 h-4" />
                             </div>
                           )}
                           <div>
                             <p className="text-sm font-medium text-neutral-900 dark:text-white">{action.title}</p>
                             <p className="text-[10px] font-mono text-neutral-500 uppercase">{action.status}</p>
                           </div>
                         </div>
                       </div>
                     )) : (
                       <p className="text-xs text-neutral-500 italic">No history recorded yet.</p>
                     )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "integrations" && (
              <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">Unified Data Layer</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">Connect external sources to populate your tenant's isolated data lake.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ALL_INTEGRATIONS.map((tool) => {
                    const isConnected = integrations.some(i => i.provider === tool.id && i.status === 'connected');
                    const Icon = tool.icon;
                    
                    return (
                      <div key={tool.id} className={`p-4 rounded-xl border transition-colors flex items-center justify-between ${isConnected ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-neutral-200 dark:border-neutral-800'}`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isConnected ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400'}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-neutral-900 dark:text-white text-sm">{tool.name}</h4>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">
                              {isConnected ? "Connected & Syncing" : "Not connected"}
                            </p>
                          </div>
                        </div>
                        {isConnected ? (
                          <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                            <CheckCircle2 className="w-4 h-4" /> Active
                          </span>
                        ) : (
                          <button 
                            onClick={() => connectIntegration(tool.id)}
                            className="text-xs font-medium text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer"
                          >
                            Connect
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            {activeTab === "settings" && (
              <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">Tenant Settings</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">Manage your MAHA Growth isolated workspace configuration.</p>
                
                <div className="space-y-4 max-w-xl">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Workspace ID (UUID)</label>
                    <input 
                      type="text" 
                      readOnly 
                      value={workspace?.id || "Pending database creation..."} 
                      className="w-full px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 font-mono text-xs" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Company Name</label>
                    <input 
                      type="text" 
                      defaultValue={workspace?.company_name || user.company} 
                      className="w-full px-4 py-2 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white text-sm focus:border-cyan-500 focus:outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Admin Email</label>
                    <input 
                      type="email" 
                      defaultValue={user.email} 
                      readOnly
                      className="w-full px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm" 
                    />
                  </div>
                  <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 mt-6">
                    <button className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black font-medium text-sm rounded-lg transition-colors cursor-pointer shadow-md">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
};
