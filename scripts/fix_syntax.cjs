const fs = require('fs');

function fixAuthWorkspace() {
  let content = fs.readFileSync('src/components/AuthWorkspaceView.tsx', 'utf-8');
  content = content.replace(
    /className=\{\`w-3\.5 h-3\.5 \$\{loadingData \? "animate-spin text-neutral-900 dark:text-white : "text-neutral-900\`/g,
    'className={`w-3.5 h-3.5 ${loadingData ? "animate-spin text-neutral-900 dark:text-white" : "text-neutral-900 dark:text-white"}`}'
  );
  fs.writeFileSync('src/components/AuthWorkspaceView.tsx', content);
}

function fixJourneyTimeline() {
  let content = fs.readFileSync('src/components/JourneyTimeline.tsx', 'utf-8');
  // Error 1: src/components/JourneyTimeline.tsx(152,17) - wait, let's see what is broken there.
}

fixAuthWorkspace();
function fixJourneyTimeline() {
  let content = fs.readFileSync('src/components/JourneyTimeline.tsx', 'utf-8');
  content = content.replace(
    /className=\{\`font-bold \$\{isSelected \? "text-white : "text-neutral-600"\}\`\}/g,
    'className={`font-bold ${isSelected ? "text-white dark:text-neutral-900" : "text-neutral-600 dark:text-neutral-300"}`}'
  );
  // Let's also check for any other broken template literals in that file
  content = content.replace(
    /"bg-neutral-900 dark:bg-white dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white dark:border-neutral-900 dark:border-white dark:border-neutral-900 shadow-md"/g,
    '"bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white shadow-md"'
  );
  content = content.replace(
    /"bg-neutral-50 border-neutral-200 text-neutral-700 hover:border-neutral-400 hover:text-neutral-900 dark:hover:text-white dark:hover:text-neutral-900 dark:text-white dark:text-neutral-900 dark:text-white dark:text-neutral-900"/g,
    '"bg-neutral-50 border-neutral-200 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 hover:text-neutral-900 dark:hover:text-white dark:bg-neutral-800"'
  );
  fs.writeFileSync('src/components/JourneyTimeline.tsx', content);
}
fixJourneyTimeline();
function fixProductWorkspace() {
  let content = fs.readFileSync('src/components/ProductWorkspaceShowcase.tsx', 'utf-8');
  content = content.replace(
    /className=\{\`w-3\.5 h-3\.5 \$\{isActive \? "text-white : "text-neutral-500"\}\`\}/g,
    'className={`w-3.5 h-3.5 ${isActive ? "text-white dark:text-neutral-900" : "text-neutral-500 dark:text-neutral-400"}`}'
  );
  fs.writeFileSync('src/components/ProductWorkspaceShowcase.tsx', content);
}

function fixAuthWorkspace2() {
  let content = fs.readFileSync('src/components/AuthWorkspaceView.tsx', 'utf-8');
  content = content.replace(
    /className=\{\`w-3\.5 h-3\.5 \$\{loadingData \? "animate-spin text-neutral-900 dark:text-white" : "text-neutral-900 dark:text-white"\}\`\}/g,
    'className={`w-3.5 h-3.5 ${loadingData ? "animate-spin text-neutral-900 dark:text-white" : "text-neutral-900 dark:text-white"}`}'
  );
  fs.writeFileSync('src/components/AuthWorkspaceView.tsx', content);
}
fixProductWorkspace();
fixAuthWorkspace2();
