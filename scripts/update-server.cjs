const fs = require('fs');

let code = fs.readFileSync('server.ts', 'utf-8');

// Replace sync route handlers with async
code = code.replace(/app\.(get|post|patch)\('([^']+)',\s*(.*?)\(req(.*?), res\)(.*?) => {/g, (match, method, path, middlewares, reqRest, resRest) => {
    return `app.${method}('${path}', ${middlewares}async (req${reqRest}, res)${resRest} => {`;
});

// For _req
code = code.replace(/app\.(get|post|patch)\('([^']+)',\s*(.*?)\(_req(.*?), res\)(.*?) => {/g, (match, method, path, middlewares, reqRest, resRest) => {
    return `app.${method}('${path}', ${middlewares}async (_req${reqRest}, res)${resRest} => {`;
});

// Await db calls
code = code.replace(/db\.getCounts\(/g, 'await db.getCounts(');
code = code.replace(/db\.getAllUsers\(/g, 'await db.getAllUsers(');
code = code.replace(/db\.verifyCredentials\(/g, 'await db.verifyCredentials(');
code = code.replace(/db\.logAudit\(/g, 'await db.logAudit(');
code = code.replace(/db\.registerUser\(/g, 'await db.registerUser(');
code = code.replace(/db\.getLeads\(/g, 'await db.getLeads(');
code = code.replace(/db\.createLead\(/g, 'await db.createLead(');
code = code.replace(/db\.updateLead\(/g, 'await db.updateLead(');
code = code.replace(/db\.getDiagnostics\(/g, 'await db.getDiagnostics(');
code = code.replace(/db\.saveDiagnostic\(/g, 'await db.saveDiagnostic(');
code = code.replace(/db\.triggerWorkflow\(/g, 'await db.triggerWorkflow(');
code = code.replace(/db\.getWorkflows\(/g, 'await db.getWorkflows(');
code = code.replace(/db\.toggleWorkflow\(/g, 'await db.toggleWorkflow(');

// Add await db.init();
code = code.replace(/const app = express\(\);/, "const app = express();\n  await db.init();");

fs.writeFileSync('server.ts', code, 'utf-8');
console.log('Done!');
