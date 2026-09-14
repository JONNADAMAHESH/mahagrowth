-- ==========================================
-- MAHA GROWTH: FULL SAAS & BACKEND SCHEMA
-- ==========================================

-- 1. USERS
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'client',
    company TEXT,
    permissions JSONB DEFAULT '[]'::jsonb,
    token TEXT,
    password TEXT,
    avatar TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. LEADS (CRM)
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    stage TEXT,
    primaryChallenge TEXT,
    status TEXT DEFAULT 'new',
    priority TEXT DEFAULT 'medium',
    assignedTo TEXT,
    notes TEXT,
    message TEXT,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. DIAGNOSTICS
CREATE TABLE IF NOT EXISTS public.diagnostics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clientName TEXT,
    company TEXT,
    stage TEXT,
    bottlenecks JSONB DEFAULT '[]'::jsonb,
    computedRoi TEXT,
    hoursRecoverable TEXT,
    targetArr TEXT,
    priorityStack JSONB DEFAULT '[]'::jsonb,
    status TEXT DEFAULT 'draft',
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. WORKFLOWS
CREATE TABLE IF NOT EXISTS public.workflows (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'idle',
    lastRun TEXT,
    successRate INTEGER DEFAULT 100
);

-- Insert default workflows
INSERT INTO public.workflows (id, name, description, status) VALUES 
('wf-01', 'Lead Triage & Enrichment', 'Automatically enriches inbound leads with Clearbit/Apollo data and scores them.', 'idle'),
('wf-02', 'Slack Alerting', 'Routes high-priority enterprise inquiries directly to the founders Slack channel.', 'active'),
('wf-03', 'Diagnostic Dossier Auto-Mailer', 'Generates and emails the customized PDF growth blueprint to the prospect.', 'idle'),
('wf-04', 'CRM Sync', 'Bidirectional sync of lead status between internal CRM and HubSpot.', 'active')
ON CONFLICT (id) DO NOTHING;

-- 5. AUDIT LOGS
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    timestamp TEXT NOT NULL,
    actor TEXT NOT NULL,
    action TEXT NOT NULL,
    details JSONB,
    ip TEXT
);

-- 6. METRICS
CREATE TABLE IF NOT EXISTS public.metrics (
    id TEXT PRIMARY KEY,
    total_requests INTEGER DEFAULT 0
);
INSERT INTO public.metrics (id, total_requests) VALUES ('global', 0) ON CONFLICT DO NOTHING;

-- ==========================================
-- SAAS MULTI-TENANT SCHEMA (Frontend)
-- ==========================================

CREATE TABLE IF NOT EXISTS public.workspaces (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    company_name TEXT NOT NULL,
    industry TEXT,
    growth_score INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.integrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
    provider TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'disconnected',
    last_sync_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(workspace_id, provider)
);

CREATE TABLE IF NOT EXISTS public.ai_actions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    action_type TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    impact_estimate TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
