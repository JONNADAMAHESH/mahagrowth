const fs = require('fs');

let content = fs.readFileSync('src/pages/CaseStudiesPage.tsx', 'utf-8');

// Replace active filter style
content = content.replace(
  /"bg-neutral-900 dark:bg-white dark:bg-white text-white dark:text-neutral-900 font-bold shadow-xs"/g,
  '"bg-black dark:bg-cyan-500 text-white dark:text-black font-bold shadow-xs"'
);
content = content.replace(
  /"bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold shadow-xs"/g,
  '"bg-black dark:bg-cyan-500 text-white dark:text-black font-bold shadow-xs"'
);

// Replace inactive filter style
content = content.replace(
  /"bg-neutral-100 text-neutral-600 border border-neutral-300 hover:text-neutral-900 dark:hover:text-white dark:hover:text-neutral-900 dark:text-white dark:text-neutral-900 hover:bg-neutral-200"/g,
  '"bg-neutral-100 dark:bg-neutral-800/50 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700"'
);

fs.writeFileSync('src/pages/CaseStudiesPage.tsx', content);
