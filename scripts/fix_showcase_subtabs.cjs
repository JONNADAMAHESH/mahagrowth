const fs = require('fs');

let content = fs.readFileSync('src/components/ProductWorkspaceShowcase.tsx', 'utf-8');

// Fix the 30d/90d/ytd tabs
content = content.replace(
  /"bg-neutral-900 dark:bg-white dark:bg-white text-white dark:text-neutral-900 font-bold"/g,
  '"bg-black dark:bg-cyan-500 text-white dark:text-black font-bold"'
);
content = content.replace(
  /"text-neutral-600 hover:text-neutral-900 dark:hover:text-white dark:hover:text-neutral-900 dark:text-white dark:text-neutral-900 dark:text-white dark:text-neutral-900"/g,
  '"text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"'
);

fs.writeFileSync('src/components/ProductWorkspaceShowcase.tsx', content);
