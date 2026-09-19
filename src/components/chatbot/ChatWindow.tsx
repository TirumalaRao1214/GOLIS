import React, { useRef, useEffect } from 'react';
import type { ChatMessageData, LeadData } from '../../chatbot/conversation';
import { ChatMessage } from './ChatMessage';

interface ChatWindowProps {
  isOpen: boolean;
  messages: ChatMessageData[];
  isTyping: boolean;
  inputValue: string;
  onInputChange: (val: string) => void;
  onSendMessage: (e?: React.FormEvent) => void;
  onQuickReply: (payload: string) => void;
  onLeadSubmit: (lead: LeadData) => void;
  onClose: () => void;
  onReset: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  isOpen,
  messages,
  isTyping,
  inputValue,
  onInputChange,
  onSendMessage,
  onQuickReply,
  onLeadSubmit,
  onClose,
  onReset,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll on new messages or typing indicator
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="chatbot-window"
      role="dialog"
      aria-label="GOLIS Business Assistant Chat"
      aria-modal="true"
    >
      {/* Header */}
      <div className="chatbot-header">
        <div className="chatbot-header-brand">
          <div className="chatbot-avatar" aria-hidden="true">
            ✨
            <span className="chatbot-online-indicator" />
          </div>
          <div>
            <div className="chatbot-header-title">GOLIS Assistant</div>
            <div className="chatbot-header-status">
              <span style={{ fontSize: '9px' }}>●</span> Online • Sales & Web Advisor
            </div>
          </div>
        </div>

        <div className="chatbot-header-actions">
          <button
            type="button"
            className="chatbot-icon-btn"
            onClick={onReset}
            title="Reset Conversation"
            aria-label="Reset Conversation"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </button>

          <button
            type="button"
            className="chatbot-icon-btn"
            onClick={onClose}
            title="Close Assistant"
            aria-label="Close Assistant"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Message Stream */}
      <div
        className="chatbot-messages-container"
        role="log"
        aria-live="polite"
      >
        {messages.map((msg, index) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            isLatest={index === messages.length - 1}
            onQuickReply={onQuickReply}
            onLeadSubmit={onLeadSubmit}
          />
        ))}

        {isTyping && (
          <div className="chatbot-msg-row bot">
            <div className="chatbot-msg-avatar" aria-hidden="true">
              ✨
            </div>
            <div className="chatbot-typing" aria-label="GOLIS assistant is typing">
              <span className="chatbot-dot" />
              <span className="chatbot-dot" />
              <span className="chatbot-dot" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Footer Input */}
      <form className="chatbot-footer" onSubmit={onSendMessage}>
        <input
          ref={inputRef}
          type="text"
          className="chatbot-input"
          placeholder="Ask a question or describe your website..."
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          aria-label="Chat input message"
        />
        <button
          type="submit"
          className="chatbot-send-btn"
          disabled={!inputValue.trim()}
          title="Send message"
          aria-label="Send message"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </form>
    </div>
  );
};
