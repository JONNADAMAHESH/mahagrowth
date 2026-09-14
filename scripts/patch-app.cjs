const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(
  /className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-black hover:bg-neutral-800 text-neutral-900 dark:text-white font-mono text-xs font-semibold shadow-xl border border-neutral-900 flex items-center gap-2.5 transition-all hover:scale-105 group"/,
  'className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-900 dark:text-white font-mono text-xs font-semibold shadow-xl border border-neutral-300 dark:border-neutral-800 flex items-center gap-2.5 transition-all hover:scale-105 group"'
);

fs.writeFileSync('src/App.tsx', code);
