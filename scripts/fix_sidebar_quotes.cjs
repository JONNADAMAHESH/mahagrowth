const fs = require('fs');
let content = fs.readFileSync('src/components/SidebarNavigation.tsx', 'utf-8');
content = content.replace(/"text-blue-600 : "text-neutral-500 group-group-hover:text-neutral-900`/g, '"text-blue-600 dark:text-cyan-400" : "text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white"`');
fs.writeFileSync('src/components/SidebarNavigation.tsx', content);
