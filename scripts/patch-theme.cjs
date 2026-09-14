const fs = require('fs');

// Patch AiAssistantModal.tsx
let modal = fs.readFileSync('src/components/AiAssistantModal.tsx', 'utf-8');
modal = modal.replace(/bg-white dark:bg-neutral-900 dark:bg-neutral-900/g, 'bg-white dark:bg-neutral-900');
modal = modal.replace(/text-black/g, 'text-neutral-900 dark:text-white');
modal = modal.replace(/bg-black/g, 'bg-neutral-900 dark:bg-white');
modal = modal.replace(/text-white/g, 'text-white dark:text-neutral-900');
// Some text-white dark:text-neutral-900 dark:text-white might happen, let's just do targeted replaces

fs.writeFileSync('src/components/AiAssistantModal.tsx', modal);
