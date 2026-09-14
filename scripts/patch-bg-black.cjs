const fs = require('fs');
const pages = ['src/pages/CaseStudiesPage.tsx', 'src/pages/ServicesPage.tsx', 'src/pages/PricingPage.tsx'];

pages.forEach(file => {
  let code = fs.readFileSync(file, 'utf-8');
  code = code.replace(/bg-black text-white/g, 'bg-black dark:bg-white text-white dark:text-neutral-900');
  code = code.replace(/bg-black hover:bg-neutral-800 text-white/g, 'bg-black dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-900');
  fs.writeFileSync(file, code);
});
