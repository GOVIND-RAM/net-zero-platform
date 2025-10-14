// Custom Hook for Chatbot Logic

import { useState, useEffect, useRef, useCallback } from 'react';
import { GeminiAIService } from '../services/openaiService';
import { Message, ChatbotState } from '../types/chatbot.types';

export const useChatbot = (apiKey?: string) => {
  const [state, setState] = useState<ChatbotState>({
    isOpen: false,
    messages: [],
    isLoading: false,
    hasError: false
  });

  const geminiService = useRef<GeminiAIService | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Initialize Gemini service
  useEffect(() => {
    if (apiKey) {
      console.log('Initializing Gemini service with key:', apiKey.substring(0, 10) + '...');
      geminiService.current = new GeminiAIService(apiKey);
      console.log('Gemini service initialized:', !!geminiService.current);
    } else {
      console.log('No API key provided for Gemini service');
    }
  }, [apiKey]);

  // Clear chat history on component mount (fresh session)
  useEffect(() => {
    // Always start with a fresh session - no localStorage persistence
    localStorage.removeItem('infaira_chat_history');
    
    // Clear on component unmount (when user logs out or navigates away)
    return () => {
      localStorage.removeItem('infaira_chat_history');
    };
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [state.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChat = useCallback(() => {
    setState(prev => {
      const newIsOpen = !prev.isOpen;
      
      // Add welcome message on first open
      if (newIsOpen && prev.messages.length === 0) {
        const welcomeMessage: Message = {
          id: Date.now().toString(),
          text: "Hi! I'm Infaira 👋\n\nI'm your AI assistant for EcoZero Certify. I can help you with:\n\n• Understanding the certification process\n• Navigating the questionnaire\n• Answering LEED credit questions\n• Technical support\n\nWhat would you like to know?",
          sender: 'bot',
          timestamp: new Date()
        };
        return { ...prev, isOpen: newIsOpen, messages: [welcomeMessage] };
      }
      
      return { ...prev, isOpen: newIsOpen };
    });
  }, []);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Check if API key is available
    console.log('Send message check:', { apiKey: !!apiKey, service: !!geminiService.current, apiKeyValue: apiKey?.substring(0, 10) + '...' });
    
    if (!apiKey || !geminiService.current) {
      console.log('API Key check failed:', { apiKey: !!apiKey, service: !!geminiService.current });
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm currently not configured. Please add your Gemini API key to use the chatbot. For immediate assistance, contact support@ecozero.com.",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setState(prev => ({
        ...prev,
        messages: [...prev.messages, errorMessage]
      }));
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      hasError: false
    }));

    try {
      // Get AI response with context
      const response = await geminiService.current.chatWithContext(text, state.messages);

      // Add bot message
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, botMessage],
        isLoading: false,
        hasError: false
      }));

    } catch (error) {
      console.error('Chat error:', error);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm experiencing technical difficulties. Please try again or contact support@ecozero.com for immediate assistance.",
        sender: 'bot',
        timestamp: new Date()
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
        isLoading: false,
        hasError: true
      }));
    }
  };

  const clearChat = () => {
    // Clear all messages
    setState(prev => ({
      ...prev,
      messages: []
    }));

    localStorage.removeItem('infaira_chat_history');
  };

  return {
    ...state,
    toggleChat,
    sendMessage,
    clearChat,
    messagesEndRef
  };
};

