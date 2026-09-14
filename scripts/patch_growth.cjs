const fs = require('fs');

let content = fs.readFileSync('src/components/GrowthEcosystem.tsx', 'utf-8');

// Replace the terminal
const terminalOld = `                {/* Live Activity Telemetry Log */}
                <div className="rounded-xl bg-neutral-900 dark:bg-white border border-neutral-800 p-4 space-y-2 font-mono text-xs text-white dark:text-neutral-900 shadow-inner">
                  <div className="flex items-center justify-between text-[11px] text-neutral-400 border-b border-neutral-800 pb-2">
                    <div className="flex items-center gap-2 text-white dark:text-neutral-900 font-semibold">
                      <Activity className="w-3.5 h-3.5 text-white dark:text-neutral-900 animate-pulse" />
                      <span>LIVE ECOSYSTEM EVENT STREAM</span>
                    </div>
                    <span className="text-[10px] text-neutral-400 font-mono">
                      CONNECTED
                    </span>
                  </div>
                  <div className="space-y-1 text-neutral-300 text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-500 dark:text-neutral-400">[00:14:22]</span>
                      <span className="text-white dark:text-neutral-900 font-semibold">
                        INGEST:
                      </span>
                      <span>
                        Visitor traffic channeled via programmatic SEO page
                        /growth-stack
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-500 dark:text-neutral-400">[01:42:08]</span>
                      <span className="text-white dark:text-neutral-900 font-semibold">
                        AUTO-AGENT:
                      </span>
                      <span>
                        Concierge identified Enterprise prospect ($40k MRR);
                        booked diagnostic call
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-500 dark:text-neutral-400">[03:11:50]</span>
                      <span className="text-white dark:text-neutral-900 font-semibold">
                        PIPELINE:
                      </span>
                      <span>
                        CRM deal stage auto-synced; tailored dossier dispatched
                        to executive calendar
                      </span>
                    </div>
                  </div>
                </div>`;

const terminalNew = `                {/* Live Activity Telemetry Log */}
                <div className="rounded-xl bg-neutral-950 border border-neutral-800 p-4 space-y-2 font-mono text-xs text-cyan-400 shadow-inner">
                  <div className="flex items-center justify-between text-[11px] text-neutral-500 border-b border-neutral-800 pb-2">
                    <div className="flex items-center gap-2 text-cyan-500 font-semibold">
                      <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                      <span>LIVE ECOSYSTEM EVENT STREAM</span>
                    </div>
                    <span className="text-[10px] text-cyan-600 font-mono">
                      CONNECTED
                    </span>
                  </div>
                  <div className="space-y-1 text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-600">[00:14:22]</span>
                      <span className="text-cyan-500 font-semibold">
                        INGEST:
                      </span>
                      <span className="text-cyan-300">
                        Visitor traffic channeled via programmatic SEO page
                        /growth-stack
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-600">[01:42:08]</span>
                      <span className="text-cyan-500 font-semibold">
                        AUTO-AGENT:
                      </span>
                      <span className="text-cyan-300">
                        Concierge identified Enterprise prospect ($40k MRR);
                        booked diagnostic call
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-600">[03:11:50]</span>
                      <span className="text-cyan-500 font-semibold">
                        PIPELINE:
                      </span>
                      <span className="text-cyan-300">
                        CRM deal stage auto-synced; tailored dossier dispatched
                        to executive calendar
                      </span>
                    </div>
                  </div>
                </div>`;

content = content.replace(terminalOld, terminalNew);

// Replace primary button
const btn1Old = `className="w-full sm:w-auto px-6 py-3 rounded-xl bg-black dark:bg-cyan-500 text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-cyan-400 font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer"`;
const btn1New = `className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-500 text-black hover:bg-cyan-400 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer"`;
content = content.replace(btn1Old, btn1New);

// Replace secondary button
const btn2Old = `className="w-full sm:w-auto px-5 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-900/50 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-black dark:text-white text-xs font-mono flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"`;
const btn2New = `className="w-full sm:w-auto px-5 py-3 rounded-xl bg-transparent hover:bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 hover:text-cyan-300 text-xs font-mono flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"`;
content = content.replace(btn2Old, btn2New);

fs.writeFileSync('src/components/GrowthEcosystem.tsx', content);

