const fs = require('fs');

let code = fs.readFileSync('server/db/database.ts', 'utf-8');

// Replace public async methods to wrap their contents in try/catch if they contain pool.query
const methodsToPatch = [
  'getUserByToken',
  'getUserByEmail',
  'verifyCredentials',
  'registerUser',
  'getAllUsers',
  'getLeads',
  'createLead',
  'updateLead',
  'getDiagnostics',
  'saveDiagnostic',
  'getWorkflows',
  'triggerWorkflow',
  'toggleWorkflow',
  'logAudit',
  'getAuditLogs',
  'incrementRequestCount',
  'getCounts'
];

code = code.replace(/public async incrementRequestCount\(\) {([\s\S]*?)  }/, `public async incrementRequestCount() {
    if (!this.pool) return;
    try {
      await this.pool.query('UPDATE metrics SET totalRequests = totalRequests + 1 WHERE id = 1');
    } catch (e) { console.error('DB Error:', e.message); }
  }`);

code = code.replace(/public async logAudit\((.*?)\) {([\s\S]*?)  }/, `public async logAudit($1) {
    if (!this.pool) return;
    const log: AuditLogEntity = {
      id: 'aud-' + Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toISOString(),
      actor,
      action,
      details,
      ip,
    };
    try {
      await this.pool.query(
        'INSERT INTO audit_logs (id, timestamp, actor, action, details, ip) VALUES (?, ?, ?, ?, ?, ?)',
        [log.id, log.timestamp, log.actor, log.action, JSON.stringify(log.details), log.ip || null]
      );
    } catch (e) { console.error('DB Error:', e.message); }
  }`);

// For verifyCredentials, the error will just propagate or it's fine since it only calls other methods
// For others, if we just want to avoid crashing, we can catch and return default.

fs.writeFileSync('server/db/database.ts', code);
