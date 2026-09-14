import {
  ServiceItem,
  AiAdvantageTool,
  RoadmapYear,
  RevenueModel,
  CaseStudy,
  FaqItem,
} from "../types";

export const COMPANY_NAME = "Maha Growth";
export const COMPANY_TAGLINE = "Intelligent Technology for Modern Businesses";
export const ONE_LINE_PITCH =
  "Maha Growth brings your business tools, automation, analytics, and intelligent workflows together in one powerful platform.";
export const HERO_HEADLINE =
  "Turn Your Business Into a Smarter, Faster-Growing Business.";

export const CORE_PILLARS = [
  {
    name: "AI",
    desc: "Autonomous agents, custom copilots & predictive machine learning",
  },
  {
    name: "Technology",
    desc: "High-converting web apps, robust software & modern cloud architecture",
  },
  {
    name: "Marketing",
    desc: "SEO, paid acquisition, viral content & automated nurture funnels",
  },
  {
    name: "Data",
    desc: "Unified dashboards, actionable KPI tracking & customer intelligence",
  },
  {
    name: "Strategy",
    desc: "Go-to-market roadmaps, unit economics & scalable expansion playbooks",
  },
];

export const PROBLEMS_WE_SOLVE = [
  {
    id: "prob-1",
    pain: "Weak Digital Presence & Outdated Web",
    cause:
      "Websites that look like generic templates, load slowly, and fail to convert visitors into paying clients.",
    mahaFix:
      "Next-generation, high-performance web products engineered with conversion architecture and AI interactivity.",
  },
  {
    id: "prob-2",
    pain: "Inconsistent Leads & Customer Acquisition",
    cause:
      "Unpredictable marketing channels, fragmented ad spend, and zero organic search authority.",
    mahaFix:
      "AI-driven omni-channel growth engine: automated content, precision SEO, and algorithmic ad optimization.",
  },
  {
    id: "prob-3",
    pain: "Confusion on Practical AI Adoption",
    cause:
      "Overwhelmed by AI hype without knowing which tools actually generate revenue or save operational hours.",
    mahaFix:
      "Custom AI customer agents, internal workflow copilots, and pragmatic implementation roadmaps.",
  },
  {
    id: "prob-4",
    pain: "Flying Blind Without Data Intelligence",
    cause:
      "Numbers scattered across Stripe, Google Analytics, Shopify, and CRMs without clear insights.",
    mahaFix:
      "Unified executive intelligence dashboards with plain-English natural language querying and predictive forecasting.",
  },
  {
    id: "prob-5",
    pain: "Drowning in Repetitive Manual Work",
    cause:
      "Founders and teams spending 20+ hours a week copying data, manual lead follow-up, and invoice chasing.",
    mahaFix:
      "End-to-end autonomous workflows connecting your CRM, messaging, billing, and fulfillment 24/7.",
  },
  {
    id: "prob-6",
    pain: "Inefficient, Expensive Scaling",
    cause:
      "Hiring more employees for every small increment of growth, eroding profit margins.",
    mahaFix:
      "Lean, scalable systems allowing 10x output with the same core team through intelligent agentic leverage.",
  },
];

export const OLD_WAY_VS_MAHA = [
  {
    aspect: "Vendor Management",
    oldWay:
      "5 separate agencies (Web dev, SEO agency, AI consultant, Analytics firm, Strategy advisor) that blame each other.",
    mahaWay:
      "1 Unified Strategic Growth Partner with aligned KPIs and single-point accountability.",
  },
  {
    aspect: "Technology & AI",
    oldWay:
      "Generic off-the-shelf tools glued together with manual copy-pasting.",
    mahaWay:
      "AI-native custom workflows, custom fine-tuned agents, and bespoke modern digital infrastructure.",
  },
  {
    aspect: "Data & Transparency",
    oldWay:
      "Confusing PDF reports delivered at the end of the month with vanity metrics.",
    mahaWay:
      "Live real-time executive dashboard tracking genuine pipeline revenue and operational hours saved.",
  },
  {
    aspect: "Speed of Execution",
    oldWay:
      "Weeks of back-and-forth email chains between disconnected contractors.",
    mahaWay:
      "Rapid sprint cadence with integrated design, engineering, marketing, and automation squads.",
  },
  {
    aspect: "Incentive Alignment",
    oldWay:
      "Agencies charge for billable hours regardless of business outcomes.",
    mahaWay:
      "Milestone-driven and revenue-aligned partnerships designed for long-term compounding growth.",
  },
];

