const fs = require('fs');
let code = fs.readFileSync('server/db/database.ts', 'utf-8');
code = code.replace(/\\\`/g, '\`');
fs.writeFileSync('server/db/database.ts', code);
