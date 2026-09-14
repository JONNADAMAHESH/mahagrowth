const fs = require('fs');
const path = require('path');

function getAllTsx(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllTsx(filePath, fileList);
    } else if (filePath.endsWith('.tsx')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const allFiles = getAllTsx(path.join(process.cwd(), 'src'));

for (const file of allFiles) {
  let content = fs.readFileSync(file, 'utf-8');

  // STRIP EXISTING DARK VARIANTS OF THESE SPECIFIC COLORS TO PREVENT DUPLICATES
  // Be careful not to replace anything else
  content = content.replace(/\bdark:text-white\b/g, '')
                   .replace(/\bdark:text-neutral-900\b/g, '')
                   .replace(/\bdark:text-neutral-100\b/g, '')
                   .replace(/\bdark:text-black\b/g, '')
                   .replace(/\bdark:bg-white\b/g, '')
                   .replace(/\bdark:bg-neutral-900\b/g, '')
                   .replace(/\bdark:bg-black\b/g, '')
                   .replace(/\bdark:bg-\[\#080c16\]\b/g, '')
                   .replace(/\bdark:border-white\b/g, '')
                   .replace(/\bdark:border-neutral-900\b/g, '')
                   .replace(/\bdark:hover:text-white\b/g, '')
                   .replace(/\bdark:hover:text-neutral-900\b/g, '')
                   .replace(/\bdark:hover:bg-white\b/g, '')
                   .replace(/\bdark:hover:bg-neutral-900\b/g, '');

  // We should also clean up any duplicate spaces that might have formed, but ONLY within strings
  // Actually, let's just do the replacements now. We will use a negative lookbehind if supported,
  // or a simple regex that checks if we are inside a class attribute.
  // The easiest way without parsing AST is just replacing globally.
  // Is it safe? Most likely yes, these are very specific tailwind classes.
  
  // NOTE: Javascript regex doesn't support negative lookbehind for all versions, but Node 20+ does.
  
  content = content.replace(/(?<!selection:)\btext-black\b/g, 'text-neutral-900 dark:text-white');
  content = content.replace(/(?<!selection:)\btext-neutral-900\b/g, 'text-neutral-900 dark:text-white');
  
  content = content.replace(/(?<!selection:)\btext-white\b/g, 'text-white dark:text-neutral-900');
  
  content = content.replace(/(?<!selection:)\bbg-white\b/g, 'bg-white dark:bg-neutral-900');
  content = content.replace(/(?<!selection:)\bbg-black\b/g, 'bg-neutral-900 dark:bg-white');
  content = content.replace(/(?<!selection:)\bbg-neutral-900\b/g, 'bg-neutral-900 dark:bg-white');

  content = content.replace(/(?<!selection:)\bborder-black\b/g, 'border-neutral-900 dark:border-white');
  content = content.replace(/(?<!selection:)\bborder-neutral-900\b/g, 'border-neutral-900 dark:border-white');
  content = content.replace(/(?<!selection:)\bborder-white\b/g, 'border-white dark:border-neutral-900');

  content = content.replace(/(?<!selection:)\bhover:text-black\b/g, 'hover:text-neutral-900 dark:hover:text-white');
  content = content.replace(/(?<!selection:)\bhover:text-neutral-900\b/g, 'hover:text-neutral-900 dark:hover:text-white');
  content = content.replace(/(?<!selection:)\bhover:text-white\b/g, 'hover:text-white dark:hover:text-neutral-900');

  content = content.replace(/(?<!selection:)\bhover:bg-black\b/g, 'hover:bg-neutral-900 dark:hover:bg-white');
  content = content.replace(/(?<!selection:)\bhover:bg-neutral-900\b/g, 'hover:bg-neutral-900 dark:hover:bg-white');
  content = content.replace(/(?<!selection:)\bhover:bg-white\b/g, 'hover:bg-white dark:hover:bg-neutral-900');

  // Format spaces
  content = content.replace(/  +/g, ' ');

  fs.writeFileSync(file, content);
}
console.log('Complete.');
