/**
 * GOLIS — Central Site Configuration
 * All business data lives here. Update once, reflects everywhere.
 */

export const SITE_CONFIG = {
  brand: {
    name: 'GOLIS',
    tagline: 'Websites, AI Agents & Business Automation.',
    description:
      'GOLIS builds modern business websites, AI agents, chatbots, WhatsApp automation and custom business applications that help businesses grow and automate.',
  },

  contact: {
    phone: '+91 86398 65959',
    phoneRaw: '+918639865959',
    email: 'tirumalarao.goli.dev@gmail.com',
    whatsapp: '+918639865959',
    whatsappMessage:
      'Hi GOLIS, I would like to discuss building a solution for my business.',
  },

  social: {
    instagram: 'https://instagram.com/golis.in',
    linkedin: 'https://linkedin.com/company/golis',
    youtube: 'https://youtube.com/@golis',
  },

  seo: {
    title: 'GOLIS | Websites, AI Agents & Business Automation',
    description:
      'GOLIS builds modern business websites, AI agents, chatbots, WhatsApp automation and custom business applications that help businesses grow and automate.',
    ogImage: 'https://golis2.onrender.com/og-image.jpg',
    url: 'https://golis2.onrender.com',
  },
} as const;

export const SERVICES_DATA = [
  {
    id: 'business-websites',
    number: '01',
    title: 'Business Websites',
    description:
      'Modern websites that establish credibility and make it easy for customers to discover your business.',
    icon: 'monitor',
  },
  {
    id: 'ai-powered-websites',
    number: '02',
    title: 'AI-Powered Websites',
    description:
      'Websites with built-in AI assistants that answer customer questions, capture leads and work 24/7.',
    icon: 'brain',
  },
  {
    id: 'whatsapp-automation',
    number: '03',
    title: 'WhatsApp Automation',
    description:
      'Automate customer conversations on WhatsApp — product enquiries, lead capture and follow-ups.',
    icon: 'message',
  },
  {
    id: 'ai-agents',
    number: '04',
    title: 'AI Agents',
    description:
      'Intelligent agents that reason, access your business data and perform real tasks automatically.',
    icon: 'cpu',
  },
  {
    id: 'business-automation',
    number: '05',
    title: 'Business Automation',
    description:
      'Connect AI to your existing tools — CRM, Google Sheets, databases and APIs — to automate repetitive work.',
    icon: 'settings',
  },
  {
    id: 'custom-applications',
    number: '06',
    title: 'Custom Applications',
    description:
      'Web and mobile applications built around your specific business workflows and requirements.',
    icon: 'layers',
  },
] as const;

export const AI_SOLUTIONS_DATA = [
  {
    id: 'ai-chatbots',
    title: 'AI Chatbots',
    description:
      'Give your customers a 24/7 AI assistant that can answer questions, explain services and capture enquiries.',
    features: ['Website chatbot', 'FAQ automation', 'Lead capture', 'Knowledge base'],
    icon: 'chat',
    cta: 'Explore Chatbots',
    accent: '#2563eb',
  },
  {
    id: 'whatsapp-automation',
    title: 'AI WhatsApp Automation',
    description:
      'Automate customer conversations on WhatsApp and reduce repetitive manual responses.',
    features: ['Automated replies', 'Product information', 'Customer enquiries', 'Order assistance'],
    icon: 'whatsapp',
    cta: 'Automate WhatsApp',
    accent: '#25d366',
  },
  {
    id: 'ai-agents',
    title: 'AI Agents',
    description:
      'Build intelligent agents that can reason, access business data and perform real business tasks.',
    features: ['Business APIs', 'Database access', 'MCP tools', 'Workflow execution'],
    icon: 'cpu',
    cta: 'Build an AI Agent',
    accent: '#7c3aed',
  },
  {
    id: 'ai-voice-agents',
    title: 'AI Voice Agents',
    description:
      'AI-powered voice assistants that can handle customer calls and collect information automatically.',
    features: ['Incoming calls', 'Customer questions', 'Lead capture', 'Appointment enquiries'],
    icon: 'mic',
    cta: 'Explore Voice AI',
    accent: '#0891b2',
  },
  {
    id: 'ai-lead-automation',
    title: 'AI Lead Automation',
    description:
      'Capture, qualify and organise leads automatically so your team can focus on genuine opportunities.',
    features: ['Lead qualification', 'Customer profiling', 'Follow-ups', 'CRM integration'],
    icon: 'target',
    cta: 'Automate Leads',
    accent: '#059669',
  },
  {
    id: 'ai-business-automation',
    title: 'AI Business Automation',
    description:
      'Connect AI with your existing business systems to automate repetitive workflows.',
    features: ['Google Sheets', 'CRM', 'APIs', 'Databases', 'Internal systems'],
    icon: 'zap',
    cta: 'Automate My Business',
    accent: '#d97706',
  },
] as const;