export const EIGHT_SERVICES: ServiceItem[] = [
  {
    id: "web-product",
    number: "01",
    title: "Web & Product Engineering",
    shortDesc:
      "High-performance websites, web applications, landing pages, and e-commerce experiences engineered to convert.",
    category: "Digital Presence",
    deliverables: [
      "Custom React / Next.js responsive web platforms",
      "High-converting landing page funnels with A/B testing",
      "Headless e-commerce (Shopify / custom checkout flows)",
      "Web apps & interactive client portals",
      "Lightning-fast load speed (98+ Google Lighthouse scores)",
    ],
    businessImpact:
      "Average +64% lift in visitor-to-lead conversion rates within 60 days.",
    iconName: "Globe",
    badge: "Core Foundation",
  },
  {
    id: "growth-marketing",
    number: "02",
    title: "Growth Marketing & Acquisition",
    shortDesc:
      "Full-funnel customer acquisition combining technical SEO, organic content distribution, paid ads, and email nurture.",
    category: "Customer Acquisition",
    deliverables: [
      "Programmatic & editorial SEO content engines",
      "High-ROI paid acquisition (Google Ads, Meta, LinkedIn)",
      "Automated multi-step email & SMS retention sequences",
      "Organic authority building & social media distribution",
      "Customer lifetime value (LTV) maximization playbooks",
    ],
    businessImpact:
      "Predictable, scalable customer pipeline at reduced Customer Acquisition Cost (CAC).",
    iconName: "TrendingUp",
    badge: "Revenue Driver",
  },
  {
    id: "ai-solutions",
    number: "03",
    title: "Custom AI Solutions & Copilots",
    shortDesc:
      "Pragmatic AI deployments: 24/7 intelligent customer agents, team copilots, and proprietary LLM integrations.",
    category: "AI & Automation",
    deliverables: [
      "24/7 Autonomous Customer Agents that qualify and book calls",
      "Internal knowledge base copilots trained on your company data",
      "Fine-tuned LLM workflows for automated proposal/report generation",
      "Voice & multimodal conversational interfaces",
      "Enterprise security and strict data privacy compliance",
    ],
    businessImpact:
      "Instant 24/7 customer engagement and 70% reduction in customer support response lag.",
    iconName: "Bot",
    badge: "AI Native",
  },
  {
    id: "automation",
    number: "04",
    title: "Workflow & Process Automation",
    shortDesc:
      "Eliminate repetitive busywork. We integrate your CRM, accounting, communication, and fulfillment tools.",
    category: "AI & Automation",
    deliverables: [
      "Automated lead capture, enrichment, and CRM routing",
      "Instant invoice generation, payment reconciliation & receipts",
      "Cross-platform sync (HubSpot, Stripe, Slack, Notion, Airtable)",
      "Automated client onboarding workflows and asset delivery",
      "Error detection, automated alerts & fail-safe monitoring",
    ],
    businessImpact:
      "Recovers 15 to 35 operational hours per employee every single week.",
    iconName: "Workflow",
    badge: "Efficiency Multiplier",
  },
  {
    id: "analytics",
    number: "05",
    title: "Data Intelligence & Dashboards",
    shortDesc:
      "Turn raw numbers into clarity. Real-time executive dashboards, cohort analysis, and AI-assisted predictive forecasting.",
    category: "Intelligence & Scaling",
    deliverables: [
      "Unified real-time executive growth command center",
      "Customer cohort retention, churn & unit economics tracking",
      "Natural language data querying (Ask your data questions in plain English)",
      "Predictive cash flow & inventory replenishment forecasting",
      "Automated weekly executive digest delivered straight to Slack/Email",
    ],
    businessImpact:
      "Full visibility into profitability, customer churn triggers, and real marketing ROI.",
    iconName: "BarChart3",
    badge: "Clarity Engine",
  },
  {
    id: "strategy",
    number: "06",
    title: "Go-to-Market & Growth Strategy",
    shortDesc:
      "Battle-tested commercial strategy, product positioning, pricing models, and market expansion roadmaps.",
    category: "Intelligence & Scaling",
    deliverables: [
      "Product-Market Fit & Ideal Customer Profile (ICP) validation",
      "Offer architecture, packaging & value-based pricing design",
      "Go-to-market launch blueprints for new products",
      "Competitor intelligence & defensible moat positioning",
      "Quarterly growth sprint roadmaps with prioritized backlogs",
    ],
    businessImpact:
      "Prevents costly strategic missteps and aligns your entire team to clear revenue targets.",
    iconName: "Compass",
    badge: "Executive Guidance",
  },
  {
    id: "brand-content",
    number: "07",
    title: "Brand Identity & Creative Engine",
    shortDesc:
      "World-class visual branding, narrative positioning, high-impact video assets, and conversion-focused design.",
    category: "Digital Presence",
    deliverables: [
      "Complete visual identity systems (Logo, typography, color palettes)",
      "Brand messaging matrix & high-conviction value propositions",
      "Short-form and long-form video production for social channels",
      "Pitch decks, sales collateral & customer case study design",
      "Design systems for cohesive multi-platform brand consistency",
    ],
    businessImpact:
      "Establishes premium market authority, allowing you to charge higher prices and close deals faster.",
    iconName: "Sparkles",
    badge: "Market Authority",
  },
  {
    id: "training",
    number: "08",
    title: "AI Adoption & Team Enablement",
    shortDesc:
      "Upskill your internal workforce with hands-on AI training, operational playbooks, and change management.",
    category: "Intelligence & Scaling",
    deliverables: [
      "Executive AI briefings on commercial impact & risk management",
      "Hands-on department workshops (Sales, Marketing, Ops, Support)",
      "Custom internal prompting libraries & standardized AI playbooks",
      "AI governance, security guidelines & compliance protocols",
      "Ongoing monthly office hours and new tool advisory",
    ],
    businessImpact:
      "Transforms your existing team into an AI-augmented, high-output workforce.",
    iconName: "GraduationCap",
    badge: "Human Leverage",
  },
];

