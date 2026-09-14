const fs = require('fs');
let content = fs.readFileSync('src/context/AuthContext.tsx', 'utf-8');

// We have 3 instances where we build AuthUser in AuthContext.tsx
content = content.replace(
  /company: session.user.user_metadata\?\.company,/g,
  'company: session.user.user_metadata?.company || "My Company",\n          permissions: [],\n          token: session.access_token || "",'
);

content = content.replace(
  /company: data.user.user_metadata\?\.company,/g,
  'company: data.user.user_metadata?.company || "My Company",\n        permissions: [],\n        token: "",'
);

fs.writeFileSync('src/context/AuthContext.tsx', content);