export const AI_DEMO_CARDS = [
  {
    id: 'website-assistant',
    title: 'AI Website Assistant',
    description: 'See how an AI assistant answers customer questions on a business website in real time.',
    icon: 'chat',
    demoType: 'chat' as const,
  },
  {
    id: 'sales-assistant',
    title: 'AI Sales Assistant',
    description: 'Watch an AI help customers find the right product and capture their interest automatically.',
    icon: 'target',
    demoType: 'sales' as const,
  },
  {
    id: 'lead-qualification',
    title: 'AI Lead Qualification Agent',
    description: 'Experience an AI that qualifies leads by asking the right questions and collecting contact details.',
    icon: 'cpu',
    demoType: 'lead' as const,
  },
  {
    id: 'business-assistant',
    title: 'AI Business Assistant',
    description: 'Explore how AI can answer internal business questions and support your team.',
    icon: 'brain',
    demoType: 'business' as const,
  },
] as const;

export const AI_INTEGRATIONS_DATA = [
  { id: 'whatsapp', label: 'WhatsApp', icon: 'whatsapp', color: '#25d366' },
  { id: 'google-sheets', label: 'Google Sheets', icon: 'grid', color: '#0f9d58' },
  { id: 'sql-server', label: 'SQL Server', icon: 'database', color: '#cc2927' },
  { id: 'rest-api', label: 'REST APIs', icon: 'code', color: '#2563eb' },
  { id: 'crm', label: 'CRM Systems', icon: 'users', color: '#7c3aed' },
  { id: 'ecommerce', label: 'E-commerce', icon: 'shopping', color: '#f97316' },
  { id: 'internal-apps', label: 'Internal Apps', icon: 'layers', color: '#0891b2' },
  { id: 'databases', label: 'Databases', icon: 'server', color: '#64748b' },
] as const;

export const AI_USE_CASES_DATA = [
  {
    id: 'jewellery',
    industry: 'Jewellery Shop',
    icon: '💎',
    customerQuery: 'Do you have 1 gram gold earrings?',
    aiActions: [
      'Searches product catalogue',
      'Shows matching products',
      'Provides price and details',
      'Captures customer enquiry',
    ],
    accent: '#d4a017',
  },
  {
    id: 'perfume',
    industry: 'Perfume Shop',
    icon: '🌹',
    customerQuery: 'I want a long-lasting perfume under ₹1,000.',
    aiActions: [
      'Understands requirement',
      'Searches product range',
      'Recommends suitable options',
      'Sends product info via WhatsApp',
    ],
    accent: '#c9a96e',
  },
  {
    id: 'gym',
    industry: 'Gym',
    icon: '🏋️',
    customerQuery: 'What are your monthly plans?',
    aiActions: [
      'Answers pricing questions',
      'Explains membership benefits',
      'Captures lead details',
      'Schedules callback time',
    ],
    accent: '#ef4444',
  },
  {
    id: 'real-estate',
    industry: 'Real Estate',
    icon: '🏠',
    customerQuery: 'I need a 2BHK under ₹50 lakh.',
    aiActions: [
      'Collects requirements',
      'Filters available properties',
      'Captures lead contact info',
      'Sends relevant properties',
    ],
    accent: '#818cf8',
  },
] as const;

export const AI_PRICING_DATA = [
  {
    id: 'ai-starter',
    name: 'AI Starter',
    subtitle: 'For simple AI assistants',
    priceNote: 'Custom pricing',
    popular: false,
    suitable: ['FAQ chatbot', 'Website AI assistant', 'Basic lead capture'],
    cta: 'Get AI Starter Quote',
    ctaVariant: 'outline' as const,
  },
  {
    id: 'ai-business',
    name: 'AI Business',
    subtitle: 'For growing businesses',
    priceNote: 'Custom pricing',
    popular: true,
    suitable: [
      'WhatsApp automation',
      'Lead qualification',
      'Business integrations',
      'Custom workflows',
    ],
    cta: 'Get AI Business Quote',
    ctaVariant: 'solid' as const,
  },
  {
    id: 'ai-custom',
    name: 'AI Custom',
    subtitle: 'For advanced automation',
    priceNote: 'Custom pricing',
    popular: false,
    suitable: [
      'AI agents',
      'Voice AI',
      'Custom APIs',
      'Database integrations',
      'Enterprise workflows',
    ],
    cta: 'Get an AI Proposal',
    ctaVariant: 'outline' as const,
  },
] as const;

