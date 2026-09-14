const fs = require('fs');
let content = fs.readFileSync('src/hooks/useTenantData.ts', 'utf-8');

// The new real-time subscription logic to add right after fetchTenantData definition
const realtimeLogic = `
  useEffect(() => {
    fetchTenantData();
  }, [fetchTenantData]);

  // Real-time Supabase Subscriptions
  useEffect(() => {
    if (!workspace?.id) return;

    // Subscribe to all changes on the ai_actions and integrations tables for this workspace
    const channel = supabase
      .channel(\`tenant_changes_\${workspace.id}\`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'ai_actions',
          filter: \`workspace_id=eq.\${workspace.id}\`
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
          filter: \`workspace_id=eq.\${workspace.id}\`
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
`;

// Replace the existing simple useEffect with the new realtime one
content = content.replace(
  '  useEffect(() => {\n    fetchTenantData();\n  }, [fetchTenantData]);',
  realtimeLogic
);

fs.writeFileSync('src/hooks/useTenantData.ts', content);
