export type IntentType =
  | 'WELCOME'
  | 'SERVICES'
  | 'WEBSITE'
  | 'PRICING'
  | 'PORTFOLIO'
  | 'SEO'
  | 'WHATSAPP'
  | 'BOOKING'
  | 'ECOMMERCE'
  | 'ABOUT'
  | 'FAQ'
  | 'CONTACT'
  | 'QUOTE'
  | 'RESET'
  | 'UNKNOWN';

interface IntentPattern {
  intent: IntentType;
  keywords: string[];
  phrases: string[];
  exactMatches?: string[];
}

const INTENT_PATTERNS: IntentPattern[] = [
  {
    intent: 'RESET',
    keywords: ['restart', 'reset', 'clear', 'start over', 'reboot'],
    phrases: ['start again', 'start from beginning', 'reset chat', 'clear history'],
    exactMatches: ['reset', 'restart', 'start over', 'menu', 'main menu'],
  },
  {
    intent: 'WELCOME',
    keywords: ['hi', 'hello', 'hey', 'greetings', 'hola', 'namaste', 'good morning', 'good afternoon', 'good evening'],
    phrases: ['who are you', 'what can you do', 'how can you help', 'help me'],
    exactMatches: ['hi', 'hello', 'hey', 'help'],
  },
  {
    intent: 'QUOTE',
    keywords: ['quote', 'quotation', 'estimate', 'proposal', 'hire', 'get started', 'cost estimate', 'enquire', 'inquiry'],
    phrases: [
      'get a quote',
      'request a quotation',
      'give me a quote',
      'i want a quotation',
      'how to hire you',
      'i want to get started',
      'send quote',
      'discuss my project',
    ],
    exactMatches: ['quote', 'get quote', 'get a quote', 'quotation'],
  },
  {
    intent: 'PRICING',
    keywords: ['price', 'pricing', 'cost', 'charge', 'rate', 'budget', 'packages', 'plans', 'starter', 'business plan', 'premium plan', 'rupees', 'inr', '7999', '14999', '24999'],
    phrases: [
      'how much does a website cost',
      'how much is a website',
      'what are your prices',
      'what is your pricing',
      'show me pricing',
      'see pricing',
      'website charges',
      'pricing plans',
      'how much do you charge',
      'cost of website',
      'affordable website',
    ],
    exactMatches: ['pricing', 'price', 'prices', 'cost', 'plans'],
  },
  {
    intent: 'PORTFOLIO',
    keywords: ['portfolio', 'work', 'projects', 'demos', 'examples', 'sample', 'clients', 'case studies', 'arabian', 'perfume', 'wellness', 'mgs', 'guntur'],
    phrases: [
      'see our work',
      'show your work',
      'show me examples',
      'show portfolio',
      'view demo',
      'previous projects',
      'what have you built',
      'perfume website',
      'show demo',
      'sample websites',
    ],
    exactMatches: ['portfolio', 'our work', 'see work', 'demos', 'examples'],
  },
  {
    intent: 'WEBSITE',
    keywords: ['website', 'webpage', 'site', 'redesign', 'web design', 'web development', 'develop', 'builder', 'creator', 'salon', 'restaurant', 'clothing', 'shop', 'store'],
    phrases: [
      'i need a website',
      'i want a website',
      'build me a website',
      'create website',
      'make a website',
      'redesign my website',
      'website for my business',
      'website for salon',
      'website for restaurant',
      'website for clothing store',
      'business website',
    ],
    exactMatches: ['website', 'websites', 'web design', 'web dev'],
  },
  {
    intent: 'SERVICES',
    keywords: ['service', 'services', 'offerings', 'capabilities', 'features', 'solutions', 'catalog', 'landing page'],
    phrases: [
      'what services do you provide',
      'what do you do',
      'what can golis do',
      'all services',
      'list of services',
      'digital solutions',
    ],
    exactMatches: ['services', 'all services', 'our services'],
  },
  {
    intent: 'WHATSAPP',
    keywords: ['whatsapp', 'ordering', 'chat', 'wa.me', 'direct order', 'lead gen', 'leads', 'automation', 'messaging'],
    phrases: [
      'whatsapp ordering',
      'whatsapp integration',
      'order on whatsapp',
      'chat on whatsapp',
      'whatsapp button',
      'whatsapp leads',
      'whatsapp automation',
      'can customers order through whatsapp',
    ],
    exactMatches: ['whatsapp', 'whatsapp ordering', 'whatsapp automation'],
  },
  {
    intent: 'SEO',
    keywords: ['seo', 'google', 'ranking', 'search engine', 'traffic', 'visibility', 'discoverable', 'optimization'],
    phrases: [
      'do you provide seo',
      'seo optimization',
      'google ranking',
      'search engine ranking',
      'seo ready',
      'will my site show on google',
      'help with seo',
    ],
    exactMatches: ['seo', 'google seo', 'search engine optimization'],
  },
  {
    intent: 'BOOKING',
    keywords: ['booking', 'appointment', 'reservation', 'table', 'schedule', 'slot', 'calendar'],
    phrases: [
      'appointment booking',
      'booking system',
      'table reservation',
      'i want a booking website',
      'can you build booking systems',
      'schedule appointments',
    ],
    exactMatches: ['booking', 'appointments', 'reservations'],
  },
  {
    intent: 'ECOMMERCE',
    keywords: ['ecommerce', 'e-commerce', 'online store', 'cart', 'checkout', 'payment gateway', 'products', 'sell online'],
    phrases: [
      'online store',
      'ecommerce website',
      'sell products online',
      'add products to website',
      'payment gateway',
      'shopping cart',
    ],
    exactMatches: ['ecommerce', 'e-commerce', 'shop', 'online store'],
  },
  {
    intent: 'ABOUT',
    keywords: ['about', 'golis', 'agency', 'company', 'team', 'who is', 'creator', 'tirumala', 'experience'],
    phrases: [
      'about golis',
      'who is golis',
      'tell me about your company',
      'why choose golis',
      'who made this',
    ],
    exactMatches: ['about', 'about us', 'about golis'],
  },
  {
    intent: 'CONTACT',
    keywords: ['contact', 'phone', 'email', 'call', 'reach', 'address', 'talk', 'support', 'number'],
    phrases: [
      'talk to golis',
      'contact details',
      'call golis',
      'how to contact you',
      'phone number',
      'email address',
      'speak with someone',
    ],
    exactMatches: ['contact', 'contact us', 'phone', 'call', 'talk to golis'],
  },
  {
    intent: 'FAQ',
    keywords: ['hosting', 'domain', 'time', 'duration', 'timeline', 'maintenance', 'android', 'app', 'update', 'mobile friendly'],
    phrases: [
      'how long does development take',
      'do i need hosting',
      'do you provide hosting',
      'do you provide maintenance',
      'can you build an android app',
      'can the website grow with my business',
      'do you build mobile friendly websites',
      'frequently asked questions',
    ],
    exactMatches: ['faq', 'faqs', 'help'],
  },
];

