const fs = require('fs');
let content = fs.readFileSync('src/components/PlatformArchitectureDiagram.tsx', 'utf-8');

// Fix unselected node wrapper states that were still garbled
content = content.replace(
  /"bg-neutral-50 border border-neutral-300 hover:border-neutral-900 dark:border-white dark:border-neutral-900 dark:border-white dark:border-neutral-900 text-neutral-800"/g,
  '"bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700 text-neutral-800 dark:text-neutral-200"'
);

// Any other bg-neutral-50 garbled strings?
content = content.replace(
  /"bg-neutral-50 border border-neutral-300 hover:border-neutral-900 dark:border-white dark:border-neutral-900 dark:border-white dark:border-neutral-900 text-neutral-900 dark:text-white dark:text-neutral-900 dark:text-white dark:text-neutral-900"/g,
  '"bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700 text-neutral-900 dark:text-white"'
);

content = content.replace(
  /className="w-full py-2.5 rounded-xl bg-neutral-900 dark:bg-white hover:bg-neutral-800 text-xs font-mono text-white dark:text-neutral-900 font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"/g,
  'className="w-full py-2.5 rounded-xl bg-neutral-900 dark:bg-white hover:bg-neutral-800 text-xs font-mono text-white dark:text-neutral-900 font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"'
);

// There's a wrapper for the detail pane, let's look at that too just in case.

fs.writeFileSync('src/components/PlatformArchitectureDiagram.tsx', content);
