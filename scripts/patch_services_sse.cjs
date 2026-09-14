const fs = require('fs');
let content = fs.readFileSync('src/pages/ServicesPage.tsx', 'utf-8');

const sseLogic = `
  // --- REAL-TIME BACKEND STREAM (SSE) ---
  const [trafficStatus, setTrafficStatus] = useState("Connecting...");
  const [convRate, setConvRate] = useState("Syncing");
  const [notifications, setNotifications] = useState<any[]>([]);
  const [revenue, setRevenue] = useState(0);
  const [workflows, setWorkflows] = useState<any[]>([]);

  useEffect(() => {
    // Connect directly to the Node.js / MySQL backend stream
    const eventSource = new EventSource('/api/stream/platform');

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.trafficStatus) setTrafficStatus(data.trafficStatus);
        if (data.convRate) setConvRate(data.convRate);
        if (data.revenue) setRevenue(data.revenue);
        if (data.notifications) setNotifications(data.notifications);
        if (data.workflows) setWorkflows(data.workflows);
      } catch (err) {
        console.error("Error parsing live stream data", err);
      }
    };

    eventSource.onerror = (err) => {
      console.error("Live stream connection lost, retrying...", err);
    };

    return () => {
      eventSource.close();
    };
  }, []);
`;

const simLogicRegex = /\/\/ --- REAL-TIME SIMULATION LOGIC ---[\s\S]*?\}, \[\]\);/m;
content = content.replace(simLogicRegex, sseLogic.trim());

fs.writeFileSync('src/pages/ServicesPage.tsx', content);
