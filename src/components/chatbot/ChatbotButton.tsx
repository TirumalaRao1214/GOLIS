import React from 'react';

interface ChatbotButtonProps {
  isOpen: boolean;
  showGreeting: boolean;
  onToggle: () => void;
  onDismissGreeting: () => void;
}

export const ChatbotButton: React.FC<ChatbotButtonProps> = ({
  isOpen,
  showGreeting,
  onToggle,
  onDismissGreeting,
}) => {
  return (
    <div className="chatbot-trigger-wrapper">
      {/* Optional Proactive Greeting Notification Bubble */}
      {showGreeting && !isOpen && (
        <div className="chatbot-greeting-bubble" role="status">
          <div
            className="chatbot-greeting-text"
            onClick={onToggle}
            title="Click to open GOLIS Assistant"
          >
            Need help choosing the right website for your business? 👋
          </div>
          <button
            type="button"
            className="chatbot-greeting-close"
            onClick={onDismissGreeting}
            aria-label="Dismiss greeting"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Trigger Button */}
      {!isOpen && (
        <button
          type="button"
          className="chatbot-trigger-btn"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-label="Open GOLIS Business Assistant"
        >
          <span className="chatbot-trigger-pulse" aria-hidden="true" />
          <span className="chatbot-trigger-icon" aria-hidden="true">
            ✨
          </span>
          <span>GOLIS Assistant</span>
        </button>
      )}
    </div>
  );
};
