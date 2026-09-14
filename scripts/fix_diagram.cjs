const fs = require('fs');
let content = fs.readFileSync('src/components/PlatformArchitectureDiagram.tsx', 'utf-8');

// Replace active container state
content = content.replace(
  /"bg-neutral-900 dark:bg-white dark:bg-white text-white dark:text-neutral-900 border-2 border-neutral-900 dark:border-white dark:border-neutral-900 dark:border-white dark:border-neutral-900 shadow-md"/g,
  '"bg-black dark:bg-cyan-500 text-white dark:text-black border-2 border-black dark:border-cyan-500 shadow-md"'
);
content = content.replace(
  /"bg-neutral-900 dark:bg-white dark:bg-white text-white dark:text-neutral-900 border-2 border-neutral-900 dark:border-white dark:border-neutral-900 dark:border-white dark:border-neutral-900 shadow-xs"/g,
  '"bg-black dark:bg-cyan-500 text-white dark:text-black border-2 border-black dark:border-cyan-500 shadow-xs"'
);

// Replace inactive container state
content = content.replace(
  /"bg-white dark:bg-neutral-900 dark:bg-white border-neutral-300 text-neutral-900 dark:text-white dark:text-neutral-900 dark:text-white dark:text-neutral-900"/g,
  '"bg-white dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white"'
);

// Replace hover states
content = content.replace(
  /"bg-white dark:bg-neutral-900 dark:bg-white border-neutral-300 hover:border-neutral-900 dark:border-white dark:border-neutral-900 dark:border-white dark:border-neutral-900 text-neutral-900 dark:text-white dark:text-neutral-900 dark:text-white dark:text-neutral-900"/g,
  '"bg-white dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 text-neutral-900 dark:text-white"'
);

content = content.replace(
  /"bg-white dark:bg-neutral-900 dark:bg-white border border-neutral-300 hover:border-neutral-900 dark:border-white dark:border-neutral-900 dark:border-white dark:border-neutral-900 text-neutral-900 dark:text-white dark:text-neutral-900 dark:text-white dark:text-neutral-900"/g,
  '"bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 text-neutral-900 dark:text-white"'
);

// Check if there are other un-replaced elements
content = content.replace(
  /"bg-neutral-900 dark:bg-white border-neutral-700 text-white dark:text-neutral-900"/g,
  '"bg-white/20 dark:bg-black/20 border-transparent text-white dark:text-black"'
);


// Diagram lines & dots
content = content.replace(
  /"w-0.5 h-6 bg-neutral-900 dark:bg-white"/g,
  '"w-0.5 h-6 bg-neutral-300 dark:bg-neutral-700"'
);
content = content.replace(
  /"w-2.5 h-2.5 rounded-full bg-neutral-900 dark:bg-white"/g,
  '"w-2.5 h-2.5 rounded-full bg-neutral-400 dark:bg-neutral-600"'
);
content = content.replace(
  /"w-0.5 h-4 bg-neutral-900 dark:bg-white"/g,
  '"w-0.5 h-4 bg-neutral-300 dark:bg-neutral-700"'
);
content = content.replace(
  /"absolute top-0 left-8 right-8 h-0.5 bg-neutral-900 dark:bg-white"/g,
  '"absolute top-0 left-8 right-8 h-0.5 bg-neutral-300 dark:bg-neutral-700"'
);
content = content.replace(
  /"w-48 h-0.5 bg-neutral-900 dark:bg-white"/g,
  '"w-48 h-0.5 bg-neutral-300 dark:bg-neutral-700"'
);

fs.writeFileSync('src/components/PlatformArchitectureDiagram.tsx', content);
