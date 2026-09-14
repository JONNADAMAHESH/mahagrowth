import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

export interface UserEntity {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'team' | 'client';
  company: string;
  permissions: string[];
  token: string;
  password?: string;
  avatar?: string;
}

export interface LeadEntity {
  id: string;
  name: string;
  email: string;
  company: string;
  stage: string;
  primaryChallenge: string;
  status: 'new' | 'dossier_prepared' | 'call_scheduled' | 'active_sprint' | 'closed_won';
  priority: 'high' | 'medium' | 'low';
  createdAt: string;
  assignedTo?: string;
  notes?: string;
  message?: string;
}

export interface DiagnosticEntity {
  id: string;
  clientName: string;
  company: string;
  stage: 'START' | 'GROW' | 'AUTOMATE' | 'SCALE';
  bottlenecks: string[];
  computedRoi: string;
  hoursRecoverable: string;
  targetArr: string;
  priorityStack: string[];
  createdAt: string;
  status: 'draft' | 'reviewed' | 'presented';
}

export interface WorkflowEntity {
  id: string;
  name: string;
  trigger: string;
  actions: string[];
  status: 'active' | 'paused';
  runsCount: number;
  lastRunAt: string;
  category: 'lead_enrichment' | 'agent_dispatch' | 'analytics_sync' | 'nurture';
}

export interface AuditLogEntity {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  details: Record<string, any>;
  ip?: string;
}

class ValenceDatabase {
  private db: Database.Database | null = null;
  public isInitialized = false;

  constructor() {}

