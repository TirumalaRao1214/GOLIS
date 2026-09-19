import React from 'react';
import type {
  ChatMessageData,
  LeadData,
  PortfolioCardItem,
  PricingCardItem,
} from '../../chatbot/conversation';
import { QuickReplies } from './QuickReplies';
import { LeadForm } from './LeadForm';

interface ChatMessageProps {
  message: ChatMessageData;
  isLatest: boolean;
  onQuickReply: (payload: string) => void;
  onLeadSubmit: (lead: LeadData) => void;
}

/**
 * Format markdown-like bold text safely without external HTML injections
 */
function renderFormattedText(text: string) {
  const parts = text.split('\n');

  return parts.map((line, lineIndex) => {
    // Process bold (**text**)
    const boldRegex = /\*\*(.*?)\*\*/g;
    const elements: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = boldRegex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        elements.push(line.substring(lastIndex, match.index));
      }
      elements.push(
        <strong key={`bold-${lineIndex}-${match.index}`} style={{ color: '#fff', fontWeight: 600 }}>
          {match[1]}
        </strong>
      );
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < line.length) {
      elements.push(line.substring(lastIndex));
    }

    return (
      <React.Fragment key={`line-${lineIndex}`}>
        {elements.length > 0 ? elements : line}
        {lineIndex < parts.length - 1 && <br />}
      </React.Fragment>
    );
  });
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isLatest,
  onQuickReply,
  onLeadSubmit,
}) => {
  const isBot = message.sender === 'bot';
  const timeString = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={`chatbot-msg-row ${isBot ? 'bot' : 'user'}`}>
      {isBot && (
        <div className="chatbot-msg-avatar" aria-hidden="true">
          ✨
        </div>
      )}

      <div className="chatbot-msg-bubble">
        {message.text && (
          <div className="chatbot-msg-text">{renderFormattedText(message.text)}</div>
        )}

        {/* Portfolio Cards */}
        {message.type === 'portfolio' && message.portfolioItems && (
          <div className="chatbot-portfolio-list">
            {message.portfolioItems.map((item: PortfolioCardItem) => (
              <div key={item.id} className="chatbot-portfolio-card">
                <div className="chatbot-card-title">{item.title}</div>
                <div className="chatbot-card-category">{item.category}</div>
                <div className="chatbot-card-desc">{item.description}</div>
                <div className="chatbot-card-features">
                  {item.features.map((feat, fIdx) => (
                    <span key={fIdx}>• {feat}</span>
                  ))}
                </div>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="chatbot-card-link"
                    aria-label={`View live demo of ${item.title}`}
                  >
                    <span>View Live Demo</span>
                    <span>↗</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Pricing Cards */}
        {message.type === 'pricing' && message.pricingItems && (
          <div className="chatbot-pricing-list">
            {message.pricingItems.map((item: PricingCardItem) => (
              <div
                key={item.id}
                className={`chatbot-pricing-card ${item.popular ? 'popular' : ''}`}
              >
                {item.popular && (
                  <span className="chatbot-popular-badge">Most Popular</span>
                )}
                <div className="chatbot-pricing-header">
                  <span className="chatbot-pricing-name">{item.name}</span>
                  <span className="chatbot-pricing-cost">{item.price}</span>
                </div>
                <div className="chatbot-pricing-features">
                  {item.features.map((feat, fIdx) => (
                    <span key={fIdx}>✓ {feat}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lead Generation Form */}
        {message.type === 'lead-form' && (
          <LeadForm onSubmit={onLeadSubmit} />
        )}

        {/* Quick Replies */}
        {message.options && message.options.length > 0 && isLatest && (
          <QuickReplies options={message.options} onSelect={onQuickReply} />
        )}

        <span className="chatbot-msg-time">{timeString}</span>
      </div>
    </div>
  );
};
