const fs = require('fs');

let content = fs.readFileSync('src/components/RealTimeDataStudio.tsx', 'utf-8');

// Fix inactive tabs
content = content.replace(
  /"bg-neutral-900 dark:bg-white text-neutral-400 hover:text-white dark:hover:text-neutral-900 dark:text-neutral-900 hover:bg-neutral-800 border border-neutral-800"/g,
  '"bg-neutral-100 dark:bg-neutral-800/50 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700"'
);

// Fix "analytics" active tab
content = content.replace(
  /"bg-white dark:bg-neutral-900 dark:bg-white text-neutral-900 dark:text-white dark:text-neutral-900 dark:text-white dark:text-neutral-900 shadow-md"/g,
  '"bg-black dark:bg-cyan-500 text-white dark:text-black shadow-md"'
);

// Fix "grid" active tab
// It happens to use the exact same string as analytics currently
// But wait, there might be other colored active tabs like amber, cyan, purple, blue.
// The user explicitly requested: "active buttons should use bg-black dark:bg-cyan-500 text-white dark:text-black"
// I will just force all active tabs to match this exactly.

// powerbi
content = content.replace(
  /"bg-amber-400 text-neutral-900 dark:text-white dark:text-neutral-900 dark:text-white dark:text-neutral-900 shadow-md shadow-amber-400\/20"/g,
  '"bg-black dark:bg-cyan-500 text-white dark:text-black shadow-md shadow-cyan-500/20"'
);

// ai_insights
content = content.replace(
  /"bg-cyan-400 text-neutral-900 dark:text-white dark:text-neutral-900 dark:text-white dark:text-neutral-900 shadow-md shadow-cyan-400\/20"/g,
  '"bg-black dark:bg-cyan-500 text-white dark:text-black shadow-md shadow-cyan-500/20"'
);

// predictive
content = content.replace(
  /"bg-purple-500 text-white dark:text-neutral-900 shadow-md shadow-purple-500\/20"/g,
  '"bg-black dark:bg-cyan-500 text-white dark:text-black shadow-md shadow-cyan-500/20"'
);

// batch
content = content.replace(
  /"bg-blue-500 text-white dark:text-neutral-900 shadow-md shadow-blue-500\/20"/g,
  '"bg-black dark:bg-cyan-500 text-white dark:text-black shadow-md shadow-cyan-500/20"'
);

fs.writeFileSync('src/components/RealTimeDataStudio.tsx', content);