export const AI_ADVANTAGE_TOOLS: AiAdvantageTool[] = [
  {
    id: "customer-agent",
    title: "AI Customer Agent",
    subtitle: "24/7 Autonomous Inbound Lead Qualification",
    iconName: "Bot",
    description:
      "Never miss a lead while your team sleeps. Engages web visitors immediately, answers nuanced service questions from your documentation, qualifies budget/timing, and books calendar appointments directly into your sales reps' schedules.",
    features: [
      "Instant response time under 1.5 seconds",
      "Trained on your exact pricing, FAQs, and case studies",
      "Direct Google / Outlook Calendar scheduling integration",
      "Automated lead scoring and CRM entry with transcript summary",
    ],
    mockOutputTitle: "Live Agent Conversation Simulation",
    sampleInput:
      "Hi, we are an e-commerce brand doing $40k/mo. Can you automate our customer support and improve our email marketing?",
    sampleOutput: `Hello! Yes, that's exactly our sweet spot. For an e-commerce brand at $40k/mo, we typically deploy:
1. An AI Customer Agent to resolve 70%+ of WISMO (where-is-my-order) and return inquiries instantly.
2. Automated Klaviyo email nurture sequences to lift repeat purchase rates by 25-35%.

Would you prefer a 20-minute growth walkthrough this Thursday at 2:00 PM or Friday at 11:00 AM?`,
  },
  {
    id: "marketing-copilot",
    title: "Marketing Copilot",
    subtitle: "High-Velocity Content & Campaign Generation",
    iconName: "Sparkles",
    description:
      "Generates weeks of multi-channel marketing campaigns tailored to your specific audience personas in minutes. Creates ad copy variations, SEO blog outlines, LinkedIn thought leadership, and email sequences grounded in your brand voice.",
    features: [
      "Generates 10+ ad copy variations with hooks & CTAs",
      "Builds full-funnel email nurture sequences in seconds",
      "Identifies trending industry keywords with high conversion intent",
      "Guarantees brand voice consistency across all marketing channels",
    ],
    mockOutputTitle: "Generated Campaign Package",
    sampleInput:
      "Generate a 3-part re-engagement email sequence for SaaS users who abandoned checkout.",
    sampleOutput: `Email 1 (Hour 2): "Quick question regarding your account setup..."
Hook: Address common setup fears + offer 1-click test drive.

Email 2 (Day 1): "Here's what [Customer X] unlocked in their first 7 days..."
Proof: Mini-case study showing $14k cost savings within 2 weeks.

Email 3 (Day 3): "Final check-in + complimentary onboarding consultation"
Urgency: Direct link to book a 1-on-1 implementation architect session.`,
  },
  {
    id: "data-intelligence",
    title: "Data Intelligence",
    subtitle: "Natural Language Executive Business Analytics",
    iconName: "BarChart3",
    description:
      "Stop wrestling with complex SQL queries or clunky spreadsheet pivots. Simply ask your business data questions in natural plain English, and receive immediate insights, visual trends, and concrete recommended actions.",
    features: [
      "Connects directly to Stripe, Shopify, QuickBooks, and Google Analytics",
      "Understands plain English questions like 'Which channel had the highest LTV last quarter?'",
      "Detects silent churn risks before customers cancel",
      "Generates automated Monday morning revenue & growth briefings",
    ],
    mockOutputTitle: "Plain-English Query Engine",
    sampleInput:
      "Why did our customer acquisition cost spike last month, and which cohort had the best retention?",
    sampleOutput: `Executive Analysis (Last 30 Days):
1. CAC increased +18.4% due to ad fatigue on the 'Summer Scale' Meta ad set. Shifting $3,500/mo to the new 'Workflow Automation' creative is projected to normalize CAC by next week.
2. The B2B Healthcare cohort showed the highest 90-day retention at 94.2% with a 3.8x expansion rate.
Recommendation: Focus Q4 outbound efforts exclusively on mid-market healthcare operators.`,
  },
  {
    id: "process-automation",
    title: "Process Automation Engine",
    subtitle: "Autonomous Cross-Tool Workflows",
    iconName: "Workflow",
    description:
      "Eliminates the invisible friction of daily operations. Seamlessly moves information between your web forms, CRM, payment processors, project management boards, and internal communication channels with zero manual entry.",
    features: [
      "Connects 200+ popular business tools (HubSpot, Slack, Stripe, Notion, Google Workspace)",
      "Self-healing workflows that flag errors without breaking the pipeline",
      "Automated invoice reconciliation and payment reminder dispatch",
      "Instantly provisions new client folders, Slack channels, and onboarding checklists",
    ],
    mockOutputTitle: "Autonomous Workflow Pipeline",
    sampleInput: "New client signs $8,500 proposal on DocuSign.",
    sampleOutput: `Trigger: DocuSign Contract Executed
Step 1: Stripe auto-generates invoice & charges retainer deposit ($4,250).
Step 2: HubSpot updates deal stage to 'Closed Won' + logs signed PDF.
Step 3: Dedicated Slack client channel #val-client created; team notified.
Step 4: Google Drive shared workspace & onboarding portal auto-provisioned.
Step 5: Welcome email dispatched to client with onboarding survey link.
Status: Completed in 3.4 seconds (0 human hours spent).`,
  },
  {
    id: "sales-assistant",
    title: "Sales Assistant & Outreach",
    subtitle: "Automated Lead Research, Enrichment & Follow-Ups",
    iconName: "Zap",
    description:
      "Supercharges your sales team by automatically researching incoming prospects, finding key decision-makers on LinkedIn, checking their technology stack, and drafting personalized outreach emails ready for review.",
    features: [
      "Automatic company revenue, employee count & tech stack enrichment",
      "Drafts hyper-personalized outreach referencing recent prospect news",
      "Monitors prospect job openings for buying intent signals",
      "Automatically logs all touches, email opens, and replies in your CRM",
    ],
    mockOutputTitle: "Enriched Sales Intelligence Report",
    sampleInput:
      "Inbound lead: Alex Rivera, VP of Operations at Meridian Logistics.",
    sampleOutput: `Lead Profile Enriched:
Company: Meridian Logistics (140 employees, Series A, uses Salesforce + Shopify Plus)
Pain Signal: Recently posted 4 job openings for 'Manual Data Entry Clerks'
Generated Pitch:
"Hi Alex, noticed Meridian is scaling logistics operations quickly. Most operators at your stage lose 25+ hours weekly manually syncing customs manifests with Salesforce. We built an automated pipeline that eliminates this entirely. Worth a 10-minute preview?"`,
  },
];

