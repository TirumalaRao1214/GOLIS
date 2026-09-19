import type {
  ChatMessageData,
  ConversationState,
  LeadData,
} from './conversation';
import {
  INITIAL_CONVERSATION_STATE,
  trackChatbotEvent,
} from './conversation';
import type { IntentType } from './intents';
import { matchIntent } from './intents';
import {
  createMsgId,
  getWelcomeMessage,
  getWebsitePromptMessage,
  getRequirementDiscoveryMessage,
  getRecommendationMessage,
  getPricingMessage,
  getPortfolioMessage,
  getSEOMessage,
  getWhatsAppAutomationMessage,
  getFAQAnswerMessage,
  getContactMessage,
  getLeadFormMessage,
  getLeadSuccessMessage,
  getUnknownIntentMessage,
  buildContextualWhatsAppUrl,
} from './responses';

export interface ChatbotEngineResult {
  reply: ChatMessageData;
  nextState: ConversationState;
}

export class ChatbotEngine {
  /**
   * Process user free text input
   */
  public processUserInput(
    input: string,
    currentState: ConversationState
  ): ChatbotEngineResult {
    const trimmed = input.trim();
    const { intent, matchedEntity } = matchIntent(trimmed);

    trackChatbotEvent('intent_matched', { intent, query: trimmed });

    return this.resolveIntent(intent, currentState, trimmed, matchedEntity);
  }

