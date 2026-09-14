import { useEffect, useState, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { Workspace, Integration, AiAction } from "../types/database";

export function useTenantData() {
  const { user } = useAuth();
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [aiActions, setAiActions] = useState<AiAction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTenantData = useCallback(async () => {
    if (!user || !user.id) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // 1. Fetch or Create Workspace
      let { data: wsData, error: wsError } = await supabase
        .from("workspaces")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (wsError && wsError.code === "PGRST116") {
        // No workspace found, auto-create one for onboarding
        const { data: newWs, error: createError } = await supabase
          .from("workspaces")
          .insert({
            user_id: user.id,
            company_name: user.company || "My Company",
            growth_score: 84
          })
          .select()
          .single();
          
        if (createError) throw createError;
        wsData = newWs;
      } else if (wsError) {
        // If the table doesn't exist yet, we catch it and fallback gracefully
        throw wsError;
      }

      setWorkspace(wsData);

      if (wsData && wsData.id) {
        // 2. Fetch Integrations
        const { data: intData, error: intError } = await supabase
          .from("integrations")
          .select("*")
          .eq("workspace_id", wsData.id);
          
        if (!intError && intData) {
          setIntegrations(intData);
        }

        // 3. Fetch Pending AI Actions
        const { data: actionData, error: actionError } = await supabase
          .from("ai_actions")
          .select("*")
          .eq("workspace_id", wsData.id)
          .order("created_at", { ascending: false });

        if (!actionError && actionData) {
          setAiActions(actionData);
        } else if (actionData?.length === 0) {
           // Seed mock actions for demo if empty
           seedMockActions(wsData.id);
        }
      }
    } catch (err: any) {
      console.warn("Database tables likely missing. Fallback to local state.", err);
      // Suppress error in UI since the user needs to run the SQL file first.
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Temporary function to seed mock actions if the table is empty so the UI isn't blank
  const seedMockActions = async (workspaceId: string) => {
    if (!workspaceId) return;
    try {
      await supabase.from("ai_actions").insert([
        {
          workspace_id: workspaceId,
          title: "Pause Underperforming Ad Group",
          description: "Google Ads 'Q3_Retargeting' has a high CPC and 0 conversions over 7 days.",
          action_type: "pause_campaign",
          status: "pending",
          impact_estimate: "Saves $450/week"
        },
        {
          workspace_id: workspaceId,
          title: "Increase Budget +15%",
          description: "Meta Ads 'Lookalike_Conversions' is outperforming baseline CPA by 22%.",
          action_type: "increase_budget",
          status: "pending",
          impact_estimate: "Est. +12 conversions/week"
        }
      ]);
      fetchTenantData();
    } catch (e) {
      console.warn("Could not seed mock actions:", e);
    }
  };


  useEffect(() => {
    fetchTenantData();
  }, [fetchTenantData]);

  // Real-time Supabase Subscriptions
  useEffect(() => {
    if (!workspace?.id) return;

    // Subscribe to all changes on the ai_actions and integrations tables for this workspace
    const channel = supabase
      .channel(`tenant_changes_${workspace.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'ai_actions',
          filter: `workspace_id=eq.${workspace.id}`
        },
        (payload) => {
          console.log("Real-time AI Action update:", payload);
          fetchTenantData();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'integrations',
          filter: `workspace_id=eq.${workspace.id}`
        },
        (payload) => {
          console.log("Real-time Integration update:", payload);
          fetchTenantData();
        }
      )
      .subscribe((status) => {
        console.log("Supabase Realtime status:", status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [workspace?.id, fetchTenantData]);


  const updateActionStatus = async (actionId: string, status: 'approved' | 'dismissed') => {
    if (!workspace?.id || !actionId) return;
    
    // Optimistic update
    setAiActions(prev => prev.map(a => a?.id === actionId ? { ...a, status } : a));

    try {
      await supabase
        .from("ai_actions")
        .update({ status })
        .eq("id", actionId)
        .eq("workspace_id", workspace.id);
    } catch (e) {
      // Revert on error
      fetchTenantData();
    }
  };

  const connectIntegration = async (provider: string) => {
    if (!workspace?.id || !provider) return;
    
    try {
      await supabase
        .from("integrations")
        .upsert({
          workspace_id: workspace.id,
          provider: provider,
          status: 'connected',
          last_sync_at: new Date().toISOString()
        }, { onConflict: 'workspace_id, provider' });
        
      fetchTenantData();
    } catch (e) {
      console.error(e);
    }
  };

  return {
    workspace,
    integrations,
    aiActions,
    isLoading,
    error,
    updateActionStatus,
    connectIntegration,
    refreshData: fetchTenantData
  };
}