export const JOURNEY_STAGES = [
  {
    step: "01",
    id: "START",
    title: "START",
    tagline: "Lay the Foundation",
    description:
      "We build your core digital infrastructure: a stunning, high-converting website, distinctive brand identity, and clean tracking setup so you look like an industry leader from day one.",
    deliverables: [
      "Modern High-Speed Website",
      "Brand Identity & Positioning",
      "Analytics & Conversion Tracking",
      "Initial Offer Packaging",
    ],
    focus: "Establish credibility & capture first paying clients.",
  },
  {
    step: "02",
    id: "GROW",
    title: "GROW",
    tagline: "Drive Consistent Customers",
    description:
      "We turn on the acquisition engine. Through targeted SEO, high-ROI paid ads, automated email sequences, and organic content, we flood your pipeline with qualified buyers.",
    deliverables: [
      "Omni-Channel Lead Generation",
      "High-Intent Technical SEO",
      "Conversion Rate Optimization (CRO)",
      "Nurture & Retention Flows",
    ],
    focus: "Build predictable revenue and lower acquisition costs.",
  },
  {
    step: "03",
    id: "AUTOMATE",
    title: "AUTOMATE",
    tagline: "Reclaim Your Time",
    description:
      "As revenue rises, operational drag increases. We install AI customer agents, automated CRM routing, invoice reconciliation, and team copilots so you scale without burning out.",
    deliverables: [
      "24/7 AI Customer & Sales Agents",
      "Cross-Platform Workflow Integrations",
      "Internal Team Copilots",
      "Automated Client Onboarding",
    ],
    focus: "Save 20-40 hours per week and eliminate human error.",
  },
  {
    step: "04",
    id: "SCALE",
    title: "SCALE",
    tagline: "Maximize Enterprise Value",
    description:
      "With systems running smoothly, we expand your market share. We introduce predictive data analytics, team training, new market expansion, and proprietary digital assets.",
    deliverables: [
      "Executive Data Intelligence Dashboards",
      "Predictive Forecasting Models",
      "New Market & Product Expansion",
      "Team AI Upskilling & Playbooks",
    ],
    focus: "Scale profit margins and build long-term enterprise valuation.",
  },
];

