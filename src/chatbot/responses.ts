import {
  SITE_CONFIG,
  PORTFOLIO_DATA,
  PRICING_DATA,
  FAQ_DATA,
} from '../config/site';
import type {
  ChatMessageData,
  QuickReplyOption,
  ConversationState,
  LeadData,
} from './conversation';
import {
  BUSINESS_RECOMMENDATIONS,
} from './conversation';

/**
 * Common Quick Replies
 */
export const MENU_QUICK_REPLIES: QuickReplyOption[] = [
  { id: 'opt_website', label: '🌐 Website', actionPayload: 'SELECT_SERVICE_WEBSITE' },
  { id: 'opt_pricing', label: '💰 Pricing', actionPayload: 'SELECT_PRICING' },
  { id: 'opt_portfolio', label: '🚀 See Our Work', actionPayload: 'SELECT_PORTFOLIO' },
  { id: 'opt_seo', label: '📈 SEO', actionPayload: 'SELECT_SEO' },
  { id: 'opt_whatsapp', label: '💬 WhatsApp Automation', actionPayload: 'SELECT_WHATSAPP' },
  { id: 'opt_quote', label: '📋 Get a Quote', actionPayload: 'SELECT_QUOTE' },
  { id: 'opt_contact', label: '📞 Talk to GOLIS', actionPayload: 'SELECT_CONTACT' },
];

export const BUSINESS_TYPE_OPTIONS: QuickReplyOption[] = [
  { id: 'biz_restaurant', label: '🍽️ Restaurant / Cafe', actionPayload: 'BIZ_restaurant' },
  { id: 'biz_salon', label: '💇 Salon / Spa', actionPayload: 'BIZ_salon' },
  { id: 'biz_clothing', label: '👗 Clothing Store', actionPayload: 'BIZ_clothing' },
  { id: 'biz_perfume', label: '🌸 Perfume Shop', actionPayload: 'BIZ_perfume' },
  { id: 'biz_local_shop', label: '🏪 Local Shop', actionPayload: 'BIZ_local_shop' },
  { id: 'biz_other', label: '✨ Other Business', actionPayload: 'BIZ_other' },
];

export const REQUIREMENT_OPTIONS: QuickReplyOption[] = [
  { id: 'req_catalog', label: '📦 View products/services', actionPayload: 'REQ_catalog' },
  { id: 'req_whatsapp', label: '💬 Contact on WhatsApp', actionPayload: 'REQ_whatsapp' },
  { id: 'req_booking', label: '📅 Book appointments', actionPayload: 'REQ_booking' },
  { id: 'req_leads', label: '📥 Receive enquiries', actionPayload: 'REQ_leads' },
  { id: 'req_orders', label: '🛒 Take orders', actionPayload: 'REQ_orders' },
  { id: 'req_showcase', label: '🌟 Showcase business', actionPayload: 'REQ_showcase' },
  { id: 'req_all', label: '⚡ All of these', actionPayload: 'REQ_all' },
];

let msgCounter = 0;
export function createMsgId(): string {
  msgCounter++;
  return `msg_${Date.now()}_${msgCounter}`;
}

/**
 * 1. Initial Welcome Message
 */
export function getWelcomeMessage(): ChatMessageData {
  return {
    id: createMsgId(),
    sender: 'bot',
    type: 'quick-reply',
    text: `Hi 👋\n\nI'm the **GOLIS Assistant**.\n\nI can help you explore our website solutions, transparent pricing, live client demos, and WhatsApp business automation.\n\nWhat are you looking for today?`,
    timestamp: Date.now(),
    options: MENU_QUICK_REPLIES,
  };
}

/**
 * 2. Website Flow — Ask Business Type
 */
export function getWebsitePromptMessage(): ChatMessageData {
  return {
    id: createMsgId(),
    sender: 'bot',
    type: 'quick-reply',
    text: `Great! A modern website is the most powerful growth engine for your business 🚀\n\nWhat type of business do you have?`,
    timestamp: Date.now(),
    options: BUSINESS_TYPE_OPTIONS,
  };
}

/**
 * 3. Requirement Discovery Prompt
 */
