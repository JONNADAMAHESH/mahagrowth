const fs = require('fs');

let content = fs.readFileSync('src/pages/CaseStudiesPage.tsx', 'utf-8');

// Update main cards and internal cards to use dark:bg-neutral-900/50
content = content.replace(/bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800/g, 'bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800');
content = content.replace(/bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800/g, 'bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800');
content = content.replace(/bg-white dark:bg-neutral-900 text-\[10px\]/g, 'bg-white dark:bg-neutral-900/50 text-[10px]');

fs.writeFileSync('src/pages/CaseStudiesPage.tsx', content);