export const FIVE_YEAR_ROADMAP: RoadmapYear[] = [
  {
    year: "Year 1",
    phase: "SERVICE",
    headline: "Client Success & High-Touch Delivery",
    description:
      "Get real customers, deliver transformative results, build an unshakeable reputation, and deeply understand customer operational bottlenecks across industries.",
    milestones: [
      "Deliver 50+ successful client growth transformations",
      "Maintain 98%+ client satisfaction and high-retention partnerships",
      "Document the most frequent and painful operational bottlenecks",
      "Achieve strong profitability and positive cash flow",
    ],
    status: "Active",
  },
  {
    year: "Year 2",
    phase: "PRODUCTIZE",
    headline: "Standardized Growth Kits & Repeatable Systems",
    description:
      "Extract our most successful implementations into standardized growth blueprints, automated deployment templates, and predictable execution playbooks.",
    milestones: [
      "Standardized 14-day web & AI agent launch kits",
      "Proprietary automation workflow library across 10 verticals",
      "Predictable client onboarding & recurring growth retainers",
      "Internal playbook automation cutting delivery time by 50%",
    ],
    status: "Next",
  },
  {
    year: "Year 3",
    phase: "PRODUCTS",
    headline: "Proprietary AI Tools & Analytics Software",
    description:
      "Build our own proprietary software: pre-built AI customer agents, internal workflow connectors, and automated business intelligence dashboards.",
    milestones: [
      "Launch Maha Growth AI Agent Suite (SaaS beta)",
      "Launch Maha Growth Executive Data Intelligence dashboard",
      "Transition service clients into recurring software subscribers",
      "Generate high-margin recurring software revenue alongside services",
    ],
    status: "Roadmap",
  },
  {
    year: "Year 4",
    phase: "PLATFORM",
    headline: "The Unified All-in-One Growth Platform",
    description:
      "Unify web hosting, growth marketing automation, AI agent orchestration, and business intelligence into one single unified operating platform for businesses.",
    milestones: [
      "Full cloud platform combining Growth + Automation + Data + AI",
      "Self-service onboarding for small businesses & agencies",
      "API integrations with major global enterprise ecosystems",
      "Multi-million dollar Annual Recurring Revenue (ARR) engine",
    ],
    status: "Roadmap",
  },
  {
    year: "Year 5+",
    phase: "ECOSYSTEM",
    headline: "Global Enterprise Ecosystem & Marketplace",
    description:
      "Expand into specialized industry verticals, strategic channel partnerships, developer app marketplace, and global market expansion.",
    milestones: [
      "Developer marketplace for custom AI growth agents and workflows",
      "Global partner network across North America, Europe, and Asia",
      "Category-defining brand recognized as the gold standard in business growth",
    ],
    status: "Roadmap",
  },
];

