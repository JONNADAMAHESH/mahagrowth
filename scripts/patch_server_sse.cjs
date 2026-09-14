const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf-8');

const sseEndpoint = `
  // --- REAL-TIME PLATFORM STREAM (SSE) ---
  app.get('/api/stream/platform', authenticate, async (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    // Initial state payload
    const sendState = async () => {
      try {
        const workflows = await db.getWorkflows();
        const counts = await db.getCounts();
        
        // Construct real-time payload using DB counts/workflows
        const payload = {
          trafficStatus: counts.totalRequests > 50 ? 'Surging' : 'Healthy',
          convRate: counts.leads > 10 ? 'Rising' : 'Stable',
          revenue: counts.leads * 12500, // Derived business logic
          workflows: workflows,
          notifications: [
            { id: Date.now(), type: "info", text: \`System tracking \${counts.leads} leads\`, icon: "🤖", color: "text-cyan-400" },
          ]
        };

        res.write(\`data: \${JSON.stringify(payload)}\n\n\`);
      } catch (err) {
        console.error('SSE Error:', err);
      }
    };

    // Send immediately
    await sendState();

    // Broadcast every 3 seconds to connected clients
    const intervalId = setInterval(sendState, 3000);

    req.on('close', () => {
      clearInterval(intervalId);
    });
  });

  // Diagnostics Engine
`;

content = content.replace('  // Diagnostics Engine', sseEndpoint);
fs.writeFileSync('server.ts', content);
