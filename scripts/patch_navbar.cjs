const fs = require('fs');
let content = fs.readFileSync('src/components/Navbar.tsx', 'utf-8');
content = content.replace('{ label: "Services", page: "platform", hasDropdown: true },', '{ label: "Platform", page: "platform" },');
fs.writeFileSync('src/components/Navbar.tsx', content);
