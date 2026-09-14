const fs = require('fs');
const path = require('path');
const glob = require('fs').readdirSync;

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
  let original = content;

  // We only want to replace within className="..." or className={`...`}
  content = content.replace(/className=(["'])(.*?)\1|className=\{`(.*?)`\}/g, (match, quote, p2, p3) => {
    let classes = p2 !== undefined ? p2 : p3;
    
    // Split classes by whitespace
    let classList = classes.split(/\s+/).filter(Boolean);
    
    // Remove all existing dark: inverses for the properties we want to touch to avoid duplication
    classList = classList.filter(c => 
      !['dark:text-white', 'dark:text-neutral-900', 'dark:text-black', 
        'dark:bg-white', 'dark:bg-neutral-900', 'dark:bg-[#080c16]', 'dark:bg-black',
        'dark:border-white', 'dark:border-neutral-900', 'dark:border-black'].includes(c)
    );

    // Map base classes to their responsive pairs
    let newClassList = [];
    for (let c of classList) {
      if (c === 'text-black' || c === 'text-neutral-900') {
        newClassList.push('text-neutral-900', 'dark:text-white');
      } else if (c === 'text-white') {
        newClassList.push('text-white', 'dark:text-neutral-900');
      } else if (c === 'bg-white') {
        newClassList.push('bg-white', 'dark:bg-neutral-900');
      } else if (c === 'bg-black' || c === 'bg-neutral-900') {
        newClassList.push('bg-neutral-900', 'dark:bg-white');
      } else if (c === 'border-black' || c === 'border-neutral-900') {
        newClassList.push('border-neutral-900', 'dark:border-white');
      } else if (c === 'border-white') {
        newClassList.push('border-white', 'dark:border-neutral-900');
      } else if (c === 'hover:text-black' || c === 'hover:text-neutral-900') {
        newClassList.push('hover:text-neutral-900', 'dark:hover:text-white');
      } else if (c === 'hover:text-white') {
        newClassList.push('hover:text-white', 'dark:hover:text-neutral-900');
      } else if (c === 'hover:bg-black' || c === 'hover:bg-neutral-900') {
        newClassList.push('hover:bg-neutral-900', 'dark:hover:bg-white');
      } else if (c === 'hover:bg-white') {
        newClassList.push('hover:bg-white', 'dark:hover:bg-neutral-900');
      } else if (c === 'focus:border-black' || c === 'focus:border-neutral-900') {
        newClassList.push('focus:border-neutral-900', 'dark:focus:border-white');
      } else {
        newClassList.push(c); // keep original
      }
    }

    // De-duplicate just in case
    newClassList = [...new Set(newClassList)];

    let newClasses = newClassList.join(' ');
    
    if (p2 !== undefined) {
      return `className=${quote}${newClasses}${quote}`;
    } else {
      return `className={\`${newClasses}\`}`;
    }
  });

  fs.writeFileSync(file, content);
}
console.log('Patch complete.');
