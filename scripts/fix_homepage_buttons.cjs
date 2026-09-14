const fs = require('fs');
let content = fs.readFileSync('src/pages/HomePage.tsx', 'utf-8');

content = content.replace(
  /"bg-neutral-900 dark:bg-white dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 shadow-xs"/g,
  '"bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 shadow-xs"'
);
content = content.replace(
  /"bg-neutral-100 hover:bg-neutral-900 dark:hover:bg-white dark:hover:bg-neutral-900 dark:bg-white dark:bg-white hover:text-white dark:hover:text-neutral-900 dark:text-neutral-900 border border-neutral-300"/g,
  '"bg-neutral-100 dark:bg-neutral-800/50 hover:bg-neutral-900 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white hover:text-white dark:hover:text-white border border-neutral-300 dark:border-neutral-700"'
);

fs.writeFileSync('src/pages/HomePage.tsx', content);
