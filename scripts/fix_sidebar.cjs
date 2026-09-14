const fs = require('fs');

let content = fs.readFileSync('src/components/SidebarNavigation.tsx', 'utf-8');

// Fix the Sidebar container background
content = content.replace(/bg-white dark:bg-neutral-900 dark:bg-white dark:bg-\[\#080c16\]/g, 'bg-white dark:bg-neutral-950');

// Fix the Mobile Header background
content = content.replace(/bg-white dark:bg-neutral-900 dark:bg-white/g, 'bg-white dark:bg-neutral-950');

// Fix text colors inside the sidebar
content = content.replace(/text-neutral-900 dark:text-white dark:text-neutral-900 dark:text-white dark:text-neutral-900 dark:text-cyan-400/g, 'text-neutral-900 dark:text-cyan-400');
content = content.replace(/text-neutral-900 dark:text-white dark:text-neutral-900/g, 'text-neutral-900 dark:text-white');
content = content.replace(/hover:text-neutral-900 dark:hover:text-white dark:hover:text-neutral-900 dark:text-white dark:text-neutral-900 dark:text-white dark:text-neutral-900/g, 'hover:text-neutral-900 dark:hover:text-white');
content = content.replace(/hover:text-neutral-900 dark:hover:text-white dark:hover:text-neutral-900 dark:text-white dark:text-neutral-900/g, 'hover:text-neutral-900 dark:hover:text-white');

// The mobile overlay
content = content.replace(/bg-neutral-900 dark:bg-white dark:bg-white\/50/g, 'bg-black/50 dark:bg-black/80');

// Fix the icon hover string
content = content.replace(/group-hover:text-neutral-900 dark:hover:text-white dark:hover:text-neutral-900 dark:text-white dark:text-neutral-900 dark:text-white dark:text-neutral-900 dark:group-hover:text-white dark:hover:text-neutral-900 dark:text-neutral-900/g, 'group-hover:text-neutral-900 dark:group-hover:text-white');

fs.writeFileSync('src/components/SidebarNavigation.tsx', content);
