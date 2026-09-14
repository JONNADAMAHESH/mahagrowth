const fs = require('fs');

// 1. Fix GrowthEcosystem.tsx
let ecosystem = fs.readFileSync('src/components/GrowthEcosystem.tsx', 'utf-8');
ecosystem = ecosystem.replace(
  /bg-white dark:bg-neutral-900 dark:bg-white border-2 border-neutral-900 dark:border-white dark:border-neutral-900 dark:border-white dark:border-neutral-900 shadow-md/g,
  'bg-white dark:bg-neutral-900 border-2 border-neutral-900 dark:border-cyan-500 shadow-md'
);
ecosystem = ecosystem.replace(
  /bg-neutral-50 hover:bg-neutral-100 border-neutral-200 hover:border-neutral-400/g,
  'bg-neutral-50 dark:bg-neutral-900/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700'
);
ecosystem = ecosystem.replace(
  /bg-neutral-900 dark:bg-white dark:bg-white border-neutral-900 dark:border-white dark:border-neutral-900 dark:border-white dark:border-neutral-900 text-white dark:text-neutral-900/g,
  'bg-black dark:bg-cyan-500 border-black dark:border-cyan-500 text-white dark:text-black'
);
ecosystem = ecosystem.replace(
  /bg-white dark:bg-neutral-900 dark:bg-white border-neutral-300 text-neutral-700 group-hover:text-neutral-900 dark:hover:text-white dark:hover:text-neutral-900 dark:text-white dark:text-neutral-900 dark:text-white dark:text-neutral-900 group-hover:border-neutral-900 dark:border-white dark:border-neutral-900 dark:border-white dark:border-neutral-900/g,
  'bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white group-hover:border-neutral-900 dark:group-hover:border-cyan-400'
);
fs.writeFileSync('src/components/GrowthEcosystem.tsx', ecosystem);

// 2. Fix PricingPage.tsx
let pricing = fs.readFileSync('src/pages/PricingPage.tsx', 'utf-8');
pricing = pricing.replace(
  /bg-neutral-50 dark:bg-neutral-800/g,
  'bg-white dark:bg-neutral-900'
);
fs.writeFileSync('src/pages/PricingPage.tsx', pricing);

console.log('Successfully patched UI bugs!');
