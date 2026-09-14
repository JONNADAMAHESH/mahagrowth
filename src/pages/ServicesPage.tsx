import React, { useState, useEffect } from "react";
import { PageId } from "../types";
import { 
  Database, 
  Workflow, 
  Bot, 
  ShieldCheck, 
  BarChart, 
  ArrowRight, 
  Lock, 
  Bell, 
  Zap, 
  LineChart, 
  Users,
  CheckCircle2,
  Server,
  Activity,
  Layers, UserPlus, LayoutDashboard, PieChart, ShieldAlert, Cpu
} from "lucide-react";

interface ServicesPageProps {
  onNavigate: (page: PageId) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  // --- REAL-TIME BACKEND STREAM (SSE) ---
  const [trafficStatus, setTrafficStatus] = useState("Connecting...");
  const [convRate, setConvRate] = useState("Syncing");
  const [notifications, setNotifications] = useState<any[]>([]);
  const [revenue, setRevenue] = useState(0);
  const [workflows, setWorkflows] = useState<any[]>([]);

  useEffect(() => {
    // Connect directly to the Node.js / MySQL backend stream
    const eventSource = new EventSource('/api/stream/platform');

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.trafficStatus) setTrafficStatus(data.trafficStatus);
        if (data.convRate) setConvRate(data.convRate);
        if (data.revenue) setRevenue(data.revenue);
        if (data.notifications) setNotifications(data.notifications);
        if (data.workflows) setWorkflows(data.workflows);
      } catch (err) {
        console.error("Error parsing live stream data", err);
      }
    };

    eventSource.onerror = (err) => {
      console.error("Live stream connection lost, retrying...", err);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 pt-24 pb-20 font-sans">
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 mb-20 pt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-bold border border-cyan-500/20">
          <Server className="w-4 h-4" />
          <span>MULTI-TENANT SAAS ARCHITECTURE</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-neutral-900 dark:text-white tracking-tight max-w-4xl mx-auto leading-tight">
          A Real Growth Operating System. <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">Not Just Another Agency.</span>
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-lg leading-relaxed">
          MAHA Growth is a fully integrated, self-serve SaaS platform. Connect your data, let our AI diagnose bottlenecks, and approve autonomous actions—all from a secure client portal.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <button 
            onClick={() => onNavigate("login")}
            className="px-8 py-4 rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold text-sm shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-105 transition-transform"
          >
            Create Free Workspace
          </button>
        </div>
      </div>

      {/* Architecture Diagram Visual */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="p-8 rounded-3xl bg-neutral-950 border border-neutral-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="text-center mb-10 relative z-10">
            <h2 className="text-2xl font-bold text-white font-mono">MAHA GROWTH SAAS ARCHITECTURE</h2>
            <p className="text-neutral-500 text-sm mt-2">End-to-End Autonomous Growth Pipeline</p>
          </div>

          <div className="flex flex-col items-center gap-4 relative z-10 font-mono text-xs">
            
            {/* Client Portal */}
            <div className="w-64 py-3 rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-center font-bold shadow-[0_0_15px_rgba(6,182,212,0.1)]">
              CLIENT PORTAL
            </div>
            <div className="h-6 w-px bg-neutral-700"></div>
            
            {/* Auth / RBAC */}
            <div className="w-64 py-3 rounded-lg border border-neutral-700 bg-neutral-900 text-neutral-300 text-center flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Authentication & RBAC
            </div>
            <div className="h-6 w-px bg-neutral-700"></div>
            
            {/* SaaS Backend */}
            <div className="w-80 py-4 rounded-lg border border-neutral-600 bg-neutral-800 text-white text-center font-bold flex flex-col items-center">
              <span>SAAS API BACKEND</span>
              <span className="text-neutral-400 text-[10px] mt-1">(FastAPI / Node.js)</span>
            </div>
            
            <div className="flex gap-16 mt-4">
               <div className="flex flex-col items-center">
                 <div className="h-6 w-px bg-neutral-700"></div>
                 {/* Unified Data */}
                 <div className="w-48 py-4 rounded-lg border border-blue-500/30 bg-blue-500/10 text-blue-400 text-center flex flex-col items-center gap-2">
                   <Database className="w-5 h-5" />
                   Unified Data Layer
                 </div>
               </div>
               <div className="flex flex-col items-center">
                 <div className="h-6 w-px bg-neutral-700"></div>
                 {/* Growth Diagnostic Engine */}
                 <div className="w-48 py-4 rounded-lg border border-purple-500/30 bg-purple-500/10 text-purple-400 text-center flex flex-col items-center gap-2">
                   <Activity className="w-5 h-5" />
                   Growth Diagnostic Engine
                 </div>
               </div>
            </div>

            <div className="h-10 w-px bg-neutral-700 mt-4"></div>

            {/* AI Action Engine */}
            <div className="w-96 py-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-center font-bold flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <Bot className="w-5 h-5" /> AI ACTION ENGINE
            </div>
            <div className="h-6 w-px bg-neutral-700"></div>

            {/* Approval */}
            <div className="w-64 py-3 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-400 text-center font-bold flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Approval & Control
            </div>
            <div className="h-6 w-px bg-neutral-700"></div>

            {/* Integrations */}
            <div className="w-full max-w-2xl p-4 rounded-xl border border-neutral-800 bg-black text-neutral-400 text-center">
              <div className="font-bold text-white mb-3 flex items-center justify-center gap-2">
                <Layers className="w-4 h-4" /> Real Integrations
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {['Google Analytics', 'Meta Ads', 'CRM', 'Stripe', 'Slack', 'APIs & Webhooks'].map(i => (
                  <span key={i} className="px-3 py-1 rounded bg-neutral-900 border border-neutral-800 text-[10px]">{i}</span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      
      {/* Exhaustive Features List: Premium Bento Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">Comprehensive Platform Capabilities</h2>
          <p className="text-neutral-500 mt-2">Every feature you need to scale, built directly into your tenant workspace.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">
          
          {/* 1. Customer Onboarding - Span 2 */}
          <div className="md:col-span-2 p-6 rounded-3xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-cyan-500/20 transition-all" />
            <div className="flex gap-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0">
                <UserPlus className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">1. Frictionless Onboarding</h3>
                <p className="text-sm text-neutral-400 mb-4">Self-serve registration tailored to your industry, business size, and specific revenue goals.</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-cyan-500 rounded-full" />
                  </div>
                  <span className="text-[10px] font-mono text-cyan-500 font-bold uppercase">75% Setup</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Unified Data Layer - Span 2 */}
          <div className="md:col-span-2 p-6 rounded-3xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all group relative overflow-hidden">
             <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-blue-500/20 transition-all" />
             <div className="relative z-10 h-full flex flex-col justify-between">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                    <Database className="w-4 h-4 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">3. Unified Data Layer</h3>
               </div>
               <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                 <span className="text-white">Ingest</span>
                 <ArrowRight className="w-3 h-3 text-blue-500/50" />
                 <span className="text-white">Validate</span>
                 <ArrowRight className="w-3 h-3 text-blue-500/50" />
                 <span className="text-white">Unify</span>
                 <ArrowRight className="w-3 h-3 text-blue-500/50" />
                 <span className="text-blue-400 font-bold">Actions</span>
               </div>
             </div>
          </div>

          {/* 4. Growth Diagnostic Engine - Span 1 (Tall) */}
          <div className="md:row-span-2 p-6 rounded-3xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all group relative overflow-hidden flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none" />
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-4 relative z-10">
              <Activity className="w-4 h-4 text-purple-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 relative z-10">4. Growth Diagnostic Engine</h3>
            <p className="text-sm text-neutral-400 mb-6 relative z-10 flex-1">
              Continuously monitors traffic, conversion rates, and CAC to automatically isolate funnel bottlenecks.
            </p>
            <div className="space-y-2 relative z-10">
               <div className="flex justify-between items-center text-xs font-mono">
                 <span className="text-neutral-500">Traffic</span>
                 <span className={`font-bold transition-colors duration-500 ${trafficStatus === "Healthy" || trafficStatus === "Stable" ? "text-emerald-400" : "text-cyan-400"}`}>{trafficStatus}</span>
               </div>
               <div className="flex justify-between items-center text-xs font-mono">
                 <span className="text-neutral-500">Conv. Rate</span>
                 <span className={`font-bold transition-colors duration-500 ${convRate === "Dropping" ? "text-amber-400" : convRate === "Rising" ? "text-emerald-400" : "text-neutral-400"}`}>{convRate}</span>
               </div>
               <div className="flex justify-between items-center text-xs font-mono pt-2 border-t border-neutral-800">
                 <span className="text-purple-400 font-bold">Opportunity Identified</span>
               </div>
            </div>
          </div>

          {/* 5. Actual AI Actions */}
          <div className="md:col-span-2 p-6 rounded-3xl bg-neutral-950 border border-emerald-500/30 hover:border-emerald-500/50 transition-all shadow-[0_0_30px_rgba(16,185,129,0.05)] group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-emerald-500/10 to-transparent pointer-events-none" />
            <div className="flex gap-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">5. Actual AI Actions</h3>
                <p className="text-sm text-neutral-400">
                  Don't just get advice. Our agents stage concrete execution steps (e.g., "Pause Campaign A", "Trigger Webhook") ready for deployment.
                </p>
              </div>
            </div>
          </div>

          {/* 2. Real Integrations */}
          <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all group relative overflow-hidden flex flex-col justify-center">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-3">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">2. Real Integrations</h3>
            
            <p className="text-xs text-neutral-400 mb-4">Google, Meta, Stripe, CRMs & Custom APIs.</p>
            <div className="flex gap-2 justify-center">
               {[1,2,3,4].map((i) => (
                 <div key={i} className="relative flex h-2 w-2">
                   <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${i%2===0 ? 'bg-cyan-400' : 'bg-emerald-400'} delay-${i*100}`}></span>
                   <span className={`relative inline-flex rounded-full h-2 w-2 ${i%2===0 ? 'bg-cyan-500' : 'bg-emerald-500'}`}></span>
                 </div>
               ))}
            </div>

          </div>

          {/* 6. Approval & Governance */}
          <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all group relative overflow-hidden">
             <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                </div>
                <div className="px-2 py-1 bg-amber-500/10 text-amber-500 text-[10px] font-mono rounded border border-amber-500/20">Awaiting Approval</div>
             </div>
             <h3 className="text-base font-bold text-white mb-2">6. Approval Governance</h3>
             <p className="text-xs text-neutral-400">Strict client control. Built-in risk checks and rollbacks.</p>
          </div>

          {/* 8. ROI Attribution */}
          <div className="md:col-span-2 p-6 rounded-3xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all group relative overflow-hidden flex flex-col justify-center">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0">
                <LineChart className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">8. ROI Attribution</h3>
                <p className="text-sm text-neutral-400">
                  End-to-end capital tracking: <strong className="text-white">Spend &rarr; Leads &rarr; Customers &rarr; Revenue &rarr; ROI</strong>.
                </p>
                <div className="mt-4 p-4 bg-neutral-900 border border-neutral-800 rounded-2xl flex items-center justify-between">
                  <span className="text-xs text-neutral-400 uppercase font-bold tracking-wider">Live Revenue</span>
                  <span className="text-2xl font-mono text-emerald-400 font-bold">${revenue.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* 7. Client Portal */}
          <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all group relative overflow-hidden">
             <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-3">
               <LayoutDashboard className="w-4 h-4 text-cyan-400" />
             </div>
             <h3 className="text-base font-bold text-white mb-1">7. Secure Portal</h3>
             <p className="text-xs text-neutral-400">Manage it all from one private dashboard.</p>
          </div>

          {/* 9. Real-Time Notifications */}
          <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all group relative overflow-hidden">
             <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-3 relative">
               <Bell className="w-4 h-4 text-red-400" />
               <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
             </div>
             <h3 className="text-base font-bold text-white mb-1">9. Live Notifications</h3>
             <p className="text-xs text-neutral-400">Instant alerts for conversion drops & opportunities.</p>
             <div className="space-y-3 mt-4">
               {notifications.map((n) => (
                 <div key={n.id} className="flex items-center gap-3 p-2 bg-neutral-900 rounded-lg border border-neutral-800 animate-in fade-in slide-in-from-right-4 duration-500">
                   <span className={n.color}>{n.icon}</span>
                   <span className="text-xs text-neutral-300 truncate">{n.text}</span>
                 </div>
               ))}
             </div>

          </div>

          {/* 10. Security & Trust */}
          <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all group relative overflow-hidden">
             <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-3">
               <Lock className="w-4 h-4 text-neutral-300" />
             </div>
             <h3 className="text-base font-bold text-white mb-1">10. Trust & RBAC</h3>
             <p className="text-xs text-neutral-400">Enterprise isolation, encryption & audit logs.</p>
          </div>

          {/* 11. Case Studies */}
          <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all group relative overflow-hidden">
             <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-3">
               <PieChart className="w-4 h-4 text-blue-400" />
             </div>
             <h3 className="text-base font-bold text-white mb-1">11. Real Case Studies</h3>
             <p className="text-xs text-neutral-400">Math-driven success metrics, not fluff.</p>
          </div>

          {/* 12 & 13. SaaS Architecture */}
          <div className="md:col-span-full p-8 rounded-3xl bg-gradient-to-r from-cyan-900/40 via-blue-900/20 to-neutral-950 border border-cyan-500/30 hover:border-cyan-500/50 transition-all shadow-[0_0_40px_rgba(6,182,212,0.1)] flex flex-col md:flex-row md:items-center justify-between gap-6">
             <div className="flex gap-5 items-center">
               <div className="w-14 h-14 rounded-2xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center shrink-0">
                 <Server className="w-6 h-6 text-cyan-400" />
               </div>
               <div>
                 <h3 className="text-xl font-bold text-white mb-1">12 & 13. Fully Self-Serve SaaS Architecture</h3>
                 <p className="text-sm text-neutral-400">You don't need meetings to scale. Connect data, get diagnosed, and let the OS run your growth.</p>
               </div>
             </div>
             <button className="px-6 py-3 rounded-xl bg-white text-black font-bold text-sm shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 transition-transform whitespace-nowrap">
               Deploy Workspace
             </button>
          </div>

        </div>
      </div>

      {/* Feature Grid */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
        
        {/* Core Engines */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">The Core Engines</h2>
            <p className="text-neutral-500 mt-2">A completely unified data and execution architecture.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <Database className="w-8 h-8 text-blue-500 mb-6" />
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">Unified Data Layer</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                One central data architecture. Data flows from integrations into an isolated tenant workspace, undergoing validation before feeding the analytics and AI engines.
              </p>
              <ul className="space-y-2 text-xs font-mono text-neutral-500">
                <li>→ Data Ingestion</li>
                <li>→ Data Validation</li>
                <li>→ Unified Schema</li>
              </ul>
            </div>
            
            <div className="p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <Activity className="w-8 h-8 text-purple-500 mb-6" />
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">Growth Diagnostic Engine</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                Automatically analyzes traffic, leads, conversion rates, CAC, retention, and sales funnels to identify bottlenecks.
              </p>
              <ul className="space-y-2 text-xs font-mono text-purple-600 dark:text-purple-400 font-bold">
                <li>Problem → Cause → Opportunity</li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-emerald-500/30 shadow-sm bg-emerald-50/50 dark:bg-emerald-950/20 relative overflow-hidden">
              <Bot className="w-8 h-8 text-emerald-500 mb-6" />
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">Actual AI Actions</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                We don't stop at advice. The AI proposes real execution steps (e.g., "Pause Campaign A", "Increase Budget 15%").
              </p>
              <div className="bg-white dark:bg-black p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 text-xs font-mono">
                <span className="text-emerald-500 font-bold">Action:</span> Create landing page experiment.
                <button className="mt-2 w-full py-1.5 bg-neutral-900 dark:bg-white text-white dark:text-black rounded text-[10px] uppercase font-bold">Require Approval</button>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Capabilities List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">Professional SaaS Governance</h2>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 shrink-0 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-neutral-900 dark:text-white">Approval & Governance</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  AI Recommendation → Risk Check → Client Approval → Execute → Monitor → Rollback. Full control over autonomous agents.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 shrink-0 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-neutral-900 dark:text-white">Security & Trust</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  Enterprise-grade tenant isolation, Role-Based Access Control (RBAC), encryption, secure API keys, and audit logs.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 shrink-0 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-neutral-900 dark:text-white">Self-Serve Customer Workflow</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  Sign Up → Choose Plan → Create Workspace → Connect Data → Diagnose → Get Recommendations → Approve Actions → Track ROI.
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 text-white shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-neutral-800 via-transparent to-transparent pointer-events-none"></div>
             <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
               <Bell className="w-5 h-5 text-amber-500" /> Real-Time Notifications
             </h3>
             <div className="space-y-3 font-mono text-xs">
               <div className="p-3 bg-black rounded-lg border border-neutral-800 flex items-center gap-3">
                 <span className="text-red-500">🚨</span>
                 <span>Conversion rate dropped 18%</span>
               </div>
               <div className="p-3 bg-black rounded-lg border border-neutral-800 flex items-center gap-3">
                 <span className="text-emerald-500">📈</span>
                 <span>Revenue increased 24%</span>
               </div>
               <div className="p-3 bg-black rounded-lg border border-neutral-800 flex items-center gap-3">
                 <span className="text-amber-500">⚠️</span>
                 <span>Ad spend exceeded threshold</span>
               </div>
               <div className="p-3 bg-black rounded-lg border border-neutral-800 flex items-center gap-3">
                 <span className="text-cyan-500">🤖</span>
                 <span>AI detected a growth opportunity</span>
               </div>
               <div className="p-3 bg-black rounded-lg border border-neutral-800 flex items-center gap-3">
                 <span className="text-blue-500">✅</span>
                 <span>Approved action completed</span>
               </div>
             </div>
          </div>
        </div>

        {/* ROI and Case Studies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <LineChart className="w-8 h-8 text-emerald-500 mb-6" />
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">ROI Attribution</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
              Track the exact flow of capital: <strong>Marketing Spend → Leads → Customers → Revenue → ROI.</strong>
              <br/><br/>
              See exactly which campaigns, channels, and AI actions actually generated business results.
            </p>
          </div>
          
          <div className="p-8 rounded-2xl bg-black border border-neutral-800 text-white shadow-sm">
            <BarChart className="w-8 h-8 text-cyan-500 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-2">Real Customer Case Studies</h3>
            <p className="text-sm text-neutral-400 mb-6">
              We rely on hard math, not fake testimonials. We measure interventions objectively.
            </p>
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-700 font-mono text-xs space-y-2">
              <div className="text-neutral-500 mb-2 uppercase font-bold">Intervention Example</div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Revenue:</span>
                <span className="text-white">$12,000 → $48,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Conversion:</span>
                <span className="text-white">1.2% → 3.8%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">CAC:</span>
                <span className="text-emerald-400">$85 → $32</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
