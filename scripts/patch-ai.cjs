const fs = require('fs');
let code = fs.readFileSync('src/components/AiAssistantModal.tsx', 'utf-8');

// Replace bg-white text-black with bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white
code = code.replace(/bg-white border border-neutral-300 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-black/, 'bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-neutral-900 dark:text-white');
code = code.replace(/border-b border-neutral-200 bg-neutral-100/g, 'border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900/50');
code = code.replace(/bg-black flex items-center justify-center text-white/g, 'bg-black dark:bg-white flex items-center justify-center text-white dark:text-black');
code = code.replace(/bg-neutral-200 text-black border border-neutral-300/g, 'bg-neutral-200 dark:bg-neutral-800 text-black dark:text-white border border-neutral-300 dark:border-neutral-700');
code = code.replace(/bg-black animate-pulse/g, 'bg-black dark:bg-white animate-pulse');
code = code.replace(/text-neutral-500 hover:text-black rounded-lg hover:bg-neutral-200/g, 'text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800');
code = code.replace(/bg-white([^]+?)bg-black text-white/g, 'bg-white dark:bg-neutral-900$1bg-black dark:bg-white text-white dark:text-black');
code = code.replace(/flex-1 overflow-y-auto p-4 space-y-4 bg-white/g, 'flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-neutral-900');
code = code.replace(/bg-black text-white shadow-xs/g, 'bg-black dark:bg-white text-white dark:text-black shadow-xs');
code = code.replace(/bg-neutral-100 border border-neutral-200 text-black/g, 'bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-black dark:text-white');
code = code.replace(/bg-neutral-50 border-t border-neutral-200/g, 'bg-neutral-50 dark:bg-neutral-900/50 border-t border-neutral-200 dark:border-neutral-800');
code = code.replace(/bg-white hover:bg-neutral-100 hover:border-black border border-neutral-300 text-neutral-700 hover:text-black/g, 'bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:border-black dark:hover:border-white border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white');
code = code.replace(/bg-neutral-100 border-t border-neutral-200/g, 'bg-neutral-100 dark:bg-neutral-800/50 border-t border-neutral-200 dark:border-neutral-800');
code = code.replace(/bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-black/g, 'bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-black dark:focus:border-neutral-500');
code = code.replace(/bg-black hover:bg-neutral-800 text-white/g, 'bg-black dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-black');
code = code.replace(/w-7 h-7 rounded-md bg-black text-white/g, 'w-7 h-7 rounded-md bg-black dark:bg-white text-white dark:text-black');

fs.writeFileSync('src/components/AiAssistantModal.tsx', code);
