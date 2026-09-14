const fs = require('fs');

let content = fs.readFileSync('src/components/GrowthDiagnosticTool.tsx', 'utf-8');

// Fix the main wrapper background
content = content.replace(
  /className="bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-xl text-neutral-900 dark:text-white"/g,
  'className="bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-xl text-neutral-900 dark:text-white"'
);

// Fix badges / inputs
content = content.replace(/bg-white dark:bg-neutral-900/g, 'bg-white dark:bg-neutral-900/50');
content = content.replace(/bg-white dark:bg-neutral-900\/50\/50/g, 'bg-white dark:bg-neutral-900/50');

// Fix Stage selected state
content = content.replace(
  /"bg-neutral-900 dark:bg-white dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white dark:border-neutral-900 dark:border-white dark:border-neutral-900 font-bold shadow-xs"/g,
  '"bg-black dark:bg-cyan-500 text-white dark:text-black font-bold shadow-xs border-black dark:border-cyan-500"'
);

// Fix Stage unselected state
content = content.replace(
  /"bg-white dark:bg-neutral-900 dark:bg-white border-neutral-300 text-neutral-700 hover:border-neutral-900 dark:border-white dark:border-neutral-900 dark:border-white dark:border-neutral-900 hover:text-neutral-900 dark:hover:text-white dark:hover:text-neutral-900 dark:text-white dark:text-neutral-900 dark:text-white dark:text-neutral-900"/g,
  '"bg-white dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-700 hover:text-neutral-900 dark:hover:text-white"'
);

// Fix Bottleneck selected state
content = content.replace(
  /"bg-neutral-900 dark:bg-white dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white dark:border-neutral-900 dark:border-white dark:border-neutral-900 font-medium shadow-2xs"/g,
  '"bg-black dark:bg-cyan-500 text-white dark:text-black font-bold shadow-xs border-black dark:border-cyan-500"'
);

// Fix Bottleneck unselected state
content = content.replace(
  /"bg-white dark:bg-neutral-900 dark:bg-white border-neutral-300 text-neutral-700 hover:text-neutral-900 dark:hover:text-white dark:hover:text-neutral-900 dark:text-white dark:text-neutral-900 dark:text-white dark:text-neutral-900 hover:border-neutral-900 dark:border-white dark:border-neutral-900 dark:border-white dark:border-neutral-900"/g,
  '"bg-white dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-700 hover:text-neutral-900 dark:hover:text-white"'
);


fs.writeFileSync('src/components/GrowthDiagnosticTool.tsx', content);
