const fs = require('fs');

function fixPricing() {
  let content = fs.readFileSync('src/pages/PricingPage.tsx', 'utf-8');
  
  // Fix garbled classes in Pricing
  content = content.replace(/dark:border-white dark:border-neutral-900 dark:border-white dark:border-neutral-900/g, 'dark:border-neutral-700');
  content = content.replace(/bg-neutral-900 dark:bg-white dark:bg-white text-white dark:text-neutral-900 shadow-xs/g, 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-md');
  content = content.replace(/bg-neutral-100 hover:bg-neutral-900 dark:hover:bg-white dark:hover:bg-neutral-900 dark:bg-white dark:bg-white hover:text-white dark:hover:text-neutral-900 dark:text-neutral-900 text-neutral-900 dark:text-white dark:text-neutral-900 border border-neutral-300/g, 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-900 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white hover:text-white dark:hover:text-white border border-neutral-300 dark:border-neutral-700');
  content = content.replace(/bg-neutral-900 dark:bg-white dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-900/g, 'bg-neutral-900 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-900');
  
  fs.writeFileSync('src/pages/PricingPage.tsx', content);
}

function fixCaseStudies() {
  let content = fs.readFileSync('src/pages/CaseStudiesPage.tsx', 'utf-8');
  
  content = content.replace(/dark:border-white dark:border-neutral-900 dark:border-white dark:border-neutral-900/g, 'dark:border-neutral-700');
  
  // Checking other anomalies in Case Studies
  content = content.replace(/bg-neutral-900 dark:bg-white dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-900/g, 'bg-neutral-900 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-900');
  content = content.replace(/bg-neutral-100 hover:bg-neutral-900 dark:hover:bg-white dark:hover:bg-neutral-900 dark:bg-white dark:bg-white hover:text-white dark:hover:text-neutral-900 dark:text-neutral-900/g, 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-900 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white hover:text-white');

  fs.writeFileSync('src/pages/CaseStudiesPage.tsx', content);
}

fixPricing();
fixCaseStudies();
