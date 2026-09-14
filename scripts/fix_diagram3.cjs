const fs = require('fs');
let content = fs.readFileSync('src/components/PlatformArchitectureDiagram.tsx', 'utf-8');

content = content.replace(
  /"bg-neutral-100 border border-neutral-300 hover:border-neutral-900 dark:border-white dark:border-neutral-900 dark:border-white dark:border-neutral-900 text-neutral-800"/g,
  '"bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700 text-neutral-800 dark:text-neutral-200"'
);

// I will run a final regex on the file just in case there are any remaining `dark:border-white dark:border-neutral-900...` anomalies.
content = content.replace(/dark:border-white dark:border-neutral-900 dark:border-white dark:border-neutral-900/g, 'dark:border-neutral-700');

fs.writeFileSync('src/components/PlatformArchitectureDiagram.tsx', content);
