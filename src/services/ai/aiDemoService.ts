/**
 * GOLIS AI Demo Service
 *
 * Mock service for AI demo interactions.
 * Architecture is designed so real AI API calls can be
 * wired in through a backend API layer without changing UI components.
 *
 * Frontend -> GOLIS Backend API -> AI Provider / MCP / Database / APIs
 * Never expose API keys in this file or any frontend code.
 */

export type DemoType = 'chat' | 'sales' | 'lead' | 'business';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface DemoConfig {
  type: DemoType;
  systemPrompt: string;
  welcomeMessage: string;
  suggestedQuestions: string[];
}

const DEMO_CONFIGS: Record<DemoType, DemoConfig> = {
  chat: {
    type: 'chat',
    systemPrompt: 'You are a helpful AI assistant for a business website.',
    welcomeMessage:
      "Hi! I'm the AI assistant for this business. How can I help you today?",
    suggestedQuestions: [
      'What services do you offer?',
      'What are your business hours?',
      'How do I contact you?',
    ],
  },
  sales: {
    type: 'sales',
    systemPrompt: 'You are an AI sales assistant helping customers find the right product.',
    welcomeMessage:
      "Hello! I can help you find exactly what you're looking for. What product or service are you interested in?",
    suggestedQuestions: [
      'Show me your products',
      'I need something under ₹1,000',
      'What are your best sellers?',
    ],
  },
  lead: {
    type: 'lead',
    systemPrompt: 'You are an AI lead qualification agent.',
    welcomeMessage:
      "Hello! I'd love to learn about your business needs. What kind of solution are you looking for?",
    suggestedQuestions: [
      'I need a website',
      'I want to automate WhatsApp',
      'Tell me about AI solutions',
    ],
  },
  business: {
    type: 'business',
    systemPrompt: 'You are an internal AI business assistant.',
    welcomeMessage:
      "Hi! I'm your AI business assistant. I can help answer questions about your business operations. What would you like to know?",
    suggestedQuestions: [
      'How many leads did we get this week?',
      'What are our top products?',
      'Show me recent orders',
    ],
  },
};

// Mock AI responses for demo purposes
const MOCK_RESPONSES: Record<DemoType, (input: string) => string> = {
  chat: (input) => {
    const lower = input.toLowerCase();
    if (lower.includes('hour') || lower.includes('open'))
      return 'We are open Monday to Saturday, 10 AM to 7 PM. You can also reach us anytime via WhatsApp for enquiries.';
    if (lower.includes('contact') || lower.includes('phone') || lower.includes('whatsapp'))
      return 'You can contact us via WhatsApp, phone or through our enquiry form. Our team usually responds within a few hours.';
    if (lower.includes('service') || lower.includes('offer'))
      return 'We offer a range of services tailored to your business needs. Would you like to speak with our team directly for a personalised recommendation?';
    if (lower.includes('price') || lower.includes('cost'))
      return 'Pricing depends on your specific requirements. Would you like to share a few details so we can give you an accurate quote?';
    return "Thank you for your message! Our team will get back to you shortly. Would you like to leave your contact details?";
  },
  sales: (input) => {
    const lower = input.toLowerCase();
    if (lower.includes('gold') || lower.includes('jewel'))
      return "I found several matching items in our gold jewellery collection. Our 1-gram gold earrings start from ₹4,200. Would you like to see the full range? I can also send you our catalogue on WhatsApp.";
    if (lower.includes('perfume') || lower.includes('fragrance'))
      return "Great choice! For long-lasting fragrances under ₹1,000, I recommend our Oriental Musk collection. These are our best sellers in that range. Shall I send you the product details?";
    if (lower.includes('price') || lower.includes('under') || lower.includes('budget'))
      return "I can filter our products by your budget. What is your price range? I will show you the best options available.";
    return "Let me help you find the perfect product. Could you tell me more about what you are looking for — occasion, preference or budget?";
  },
  lead: (input) => {
    const lower = input.toLowerCase();
    if (lower.includes('website'))
      return "A new website would be a great step for your business. To give you the best recommendation, could you tell me: what type of business do you have, and do you have an existing website?";
    if (lower.includes('whatsapp') || lower.includes('automate'))
      return "WhatsApp automation can save significant time for businesses. How many customer enquiries do you typically receive on WhatsApp each day?";
    if (lower.includes('ai') || lower.includes('chatbot'))
      return "AI solutions can transform how your business operates. GOLIS builds custom AI assistants, chatbots and automation. What aspect of your business would you most like to automate?";
    if (lower.includes('name') || lower.includes('call'))
      return "I would be happy to have someone from our team call you. Could you share your name and the best time to reach you?";
    return "That sounds like an interesting project. To help connect you with the right GOLIS solution, could you tell me a bit more about your business?";
  },
  business: (input) => {
    const lower = input.toLowerCase();
    if (lower.includes('lead') || lower.includes('enquir'))
      return "This week you received 23 new leads — up 15% from last week. The top source is WhatsApp (12), followed by the website contact form (7) and Instagram (4).";
    if (lower.includes('product') || lower.includes('best seller'))
      return "Your top 3 products this month are: 1. Gold Earrings 22KT (34 enquiries), 2. Diamond Pendant Set (28 enquiries), 3. Silver Bangles (19 enquiries).";
    if (lower.includes('order'))
      return "You have 8 pending orders, 3 orders awaiting confirmation and 15 orders fulfilled this week.";
    return "I can access your business data to help answer that. This is a demonstration of how an AI business assistant would work once connected to your actual business systems.";
  },
};

/**
 * Simulates an AI response with a realistic typing delay.
 * Replace this function body with a real backend API call in production.
 */
export async function getDemoResponse(
  demoType: DemoType,
  userMessage: string
): Promise<string> {
  // Simulate network delay (500ms–1500ms)
  const delay = 600 + Math.random() * 700;
  await new Promise((resolve) => setTimeout(resolve, delay));

  const respFn = MOCK_RESPONSES[demoType];
  return respFn(userMessage);
}

export function getDemoConfig(demoType: DemoType): DemoConfig {
  return DEMO_CONFIGS[demoType];
}

export function createMessage(role: 'user' | 'assistant', content: string): ChatMessage {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    role,
    content,
    timestamp: new Date(),
  };
}
