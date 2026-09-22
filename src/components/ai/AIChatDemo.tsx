import { useState, useRef, useEffect } from 'react';
import type { DemoType } from '../../services/ai/aiDemoService';
import { getDemoConfig, getDemoResponse, createMessage } from '../../services/ai/aiDemoService';
import type { ChatMessage } from '../../services/ai/aiDemoService';
import styles from './AIChatDemo.module.css';

interface AIChatDemoProps {
  demoType: DemoType;
}

export default function AIChatDemo({ demoType }: AIChatDemoProps) {
  const config = getDemoConfig(demoType);
  const [messages, setMessages] = useState<ChatMessage[]>([
    createMessage('assistant', config.welcomeMessage),
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg = createMessage('user', text.trim());
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await getDemoResponse(demoType, text.trim());
      const assistantMsg = createMessage('assistant', response);
      setMessages((prev) => [...prev, assistantMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleSuggestion = (q: string) => {
    sendMessage(q);
  };

  return (
    <div className={styles.demo}>
      <div className={styles.messages} role="log" aria-live="polite" aria-label="Chat conversation">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`${styles.message} ${msg.role === 'user' ? styles.user : styles.assistant}`}
          >
            {msg.role === 'assistant' && (
              <div className={styles.avatar} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                  <rect x="8" y="8" width="8" height="8" />
                  <line x1="9" y1="1" x2="9" y2="4" />
                  <line x1="15" y1="1" x2="15" y2="4" />
                  <line x1="9" y1="20" x2="9" y2="23" />
                  <line x1="15" y1="20" x2="15" y2="23" />
                </svg>
              </div>
            )}
            <div className={styles.bubble}>{msg.content}</div>
          </div>
        ))}

        {loading && (
          <div className={`${styles.message} ${styles.assistant}`}>
            <div className={styles.avatar} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <rect x="8" y="8" width="8" height="8" />
              </svg>
            </div>
            <div className={`${styles.bubble} ${styles.typing}`} aria-label="AI is typing">
              <span /><span /><span />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {messages.length === 1 && (
        <div className={styles.suggestions} aria-label="Suggested questions">
          {config.suggestedQuestions.map((q) => (
            <button
              key={q}
              className={styles.suggestion}
              onClick={() => handleSuggestion(q)}
              type="button"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      <form className={styles.inputArea} onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.input}
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          aria-label="Chat message input"
          maxLength={300}
        />
        <button
          type="submit"
          className={styles.send}
          disabled={loading || !input.trim()}
          aria-label="Send message"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </form>

      <p className={styles.disclaimer}>
        ⚡ Demo mode — responses are simulated examples, not live AI
      </p>
    </div>
  );
}