export const REVENUE_MODELS: RevenueModel[] = [
  {
    stream: "Targeted Growth Sprints",
    type: "Fixed-Scope Milestone",
    cadence: "2 to 4-Week Rapid Sprint",
    idealFor:
      "Businesses needing a high-impact digital platform overhaul, conversion re-architecture, or custom AI agent integration.",
    description:
      "Milestone-driven, high-velocity engineering sprints with guaranteed delivery timelines and transparent deliverables.",
    features: [
      "Custom high-performance web application or client portal",
      "Comprehensive conversion architecture & brand positioning",
      "Fine-tuned 24/7 AI qualification agent deployment",
      "Full analytics, pipeline telemetry & conversion tracking",
      "30 days of post-launch hyper-care & performance tuning",
    ],
    deliveryScope: "Full Sprint Deployment & Systems Handover",
  },
  {
    stream: "Dedicated Growth Squad",
    type: "Continuous Strategic Retainer",
    cadence: "Monthly Agile Retainer",
    idealFor:
      "Scaling companies requiring an embedded squad managing SEO, paid acquisition, conversion optimization, and workflow automations.",
    description:
      "Your fully integrated external growth squad. We continuously test, optimize, and scale your customer acquisition pipeline.",
    features: [
      "Ongoing SEO & programmatic content engine publishing",
      "Multi-channel paid acquisition optimization (Google, Meta, LinkedIn)",
      "Continuous A/B testing & conversion rate optimization",
      "Autonomous workflow upgrades and CRM data enrichment",
      "Bi-weekly executive strategy reviews and KPI reporting",
    ],
    deliveryScope: "Dedicated Growth Strategist + Full-Stack Dev + AI Engineer",
    popular: true,
  },
  {
    stream: "Executive Advisory & Audits",
    type: "Strategic Transformation",
    cadence: "Diagnostic & Strategic Roadmap",
    idealFor:
      "Founders and executive teams needing clarity on practical AI adoption, go-to-market strategy, and organizational efficiency.",
    description:
      "Deep-dive architectural evaluations, commercial growth strategy roadmaps, and executive team AI training.",
    features: [
      "Comprehensive AI & operational tech stack audit",
      "Custom 12-month commercial growth roadmap",
      "Executive and team AI enablement workshops",
      "Vendor consolidation & operational software cost reduction plan",
      "Direct fractional Chief Growth Officer advisory",
    ],
    deliveryScope: "Complete Growth Audit Dossier & Executive Briefing",
  },
  {
    stream: "Managed Platform & Systems",
    type: "Infrastructure & SLA",
    cadence: "Managed Cloud Infrastructure",
    idealFor:
      "Enterprises utilizing custom AI agents, automated workflow pipelines, and executive dashboards.",
    description:
      "Guarantees 99.9% uptime, ongoing prompt tuning, model latency monitoring, and continuous dashboard maintenance.",
    features: [
      "Dedicated compute for AI Customer Agents & copilots",
      "Continuous workflow monitoring and error auto-healing",
      "Live data intelligence dashboard maintenance",
      "Priority SLA support with sub-2-hour turnaround",
      "Ongoing LLM security audits and fine-tuning updates",
    ],
    deliveryScope: "24/7 Monitored Infrastructure with Enterprise SLA",
  },
  {
    stream: "Unified Growth Platform",
    type: "Software Platform Tier",
    cadence: "Platform Access Tier",
    idealFor:
      "Companies seeking self-service AI growth tools, standardized workflows, and automated reporting.",
    description:
      "Our long-term software platform combining AI agents, automated marketing copilots, and business analytics in one login.",
    features: [
      "Self-service AI agent builder and playground",
      "Pre-built workflow automation marketplace",
      "Unified analytics & plain-English reporting",
      "Multi-seat team workspace with role-based access",
    ],
    deliveryScope: "Enterprise Cloud Access & API Integration",
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "cs-1",
    client: "Multi-Source SaaS Revenue & Power BI Telemetry Pipeline",
    industry: "FinTech & Enterprise Analytics",
    stage: "Target Use Case",
    problem:
      "Fragmented revenue records across Stripe billing, HubSpot CRM, and Google Analytics without unified reconciliation. Financial analysts spend 16+ hours weekly manually matching spreadsheets with frequent calculation errors.",
    solution:
      "Engineers an automated real-time ingestion pipeline unifying subscription events, calculating net retention rates (NRR), running anomaly checks on churn spikes, and auto-exporting cleaned schemas directly into Power BI with pre-built DAX models.",
    architecture: [
      "Real-Time Webhook & Batch Ingestion Engine",
      "Automated DAX Measures & Power BI Push API",
      "Stripe, HubSpot & SQL Warehouse Connector",
      "Multi-Tenant PostgreSQL + In-Memory Cache",
    ],
    timeline: "Architecture Blueprint",
    metrics: [
      { label: "Data Latency Reduction", value: "Real-Time (sub-500ms)" },
      { label: "Manual Reporting Hours Saved", value: "16 hrs/week" },
      { label: "Power BI Model Sync Rate", value: "100% Automated" },
    ],
    techStack: [
      "TypeScript",
      "Node.js",
      "Power BI REST API",
      "PostgreSQL",
      "Tailwind CSS",
    ],
  },
  {
    id: "cs-2",
    client: "Global Logistics Manifest & Excel/PDF Ingestion Engine",
    industry: "B2B Logistics & Freight Telemetry",
    stage: "Target Use Case",
    problem:
      "High-volume freight rate manifests arrive daily in diverse PDF, Excel (.xlsx), and PowerPoint formats. Dispatchers are overwhelmed by manual transcription, causing quoting delays and costly margin slippage.",
    solution:
      "Deploys a multi-format document parser accepting Excel sheets, PDFs, and presentations in real time. Automatically extracts rate tables, flags fuel surcharge anomalies exceeding 2.5 sigma, and generates instant margin forecasts.",
    architecture: [
      "Multi-Format Document Parsing Engine (Excel, PDF, PPT)",
      "Dynamic Pricing Rule & Outlier Detection Matrix",
      "Real-Time Telemetry & Margin Guardrails",
      "Instant Power BI & Excel Report Exporter",
    ],
    timeline: "Architecture Blueprint",
    metrics: [
      { label: "Document Parse Velocity", value: "< 1.2 sec / sheet" },
      { label: "Margin Outlier Detection", value: "99.4% Accuracy" },
      { label: "Operational Throughput", value: "+320% Capacity" },
    ],
    techStack: [
      "TypeScript",
      "Excel/XLSX Parser",
      "React",
      "Vector Telemetry",
      "Tailwind CSS",
    ],
  },
  {
    id: "cs-3",
    client: "Autonomous Clinical Document & Audit Diagnostic System",
    industry: "HealthTech & Diagnostics",
    stage: "Target Use Case",
    problem:
      "Diagnostic intake requires cross-referencing multi-page clinical lab PDFs and complex tabular reports against compliance benchmarks, creating extensive operational backlogs.",
    solution:
      "Engineers a structured extraction and telemetry engine that ingests clinical documentation, parses tabular lab figures, validates ranges against standardized benchmarks, and exports audit-ready datasets.",
    architecture: [
      "Document Ingestion & Optical Table Parser",
      "Standardized Benchmark Validation Engine",
      "Audit-Ready Telemetry Logs",
      "Secure Role-Based Data Pipeline",
    ],
    timeline: "Architecture Blueprint",
    metrics: [
      { label: "Extraction Accuracy", value: "99.8%" },
      { label: "Turnaround Acceleration", value: "85% Faster" },
      { label: "Audit Compliance Readiness", value: "100% Verified" },
    ],
    techStack: [
      "React",
      "TypeScript",
      "Document Engine",
      "Tailwind CSS",
      "Enterprise Security",
    ],
  },
];