export function getRequirementDiscoveryMessage(businessType: string): ChatMessageData {
  const profile = BUSINESS_RECOMMENDATIONS[businessType] || BUSINESS_RECOMMENDATIONS.other;
  return {
    id: createMsgId(),
    sender: 'bot',
    type: 'quick-reply',
    text: `Perfect! We love helping **${profile.title}** businesses scale online.\n\nWhat is the primary action you want customers to take on your website?`,
    timestamp: Date.now(),
    options: REQUIREMENT_OPTIONS,
  };
}

/**
 * 4. Personalized Recommendation Message
 */
export function getRecommendationMessage(businessType: string, _requirements: string[]): ChatMessageData {
  const profile = BUSINESS_RECOMMENDATIONS[businessType] || BUSINESS_RECOMMENDATIONS.other;
  const featuresList = profile.features.map((f) => `✓ ${f}`).join('\n');

  const options: QuickReplyOption[] = [];
  if (profile.suggestedPortfolioId) {
    options.push({ id: 'rec_demo', label: '👀 See Live Demo', actionPayload: `VIEW_DEMO_${profile.suggestedPortfolioId}` });
  } else {
    options.push({ id: 'rec_demo', label: '🚀 See Our Work', actionPayload: 'SELECT_PORTFOLIO' });
  }
  options.push({ id: 'rec_pricing', label: '💰 See Pricing', actionPayload: 'SELECT_PRICING' });
  options.push({ id: 'rec_quote', label: '📋 Get a Quote', actionPayload: 'SELECT_QUOTE' });
  options.push({ id: 'rec_whatsapp', label: '💬 Talk on WhatsApp', actionPayload: 'HANDOFF_WHATSAPP' });
  options.push({ id: 'rec_menu', label: '🏠 Main Menu', actionPayload: 'ACTION_RESET' });

  return {
    id: createMsgId(),
    sender: 'bot',
    type: 'quick-reply',
    text: `For a **${profile.title}**, GOLIS can engineer a high-speed website where customers can:\n\n${featuresList}\n\n💡 **Recommended Plan:** ${profile.recommendedPlan} package (fast delivery in 7–14 days).\n\nWould you like to explore a live example, check pricing, or get a custom quotation?`,
    timestamp: Date.now(),
    options,
  };
}

/**
 * 5. Pricing Message (Reads directly from site.ts)
 */
export function getPricingMessage(): ChatMessageData {
  const items = PRICING_DATA.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    priceNote: p.priceNote,
    popular: p.popular,
    features: p.features,
    ctaVariant: p.ctaVariant,
  }));

  return {
    id: createMsgId(),
    sender: 'bot',
    type: 'pricing',
    text: `Here are our transparent pricing packages with no hidden fees:`,
    timestamp: Date.now(),
    pricingItems: items,
    options: [
      { id: 'pr_quote', label: '📋 Get a Custom Quote', actionPayload: 'SELECT_QUOTE' },
      { id: 'pr_work', label: '🚀 View Demos', actionPayload: 'SELECT_PORTFOLIO' },
      { id: 'pr_whatsapp', label: '💬 Discuss on WhatsApp', actionPayload: 'HANDOFF_WHATSAPP' },
      { id: 'pr_menu', label: '🏠 Main Menu', actionPayload: 'ACTION_RESET' },
    ],
  };
}

/**
 * 6. Portfolio Flow (Reads directly from site.ts)
 */
export function getPortfolioMessage(selectedId?: string): ChatMessageData {
  const filtered = selectedId
    ? PORTFOLIO_DATA.filter((p) => p.id === selectedId)
    : PORTFOLIO_DATA;

  const items = (filtered.length ? filtered : PORTFOLIO_DATA).map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    description: p.description,
    tags: p.tags,
    features: p.features,
    url: p.url,
    accent: p.accent,
  }));

  return {
    id: createMsgId(),
    sender: 'bot',
    type: 'portfolio',
    text: selectedId
      ? `Here is the featured client demo you requested:`
      : `Explore some of our recent client web projects and interactive applications:`,
    timestamp: Date.now(),
    portfolioItems: items,
    options: [
      { id: 'pf_quote', label: '📋 Build Something Similar', actionPayload: 'SELECT_QUOTE' },
      { id: 'pf_pricing', label: '💰 Check Pricing', actionPayload: 'SELECT_PRICING' },
      { id: 'pf_menu', label: '🏠 Main Menu', actionPayload: 'ACTION_RESET' },
    ],
  };
}

/**
 * 7. SEO Information Message
 */
