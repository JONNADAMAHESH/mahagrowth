const fs = require('fs');
let content = fs.readFileSync('src/components/MiniDataStudioSandbox.tsx', 'utf-8');

// Container
content = content.replace(
  /className="w-full rounded-2xl bg-white\/90 border border-neutral-700\/80 p-5 sm:p-7 shadow-2xl backdrop-blur-xl space-y-6 text-left relative overflow-hidden text-neutral-100"/g,
  'className="w-full rounded-2xl bg-neutral-950 border border-neutral-800 p-5 sm:p-7 shadow-2xl backdrop-blur-xl space-y-6 text-left relative overflow-hidden text-neutral-100"'
);

// Tabs active
content = content.replace(
  /"bg-cyan-500 text-white dark:text-neutral-900 font-bold shadow-xs"/g,
  '"bg-cyan-500 text-white font-bold shadow-xs"'
);

// Tabs inactive
content = content.replace(
  /"text-neutral-400 hover:text-white dark:hover:text-neutral-900 dark:text-neutral-900 hover:bg-neutral-800"/g,
  '"text-neutral-400 hover:text-white hover:bg-neutral-800"'
);

// Input field
content = content.replace(
  /"w-full bg-neutral-950\/90 border border-neutral-700 rounded-xl px-4 py-2.5 text-xs font-mono text-neutral-900 dark:text-white placeholder:text-neutral-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"/g,
  '"w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder:text-neutral-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"'
);

// Submit button
content = content.replace(
  /"px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-neutral-900 dark:text-white text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer shadow-md transition-all shrink-0"/g,
  '"px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer shadow-md transition-all shrink-0"'
);

// Prompts
content = content.replace(
  /"text-\[10px\] font-mono px-2.5 py-1 rounded-lg bg-neutral-800\/70 hover:bg-neutral-700 text-neutral-300 hover:text-white dark:hover:text-neutral-900 border border-neutral-700\/60 cursor-pointer transition-all"/g,
  '"text-[10px] font-mono px-2.5 py-1 rounded-lg bg-neutral-800/70 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700/60 cursor-pointer transition-all"'
);

// JSON Pre
content = content.replace(
  /"text-\[11px\] font-mono text-neutral-300 bg-white dark:bg-neutral-900 p-2.5 rounded-lg overflow-x-auto"/g,
  '"text-[11px] font-mono text-neutral-300 bg-neutral-900 p-2.5 rounded-lg overflow-x-auto"'
);

// Sync tags inactive
content = content.replace(
  /"bg-neutral-800 text-neutral-400 hover:text-white dark:hover:text-neutral-900 dark:text-neutral-900"/g,
  '"bg-neutral-800 text-neutral-400 hover:text-white"'
);

// Book Demo button
content = content.replace(
  /"px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-neutral-900 dark:text-white font-bold flex items-center gap-1.5 shadow-md shadow-cyan-500\/20 cursor-pointer transition-all"/g,
  '"px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold flex items-center gap-1.5 shadow-md shadow-cyan-500/20 cursor-pointer transition-all"'
);

// View Schema button
content = content.replace(
  /"px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-900 dark:text-white font-medium flex items-center gap-1.5 border border-neutral-700 cursor-pointer transition-all"/g,
  '"px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium flex items-center gap-1.5 border border-neutral-700 cursor-pointer transition-all"'
);

fs.writeFileSync('src/components/MiniDataStudioSandbox.tsx', content);
