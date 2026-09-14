const fs = require('fs');
let content = fs.readFileSync('src/components/SidebarNavigation.tsx', 'utf-8');
content = content.replace(
  /className=\{\`w-4 h-4 \$\{isActive \? "text-blue-600 dark:text-cyan-400" : "text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white"\}/g,
  'className={`w-4 h-4 ${isActive ? "text-blue-600 dark:text-cyan-400" : "text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white"}`}'
);
fs.writeFileSync('src/components/SidebarNavigation.tsx', content);