export const PORTFOLIO_DATA = [
  {
    id: 'arabian-perfume-lab',
    title: 'Arabian Perfume Lab',
    category: 'Product Catalog / Business Website',
    description:
      'A premium digital presence for an Arabian fragrance business — beautifully showcasing products with easy customer enquiry and WhatsApp integration.',
    tags: ['Product Catalog', 'WhatsApp', 'Mobile-First'],
    accent: '#c9a96e',
    features: ['Product showcase', 'WhatsApp integration', 'Enquiry forms', 'Mobile-first design'],
    url: 'https://arabianperfumelab.onrender.com',
    aiPotential: ['AI Product Assistant', 'WhatsApp Order Automation'],
  },
  {
    id: 'fomo-guntur',
    title: 'FOMO Guntur',
    category: 'Local Business / Deals & Events Platform',
    description:
      'A vibrant local discovery platform for Guntur — helping residents find the best deals, events and businesses in their city before they miss out.',
    tags: ['Local Business', 'Deals', 'City Platform'],
    accent: '#f97316',
    features: ['Local deals listing', 'Business directory', 'Events showcase', 'Mobile-first design'],
    url: 'https://fomo-guntur.onrender.com',
    aiPotential: [],
  },
  {
    id: 'sri-lakshmi-jewellery',
    title: 'Sri Lakshmi Jewellery',
    category: 'Product Catalog / Jewellery Business',
    description:
      'An elegant online catalog for a traditional jewellery business — showcasing gold and silver collections with rich visuals and easy customer enquiry.',
    tags: ['Product Catalog', 'Jewellery', 'WhatsApp'],
    accent: '#d4a017',
    features: ['Jewellery catalog', 'WhatsApp enquiry', 'Collection showcase', 'Mobile-first design'],
    url: 'https://srilakshmijewellery.onrender.com',
    aiPotential: ['AI Product Search', 'WhatsApp Enquiry Automation'],
  },
  {
    id: 'truemuscle',
    title: 'Truemuscle',
    category: 'Fitness / Gym & Supplement Website',
    description:
      'A bold, high-energy website for a fitness brand — showcasing gym memberships, supplements and training programmes to drive sign-ups and sales.',
    tags: ['Fitness', 'Gym', 'Lead Gen'],
    accent: '#ef4444',
    features: ['Membership plans', 'Supplement catalog', 'Lead generation', 'Mobile-first design'],
    url: 'https://truemuscle.onrender.com',
    aiPotential: ['AI Lead Capture', 'Membership Enquiry Bot'],
  },
  {
    id: 'wellness-survey',
    title: 'Wellness Survey Platform',
    category: 'Health & Wellness / Web Application',
    description:
      'A modern wellness survey platform enabling users to complete health assessments with a clean, responsive interface and smooth user experience.',
    tags: ['Web App', 'Survey', 'Responsive'],
    accent: '#34d399',
    features: ['Interactive survey flow', 'Clean responsive UI', 'Health assessment', 'Mobile-friendly'],
    url: 'https://wellnesssurvey.onrender.com',
    aiPotential: ['AI Response Analysis'],
  },
  {
    id: 'mgs-guntur',
    title: 'MGS Guntur',
    category: 'Business / Professional Website',
    description:
      'A professional business website for MGS Guntur — establishing a strong online presence with services, contact and lead generation.',
    tags: ['Business Website', 'Lead Gen', 'Professional'],
    accent: '#818cf8',
    features: ['Business showcase', 'Services section', 'Contact & enquiry', 'Mobile-first design'],
    url: 'https://mgsguntur.onrender.com',
    aiPotential: ['AI Business Assistant', 'Automated Customer Enquiries'],
  },
] as const;

export const PROCESS_DATA = [
  {
    step: '01',
    title: 'Discover',
    description: 'We understand your business, your customers and your goals.',
    icon: 'search',
  },
  {
    step: '02',
    title: 'Design',
    description: 'We create a solution concept aligned with your brand and requirements.',
    icon: 'pen',
  },
  {
    step: '03',
    title: 'Develop',
    description: 'We build and optimise your website, AI solution or application.',
    icon: 'code',
  },
  {
    step: '04',
    title: 'Launch',
    description: 'We deploy, integrate and help your business start operating smarter.',
    icon: 'rocket',
  },
] as const;