export function getSEOMessage(): ChatMessageData {
  return {
    id: createMsgId(),
    sender: 'bot',
    type: 'quick-reply',
    text: `📈 **Google SEO & Search Discoverability at GOLIS**\n\nEvery website we build comes standard with:\n\n• **Clean Semantic HTML5**: Structured data that Google bots can read effortlessly.\n• **Meta Tags & Social OpenGraph**: Custom title tags, descriptions, and shareable preview images.\n• **High PageSpeed Score**: Sub-second load times that rank higher on search algorithms.\n• **Automated Sitemap & Robots.txt**: Pre-configured search indexing files.\n• **Google Search Console & Maps Setup**: Assistance with local Google business ranking.\n\nWant to make sure your customers find you first on Google?`,
    timestamp: Date.now(),
    options: [
      { id: 'seo_quote', label: '📋 Get SEO-Ready Website', actionPayload: 'SELECT_QUOTE' },
      { id: 'seo_pricing', label: '💰 See Pricing Plans', actionPayload: 'SELECT_PRICING' },
      { id: 'seo_menu', label: '🏠 Main Menu', actionPayload: 'ACTION_RESET' },
    ],
  };
}

/**
 * 8. WhatsApp Automation Message
 */
export function getWhatsAppAutomationMessage(): ChatMessageData {
  return {
    id: createMsgId(),
    sender: 'bot',
    type: 'quick-reply',
    text: `💬 **WhatsApp Business Automation & Instant Lead Generation**\n\nInstead of complicated checkout processes or ignored emails, we connect your website directly to WhatsApp:\n\n• **Instant Product Inquiries**: Customers click a product and it opens WhatsApp with the exact item name pre-filled.\n• **1-Click Ordering**: Order carts forwarded straight to your WhatsApp business chat.\n• **Direct Floating Chat Button**: Visitors can instantly message you from any page.\n• **Zero Platform Commissions**: You own the customer relationship directly.\n\nWould you like WhatsApp integration on your website?`,
    timestamp: Date.now(),
    options: [
      { id: 'wa_quote', label: '📋 Build with WhatsApp', actionPayload: 'SELECT_QUOTE' },
      { id: 'wa_demo', label: '👀 See Perfume Lab Demo', actionPayload: 'VIEW_DEMO_arabian-perfume-lab' },
      { id: 'wa_menu', label: '🏠 Main Menu', actionPayload: 'ACTION_RESET' },
    ],
  };
}

/**
 * 9. FAQ / Generic Answer
 */
export function getFAQAnswerMessage(query: string): ChatMessageData {
  const norm = query.toLowerCase();
  const matched = FAQ_DATA.find(
    (f) =>
      norm.includes(f.q.toLowerCase()) ||
      f.q.toLowerCase().includes(norm) ||
      f.a.toLowerCase().includes(norm)
  );

  if (matched) {
    return {
      id: createMsgId(),
      sender: 'bot',
      type: 'quick-reply',
      text: `**${matched.q}**\n\n${matched.a}`,
      timestamp: Date.now(),
      options: [
        { id: 'faq_quote', label: '📋 Get a Quote', actionPayload: 'SELECT_QUOTE' },
        { id: 'faq_pricing', label: '💰 View Pricing', actionPayload: 'SELECT_PRICING' },
        { id: 'faq_contact', label: '📞 Talk to GOLIS', actionPayload: 'SELECT_CONTACT' },
        { id: 'faq_menu', label: '🏠 Main Menu', actionPayload: 'ACTION_RESET' },
      ],
    };
  }

  // General fallback FAQ summary
  return {
    id: createMsgId(),
    sender: 'bot',
    type: 'quick-reply',
    text: `Here are some quick facts about working with GOLIS:\n\n• **Delivery Timeline**: 7–14 working days for business websites.\n• **Starting Price**: ₹7,999 (Starter 5-page package).\n• **Scalability**: Can seamlessly add ordering, booking, and app transitions later.\n• **Support**: Ongoing maintenance and updates provided.`,
    timestamp: Date.now(),
    options: [
      { id: 'faq_more_pricing', label: '💰 Pricing Plans', actionPayload: 'SELECT_PRICING' },
      { id: 'faq_more_quote', label: '📋 Request Quote', actionPayload: 'SELECT_QUOTE' },
      { id: 'faq_more_menu', label: '🏠 Main Menu', actionPayload: 'ACTION_RESET' },
    ],
  };
}

