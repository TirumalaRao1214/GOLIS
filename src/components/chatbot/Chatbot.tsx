import React, { useState, useEffect, useCallback } from 'react';
import './chatbot.css';
import type {
  ChatMessageData,
  ConversationState,
  LeadData,
} from '../../chatbot/conversation';
import {
  INITIAL_CONVERSATION_STATE,
  trackChatbotEvent,
} from '../../chatbot/conversation';
import { chatbotEngine } from '../../chatbot/chatbotEngine';
import { getWelcomeMessage } from '../../chatbot/responses';
import { ChatbotButton } from './ChatbotButton';
import { ChatWindow } from './ChatWindow';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageData[]>(() => [getWelcomeMessage()]);
  const [conversationState, setConversationState] = useState<ConversationState>(
    INITIAL_CONVERSATION_STATE
  );
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);

  // Proactive greeting bubble timer (only shows once per session)
  useEffect(() => {
    const hasSeenGreeting = sessionStorage.getItem('golis_chatbot_greeting_seen');
    if (!hasSeenGreeting) {
      const timer = setTimeout(() => {
        setShowGreeting(true);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismissGreeting = useCallback(() => {
    setShowGreeting(false);
    sessionStorage.setItem('golis_chatbot_greeting_seen', 'true');
  }, []);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        setShowGreeting(false);
        sessionStorage.setItem('golis_chatbot_greeting_seen', 'true');
        trackChatbotEvent('chat_opened');
      } else {
        trackChatbotEvent('chat_closed');
      }
      return next;
    });
  }, []);

  const handleReset = useCallback(() => {
    const welcome = getWelcomeMessage();
    setMessages([welcome]);
    setConversationState(INITIAL_CONVERSATION_STATE);
  }, []);

  // Helper to append a bot reply after a realistic micro-typing duration (350-500ms)
  const appendBotReply = useCallback((reply: ChatMessageData, nextState: ConversationState) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, reply]);
      setConversationState(nextState);
    }, 450);
  }, []);

  // User submits text
  const handleSendMessage = useCallback(
    (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      const text = inputValue.trim();
      if (!text || isTyping) return;

      const userMsg: ChatMessageData = {
        id: `user_${Date.now()}`,
        sender: 'user',
        type: 'user',
        text,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInputValue('');

      const { reply, nextState } = chatbotEngine.processUserInput(text, conversationState);
      appendBotReply(reply, nextState);
    },
    [inputValue, isTyping, conversationState, appendBotReply]
  );

  // User clicks quick-reply
  const handleQuickReply = useCallback(
    (actionPayload: string) => {
      if (isTyping) return;

      const { reply, nextState } = chatbotEngine.processAction(actionPayload, conversationState);
      appendBotReply(reply, nextState);
    },
    [isTyping, conversationState, appendBotReply]
  );

  // User submits lead form
  const handleLeadSubmit = useCallback(
    (lead: LeadData) => {
      if (isTyping) return;

      const userLeadSummaryMsg: ChatMessageData = {
        id: `user_lead_${Date.now()}`,
        sender: 'user',
        type: 'user',
        text: `Submitted Details:\nName: ${lead.name}\nBusiness: ${lead.businessName} (${lead.businessType})\nPhone: ${lead.phone}`,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userLeadSummaryMsg]);

      const { reply, nextState } = chatbotEngine.processLeadSubmission(lead, conversationState);
      appendBotReply(reply, nextState);
    },
    [isTyping, conversationState, appendBotReply]
  );

  return (
    <>
      <ChatbotButton
        isOpen={isOpen}
        showGreeting={showGreeting}
        onToggle={handleToggle}
        onDismissGreeting={handleDismissGreeting}
      />

      <ChatWindow
        isOpen={isOpen}
        messages={messages}
        isTyping={isTyping}
        inputValue={inputValue}
        onInputChange={setInputValue}
        onSendMessage={handleSendMessage}
        onQuickReply={handleQuickReply}
        onLeadSubmit={handleLeadSubmit}
        onClose={() => setIsOpen(false)}
        onReset={handleReset}
      />
    </>
  );
}
