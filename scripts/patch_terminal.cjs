const fs = require('fs');
let content = fs.readFileSync('src/components/AiAdvantageSandbox.tsx', 'utf-8');

// I will just replace the entire right div.
const searchBlock = `        {/* Right: Live Interactive Execution Simulator */}
        <div className="lg:col-span-7 p-6 lg:p-8 bg-white dark:bg-neutral-900 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3 text-xs font-mono">
              <span className="text-neutral-900 dark:text-white font-bold flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
                <span>INTERACTIVE ENGINE TERMINAL</span>
              </span>
              <span className="text-neutral-900 dark:text-white font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white" />{" "}
                Ready
              </span>
            </div>

            {/* Input area */}
            <div className="space-y-2">
              <label className="block text-xs font-mono text-neutral-600 dark:text-neutral-300 font-semibold">
                Test Custom Prompt / Scenario:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder={\`Try asking: "\${activeTool.sampleInput.slice(0, 48)}..."\`}
                  className="flex-1 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-neutral-900 font-mono"
                />
                <button
                  type="button"
                  onClick={handleSimulate}
                  disabled={isSimulating}
                  className="px-4 py-2.5 rounded-xl bg-neutral-900 dark:bg-white hover:bg-neutral-800 text-white dark:text-neutral-900 font-mono text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all shrink-0 cursor-pointer disabled:opacity-50"
                >
                  {isSimulating ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-white dark:text-neutral-900" />
                  ) : (
                    <Play className="w-3.5 h-3.5 text-white dark:text-neutral-900" />
                  )}
                  <span>
                    {isSimulating ? "Simulating..." : "Run Simulation"}
                  </span>
                </button>
              </div>
            </div>

            {/* Output view */}
            <div className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border border-neutral-800 rounded-xl p-4 min-h-[220px] font-mono text-xs space-y-2 overflow-x-auto shadow-inner">
              <div className="text-[11px] text-neutral-400 flex items-center justify-between border-b border-neutral-800 pb-2">
                <span>OUTPUT: {activeTool.mockOutputTitle.toUpperCase()}</span>
                <span className="text-neutral-300 font-bold">
                  EXECUTION TIME: 0.84s
                </span>
              </div>

              {isSimulating ? (
                <div className="py-12 text-center text-neutral-400 space-y-2">
                  <RefreshCw className="w-5 h-5 animate-spin mx-auto text-white dark:text-neutral-900" />
                  <p>
                    Executing agentic logic &amp; integrating business
                    intelligence...
                  </p>
                </div>
              ) : (
                <pre className="text-neutral-100 whitespace-pre-wrap leading-relaxed pt-2">
                  {liveOutput || activeTool.sampleOutput}
                </pre>
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between text-[11px] font-mono text-neutral-600 dark:text-neutral-300 gap-2">
            <span>Result: Measurable Business Outcome (0 Fluff)</span>
            <span className="text-neutral-900 dark:text-white font-bold">
              Customized to your proprietary business data
            </span>
          </div>
        </div>`;

const replaceBlock = `        {/* Right: Live Interactive Execution Simulator */}
        <div className="lg:col-span-7 p-6 lg:p-8 bg-neutral-950 flex flex-col justify-between space-y-5 rounded-b-3xl lg:rounded-r-3xl lg:rounded-bl-none overflow-hidden relative">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent pointer-events-none"></div>
          
          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3 text-xs font-mono">
              <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>INTERACTIVE ENGINE TERMINAL</span>
              </span>
              <span className="text-cyan-500 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />{" "}
                Ready
              </span>
            </div>

            {/* Input area */}
            <div className="space-y-2">
              <label className="block text-xs font-mono text-cyan-500 font-semibold">
                Test Custom Prompt / Scenario:
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder={\`Try asking: "\${activeTool.sampleInput.slice(0, 48)}..."\`}
                  className="flex-1 bg-black border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 font-mono"
                />
                <button
                  type="button"
                  onClick={handleSimulate}
                  disabled={isSimulating}
                  className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-mono text-xs font-bold flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all shrink-0 cursor-pointer disabled:opacity-50"
                >
                  {isSimulating ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-black" />
                  ) : (
                    <Play className="w-3.5 h-3.5 text-black" />
                  )}
                  <span>
                    {isSimulating ? "Simulating..." : "Run Simulation"}
                  </span>
                </button>
              </div>
            </div>

            {/* Output view */}
            <div className="bg-black border border-neutral-800 rounded-xl p-4 min-h-[220px] font-mono text-xs space-y-2 overflow-x-auto shadow-inner relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
              
              <div className="text-[11px] text-neutral-500 flex items-center justify-between border-b border-neutral-800 pb-2">
                <span>OUTPUT: {activeTool.mockOutputTitle.toUpperCase()}</span>
                <span className="text-cyan-700 font-bold">
                  EXECUTION TIME: 0.84s
                </span>
              </div>

              {isSimulating ? (
                <div className="py-12 text-center text-cyan-500 space-y-2">
                  <RefreshCw className="w-5 h-5 animate-spin mx-auto text-cyan-400" />
                  <p>
                    Executing agentic logic &amp; integrating business
                    intelligence...
                  </p>
                </div>
              ) : (
                <pre className="text-cyan-300 whitespace-pre-wrap leading-relaxed pt-2">
                  {liveOutput || activeTool.sampleOutput}
                </pre>
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-neutral-800 flex flex-wrap items-center justify-between text-[11px] font-mono text-neutral-500 gap-2 relative z-10">
            <span>Result: Measurable Business Outcome (0 Fluff)</span>
            <span className="text-cyan-500 font-bold">
              Customized to your proprietary business data
            </span>
          </div>
        </div>`;

content = content.replace(searchBlock, replaceBlock);
fs.writeFileSync('src/components/AiAdvantageSandbox.tsx', content);
