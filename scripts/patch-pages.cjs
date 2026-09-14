const fs = require('fs');
const pages = ['src/pages/CaseStudiesPage.tsx', 'src/pages/ServicesPage.tsx', 'src/pages/PricingPage.tsx'];

pages.forEach(file => {
  let code = fs.readFileSync(file, 'utf-8');
  // First fix text-black
  code = code.replace(/text-black/g, 'text-neutral-900 dark:text-white');
  // Fix hover:text-black
  code = code.replace(/hover:text-neutral-900 dark:text-white/g, 'hover:text-neutral-900 dark:hover:text-white');
  
  // What about bg-black text-white ? That's usually intended for primary buttons. 
  // Let's only replace hardcoded text-white where it's on headings. But user said "replace any hardcoded text-black or text-white classes on the headings with text-neutral-900 dark:text-white so they respond to the theme toggle."
  
  fs.writeFileSync(file, code);
});