/**
 * 10. Contact / Talk to GOLIS
 */
export function getContactMessage(): ChatMessageData {
  return {
    id: createMsgId(),
    sender: 'bot',
    type: 'quick-reply',
    text: `📞 **Contact GOLIS Directly**\n\nWe're always excited to discuss new digital projects:\n\n• **Phone / WhatsApp**: ${SITE_CONFIG.contact.phone}\n• **Email**: ${SITE_CONFIG.contact.email}\n• **Working Hours**: Monday – Saturday (9 AM – 7 PM IST)\n\nYou can click below to chat with us immediately on WhatsApp or request a detailed proposal.`,
    timestamp: Date.now(),
    options: [
      { id: 'cnt_wa', label: '💬 Open WhatsApp Chat', actionPayload: 'HANDOFF_WHATSAPP' },
      { id: 'cnt_quote', label: '📋 Fill Quote Request', actionPayload: 'SELECT_QUOTE' },
      { id: 'cnt_menu', label: '🏠 Main Menu', actionPayload: 'ACTION_RESET' },
    ],
  };
}

/**
 * 11. Lead Capture Form Prompt
 */
export function getLeadFormMessage(): ChatMessageData {
  return {
    id: createMsgId(),
    sender: 'bot',
    type: 'lead-form',
    text: `Let's get your project started! Fill in the quick details below, and we'll craft a personalized proposal and forward it directly to our team:`,
    timestamp: Date.now(),
  };
}

/**
 * 12. Lead Completed / WhatsApp Redirection
 */
export function getLeadSuccessMessage(lead: LeadData, whatsappUrl: string): ChatMessageData {
  return {
    id: createMsgId(),
    sender: 'bot',
    type: 'quick-reply',
    text: `🎉 Thank you, **${lead.name}**!\n\nYour requirements for **${lead.businessName}** (${lead.businessType}) have been prepared.\n\nClick the button below to send your quotation summary directly to our development team on WhatsApp for instant confirmation.`,
    timestamp: Date.now(),
    metadata: { lead, whatsappUrl },
    options: [
      { id: 'lead_send_wa', label: '🟢 Send via WhatsApp Now', actionPayload: `OPEN_URL_${whatsappUrl}` },
      { id: 'lead_reset', label: '🏠 Main Menu', actionPayload: 'ACTION_RESET' },
    ],
  };
}

/**
 * 13. Unknown Intent Fallback
 */
export function getUnknownIntentMessage(): ChatMessageData {
  return {
    id: createMsgId(),
    sender: 'bot',
    type: 'quick-reply',
    text: `I'm not completely sure what you're looking for, but I'd love to assist you!\n\nYou can explore our services, inspect pricing packages, review portfolio demos, or request an instant quotation:`,
    timestamp: Date.now(),
    options: MENU_QUICK_REPLIES,
  };
}

/**
 * 14. Helper to construct context-aware WhatsApp URL
 */
export function buildContextualWhatsAppUrl(state: ConversationState, lead?: Partial<LeadData>): string {
  const number = SITE_CONFIG.contact.whatsapp.replace(/\D/g, '');
  let text = `Hi GOLIS,\n\nI would like to discuss a website for my business.\n\n`;

  if (lead?.name) {
    text += `Name: ${lead.name}\n`;
  }
  if (lead?.businessName) {
    text += `Business: ${lead.businessName}\n`;
  }
  if (lead?.businessType || state.businessType) {
    const bType = lead?.businessType || state.businessType || '';
    const bProfile = BUSINESS_RECOMMENDATIONS[bType];
    text += `Business Type: ${bProfile ? bProfile.title : bType}\n`;
  }
  if (lead?.requirements || (state.requirements && state.requirements.length > 0)) {
    text += `Requirements: ${lead?.requirements || state.requirements?.join(', ')}\n`;
  }
  if (lead?.budget) {
    text += `Budget: ${lead.budget}\n`;
  }
  if (lead?.phone) {
    text += `Phone: ${lead.phone}\n`;
  }
  if (lead?.email) {
    text += `Email: ${lead.email}\n`;
  }
  if (lead?.additionalNotes) {
    text += `Notes: ${lead.additionalNotes}\n`;
  }

  text += `\nPlease share the available options and project timeline.`;

  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
