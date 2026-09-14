const fs = require('fs');

function patchFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf-8');
  
  // Find all <h1, <h2, <h3, <h4, <h5, <h6 tags
  content = content.replace(/(<h[1-6][^>]*className="[^"]*)"/g, (match, p1) => {
    // If it already has text-neutral-900 dark:text-white, leave it
    // First, remove any existing text color classes
    let newClass = p1.replace(/\btext-black\b/g, '')
                     .replace(/\btext-white\b/g, '')
                     .replace(/\btext-neutral-900\b/g, '')
                     .replace(/\bdark:text-white\b/g, '')
                     .replace(/\bdark:text-neutral-900\b/g, '')
                     .replace(/\s+/g, ' ');
    
    // Append the correct class
    return newClass.trim() + ' text-neutral-900 dark:text-white"';
  });

  fs.writeFileSync(filepath, content);
}

patchFile('src/pages/CaseStudiesPage.tsx');
patchFile('src/pages/ServicesPage.tsx');
patchFile('src/pages/PricingPage.tsx');
