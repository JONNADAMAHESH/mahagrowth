const fs = require('fs');
let content = fs.readFileSync('src/pages/ServicesPage.tsx', 'utf-8');

// 1. Add missing imports
if (!content.includes('UserPlus')) content = content.replace('Layers', 'Layers, UserPlus, LayoutDashboard, PieChart, ShieldAlert, Cpu');

const searchBlock = `      {/* Exhaustive Features List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">Comprehensive Platform Capabilities</h2>
          <p className="text-neutral-500 mt-2">Every feature you need to scale, built directly into your tenant workspace.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          
          {/* 1. Customer Onboarding */}
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-cyan-500/50 transition-colors">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">1. Customer Onboarding</h3>
            <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
              <li>• Client registration & login</li>
              <li>• Company profile & business goals</li>
              <li>• Industry & business size profiling</li>
              <li>• Connect data sources</li>
              <li>• Onboarding progress tracker</li>
            </ul>
          </div>

          {/* 2. Real Integrations */}
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-cyan-500/50 transition-colors">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">2. Real Integrations</h3>
            <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
              <li>• Google Analytics & Google Ads</li>
              <li>• Meta Ads & LinkedIn</li>
              <li>• CRM & Email systems</li>
              <li>• Shopify / e-commerce</li>
              <li>• Stripe, Slack, MS/Google Services</li>
              <li>• Custom API / Webhook support</li>
            </ul>
          </div>

          {/* 3. Unified Data Layer */}
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-cyan-500/50 transition-colors">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">3. Unified Data Layer</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">Central data architecture isolated per tenant:</p>
            <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/30 p-2 rounded">
              Integrations → Ingestion → Validation → Unified Layer → Analytics → AI Engine → Actions
            </div>
          </div>

          {/* 4. Growth Diagnostic Engine */}
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-cyan-500/50 transition-colors">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">4. Growth Diagnostic Engine</h3>
            <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
              <li>• Traffic & Leads analysis</li>
              <li>• Conversion rate & CAC</li>
              <li>• Revenue & Retention tracking</li>
              <li>• Marketing & Sales funnel performance</li>
              <li className="font-bold text-purple-500 pt-2">Output: Problem → Cause → Opportunity</li>
            </ul>
          </div>

          {/* 5. Actual AI Actions */}
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-cyan-500/50 transition-colors">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">5. Actual AI Actions</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              The AI doesn't just give advice—it stages real execution steps for your approval. Autonomous agents that can pause campaigns, adjust budgets, and trigger webhooks.
            </p>
          </div>

          {/* 6. Approval & Governance */}
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-cyan-500/50 transition-colors">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">6. Approval & Governance</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Strict control over AI. Nothing executes without client approval. Built-in risk checks, execution monitoring, and automatic rollback capabilities.
            </p>
          </div>

          {/* 7. Client Portal */}
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-cyan-500/50 transition-colors">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">7. Secure Client Portal</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              A unified dashboard where you log in to view diagnostics, manage integrations, approve actions, and track your active growth sprints.
            </p>
          </div>

          {/* 8. ROI Attribution */}
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-cyan-500/50 transition-colors">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">8. ROI Attribution</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              End-to-end tracking of capital flow. See exactly how Marketing Spend converts to Leads, Customers, Revenue, and ultimate ROI.
            </p>
          </div>

          {/* 9. Notifications */}
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-cyan-500/50 transition-colors">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">9. Real-Time Notifications</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Instant alerts for threshold breaches (e.g., CAC too high), conversion drops, AI-detected opportunities, and successful action executions.
            </p>
          </div>

          {/* 10. Security / Trust */}
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-cyan-500/50 transition-colors">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">10. Security & Trust</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Enterprise-grade multi-tenant architecture. Role-Based Access Control (RBAC), secure API key management, encrypted storage, and immutable audit logs.
            </p>
          </div>

          {/* 11. Real Case Studies */}
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-cyan-500/50 transition-colors">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">11. Real Customer Case Studies</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Math-driven success stories. We measure interventions objectively, showing exact before/after metrics for revenue, conversion, and CAC.
            </p>
          </div>

          {/* 12 & 13. SaaS Architecture */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 dark:from-cyan-900/20 dark:to-blue-900/20 border border-cyan-500/30">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">12 & 13. Self-Serve SaaS Architecture</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              A fully autonomous, self-serve software product. You don't need meetings to scale. Sign up, connect data, and let the operating system run your growth.
            </p>
          </div>

        </div>
      </div>`;

const bentoGrid = `      {/* Exhaustive Features List: Premium Bento Grid */}
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
                 <span className="text-emerald-400 font-bold">Healthy</span>
               </div>
               <div className="flex justify-between items-center text-xs font-mono">
                 <span className="text-neutral-500">Conv. Rate</span>
                 <span className="text-amber-400 font-bold">Dropping</span>
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
            <p className="text-xs text-neutral-400">Google, Meta, Stripe, CRMs & Custom APIs.</p>
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
      </div>`;

content = content.replace(searchBlock, bentoGrid);
fs.writeFileSync('src/pages/ServicesPage.tsx', content);
