const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf-8');

const sseEndpointReplacement = `
  // --- REAL-TIME PLATFORM STREAM (SSE) ---
  app.get('/api/stream/platform', async (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const sendState = async () => {
      try {
        const workflows = await db.getWorkflows();
        const counts = await db.getCounts();
        const logs = await db.getAuditLogs(3); // Get latest 3 logs
        
        // Construct real-time payload using DB counts/workflows
        
        const notifications = logs.map(l => ({
          id: l.id,
          type: "info",
          text: l.action + (l.details ? ' ' + JSON.stringify(l.details) : ''),
          icon: l.action.includes('LOGIN') ? '🔐' : (l.action.includes('WORKFLOW') ? '🤖' : '🔔'),
          color: "text-cyan-400"
        }));

        if (notifications.length === 0) {
          notifications.push({ id: Date.now(), type: "info", text: \`System tracking \${counts.leads} active operations\`, icon: "📈", color: "text-emerald-400" });
        }
        
        const payload = {
          trafficStatus: counts.totalRequests > 50 ? 'Surging' : 'Healthy',
          convRate: counts.leads > 10 ? 'Rising' : 'Stable',
          revenue: 124500 + (counts.leads * 1250) + (counts.workflows * 500), 
          workflows: workflows,
          notifications: notifications
        };

        res.write(\`data: \${JSON.stringify(payload)}\n\n\`);
      } catch (err) {
        console.error('SSE Error:', err);
      }
    };

    // Send immediately
    await sendState();

    // Broadcast every 4 seconds to connected clients
    const intervalId = setInterval(sendState, 4000);

    req.on('close', () => {
      clearInterval(intervalId);
    });
  });

  // Diagnostics Engine
`;

content = content.replace(/ \/\/ --- REAL-TIME PLATFORM STREAM \(SSE\) ---[\s\S]*?\/\/ Diagnostics Engine/, sseEndpointReplacement);
fs.writeFileSync('server.ts', content);
