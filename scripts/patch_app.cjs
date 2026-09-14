const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

content = content.replace(
  /{currentPage === "login" && \(\s*<LoginPage onNavigate={handleNavigate} \/>\s*\)}/g,
  `{currentPage === "login" && (
                    <LoginPage onNavigate={handleNavigate} />
                  )}
                  {currentPage === "portal" && (
                    <ClientPortalPage onNavigate={handleNavigate} />
                  )}`
);

fs.writeFileSync('src/App.tsx', content);
