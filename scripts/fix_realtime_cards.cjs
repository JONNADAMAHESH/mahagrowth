const fs = require('fs');

let content = fs.readFileSync('src/components/RealTimeDataStudio.tsx', 'utf-8');

// Fix text-white dark:text-neutral-900 everywhere
content = content.replace(/text-white dark:text-neutral-900/g, 'text-neutral-900 dark:text-white');

// Fix bg-neutral-900 dark:bg-white which are mostly cards
content = content.replace(/bg-neutral-900 dark:bg-white/g, 'bg-white dark:bg-neutral-900/50');

// Fix borders border-neutral-800 to border-neutral-200 dark:border-neutral-800
content = content.replace(/border border-neutral-800/g, 'border border-neutral-200 dark:border-neutral-800');
content = content.replace(/border-b border-neutral-800/g, 'border-b border-neutral-200 dark:border-neutral-800');
content = content.replace(/border-r border-neutral-800/g, 'border-r border-neutral-200 dark:border-neutral-800');

fs.writeFileSync('src/components/RealTimeDataStudio.tsx', content);
