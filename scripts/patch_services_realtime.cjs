const fs = require('fs');
let content = fs.readFileSync('src/pages/ServicesPage.tsx', 'utf-8');

const importsToAdd = `import { useState, useEffect } from "react";`;
if (!content.includes('useState')) {
  content = content.replace('import React from "react";', `import React, { useState, useEffect } from "react";`);
}

const hookLogic = `
  // --- REAL-TIME SIMULATION LOGIC ---
  const [trafficStatus, setTrafficStatus] = useState("Healthy");
  const [convRate, setConvRate] = useState("Dropping");
  const [notifications, setNotifications] = useState([
    { id: 1, type: "alert", text: "Conversion dropped 18%", icon: "🚨", color: "text-red-400" },
    { id: 2, type: "success", text: "Revenue increased 24%", icon: "📈", color: "text-emerald-400" }
  ]);
  const [revenue, setRevenue] = useState(124500);

  useEffect(() => {
    // Simulate real-time diagnostic engine updates
    const diagInterval = setInterval(() => {
      const trafficStates = ["Healthy", "Surging", "Stable"];
      const convStates = ["Dropping", "Stable", "Rising"];
      setTrafficStatus(trafficStates[Math.floor(Math.random() * trafficStates.length)]);
      setConvRate(convStates[Math.floor(Math.random() * convStates.length)]);
    }, 4000);

    // Simulate live revenue attribution ticking up
    const revInterval = setInterval(() => {
      setRevenue(prev => prev + Math.floor(Math.random() * 50) + 10);
    }, 2500);

    // Simulate incoming notifications
    const notifInterval = setInterval(() => {
      const newNotifs = [
        { id: Date.now(), type: "action", text: "AI deployed campaign fix", icon: "🤖", color: "text-cyan-400" },
        { id: Date.now() + 1, type: "warning", text: "Ad spend threshold met", icon: "⚠️", color: "text-amber-400" },
        { id: Date.now() + 2, type: "success", text: "Client approved action", icon: "✅", color: "text-emerald-400" },
        { id: Date.now() + 3, type: "alert", text: "High bounce rate detected", icon: "🚨", color: "text-red-400" }
      ];
      const randomNotif = newNotifs[Math.floor(Math.random() * newNotifs.length)];
      setNotifications(prev => [randomNotif, ...prev].slice(0, 3));
    }, 5500);

    return () => {
      clearInterval(diagInterval);
      clearInterval(revInterval);
      clearInterval(notifInterval);
    };
  }, []);
`;

// Insert the hook logic at the top of the component
content = content.replace('export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {', 'export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {' + hookLogic);

// Replace static diagnostic with dynamic
content = content.replace(
  '<span className="text-emerald-400 font-bold">Healthy</span>',
  '<span className={`font-bold transition-colors duration-500 ${trafficStatus === "Healthy" || trafficStatus === "Stable" ? "text-emerald-400" : "text-cyan-400"}`}>{trafficStatus}</span>'
);
content = content.replace(
  '<span className="text-amber-400 font-bold">Dropping</span>',
  '<span className={`font-bold transition-colors duration-500 ${convRate === "Dropping" ? "text-amber-400" : convRate === "Rising" ? "text-emerald-400" : "text-neutral-400"}`}>{convRate}</span>'
);

// Replace static notifications with dynamic mapping
const notifBlock = `
             <div className="space-y-3 mt-4">
               {notifications.map((n) => (
                 <div key={n.id} className="flex items-center gap-3 p-2 bg-neutral-900 rounded-lg border border-neutral-800 animate-in fade-in slide-in-from-right-4 duration-500">
                   <span className={n.color}>{n.icon}</span>
                   <span className="text-xs text-neutral-300 truncate">{n.text}</span>
                 </div>
               ))}
             </div>
`;
content = content.replace(
  '<p className="text-xs text-neutral-400">Instant alerts for conversion drops & opportunities.</p>',
  '<p className="text-xs text-neutral-400">Instant alerts for conversion drops & opportunities.</p>' + notifBlock
);

// Replace static ROI with ticking revenue
content = content.replace(
  '<strong className="text-white">Spend &rarr; Leads &rarr; Customers &rarr; Revenue &rarr; ROI</strong>.',
  '<strong className="text-white">Spend &rarr; Leads &rarr; Customers &rarr; Revenue &rarr; ROI</strong>.' +
  '<div className="mt-4 p-4 bg-neutral-900 border border-neutral-800 rounded-2xl flex items-center justify-between">' +
  '  <span className="text-xs text-neutral-400 uppercase font-bold tracking-wider">Live Revenue</span>' +
  '  <span className="text-2xl font-mono text-emerald-400 font-bold">${revenue.toLocaleString()}</span>' +
  '</div>'
);

// Replace Integration dots with blinking/pinging dots
const integrationPing = `
            <p className="text-xs text-neutral-400 mb-4">Google, Meta, Stripe, CRMs & Custom APIs.</p>
            <div className="flex gap-2 justify-center">
               {[1,2,3,4].map((i) => (
                 <div key={i} className="relative flex h-2 w-2">
                   <span className={\`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 \${i%2===0 ? 'bg-cyan-400' : 'bg-emerald-400'} delay-\${i*100}\`}></span>
                   <span className={\`relative inline-flex rounded-full h-2 w-2 \${i%2===0 ? 'bg-cyan-500' : 'bg-emerald-500'}\`}></span>
                 </div>
               ))}
            </div>
`;
content = content.replace(
  '<p className="text-xs text-neutral-400">Google, Meta, Stripe, CRMs & Custom APIs.</p>',
  integrationPing
);

fs.writeFileSync('src/pages/ServicesPage.tsx', content);
