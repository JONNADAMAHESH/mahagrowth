const fs = require('fs');
let content = fs.readFileSync('src/components/SidebarNavigation.tsx', 'utf-8');

// The ultimate clean-up regex for duplicate classes
// It's safer to just replace these specific garbled blocks manually

content = content.replace(/hover:text-neutral-900 dark:hover:text-white dark:hover:text-neutral-900 dark:text-white dark:text-white dark:text-neutral-900 dark:group-hover:text-white dark:hover:text-neutral-900 dark:text-neutral-900/g, 'group-hover:text-neutral-900 dark:group-hover:text-white');
content = content.replace(/hover:text-neutral-900 dark:hover:text-white dark:hover:text-neutral-900 dark:text-white/g, 'hover:text-neutral-900 dark:hover:text-white');
content = content.replace(/dark:text-white dark:text-neutral-900 /g, 'dark:text-white ');
content = content.replace(/dark:text-white /g, 'dark:text-white ');

fs.writeFileSync('src/components/SidebarNavigation.tsx', content);
