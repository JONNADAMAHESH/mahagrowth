const fs = require('fs');

let content = fs.readFileSync('src/components/GrowthDiagnosticTool.tsx', 'utf-8');

// The unselected replacements failed because they didn't match perfectly. Let's force them.

content = content.replace(
  /"bg-white dark:bg-neutral-900\/50 dark:bg-white border-neutral-300 text-neutral-700 hover:border-neutral-900 dark:border-white dark:border-neutral-900 dark:border-white dark:border-neutral-900 hover:text-neutral-900 dark:hover:text-white dark:hover:text-neutral-900 dark:text-white dark:text-neutral-900 dark:text-white dark:text-neutral-900"/g,
  '"bg-white dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-700 hover:text-neutral-900 dark:hover:text-white"'
);

content = content.replace(
  /"bg-white dark:bg-neutral-900\/50 dark:bg-white border-neutral-300 text-neutral-700 hover:text-neutral-900 dark:hover:text-white dark:hover:text-neutral-900 dark:text-white dark:text-neutral-900 dark:text-white dark:text-neutral-900 hover:border-neutral-900 dark:border-white dark:border-neutral-900 dark:border-white dark:border-neutral-900"/g,
  '"bg-white dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-700 hover:text-neutral-900 dark:hover:text-white"'
);


fs.writeFileSync('src/components/GrowthDiagnosticTool.tsx', content);
