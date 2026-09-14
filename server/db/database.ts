import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://bgisovunlvicsltvbnsu.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_fXEktlabAZArog0xPRUTqw_0giQpyVc';

export const supabase = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } });

export interface UserEntity { id: string; name: string; email: string; role: 'admin' | 'team' | 'client'; company: string; permissions: string[]; token: string; password?: string; avatar?: string; }
export interface LeadEntity { id: string; name: string; email: string; company: string; stage: string; primaryChallenge: string; status: 'new' | 'dossier_prepared' | 'call_scheduled' | 'active_sprint' | 'closed_won'; priority: 'high' | 'medium' | 'low'; createdAt: string; assignedTo?: string; notes?: string; message?: string; }
export interface DiagnosticEntity { id: string; clientName: string; company: string; stage: string; bottlenecks: string[]; computedRoi: string; hoursRecoverable: string; targetArr: string; priorityStack: string[]; status: string; createdAt: string; }
export interface WorkflowEntity { id: string; name: string; description: string; status: 'idle' | 'active' | 'error'; lastRun?: string; successRate: number; }
export interface AuditLogEntity { id: string; timestamp: string; actor: string; action: string; details: any; ip?: string; }

class SupabaseDatabase {
  public isInitialized = true;

  constructor() {}

  public async init() {
    console.log("Supabase connected for backend.");
  }

  public async getUserByToken(token: string): Promise<UserEntity | undefined> {
    const { data } = await supabase.from('users').select('*').eq('token', token).single();
    return data as UserEntity | undefined;
  }

  public async getUserByEmail(email: string): Promise<UserEntity | undefined> {
    const { data } = await supabase.from('users').select('*').eq('email', email).single();
    return data as UserEntity | undefined;
  }

  public async verifyCredentials(email: string, password: string): Promise<UserEntity | null> {
    const { data } = await supabase.from('users').select('*').eq('email', email).eq('password', password).single();
    return data as UserEntity | null;
  }

  public async registerUser(params: any): Promise<UserEntity> {
    const token = 'sk_' + Math.random().toString(36).substring(2, 15);
    const { data } = await supabase.from('users').insert({
      name: params.name, email: params.email, role: params.role || 'client',
      company: params.company || 'Not specified', permissions: params.permissions || [],
      password: params.password, token
    }).select().single();
    return data as UserEntity;
  }

  public async getAllUsers(): Promise<UserEntity[]> {
    const { data } = await supabase.from('users').select('*');
    return data || [];
  }

  public async getLeads(): Promise<LeadEntity[]> {
    const { data } = await supabase.from('leads').select('*').order('createdAt', { ascending: false });
    return data || [];
  }

  public async createLead(lead: any): Promise<LeadEntity> {
    const { data } = await supabase.from('leads').insert({
      name: lead.name, email: lead.email, company: lead.company, stage: lead.stage,
      primaryChallenge: lead.primaryChallenge, priority: lead.priority || 'medium', status: lead.status || 'new',
      notes: lead.notes, message: lead.message
    }).select().single();
    return data as LeadEntity;
  }

  public async updateLead(id: string, updates: any): Promise<LeadEntity | null> {
    const { data } = await supabase.from('leads').update(updates).eq('id', id).select().single();
    return data as LeadEntity | null;
  }

  public async getDiagnostics(): Promise<DiagnosticEntity[]> {
    const { data } = await supabase.from('diagnostics').select('*').order('createdAt', { ascending: false });
    return data || [];
  }

  public async saveDiagnostic(diag: any): Promise<DiagnosticEntity> {
    const { data } = await supabase.from('diagnostics').insert(diag).select().single();
    return data as DiagnosticEntity;
  }

  public async getWorkflows(): Promise<WorkflowEntity[]> {
    const { data } = await supabase.from('workflows').select('*');
    return data || [];
  }

  public async triggerWorkflow(id: string): Promise<WorkflowEntity | null> {
    const { data } = await supabase.from('workflows').update({ status: 'active', lastRun: new Date().toISOString() }).eq('id', id).select().single();
    if (data) setTimeout(() => supabase.from('workflows').update({ status: 'idle' }).eq('id', id), 4000);
    return data as WorkflowEntity | null;
  }

  public async toggleWorkflow(id: string): Promise<WorkflowEntity | null> {
    const { data: current } = await supabase.from('workflows').select('*').eq('id', id).single();
    if (!current) return null;
    const newStatus = current.status === 'idle' ? 'active' : 'idle';
    const { data } = await supabase.from('workflows').update({ status: newStatus }).eq('id', id).select().single();
    return data as WorkflowEntity | null;
  }

  public async logAudit(actor: string, action: string, details: any, ip?: string) {
    await supabase.from('audit_logs').insert({
      timestamp: new Date().toISOString(), actor, action, details, ip
    });
  }

  public async getAuditLogs(): Promise<AuditLogEntity[]> {
    const { data } = await supabase.from('audit_logs').select('*').order('timestamp', { ascending: false }).limit(50);
    return data || [];
  }

  public async incrementRequestCount() {
    // Basic counter increment without RPC
    const { data } = await supabase.from('metrics').select('total_requests').eq('id', 'global').single();
    if (data) {
      await supabase.from('metrics').update({ total_requests: data.total_requests + 1 }).eq('id', 'global');
    }
  }

  public async getCounts() {
    const [leads, diagnostics, workflows, auditLogs, metrics] = await Promise.all([
      supabase.from('leads').select('*', { count: 'exact', head: true }),
      supabase.from('diagnostics').select('*', { count: 'exact', head: true }),
      supabase.from('workflows').select('*', { count: 'exact', head: true }),
      supabase.from('audit_logs').select('*', { count: 'exact', head: true }),
      supabase.from('metrics').select('total_requests').eq('id', 'global').single()
    ]);
    return {
      leads: leads.count || 0,
      diagnostics: diagnostics.count || 0,
      workflows: workflows.count || 0,
      auditLogs: auditLogs.count || 0,
      totalRequests: metrics.data?.total_requests || 0
    };
  }
}

export const db = new SupabaseDatabase();