export const PRICING_DATA = [
  {
    id: 'starter',
    name: 'Starter',
    price: '₹7,999',
    priceNote: 'Starting from',
    popular: false,
    features: [
      'Up to 5 pages',
      'Responsive design',
      'WhatsApp integration',
      'Google Maps',
      'Contact form',
      'Basic SEO',
    ],
    cta: 'Get Started',
    ctaVariant: 'outline' as const,
  },
  {
    id: 'business',
    name: 'Business',
    price: '₹14,999',
    priceNote: 'Starting from',
    popular: true,
    features: [
      'Up to 8 pages',
      'Product/service catalog',
      'Gallery',
      'WhatsApp integration',
      'Contact form',
      'Google Maps',
      'SEO-friendly structure',
      'Analytics-ready',
    ],
    cta: 'Choose Business',
    ctaVariant: 'solid' as const,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '₹24,999',
    priceNote: 'Starting from',
    popular: false,
    features: [
      'Custom design',
      'Advanced functionality',
      'Product/service catalog',
      'Custom forms',
      'Booking/order features',
      'API/backend-ready architecture',
      'Advanced integrations',
    ],
    cta: 'Discuss Your Project',
    ctaVariant: 'outline' as const,
  },
] as const;

export const FAQ_DATA = [
  {
    q: 'How much does a website cost?',
    a: 'Our packages start from ₹7,999 for a professional 5-page business website. Final pricing depends on the number of pages, features and customisation required. We provide a clear quote before any work begins.',
  },
  {
    q: 'How long does development take?',
    a: 'Most business websites are completed within 7–14 working days. Complex projects with custom features may take 3–5 weeks. We share a clear timeline before we begin.',
  },
  {
    q: 'What is an AI agent?',
    a: 'An AI agent is a software system that can understand natural language, reason about a task and take actions — such as searching your product catalogue, capturing a lead, answering questions or triggering a workflow. Unlike a simple chatbot, an AI agent can handle multi-step tasks and access real business data.',
  },
  {
    q: 'Can AI work with my existing website?',
    a: 'Yes. We can add an AI assistant or chatbot to your existing website without rebuilding it. We connect the AI to your business information so it can answer customer questions accurately.',
  },
  {
    q: 'Can you connect AI to WhatsApp?',
    a: 'Yes. We can build WhatsApp automation that responds to common customer messages automatically — product enquiries, pricing questions, lead capture and follow-ups. This saves significant time for businesses receiving high enquiry volumes.',
  },
  {
    q: 'Can AI access my business data?',
    a: 'Yes. We can connect AI to your product catalogue, customer database, CRM, Google Sheets or other business systems — so it can give accurate, up-to-date answers rather than generic responses.',
  },
  {
    q: 'Can AI work with Google Sheets?',
    a: 'Yes. We can build AI solutions that read from and write to Google Sheets — for lead capture, order tracking, inventory updates and more. This allows AI to work with the tools you already use.',
  },
  {
    q: 'Can you build a custom AI chatbot?',
    a: 'Yes. We build custom AI chatbots trained on your business information — products, services, FAQs and policies. The chatbot handles customer conversations and escalates to a human when needed.',
  },
  {
    q: 'Can AI automate customer enquiries?',
    a: 'Yes. Many customer enquiries — pricing, product availability, service details, business hours — can be handled by AI automatically. This reduces manual workload and ensures customers get instant responses.',
  },
  {
    q: 'Can you build an AI voice assistant?',
    a: 'Yes. We can build AI voice agents that handle incoming calls, answer common questions, capture lead details and route calls appropriately. This is particularly useful for businesses with high call volumes.',
  },
  {
    q: 'How much does an AI solution cost?',
    a: 'AI solutions are priced based on the complexity of the use case, integrations required and the scale of automation. We do not apply fixed pricing to complex AI systems — we provide a custom proposal after understanding your specific requirements.',
  },
  {
    q: 'Do I need to replace my existing software?',
    a: 'No. GOLIS builds AI that connects to your existing software — websites, CRMs, databases, spreadsheets and APIs. We extend what you already have rather than forcing you to start over.',
  },
  {
    q: 'Do I need hosting?',
    a: 'Yes — your website needs a domain name and hosting. We can guide you through purchasing these or manage it on your behalf. Costs are typically ₹1,500–₹3,000 per year.',
  },
  {
    q: 'Can customers contact me through WhatsApp?',
    a: 'Yes. We integrate a WhatsApp button that opens a chat with a pre-filled message when a customer taps it — making it effortless for customers to reach you.',
  },
  {
    q: 'Can the website grow with my business?',
    a: 'Absolutely. We design with scalability in mind. Start with a website and progressively add AI assistants, automation, ordering, booking, admin dashboards and more.',
  },
] as const;

export const TRUST_FEATURES = [
  'Mobile First',
  'Fast & Modern',
  'SEO Ready',
  'WhatsApp Integration',
  'AI-Ready Architecture',
  'Business-Focused Design',
] as const;

export const WHY_NODES = [
  'Customers',
  'AI Agent',
  'WhatsApp',
  'Automation',
  'Leads',
  'Growth',
] as const;