export const FOUNDER_DATA = {
  name: "Jonnada Mahesh",
  role: "Founder & Chief Executive Officer",
  company: "Maha Growth",
  image: "/jonnada-mahesh.png",
  fallbackImage: "/jonnada-mahesh.jpg",
  bio: [
    "Jonnada Mahesh is the Founder and Chief Executive Officer of Maha Growth, leading the company's mission to eliminate software fragmentation and build unified, high-performance growth infrastructure for modern businesses.",
    "With a deep background in systems architecture, full-stack software engineering, and intelligent automation, Mahesh guides Maha Growth's product vision and technical roadmap—transforming ambitious scaling challenges into reliable, automated operating leverage.",
    "Under his leadership, Maha Growth brings marketing, sales conversion, data telemetry, and background automation together into one unified platform, empowering growing businesses to increase margins, recover operational hours, and scale with enduring confidence.",
  ],
  quote:
    "Modern businesses shouldn't have to glue together 10 disjointed tools and agencies just to scale. Our mission at Maha Growth is to deliver one cohesive platform where automation, analytics, and workflows operate in complete harmony.",
  focusAreas: [
    {
      title: "Systems & Architecture",
      desc: "Enterprise-grade cloud infrastructure, low-latency microservices, and unified APIs.",
    },
    {
      title: "Intelligent Automation",
      desc: "Autonomous background workflows, CRM synchronization, and continuous process optimization.",
    },
    {
      title: "Revenue Telemetry",
      desc: "Attribution models, predictive cohort analysis, and real-time business intelligence.",
    },
    {
      title: "Disciplined Execution",
      desc: "Aligning engineering craft directly with compounding customer revenue and lasting trust.",
    },
  ],
};

export const GROWTH_ECOSYSTEM = {
  themeStatement:
    "Building an ecosystem that works for you and helps grow your business",
  subtitle:
    "Instead of disconnected tools and manual firefighting, Maha Growth deploys an integrated digital and AI ecosystem that operates 24/7—capturing demand, executing operations, and surfacing revenue intelligence on autopilot.",
  layers: [
    {
      id: "acquisition",
      title: "Omnichannel Acquisition Engine",
      badge: "Demand Generation",
      tagline: "Never miss a qualified prospective client",
      description:
        "Combines conversion-optimized web architecture, technical SEO authority, algorithmic paid ads, and automated capture funnels to deliver high-intent traffic directly into your pipeline.",
      worksForYou:
        "Operates 24/7 across global time zones, continuously harvesting organic and paid intent without manual ad tweaking.",
      metrics: {
        label: "Conversion Lift",
        value: "+64%",
        sub: "vs generic sites",
      },
      color: "from-blue-500/20 to-cyan-500/20",
      accent: "#3B82F6",
      capabilities: [
        "Dynamic high-converting landing experiences",
        "Programmatic SEO authority generation",
        "Algorithmic ad-spend budget rebalancing",
        "Multi-touch attribution & lead fingerprinting",
      ],
    },
    {
      id: "agents",
      title: "Intelligent Conversational Agent Mesh",
      badge: "24/7 AI Concierge",
      tagline: "Engage, qualify, and book within 3 seconds",
      description:
        "Custom-trained AI agents that greet visitors, diagnose project requirements, answer complex technical inquiries from your knowledge base, and book qualified discovery calls.",
      worksForYou:
        "Engages and vets leads instantly while your team sleeps, eliminating slow 48-hour email response delays.",
      metrics: {
        label: "Response Latency",
        value: "< 3s",
        sub: "instant qualification",
      },
      color: "from-cyan-500/20 to-teal-500/20",
      accent: "#06B6D4",
      capabilities: [
        "Conversational AI diagnostics & vetting",
        "Instant calendar booking & scheduling sync",
        "Enterprise knowledge base RAG retrieval",
        "Automatic CRM lead enrichment & routing",
      ],
    },
    {
      id: "workflows",
      title: "Self-Executing Operations & Workflows",
      badge: "Autonomous Ops",
      tagline: "Eradicate repetitive administrative drag",
      description:
        "End-to-end autonomous pipelines connecting onboarding, proposal generation, contract sign-offs, invoicing, and team notifications without a single copy-paste.",
      worksForYou:
        "Saves 20+ team hours every week by executing handoffs, reminders, and fulfillment steps automatically.",
      metrics: {
        label: "Time Recovered",
        value: "22+ hrs",
        sub: "per week per team",
      },
      color: "from-indigo-500/20 to-purple-500/20",
      accent: "#6366F1",
      capabilities: [
        "Automated client onboarding & intake triggers",
        "Dynamic proposal & contract dispatch",
        "Bi-directional CRM, Stripe & Slack pipelines",
        "Predictive churn detection & retention alerts",
      ],
    },
    {
      id: "intelligence",
      title: "Executive Data & Revenue Warehouse",
      badge: "Decision Intelligence",
      tagline: "Total clarity across every business dollar",
      description:
        "A single unified source of truth synthesizing Stripe, Google Analytics, ad spend, and CRM metrics into real-time forecasting and plain-English executive briefings.",
      worksForYou:
        "Answers complex business questions in seconds with natural language querying—no waiting for manual monthly reports.",
      metrics: {
        label: "Data Clarity",
        value: "100%",
        sub: "real-time transparency",
      },
      color: "from-emerald-500/20 to-green-500/20",
      accent: "#10B981",
      capabilities: [
        "Real-time customer LTV & CAC tracking",
        "Natural-language AI data queries",
        "Automated Monday morning executive briefing",
        "Predictive revenue & cash flow forecasting",
      ],
    },
    {
      id: "strategy",
      title: "Compounding Growth & Scaling Flywheel",
      badge: "Strategic Moats",
      tagline: "Continuous optimization that scales with you",
      description:
        "Weekly algorithmic adjustments, continuous CRO testing, and quarterly expansion roadmaps guided by verified telemetry and founder-led strategic vision.",
      worksForYou:
        "Constantly strengthens your competitive moats and compounds return on capital month over month.",
      metrics: {
        label: "Scale Velocity",
        value: "10x",
        sub: "output leverage",
      },
      color: "from-amber-500/20 to-orange-500/20",
      accent: "#F59E0B",
      capabilities: [
        "Algorithmic multivariate A/B testing",
        "Continuous AI model fine-tuning & prompt updates",
        "Quarterly growth milestones & GTM execution",
        "Competitive intelligence & market positioning",
      ],
    },
  ],
  ecosystemArchetypes: [
    {
      id: "b2b",
      name: "B2B Services & Advisory",
      focus: "High-ticket client acquisition & frictionless delivery",
      keyAutomation:
        "Automated discovery questionnaire -> instant executive dossier -> CRM deal stage update -> calendar booking.",
      hoursSaved: "24.5 hrs/week",
      leadLift: "+78%",
      roiTimeframe: "30-45 days",
    },
    {
      id: "saas",
      name: "SaaS & Digital Tech",
      focus: "Self-serve trial conversions & automated onboarding",
      keyAutomation:
        "Product telemetry tracking -> automated behavior email triggers -> in-app AI concierge -> stripe expansion alert.",
      hoursSaved: "32 hrs/week",
      leadLift: "+92%",
      roiTimeframe: "21-30 days",
    },
    {
      id: "ecommerce",
      name: "E-Commerce & DTC Brands",
      focus: "Omnichannel customer retention & inventory sync",
      keyAutomation:
        "Abandoned cart re-engagement via AI SMS -> customer VIP tagging -> real-time ad ROAS budget adjustment.",
      hoursSaved: "28 hrs/week",
      leadLift: "+55%",
      roiTimeframe: "14-28 days",
    },
    {
      id: "agency",
      name: "Agencies & Professional Practices",
      focus: "Capacity scaling without exploding headcount",
      keyAutomation:
        "Standardized client workspace provisioning -> automated project reporting -> milestone payment automation.",
      hoursSaved: "30 hrs/week",
      leadLift: "+68%",
      roiTimeframe: "30 days",
    },
  ],
};

