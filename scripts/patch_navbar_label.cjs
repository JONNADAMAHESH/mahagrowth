const fs = require('fs');
let content = fs.readFileSync('src/components/Navbar.tsx', 'utf-8');
content = content.replace('{ label: "Platform", page: "services" },', '{ label: "Services", page: "services" },');
fs.writeFileSync('src/components/Navbar.tsx', content);

let footer = fs.readFileSync('src/components/Footer.tsx', 'utf-8');
footer = footer.replace(/>Platform</g, '>Services<');
fs.writeFileSync('src/components/Footer.tsx', footer);
