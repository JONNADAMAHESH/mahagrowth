const fs = require('fs');

// 1. Fix DataStudioPage.tsx
let dataStudio = fs.readFileSync('src/pages/DataStudioPage.tsx', 'utf-8');
dataStudio = dataStudio.replace(
  /bg-neutral-900 dark:bg-white border border-neutral-800/g,
  'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800'
);
// Also update text colors inside those cards if they were hardcoded text-white dark:text-neutral-900
dataStudio = dataStudio.replace(
  /text-base font-bold text-white dark:text-neutral-900/g,
  'text-base font-bold text-neutral-900 dark:text-white'
);
dataStudio = dataStudio.replace(
  /text-xs text-neutral-400 leading-relaxed/g,
  'text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed'
);
fs.writeFileSync('src/pages/DataStudioPage.tsx', dataStudio);

// 2. Fix JourneyTimeline.tsx
let journey = fs.readFileSync('src/components/JourneyTimeline.tsx', 'utf-8');
journey = journey.replace(
  /bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white/g,
  'bg-neutral-900 dark:bg-cyan-500 text-white dark:text-black border-neutral-900 dark:border-cyan-500'
);
journey = journey.replace(
  /bg-neutral-900 dark:bg-white text-white dark:text-neutral-900/g,
  'bg-neutral-900 dark:bg-cyan-500 text-white dark:text-black'
);
journey = journey.replace(
  /bg-neutral-900 dark:bg-white/g,
  'bg-neutral-900 dark:bg-cyan-500'
);
fs.writeFileSync('src/components/JourneyTimeline.tsx', journey);

// 3. Fix PricingPage.tsx popular card background if needed
let pricing = fs.readFileSync('src/pages/PricingPage.tsx', 'utf-8');
pricing = pricing.replace(
  /bg-white dark:bg-neutral-900 shadow-md/g,
  'bg-white dark:bg-neutral-900/90 border-2 border-neutral-900 dark:border-cyan-400 shadow-md'
);
fs.writeFileSync('src/pages/PricingPage.tsx', pricing);

console.log('Successfully fixed card styling!');