  /**
   * Process interactive quick-reply button clicks
   */
  public processAction(
    actionPayload: string,
    currentState: ConversationState
  ): ChatbotEngineResult {
    trackChatbotEvent('quick_reply_clicked', { actionPayload });

    // Handle Reset
    if (actionPayload === 'ACTION_RESET') {
      return {
        reply: getWelcomeMessage(),
        nextState: { ...INITIAL_CONVERSATION_STATE, currentStep: 'WELCOME' },
      };
    }

    // Handle Service Navigation
    if (actionPayload === 'SELECT_SERVICE_WEBSITE') {
      trackChatbotEvent('service_selected', { service: 'website' });
      return {
        reply: getWebsitePromptMessage(),
        nextState: {
          ...currentState,
          service: 'website',
          currentStep: 'AWAITING_BUSINESS_TYPE',
        },
      };
    }

    // Handle Business Type Selection
    if (actionPayload.startsWith('BIZ_')) {
      const businessType = actionPayload.replace('BIZ_', '');
      trackChatbotEvent('business_type_selected', { businessType });
      return {
        reply: getRequirementDiscoveryMessage(businessType),
        nextState: {
          ...currentState,
          businessType,
          currentStep: 'AWAITING_REQUIREMENTS',
        },
      };
    }

    // Handle Requirements Selection
    if (actionPayload.startsWith('REQ_')) {
      const reqId = actionPayload.replace('REQ_', '');
      const prevReqs = currentState.requirements || [];
      const updatedReqs = Array.from(new Set([...prevReqs, reqId]));
      const bType = currentState.businessType || 'other';

      return {
        reply: getRecommendationMessage(bType, updatedReqs),
        nextState: {
          ...currentState,
          requirements: updatedReqs,
          currentStep: 'RECOMMENDATION_SHOWN',
        },
      };
    }

    // Handle Pricing
    if (actionPayload === 'SELECT_PRICING') {
      trackChatbotEvent('pricing_viewed');
      return {
        reply: getPricingMessage(),
        nextState: { ...currentState, currentStep: 'PRICING_SHOWN' },
      };
    }

    // Handle Portfolio / Demos
    if (actionPayload === 'SELECT_PORTFOLIO') {
      trackChatbotEvent('portfolio_viewed');
      return {
        reply: getPortfolioMessage(),
        nextState: { ...currentState, currentStep: 'PORTFOLIO_SHOWN' },
      };
    }

    if (actionPayload.startsWith('VIEW_DEMO_')) {
      const demoId = actionPayload.replace('VIEW_DEMO_', '');
      trackChatbotEvent('portfolio_viewed', { demoId });
      return {
        reply: getPortfolioMessage(demoId),
        nextState: { ...currentState, currentStep: 'PORTFOLIO_SHOWN' },
      };
    }

    // Handle SEO
    if (actionPayload === 'SELECT_SEO') {
      return {
        reply: getSEOMessage(),
        nextState: { ...currentState, currentStep: 'SEO_SHOWN' },
      };
    }

    // Handle WhatsApp automation explanation
    if (actionPayload === 'SELECT_WHATSAPP') {
      return {
        reply: getWhatsAppAutomationMessage(),
        nextState: { ...currentState, currentStep: 'WHATSAPP_SHOWN' },
      };
    }

    // Handle Quote Request
    if (actionPayload === 'SELECT_QUOTE') {
      trackChatbotEvent('lead_started');
      return {
        reply: getLeadFormMessage(),
        nextState: { ...currentState, currentStep: 'LEAD_FORM_ACTIVE' },
      };
    }

    // Handle Contact
    if (actionPayload === 'SELECT_CONTACT') {
      return {
        reply: getContactMessage(),
        nextState: { ...currentState, currentStep: 'CONTACT_SHOWN' },
      };
    }

    // Handle direct WhatsApp handoff
    if (actionPayload === 'HANDOFF_WHATSAPP') {
      trackChatbotEvent('whatsapp_clicked');
      const waUrl = buildContextualWhatsAppUrl(currentState, currentState.lead);
      if (typeof window !== 'undefined') {
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      }
      return {
        reply: {
          id: createMsgId(),
          sender: 'bot',
          type: 'quick-reply',
          text: `I have prepared your WhatsApp link and opened it in a new window. If it didn't open automatically, click below:`,
          timestamp: Date.now(),
          options: [
            { id: 'reopen_wa', label: '🟢 Open WhatsApp', actionPayload: `OPEN_URL_${waUrl}` },
            { id: 'wa_menu', label: '🏠 Main Menu', actionPayload: 'ACTION_RESET' },
          ],
        },
        nextState: currentState,
      };
    }

    // Handle direct URL opening
    if (actionPayload.startsWith('OPEN_URL_')) {
      const url = actionPayload.replace('OPEN_URL_', '');
      if (typeof window !== 'undefined') {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
      return {
        reply: {
          id: createMsgId(),
          sender: 'bot',
          type: 'quick-reply',
          text: `Opening link for you! How else can I help?`,
          timestamp: Date.now(),
          options: [
            { id: 'url_pricing', label: '💰 View Pricing', actionPayload: 'SELECT_PRICING' },
            { id: 'url_quote', label: '📋 Get a Quote', actionPayload: 'SELECT_QUOTE' },
            { id: 'url_menu', label: '🏠 Main Menu', actionPayload: 'ACTION_RESET' },
          ],
        },
        nextState: currentState,
      };
    }

    // Fallback
    return {
      reply: getUnknownIntentMessage(),
      nextState: currentState,
    };
  }

  /**
   * Process Lead Form Submission
   */
  public processLeadSubmission(
    lead: LeadData,
    currentState: ConversationState
  ): ChatbotEngineResult {
    trackChatbotEvent('lead_completed', { lead });
    const waUrl = buildContextualWhatsAppUrl(currentState, lead);

    return {
      reply: getLeadSuccessMessage(lead, waUrl),
      nextState: {
        ...currentState,
        lead,
        currentStep: 'LEAD_SUBMITTED',
      },
    };
  }

  /**
   * Internal intent resolver
   */
  private resolveIntent(
    intent: IntentType,
    state: ConversationState,
    query: string,
    matchedEntity?: string
  ): ChatbotEngineResult {
    switch (intent) {
      case 'RESET':
        return {
          reply: getWelcomeMessage(),
          nextState: { ...INITIAL_CONVERSATION_STATE, currentStep: 'WELCOME' },
        };

      case 'WELCOME':
        return {
          reply: getWelcomeMessage(),
          nextState: { ...state, currentStep: 'WELCOME' },
        };

      case 'WEBSITE':
        if (matchedEntity) {
          trackChatbotEvent('business_type_selected', { businessType: matchedEntity });
          return {
            reply: getRequirementDiscoveryMessage(matchedEntity),
            nextState: {
              ...state,
              businessType: matchedEntity,
              currentStep: 'AWAITING_REQUIREMENTS',
            },
          };
        }
        return {
          reply: getWebsitePromptMessage(),
          nextState: { ...state, currentStep: 'AWAITING_BUSINESS_TYPE' },
        };

      case 'SERVICES':
        return {
          reply: {
            id: createMsgId(),
            sender: 'bot',
            type: 'quick-reply',
            text: `At GOLIS, we specialize in high-performance digital development:\n\n• **Business Websites**: Fast, responsive, credibility-building sites.\n• **Website Redesigns**: Modernizing legacy websites.\n• **Product Catalogs**: High-impact showcases for physical or digital products.\n• **Landing Pages**: High-conversion campaign pages.\n• **WhatsApp Automation**: 1-click customer inquiries and ordering.\n• **Business Systems**: Booking, dashboards, and scalable architectures.\n\nWhich solution interests you?`,
            timestamp: Date.now(),
            options: [
              { id: 'srv_web', label: '🌐 Business Website', actionPayload: 'SELECT_SERVICE_WEBSITE' },
              { id: 'srv_price', label: '💰 View Pricing', actionPayload: 'SELECT_PRICING' },
              { id: 'srv_demo', label: '🚀 View Demos', actionPayload: 'SELECT_PORTFOLIO' },
              { id: 'srv_quote', label: '📋 Get a Quote', actionPayload: 'SELECT_QUOTE' },
            ],
          },
          nextState: { ...state, currentStep: 'SERVICES_SHOWN' },
        };

      case 'PRICING':
        trackChatbotEvent('pricing_viewed');
        return {
          reply: getPricingMessage(),
          nextState: { ...state, currentStep: 'PRICING_SHOWN' },
        };

      case 'PORTFOLIO':
        trackChatbotEvent('portfolio_viewed');
        return {
          reply: getPortfolioMessage(),
          nextState: { ...state, currentStep: 'PORTFOLIO_SHOWN' },
        };

      case 'SEO':
        return {
          reply: getSEOMessage(),
          nextState: { ...state, currentStep: 'SEO_SHOWN' },
        };

      case 'WHATSAPP':
        return {
          reply: getWhatsAppAutomationMessage(),
          nextState: { ...state, currentStep: 'WHATSAPP_SHOWN' },
        };

      case 'BOOKING':
        return {
          reply: {
            id: createMsgId(),
            sender: 'bot',
            type: 'quick-reply',
            text: `📅 **Custom Appointment & Reservation Systems**\n\nWe build custom booking workflows for salons, clinics, consultants, and restaurants:\n\n• Automated slot booking\n• SMS / WhatsApp booking confirmations\n• Google Calendar sync\n• Mobile responsive customer flow\n\nWould you like a tailored quote for your booking website?`,
            timestamp: Date.now(),
            options: [
              { id: 'bk_quote', label: '📋 Request Booking Quote', actionPayload: 'SELECT_QUOTE' },
              { id: 'bk_wa', label: '💬 Chat on WhatsApp', actionPayload: 'HANDOFF_WHATSAPP' },
              { id: 'bk_menu', label: '🏠 Main Menu', actionPayload: 'ACTION_RESET' },
            ],
          },
          nextState: { ...state, currentStep: 'BOOKING_SHOWN' },
        };

      case 'ECOMMERCE':
        return {
          reply: {
            id: createMsgId(),
            sender: 'bot',
            type: 'quick-reply',
            text: `🛒 **Product Catalogs & Online Commerce**\n\nWe build lightweight, ultra-fast online catalogs and commerce websites that convert visitors into paying customers:\n\n• Dynamic product catalogs with categories & search\n• Instant WhatsApp direct orders (zero platform commissions)\n• Secure payment gateways (Razorpay, Stripe, UPI)\n• Admin inventory & product management\n\nWould you like to build an online store?`,
            timestamp: Date.now(),
            options: [
              { id: 'ecom_quote', label: '📋 Get Store Quote', actionPayload: 'SELECT_QUOTE' },
              { id: 'ecom_demo', label: '👀 View Perfume Demo', actionPayload: 'VIEW_DEMO_arabian-perfume-lab' },
              { id: 'ecom_pricing', label: '💰 Check Pricing', actionPayload: 'SELECT_PRICING' },
            ],
          },
          nextState: { ...state, currentStep: 'ECOMMERCE_SHOWN' },
        };

      case 'ABOUT':
        return {
          reply: {
            id: createMsgId(),
            sender: 'bot',
            type: 'quick-reply',
            text: `🏢 **About GOLIS**\n\nGOLIS is a dedicated digital development and technology agency based in Guntur, Andhra Pradesh, founded by Tirumala Rao Goli.\n\nWe build high-performance, responsive websites and scalable software tailored to help local and growing businesses stand out and capture more customers.`,
            timestamp: Date.now(),
            options: [
              { id: 'ab_work', label: '🚀 See Our Work', actionPayload: 'SELECT_PORTFOLIO' },
              { id: 'ab_contact', label: '📞 Contact Us', actionPayload: 'SELECT_CONTACT' },
              { id: 'ab_quote', label: '📋 Get a Quote', actionPayload: 'SELECT_QUOTE' },
            ],
          },
          nextState: { ...state, currentStep: 'ABOUT_SHOWN' },
        };

      case 'QUOTE':
        trackChatbotEvent('lead_started');
        return {
          reply: getLeadFormMessage(),
          nextState: { ...state, currentStep: 'LEAD_FORM_ACTIVE' },
        };

      case 'CONTACT':
        return {
          reply: getContactMessage(),
          nextState: { ...state, currentStep: 'CONTACT_SHOWN' },
        };

      case 'FAQ':
        return {
          reply: getFAQAnswerMessage(query),
          nextState: { ...state, currentStep: 'FAQ_SHOWN' },
        };

      case 'UNKNOWN':
      default:
        return {
          reply: getUnknownIntentMessage(),
          nextState: { ...state, currentStep: 'UNKNOWN_FALLBACK' },
        };
    }
  }
}

export const chatbotEngine = new ChatbotEngine();
