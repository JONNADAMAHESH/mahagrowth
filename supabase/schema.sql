-- ==========================================
-- MAHA GROWTH: SAAS MULTI-TENANT SCHEMA
-- Phase 2 & 3 Database Architecture
-- ==========================================

-- 1. WORKSPACES (Tenant Isolation)
CREATE TABLE IF NOT EXISTS public.workspaces (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    company_name TEXT NOT NULL,
    industry TEXT,
    growth_score INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own workspace" ON public.workspaces FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own workspace" ON public.workspaces FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own workspace" ON public.workspaces FOR UPDATE USING (auth.uid() = user_id);

-- 2. INTEGRATIONS
CREATE TABLE IF NOT EXISTS public.integrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
    provider TEXT NOT NULL, -- e.g., 'google_analytics', 'meta_ads', 'stripe'
    status TEXT NOT NULL DEFAULT 'disconnected', -- 'connected', 'disconnected', 'error'
    last_sync_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(workspace_id, provider)
);

ALTER TABLE public.integrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own integrations" ON public.integrations FOR SELECT USING (
    workspace_id IN (SELECT id FROM public.workspaces WHERE user_id = auth.uid())
);
CREATE POLICY "Users can insert own integrations" ON public.integrations FOR INSERT WITH CHECK (
    workspace_id IN (SELECT id FROM public.workspaces WHERE user_id = auth.uid())
);
CREATE POLICY "Users can update own integrations" ON public.integrations FOR UPDATE USING (
    workspace_id IN (SELECT id FROM public.workspaces WHERE user_id = auth.uid())
);

-- 3. AI RECOMMENDATIONS / ACTIONS
CREATE TABLE IF NOT EXISTS public.ai_actions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    action_type TEXT NOT NULL, -- 'pause_campaign', 'increase_budget', etc.
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'approved', 'dismissed', 'executed'
    impact_estimate TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.ai_actions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own actions" ON public.ai_actions FOR SELECT USING (
    workspace_id IN (SELECT id FROM public.workspaces WHERE user_id = auth.uid())
);
CREATE POLICY "Users can update own actions" ON public.ai_actions FOR UPDATE USING (
    workspace_id IN (SELECT id FROM public.workspaces WHERE user_id = auth.uid())
);
CREATE POLICY "Users can insert own actions" ON public.ai_actions FOR INSERT WITH CHECK (
    workspace_id IN (SELECT id FROM public.workspaces WHERE user_id = auth.uid())
);
