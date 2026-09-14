/**
 * GOLIS — Central Site Configuration
 * All business data lives here. Update once, reflects everywhere.
 */

export const SITE_CONFIG = {
  brand: {
    name: 'GOLIS',
    tagline: 'Websites That Grow Businesses.',
    description:
      'GOLIS creates modern, responsive websites and digital solutions for local businesses and growing companies.',
  },

  contact: {
    phone: '+91 86398 65959',
    phoneRaw: '+918639865959',
    email: 'tirumalarao.goli.dev@gmail.com',
    whatsapp: '+918639865959',
    whatsappMessage:
      'Hi GOLIS, I would like to discuss creating a website for my business.',
  },

  social: {
    instagram: 'https://instagram.com/golis.in',
    linkedin: 'https://linkedin.com/company/golis',
    youtube: 'https://youtube.com/@golis',
  },

  seo: {
    title: 'GOLIS | Website Development & Digital Solutions',
    description:
      'GOLIS creates modern, responsive websites and digital solutions for local businesses and growing companies.',
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
    id: 'website-redesign',
    number: '02',
    title: 'Website Redesign',
    description:
      'Transform outdated websites into modern, responsive experiences that represent your business today.',
    icon: 'edit',
  },
  {
    id: 'product-catalog',
    number: '03',
    title: 'Product & Service Catalogs',
    description:
      'Beautifully showcase your products and services online so customers can find what they need.',
    icon: 'grid',
  },
  {
    id: 'landing-pages',
    number: '04',
    title: 'Landing Pages',
    description:
      'High-quality landing pages designed for campaigns, promotions and lead generation.',
    icon: 'layers',
  },
  {
    id: 'whatsapp-leads',
    number: '05',
    title: 'WhatsApp & Lead Generation',
    description:
      'Make it easy for customers to contact your business instantly through WhatsApp and enquiry forms.',
    icon: 'message',
  },
  {
    id: 'automation',
    number: '06',
    title: 'Business Automation',
    description:
      'Build a foundation for future ordering, booking, dashboards and business automation.',
    icon: 'settings',
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
    description: 'We create a website concept aligned with your brand and industry.',
    icon: 'pen',
  },
  {
    step: '03',
    title: 'Develop',
    description: 'We build and optimise the website for performance and usability.',
    icon: 'code',
  },
  {
    step: '04',
    title: 'Launch',
    description: 'We deploy the website and help your business get started online.',
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
    q: 'Do I need hosting?',
    a: 'Yes — your website needs a domain name and hosting. We can guide you through purchasing these or manage it on your behalf. Costs are typically ₹1,500–₹3,000 per year.',
  },
  {
    q: 'Can customers contact me through WhatsApp?',
    a: 'Yes. We integrate a WhatsApp button that opens a chat with a pre-filled message when a customer taps it — making it effortless for customers to reach you.',
  },
  {
    q: 'Can I add products later?',
    a: 'Yes. Our Business and Premium packages include a product or service catalog. We can also add catalog functionality to a Starter site as your business grows.',
  },
  {
    q: 'Can I add online ordering?',
    a: 'Yes. We build on a scalable foundation. You can start with a catalog and add online ordering, payment integration or booking features as your business grows.',
  },
  {
    q: 'Can GOLIS redesign my existing website?',
    a: 'Yes. We redesign outdated websites into modern, mobile-friendly experiences. Share your current website and tell us what you want to improve.',
  },
  {
    q: 'Can you build an Android application?',
    a: 'Yes. We can develop a mobile application when your business is ready. Our websites are built with architecture that makes this transition smoother.',
  },
  {
    q: 'Do you provide maintenance?',
    a: 'Yes. We offer maintenance support to keep your website updated, secure and running well. We can discuss a support plan that fits your needs.',
  },
  {
    q: 'Can the website grow with my business?',
    a: 'Absolutely. We design with scalability in mind. Start simple and progressively add a catalog, ordering, booking, admin dashboard, automation and more.',
  },
] as const;

export const TRUST_FEATURES = [
  'Mobile First',
  'Fast & Modern',
  'SEO Ready',
  'WhatsApp Integration',
  'Scalable Architecture',
  'Business-Focused Design',
] as const;

export const WHY_NODES = [
  'Customers',
  'Products',
  'Services',
  'WhatsApp',
  'Leads',
  'Growth',
] as const;
