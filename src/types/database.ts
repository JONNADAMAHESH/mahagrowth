export interface Workspace {
  id: string;
  user_id: string;
  company_name: string;
  industry: string | null;
  growth_score: number;
  created_at: string;
}

export interface Integration {
  id: string;
  workspace_id: string;
  provider: string;
  status: 'connected' | 'disconnected' | 'error';
  last_sync_at: string | null;
  created_at: string;
}

export interface AiAction {
  id: string;
  workspace_id: string;
  title: string;
  description: string;
  action_type: string;
  status: 'pending' | 'approved' | 'dismissed' | 'executed';
  impact_estimate: string | null;
  created_at: string;
}
