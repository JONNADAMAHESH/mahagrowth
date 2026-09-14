const fs = require('fs');

let content = fs.readFileSync('src/components/ProductWorkspaceShowcase.tsx', 'utf-8');

content = content.replace(
  /"bg-neutral-900 dark:bg-white dark:bg-white text-white dark:text-neutral-900 border border-neutral-900 dark:border-white dark:border-neutral-900 dark:border-white dark:border-neutral-900 shadow-xs"/g,
  '"bg-black dark:bg-cyan-500 text-white dark:text-black font-bold shadow-xs border-transparent"'
);

content = content.replace(
  /"bg-white dark:bg-neutral-900 dark:bg-white border border-neutral-200 text-neutral-600 hover:text-neutral-900 dark:hover:text-white dark:hover:text-neutral-900 dark:text-white dark:text-neutral-900 dark:text-white dark:text-neutral-900 hover:border-neutral-900 dark:border-white dark:border-neutral-900 dark:border-white dark:border-neutral-900"/g,
  '"bg-neutral-100 dark:bg-neutral-900/50 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800"'
);

content = content.replace(
  /"bg-neutral-800 text-neutral-200"/g,
  '"bg-white/20 dark:bg-black/20 text-white dark:text-black"'
);

content = content.replace(
  /"bg-neutral-100 text-neutral-600"/g,
  '"bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700"'
);

// Oh wait, I need to check the icon colors too:
// className={`w-3.5 h-3.5 ${isActive ? "text-white dark:text-neutral-900" : "text-neutral-500 dark:text-neutral-400"}`}
content = content.replace(
  /"text-white dark:text-neutral-900"/g,
  '"text-white dark:text-black"'
);

fs.writeFileSync('src/components/ProductWorkspaceShowcase.tsx', content);
