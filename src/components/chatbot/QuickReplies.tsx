import React from 'react';
import type { QuickReplyOption } from '../../chatbot/conversation';

interface QuickRepliesProps {
  options: QuickReplyOption[];
  onSelect: (payload: string) => void;
  disabled?: boolean;
}

export const QuickReplies: React.FC<QuickRepliesProps> = ({
  options,
  onSelect,
  disabled = false,
}) => {
  if (!options || options.length === 0) return null;

  return (
    <div className="chatbot-quick-replies" role="group" aria-label="Quick reply options">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          className="chatbot-qr-btn"
          onClick={() => onSelect(option.actionPayload || option.label)}
          disabled={disabled}
          aria-label={option.label}
        >
          {option.icon && <span aria-hidden="true">{option.icon}</span>}
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
};
