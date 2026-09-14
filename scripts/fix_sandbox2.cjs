const fs = require('fs');
let content = fs.readFileSync('src/components/MiniDataStudioSandbox.tsx', 'utf-8');

content = content.replace(
  /"text-lg sm:text-xl font-mono font-bold text-neutral-900 dark:text-white"/g,
  '"text-lg sm:text-xl font-mono font-bold text-white"'
);

fs.writeFileSync('src/components/MiniDataStudioSandbox.tsx', content);