export const FAQS: FaqItem[] = [
  {
    category: "General",
    question:
      "Why should we work with one partner instead of hiring separate agencies?",
    answer:
      "When you hire separate web, marketing, AI, and analytics agencies, you spend half your time coordinating communication between them. Worse, when targets are missed, they point fingers at each other. As your single strategic growth partner, Maha Growth aligns technology, traffic, data, and automation under one roof with single-point accountability for real business outcomes.",
  },
  {
    category: "AI & Technology",
    question: "How do you ensure AI is practical and not just hype?",
    answer:
      "We never deploy AI for novelty. Every AI tool we implement is tied to a measurable financial KPI: either increasing revenue (e.g. AI agents capturing leads 24/7, marketing copilots accelerating content output) or reducing operational costs (e.g. automating repetitive data entry, instant customer support resolution). If an AI solution doesn't have a clear, rapid ROI, we don't build it.",
  },
  {
    category: "Engagement",
    question:
      "How do we get started, and what is the typical onboarding timeline?",
    answer:
      "We begin with a complimentary 30-minute Growth Diagnostic. We evaluate your current digital presence, bottlenecks, and data infrastructure, then deliver a tailored Growth Blueprint. Sprint projects typically launch within 2 to 4 weeks, while ongoing growth retainers activate immediately with an intensive 14-day discovery and quick-win sprint.",
  },
  {
    category: "Partnership Structure",
    question: "How are partnership scopes and deliverables determined?",
    answer:
      "Every partnership is structured around tailored outcomes, scope requirements, and technical depth rather than generic commoditized packages. Whether you require a high-velocity 3-week engineering sprint or a dedicated monthly growth squad, scopes are aligned transparently with your exact growth stage and verified milestones.",
  },
  {
    category: "Ownership",
    question: "Do we own the code, assets, and AI workflows you build for us?",
    answer:
      "Yes, 100%. All custom code, design assets, brand identity files, automated workflow blueprints, and fine-tuned prompt repositories are completely owned by your company. We believe in earning your long-term partnership through ongoing compounding results, not by locking your data hostage.",
  },
];
