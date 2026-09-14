const fs = require('fs');

let content = fs.readFileSync('src/components/MiniDataStudioSandbox.tsx', 'utf-8');

// The main wrapper of sandbox is probably right below return
// We'll just aggressively replace all responsive classes inside this specific file with dark-only versions.
content = content.replace(/bg-white dark:bg-neutral-900/g, 'bg-[#0a0a0a]');
content = content.replace(/bg-white dark:bg-[#080c16]/g, 'bg-[#0a0a0a]');
content = content.replace(/bg-neutral-900 dark:bg-white/g, 'bg-white');

content = content.replace(/text-neutral-900 dark:text-white/g, 'text-white');
content = content.replace(/text-white dark:text-neutral-900/g, 'text-neutral-900');

content = content.replace(/border-neutral-900 dark:border-white/g, 'border-white/20');
content = content.replace(/border-neutral-300 dark:border-neutral-800/g, 'border-neutral-800');
content = content.replace(/border-neutral-200 dark:border-neutral-800/g, 'border-neutral-800');

content = content.replace(/hover:bg-neutral-100 dark:hover:bg-neutral-800/g, 'hover:bg-neutral-800');
content = content.replace(/hover:bg-neutral-800 dark:hover:bg-neutral-200/g, 'hover:bg-neutral-700');
content = content.replace(/hover:text-neutral-900 dark:hover:text-white/g, 'hover:text-white');

// For text that was muted
content = content.replace(/text-neutral-500 dark:text-neutral-400/g, 'text-neutral-400');
content = content.replace(/text-neutral-600 dark:text-neutral-400/g, 'text-neutral-400');
content = content.replace(/text-neutral-600 dark:text-neutral-300/g, 'text-neutral-300');
content = content.replace(/text-neutral-700 dark:text-neutral-300/g, 'text-neutral-300');
content = content.replace(/text-neutral-700 dark:text-neutral-200/g, 'text-neutral-200');
content = content.replace(/text-neutral-800 dark:text-neutral-200/g, 'text-neutral-200');

content = content.replace(/bg-neutral-100 dark:bg-neutral-800/g, 'bg-neutral-800');
content = content.replace(/bg-neutral-100 dark:bg-neutral-900/g, 'bg-neutral-900');

fs.writeFileSync('src/components/MiniDataStudioSandbox.tsx', content);
