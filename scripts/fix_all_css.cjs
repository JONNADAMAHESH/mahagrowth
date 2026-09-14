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

  // Replace class attributes
  content = content.replace(/className=(["'])(.*?)\1|className=\{`(.*?)`\}/g, (match, quote, p2, p3) => {
    let classes = p2 !== undefined ? p2 : p3;
    let classList = classes.split(/\s+/).filter(Boolean);
    
    // First, let's remove ALL dark: variants to start fresh and clean up the mess
    classList = classList.filter(c => !c.startsWith('dark:'));

    // Now let's carefully map the base classes to add their proper dark variants
    let newClassList = [];
    
    for (let c of classList) {
      newClassList.push(c);
      
      // Text Colors
      if (c === 'text-black' || c === 'text-neutral-900') {
        newClassList.push('dark:text-white');
      } else if (c === 'text-white') {
        newClassList.push('dark:text-neutral-900');
      } else if (c === 'text-neutral-600' || c === 'text-neutral-700' || c === 'text-neutral-800') {
        newClassList.push('dark:text-neutral-300');
      } else if (c === 'text-neutral-500') {
        newClassList.push('dark:text-neutral-400');
      }
      // Hover Text Colors
      else if (c === 'hover:text-black' || c === 'hover:text-neutral-900') {
        newClassList.push('dark:hover:text-white');
      } else if (c === 'hover:text-white') {
        newClassList.push('dark:hover:text-neutral-900');
      }
      // Backgrounds
      else if (c === 'bg-white') {
        // If it's a card/container, we can use bg-neutral-900
        newClassList.push('dark:bg-neutral-900');
      } else if (c === 'bg-black' || c === 'bg-neutral-900') {
        newClassList.push('dark:bg-white');
      } else if (c === 'bg-neutral-50' || c === 'bg-neutral-100') {
        newClassList.push('dark:bg-neutral-800');
      } else if (c === 'bg-neutral-200') {
        newClassList.push('dark:bg-neutral-700');
      }
      // Hover Backgrounds
      else if (c === 'hover:bg-white') {
        newClassList.push('dark:hover:bg-neutral-900');
      } else if (c === 'hover:bg-black' || c === 'hover:bg-neutral-900') {
        newClassList.push('dark:hover:bg-white');
      } else if (c === 'hover:bg-neutral-50' || c === 'hover:bg-neutral-100' || c === 'hover:bg-neutral-200') {
        newClassList.push('dark:hover:bg-neutral-800');
      }
      // Borders
      else if (c === 'border-black' || c === 'border-neutral-900') {
        newClassList.push('dark:border-white');
      } else if (c === 'border-white') {
        newClassList.push('dark:border-neutral-900');
      } else if (c === 'border-neutral-200' || c === 'border-neutral-300') {
        newClassList.push('dark:border-neutral-800');
      }
    }

    // Deduplicate
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
console.log('Fixed all css.');
