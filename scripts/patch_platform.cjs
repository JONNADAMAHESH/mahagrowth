const fs = require('fs');
let content = fs.readFileSync('src/pages/PlatformPage.tsx', 'utf-8');

const explicitFeaturesBlock = `
      {/* Exhaustive Features List */}
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
      </div>

      {/* Feature Grid */}
`;

content = content.replace('{/* Feature Grid */}', explicitFeaturesBlock);
fs.writeFileSync('src/pages/PlatformPage.tsx', content);