/**
 * Match user input text against known business intents.
 */
export function matchIntent(input: string): { intent: IntentType; confidence: number; matchedEntity?: string } {
  const normalized = input.trim().toLowerCase().replace(/[^\w\s]/g, ' ');
  const words = normalized.split(/\s+/).filter(Boolean);

  if (!words.length) {
    return { intent: 'UNKNOWN', confidence: 0 };
  }

  // 1. Exact match check
  for (const p of INTENT_PATTERNS) {
    if (p.exactMatches && p.exactMatches.some((em) => em.toLowerCase() === normalized)) {
      return { intent: p.intent, confidence: 1.0 };
    }
  }

  // Check specific business entities for WEBSITE intent
  if (normalized.includes('restaurant') || normalized.includes('cafe') || normalized.includes('food')) {
    return { intent: 'WEBSITE', confidence: 0.9, matchedEntity: 'restaurant' };
  }
  if (normalized.includes('salon') || normalized.includes('spa') || normalized.includes('parlour') || normalized.includes('beauty')) {
    return { intent: 'WEBSITE', confidence: 0.9, matchedEntity: 'salon' };
  }
  if (normalized.includes('cloth') || normalized.includes('fashion') || normalized.includes('apparel') || normalized.includes('boutique')) {
    return { intent: 'WEBSITE', confidence: 0.9, matchedEntity: 'clothing' };
  }
  if (normalized.includes('perfume') || normalized.includes('fragrance') || normalized.includes('attar') || normalized.includes('scent')) {
    return { intent: 'WEBSITE', confidence: 0.9, matchedEntity: 'perfume' };
  }
  if (normalized.includes('shop') || normalized.includes('store') || normalized.includes('retail') || normalized.includes('local business')) {
    return { intent: 'WEBSITE', confidence: 0.9, matchedEntity: 'local_shop' };
  }

  // 2. Phrase matching (high weight)
  let bestIntent: IntentType = 'UNKNOWN';
  let highestScore = 0;

  for (const p of INTENT_PATTERNS) {
    let score = 0;

    // Check full phrases
    for (const phrase of p.phrases) {
      if (normalized.includes(phrase.toLowerCase())) {
        score += 0.85;
      }
    }

    // Check individual keywords
    let keywordHits = 0;
    for (const kw of p.keywords) {
      if (words.includes(kw.toLowerCase())) {
        keywordHits++;
      } else if (normalized.includes(kw.toLowerCase())) {
        keywordHits += 0.5;
      }
    }

    if (p.keywords.length > 0) {
      score += Math.min(0.7, (keywordHits / Math.max(1, words.length)) * 1.2);
    }

    if (score > highestScore) {
      highestScore = score;
      bestIntent = p.intent;
    }
  }

  if (highestScore >= 0.4) {
    return { intent: bestIntent, confidence: Math.min(1, highestScore) };
  }

  return { intent: 'UNKNOWN', confidence: highestScore };
}
