export interface QuickReplyOption {
  id: string;
  label: string;
  icon?: string;
  actionPayload?: string;
}

export interface PortfolioCardItem {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: readonly string[];
  features: readonly string[];
  url?: string;
  accent?: string;
}

export interface PricingCardItem {
  id: string;
  name: string;
  price: string;
  priceNote: string;
  popular?: boolean;
  features: readonly string[];
  ctaVariant?: 'solid' | 'outline';
}

export type MessageType =
  | 'bot'
  | 'user'
  | 'quick-reply'
  | 'card'
  | 'lead-form'
  | 'portfolio'
  | 'pricing';

export interface ChatMessageData {
  id: string;
  sender: 'bot' | 'user';
  type: MessageType;
  text?: string;
  timestamp: number;
  options?: QuickReplyOption[];
  portfolioItems?: PortfolioCardItem[];
  pricingItems?: PricingCardItem[];
  metadata?: Record<string, unknown>;
}

export interface LeadData {
  name: string;
  businessName: string;
  phone: string;
  email?: string;
  businessType: string;
  requirements: string;
  budget?: string;
  additionalNotes?: string;
}

export interface ConversationState {
  currentStep: string;
  businessType?: string;
  service?: string;
  requirements?: string[];
  lead?: Partial<LeadData>;
  history: string[];
}

export const INITIAL_CONVERSATION_STATE: ConversationState = {
  currentStep: 'WELCOME',
  requirements: [],
  lead: {},
  history: [],
};

// Analytics helper abstraction
export type ChatbotAnalyticsEvent =
  | 'chat_opened'
  | 'chat_closed'
  | 'service_selected'
  | 'business_type_selected'
  | 'pricing_viewed'
  | 'portfolio_viewed'
  | 'lead_started'
  | 'lead_completed'
  | 'whatsapp_clicked'
  | 'quick_reply_clicked'
  | 'intent_matched';

export function trackChatbotEvent(event: ChatbotAnalyticsEvent, payload?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && (window as unknown as { __GOLIS_ANALYTICS__?: (e: string, p?: unknown) => void }).__GOLIS_ANALYTICS__) {
    (window as unknown as { __GOLIS_ANALYTICS__: (e: string, p?: unknown) => void }).__GOLIS_ANALYTICS__(event, payload);
  }
}

// Business recommendation profiles
export interface BusinessProfileRecommendation {
  type: string;
  title: string;
  summary: string;
  features: string[];
  recommendedPlan: string;
  suggestedPortfolioId?: string;
}

export const BUSINESS_RECOMMENDATIONS: Record<string, BusinessProfileRecommendation> = {
  restaurant: {
    type: 'restaurant',
    title: 'Restaurant & Cafe',
    summary: 'A mouthwatering web presence that drives table reservations and direct WhatsApp orders without platform commissions.',
    features: [
      'Digital interactive menu',
      'Food & ambiance gallery',
      'Table reservation system',
      'Direct WhatsApp food ordering',
      'Google Maps & location finder',
      'Promotional offers & customer reviews',
      'Mobile-first responsive design',
    ],
    recommendedPlan: 'Business',
  },
  salon: {
    type: 'salon',
    title: 'Salon & Spa / Beauty',
    summary: 'An elegant digital storefront to showcase transformations, staff portfolios, and book appointments seamlessly.',
    features: [
      'Service catalog with transparent pricing',
      'Before & after work gallery',
      'Online appointment booking flow',
      'Staff & stylist profiles',
      'Exclusive package offers',
      'Instant WhatsApp enquiry button',
      'Instagram feed integration & location maps',
    ],
    recommendedPlan: 'Business',
  },
  clothing: {
    type: 'clothing',
    title: 'Clothing & Fashion Store',
    summary: 'A stylish lookbook and product catalog with instant WhatsApp ordering and look collections.',
    features: [
      'Visual product catalog with categories',
      'High-res product images & size guides',
      'New arrivals & discount badges',
      'Instant WhatsApp ordering per item',
      'Instagram lookbook integration',
      'Store location & visit directions',
      'Mobile-optimized touch-friendly experience',
    ],
    recommendedPlan: 'Business',
  },
  perfume: {
    type: 'perfume',
    title: 'Perfume & Fragrance Brand',
    summary: 'A luxurious digital presence with fragrance notes, bottle sizes, and direct customer consultations via WhatsApp.',
    features: [
      'Premium product catalog with fragrance profiles',
      'Bottle volume options (e.g. 50ml / 100ml) & pricing',
      'Customer reviews & bestsellers highlight',
      'WhatsApp enquiry & direct ordering',
      'Luxury mobile-first aesthetic',
      'Social links & brand story presentation',
    ],
    recommendedPlan: 'Business',
    suggestedPortfolioId: 'arabian-perfume-lab',
  },
  local_shop: {
    type: 'local_shop',
    title: 'Local Retail / Store',
    summary: 'Put your local store on the map so nearby customers can discover products, timings, and chat directly.',
    features: [
      'Comprehensive store & business information',
      'Product/service catalog showcase',
      'One-tap WhatsApp enquiry & quick calling',
      'Google Maps navigation & opening hours',
      'Current deals & festive offers',
      'Contact form & customer testimonials',
    ],
    recommendedPlan: 'Starter',
  },
  wellness: {
    type: 'wellness',
    title: 'Healthcare, Clinic & Wellness',
    summary: 'Professional and trust-inspiring portal with health assessments, doctor profiles, and booking.',
    features: [
      'Health assessment / interactive survey flow',
      'Doctor & specialist qualifications',
      'Appointment scheduling & WhatsApp consults',
      'Patient testimonials & service overview',
      'Clean, accessible medical-grade UI',
    ],
    recommendedPlan: 'Premium',
    suggestedPortfolioId: 'wellness-survey',
  },
  other: {
    type: 'other',
    title: 'Custom Business Solution',
    summary: 'Tailor-made digital solution engineered specifically for your unique business goals and workflows.',
    features: [
      'Custom website architecture',
      'Lead capture & enquiry pipelines',
      'WhatsApp integration & CRM readiness',
      'Speed optimization & Google SEO ready',
      'Scalable framework for future dashboards/apps',
    ],
    recommendedPlan: 'Premium',
  },
};
