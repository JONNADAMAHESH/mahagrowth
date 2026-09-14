const fs = require('fs');

let content = fs.readFileSync('src/components/AiAssistantModal.tsx', 'utf-8');

// Fix text-neutral-900 dark:text-white dark:text-neutral-900
content = content.replace(/text-neutral-900 dark:text-white(?: dark:text-[a-z0-9-]+)+/g, 'text-neutral-900 dark:text-white');
content = content.replace(/text-white dark:text-neutral-900(?: dark:text-[a-z0-9-]+)+/g, 'text-white dark:text-neutral-900');
content = content.replace(/dark:text-neutral-900 dark:text-neutral-900/g, 'dark:text-neutral-900');
content = content.replace(/dark:text-white dark:text-white/g, 'dark:text-white');

// bg
content = content.replace(/bg-neutral-900 dark:bg-white(?: dark:bg-[a-z0-9-]+)+/g, 'bg-neutral-900 dark:bg-white');
content = content.replace(/bg-white dark:bg-neutral-900(?: dark:bg-[a-z0-9-]+)+/g, 'bg-white dark:bg-neutral-900');
content = content.replace(/dark:bg-white dark:bg-white/g, 'dark:bg-white');
content = content.replace(/dark:bg-neutral-900 dark:bg-neutral-900/g, 'dark:bg-neutral-900');

// hover
content = content.replace(/hover:text-neutral-900 dark:text-white dark:text-neutral-900 dark:hover:text-white dark:text-neutral-900/g, 'hover:text-neutral-900 dark:hover:text-white');

content = content.replace(/hover:text-neutral-900 dark:text-white dark:text-neutral-900/g, 'hover:text-neutral-900 dark:hover:text-white');
content = content.replace(/text-neutral-900 dark:text-white dark:text-neutral-900/g, 'text-neutral-900 dark:text-white');
content = content.replace(/text-white dark:text-neutral-900/g, 'text-white dark:text-neutral-900'); // wait

fs.writeFileSync('src/components/AiAssistantModal.tsx', content);