  public async init() {
    try {
      const dbDir = path.resolve(process.cwd(), '.data');
      if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
      }
      const dbPath = path.join(dbDir, 'valence.sqlite');
      
      this.db = new Database(dbPath);
      this.db.pragma('journal_mode = WAL');
      
      console.log('[ValenceDatabase] Successfully connected to SQLite database.');

      this.createTables();
      this.seedDefaultData();
      this.isInitialized = true;
    } catch (err: any) {
      console.error('[ValenceDatabase] Database connection error:', err.message);
      this.db = null;
    }
  }

  private createTables() {
    if (!this.db) return;
    try {
      this.db.exec(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          name TEXT,
          email TEXT UNIQUE,
          role TEXT,
          company TEXT,
          permissions TEXT,
          token TEXT,
          password TEXT,
          avatar TEXT
        )
      `);

      this.db.exec(`
        CREATE TABLE IF NOT EXISTS leads (
          id TEXT PRIMARY KEY,
          name TEXT,
          email TEXT,
          company TEXT,
          stage TEXT,
          primaryChallenge TEXT,
          status TEXT,
          priority TEXT,
          createdAt TEXT,
          assignedTo TEXT,
          notes TEXT,
          message TEXT
        )
      `);

      this.db.exec(`
        CREATE TABLE IF NOT EXISTS diagnostics (
          id TEXT PRIMARY KEY,
          clientName TEXT,
          company TEXT,
          stage TEXT,
          bottlenecks TEXT,
          computedRoi TEXT,
          hoursRecoverable TEXT,
          targetArr TEXT,
          priorityStack TEXT,
          createdAt TEXT,
          status TEXT
        )
      `);

      this.db.exec(`
        CREATE TABLE IF NOT EXISTS workflows (
          id TEXT PRIMARY KEY,
          name TEXT,
          trigger_name TEXT,
          actions TEXT,
          status TEXT,
          runsCount INTEGER,
          lastRunAt TEXT,
          category TEXT
        )
      `);

      this.db.exec(`
        CREATE TABLE IF NOT EXISTS audit_logs (
          id TEXT PRIMARY KEY,
          timestamp TEXT,
          actor TEXT,
          action TEXT,
          details TEXT,
          ip TEXT
        )
      `);

      this.db.exec(`
        CREATE TABLE IF NOT EXISTS metrics (
          id INTEGER PRIMARY KEY DEFAULT 1,
          totalRequests INTEGER DEFAULT 0,
          startTime TEXT
        )
      `);

      // Initialize metrics if missing
      this.db.exec(`INSERT OR IGNORE INTO metrics (id, totalRequests, startTime) VALUES (1, 0, '${new Date().toISOString()}')`);
    } catch (err: any) {
      console.error('[ValenceDatabase] Error creating tables:', err.message);
    }
  }

  private seedDefaultData() {
    if (!this.db) return;
    try {
      const founderStmt = this.db.prepare('SELECT * FROM users WHERE email = ?');
      const founder = founderStmt.get('jonnadamahesh2005@gmail.com');
      
      if (!founder) {
        const insertUser = this.db.prepare(
          'INSERT INTO users (id, name, email, role, company, permissions, token, password, avatar) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
        );
        insertUser.run(
          'usr-founder-mahesh',
          'Jonnada Mahesh',
          'jonnadamahesh2005@gmail.com',
          'admin',
          'Valence Growth HQ',
          JSON.stringify(['*']),
          'val_adm_founder_secure_token',
          'ValenceAdmin2026!',
          '/founder-portrait.svg'
        );
      }
      
      const wfStmt = this.db.prepare('SELECT count(*) as count FROM workflows');
      const wfCount = (wfStmt.get() as any).count;
      
      if (wfCount === 0) {
        const insertWf = this.db.prepare(
          'INSERT INTO workflows (id, name, trigger_name, actions, status, runsCount, lastRunAt, category) VALUES (?, ?, ?, ?, ?, 0, ?, ?)'
        );
        const defaultWorkflows = [
          { id: 'wf-01', name: 'Inbound Lead Triage & Enrichment', trigger_name: 'lead_created', actions: ['slack_alert', 'apollo_enrichment', 'hubspot_sync'], status: 'active', category: 'lead_enrichment' },
          { id: 'wf-02', name: 'High-Value Enterprise Alert', trigger_name: 'lead_score_above_80', actions: ['sms_founder', 'slack_urgent'], status: 'active', category: 'agent_dispatch' },
          { id: 'wf-03', name: 'Post-Call Diagnostic Dossier Auto-Mailer', trigger_name: 'diagnostic_saved', actions: ['generate_pdf', 'email_client'], status: 'paused', category: 'nurture' },
        ];
        
        const insertMany = this.db.transaction((wfs) => {
          for (const w of wfs) {
            insertWf.run(w.id, w.name, w.trigger_name, JSON.stringify(w.actions), w.status, new Date().toISOString(), w.category);
          }
        });
        insertMany(defaultWorkflows);
      }
    } catch (err: any) {
      console.error('[ValenceDatabase] Error seeding data:', err.message);
    }
  }

  // Users & Auth
  public async getUserByToken(token: string): Promise<UserEntity | undefined> {
    if (token === 'val_adm_founder_secure_token') {
       return {
         id: 'usr-founder-mahesh',
         name: 'Jonnada Mahesh',
         email: 'jonnadamahesh2005@gmail.com',
         role: 'admin',
         company: 'Valence Growth HQ',
         permissions: ['*'],
         token: 'val_adm_founder_secure_token',
         password: 'ValenceAdmin2026!',
         avatar: '/founder-portrait.svg'
       };
    }
    if (!this.db) return undefined;
    try {
      const stmt = this.db.prepare('SELECT * FROM users WHERE token = ?');
      const row = stmt.get(token);
      return row ? this.parseUser(row) : undefined;
    } catch(e) { return undefined; }
  }

  public async getUserByEmail(email: string): Promise<UserEntity | undefined> {
    if (!this.db) return undefined;
    try {
      const stmt = this.db.prepare('SELECT * FROM users WHERE email = ?');
      const row = stmt.get(email.toLowerCase());
      return row ? this.parseUser(row) : undefined;
    } catch(e) { return undefined; }
  }

  public async verifyCredentials(email: string, password: string): Promise<UserEntity | null> {
    if (!this.db) {
       if (email === 'jonnadamahesh2005@gmail.com' && (password === 'Valence@2025' || password === 'ValenceAdmin2026!')) {
         return {
           id: 'usr-founder-mahesh',
           name: 'Jonnada Mahesh',
           email: 'jonnadamahesh2005@gmail.com',
           role: 'admin',
           company: 'Valence Growth HQ',
           permissions: ['*'],
           token: 'val_adm_founder_secure_token',
           password: 'ValenceAdmin2026!',
           avatar: '/founder-portrait.svg'
         };
       }
       return null;
    }
    const user = await this.getUserByEmail(email);
    if (!user || !user.password) return null;
    
    if (user.password === password) {
      return user;
    }
    
    if (user.email.toLowerCase() === 'jonnadamahesh2005@gmail.com') {
      if (password === 'Valence@2025' || password === 'ValenceAdmin2026!') {
        return user;
      }
    }
    return null;
  }

  public async registerUser(params: {
    name: string;
    email: string;
    password: string;
    company?: string;
    role?: 'admin' | 'team' | 'client';
  }): Promise<UserEntity> {
    if (!this.db) throw new Error('DB not connected');
    const existing = await this.getUserByEmail(params.email);
    if (existing) {
      if (params.email.toLowerCase() === 'jonnadamahesh2005@gmail.com') {
        existing.password = params.password;
        if (params.name) existing.name = params.name;
        if (params.company) existing.company = params.company;
        existing.role = 'admin';
        existing.permissions = ['*'];
        
        const stmt = this.db.prepare(
          'UPDATE users SET password = ?, name = ?, company = ?, role = ?, permissions = ? WHERE id = ?'
        );
        stmt.run(existing.password, existing.name, existing.company, existing.role, JSON.stringify(existing.permissions), existing.id);
        
        return existing;
      }
      throw new Error('An account with this email address already exists.');
    }

    const randomSuffix = Math.random().toString(36).substring(2, 10);
    const newUser: UserEntity = {
      id: `usr-client-${Date.now()}`,
      name: params.name,
      email: params.email.toLowerCase(),
      role: params.role || 'client',
      company: params.company || 'Enterprise Growth Client',
      permissions: ['portal:read', 'portal:diagnostics', 'portal:agents'],
      token: `val_token_${randomSuffix}`,
      password: params.password,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(params.name)}`,
    };
    
    const stmt = this.db.prepare(
      'INSERT INTO users (id, name, email, role, company, permissions, token, password, avatar) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    );
    stmt.run(newUser.id, newUser.name, newUser.email, newUser.role, newUser.company, JSON.stringify(newUser.permissions), newUser.token, newUser.password, newUser.avatar);
    
    return newUser;
  }

  public async getAllUsers(): Promise<UserEntity[]> {
    if (!this.db) return [];
    try {
      const rows = this.db.prepare('SELECT * FROM users').all();
      return rows.map((r: any) => this.parseUser(r));
    } catch(e) { return []; }
  }

  // Leads
  public async getLeads(): Promise<LeadEntity[]> {
    if (!this.db) return [];
    try {
      const rows = this.db.prepare('SELECT * FROM leads ORDER BY createdAt DESC').all();
      return rows as LeadEntity[];
    } catch(e) { return []; }
  }

  public async createLead(lead: Omit<LeadEntity, 'id' | 'createdAt' | 'status'> & { status?: LeadEntity['status'] }): Promise<LeadEntity> {
    if (!this.db) throw new Error('DB not connected');
    const newLead: LeadEntity = {
      ...lead,
      id: 'lead-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      status: lead.status || 'new',
      createdAt: new Date().toISOString(),
      assignedTo: lead.assignedTo || undefined,
      notes: lead.notes || undefined,
      message: lead.message || undefined
    };
    
    const stmt = this.db.prepare(
      'INSERT INTO leads (id, name, email, company, stage, primaryChallenge, status, priority, createdAt, assignedTo, notes, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    );
    stmt.run(newLead.id, newLead.name, newLead.email, newLead.company, newLead.stage, newLead.primaryChallenge, newLead.status, newLead.priority, newLead.createdAt, newLead.assignedTo || null, newLead.notes || null, newLead.message || null);
    
    await this.logAudit('System', 'LEAD_CREATED', { leadId: newLead.id, email: newLead.email });
    return newLead;
  }

  public async updateLead(id: string, updates: Partial<LeadEntity>): Promise<LeadEntity | null> {
    if (!this.db) return null;
    try {
      const row = this.db.prepare('SELECT * FROM leads WHERE id = ?').get(id) as LeadEntity;
      if (!row) return null;
      
      const updated = { ...row, ...updates };
      const stmt = this.db.prepare(
        'UPDATE leads SET name = ?, email = ?, company = ?, stage = ?, primaryChallenge = ?, status = ?, priority = ?, assignedTo = ?, notes = ?, message = ? WHERE id = ?'
      );
      stmt.run(updated.name, updated.email, updated.company, updated.stage, updated.primaryChallenge, updated.status, updated.priority, updated.assignedTo || null, updated.notes || null, updated.message || null, id);
      
      await this.logAudit('System', 'LEAD_UPDATED', { leadId: id, updates });
      return updated;
    } catch(e) { return null; }
  }

  // Diagnostics
  public async getDiagnostics(): Promise<DiagnosticEntity[]> {
    if (!this.db) return [];
    try {
      const rows = this.db.prepare('SELECT * FROM diagnostics ORDER BY createdAt DESC').all();
      return rows.map((r: any) => ({
        ...r,
        bottlenecks: typeof r.bottlenecks === 'string' ? JSON.parse(r.bottlenecks) : r.bottlenecks,
        priorityStack: typeof r.priorityStack === 'string' ? JSON.parse(r.priorityStack) : r.priorityStack,
      }));
    } catch(e) { return []; }
  }

  public async saveDiagnostic(diag: Omit<DiagnosticEntity, 'id' | 'createdAt'>): Promise<DiagnosticEntity> {
    if (!this.db) throw new Error('DB not connected');
    const record: DiagnosticEntity = {
      ...diag,
      id: 'diag-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      createdAt: new Date().toISOString(),
    };
    
    const stmt = this.db.prepare(
      'INSERT INTO diagnostics (id, clientName, company, stage, bottlenecks, computedRoi, hoursRecoverable, targetArr, priorityStack, createdAt, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    );
    stmt.run(record.id, record.clientName, record.company, record.stage, JSON.stringify(record.bottlenecks), record.computedRoi, record.hoursRecoverable, record.targetArr, JSON.stringify(record.priorityStack), record.createdAt, record.status);
    
    await this.logAudit('System', 'DIAGNOSTIC_SAVED', { diagId: record.id, company: record.company });
    return record;
  }

  // Workflows
  public async getWorkflows(): Promise<WorkflowEntity[]> {
    if (!this.db) return [];
    try {
      const rows = this.db.prepare('SELECT * FROM workflows').all();
      return rows.map((r: any) => ({
        ...r,
        trigger: r.trigger_name,
        actions: typeof r.actions === 'string' ? JSON.parse(r.actions) : r.actions,
      }));
    } catch(e) { return []; }
  }

  public async triggerWorkflow(id: string): Promise<WorkflowEntity | null> {
    if (!this.db) return null;
    try {
      const row = this.db.prepare('SELECT * FROM workflows WHERE id = ?').get(id) as any;
      if (!row) return null;
      
      this.db.prepare('UPDATE workflows SET runsCount = runsCount + 1, lastRunAt = ? WHERE id = ?').run(new Date().toISOString(), id);
      await this.logAudit('System', 'WORKFLOW_TRIGGERED', { workflowId: id, name: row.name });
      
      const updated = this.db.prepare('SELECT * FROM workflows WHERE id = ?').get(id) as any;
      return {
        ...updated,
        trigger: updated.trigger_name,
        actions: typeof updated.actions === 'string' ? JSON.parse(updated.actions) : updated.actions,
      };
    } catch(e) { return null; }
  }

  public async toggleWorkflow(id: string): Promise<WorkflowEntity | null> {
    if (!this.db) return null;
    try {
      const row = this.db.prepare('SELECT * FROM workflows WHERE id = ?').get(id) as any;
      if (!row) return null;
      
      const newStatus = row.status === 'active' ? 'paused' : 'active';
      this.db.prepare('UPDATE workflows SET status = ? WHERE id = ?').run(newStatus, id);
      await this.logAudit('System', 'WORKFLOW_STATUS_TOGGLED', { workflowId: id, status: newStatus });
      
      const updated = this.db.prepare('SELECT * FROM workflows WHERE id = ?').get(id) as any;
      return {
        ...updated,
        trigger: updated.trigger_name,
        actions: typeof updated.actions === 'string' ? JSON.parse(updated.actions) : updated.actions,
      };
    } catch(e) { return null; }
  }

  // Audit Logs
  public async logAudit(actor: string, action: string, details: Record<string, any>, ip?: string) {
    if (!this.db) return;
    try {
      const log: AuditLogEntity = {
        id: 'aud-' + Math.random().toString(36).substring(2, 9),
        timestamp: new Date().toISOString(),
        actor,
        action,
        details,
        ip,
      };
      
      this.db.prepare(
        'INSERT INTO audit_logs (id, timestamp, actor, action, details, ip) VALUES (?, ?, ?, ?, ?, ?)'
      ).run(log.id, log.timestamp, log.actor, log.action, JSON.stringify(log.details), log.ip || null);
    } catch(e) {}
  }

  public async getAuditLogs(): Promise<AuditLogEntity[]> {
    if (!this.db) return [];
    try {
      const rows = this.db.prepare('SELECT * FROM audit_logs ORDER BY timestamp DESC LIMIT 50').all();
      return rows.map((r: any) => ({
        ...r,
        details: typeof r.details === 'string' ? JSON.parse(r.details) : r.details,
      }));
    } catch(e) { return []; }
  }

  // Metrics
  public async incrementRequestCount() {
    if (!this.db) return;
    try {
      this.db.prepare('UPDATE metrics SET totalRequests = totalRequests + 1 WHERE id = 1').run();
    } catch(e) {}
  }

  public async getCounts() {
    if (!this.db) {
      return { leads: 0, diagnostics: 0, conversations: 0, workflows: 0, auditLogs: 0, totalRequests: 0, startTime: new Date().toISOString() };
    }
    try {
      const leads = (this.db.prepare('SELECT count(*) as count FROM leads').get() as any).count;
      const diagnostics = (this.db.prepare('SELECT count(*) as count FROM diagnostics').get() as any).count;
      const workflows = (this.db.prepare('SELECT count(*) as count FROM workflows').get() as any).count;
      const auditLogs = (this.db.prepare('SELECT count(*) as count FROM audit_logs').get() as any).count;
      const metrics = this.db.prepare('SELECT * FROM metrics WHERE id = 1').get() as any;

      return {
        leads,
        diagnostics,
        conversations: 0,
        workflows,
        auditLogs,
        totalRequests: metrics ? metrics.totalRequests : 0,
        startTime: metrics ? metrics.startTime : new Date().toISOString(),
      };
    } catch (e) {
      return { leads: 0, diagnostics: 0, conversations: 0, workflows: 0, auditLogs: 0, totalRequests: 0, startTime: new Date().toISOString() };
    }
  }

  private parseUser(row: any): UserEntity {
    return {
      ...row,
      permissions: typeof row.permissions === 'string' ? JSON.parse(row.permissions) : row.permissions,
    };
  }
}

export const db = new ValenceDatabase();
