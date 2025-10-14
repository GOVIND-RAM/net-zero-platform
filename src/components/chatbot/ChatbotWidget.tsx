// Main Chatbot Widget Component - Infaira

import React, { useEffect } from 'react';
import { useChatbot } from '../../hooks/useChatbot';
import ChatbotButton from './ChatbotButton';
import ChatHeader from './ChatHeader';
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';

interface ChatbotWidgetProps {
  apiKey?: string;
}

const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({ apiKey }) => {
  const chatbot = useChatbot(apiKey);

  // Clear chat history on component unmount (logout/page change)
  useEffect(() => {
    return () => {
      chatbot.clearChat();
      localStorage.removeItem('infaira_chat_history');
    };
  }, []);

  // Handle escape key to close chat
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && chatbot.isOpen) {
        chatbot.toggleChat();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [chatbot.isOpen, chatbot.toggleChat]);

  return (
    <>
      {/* Floating Button (shown when chat is closed) */}
      {!chatbot.isOpen && (
        <ChatbotButton onClick={chatbot.toggleChat} />
      )}

      {/* Chat Window (shown when open) */}
      {chatbot.isOpen && (
        <>
          {/* Mobile Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden animate-fade-in"
            onClick={chatbot.toggleChat}
            aria-hidden="true"
          />

          {/* Chat Container */}
          <div className="fixed bottom-0 right-0 left-0 md:bottom-6 md:right-6 md:left-auto w-full md:w-96 h-full md:h-[600px] bg-white rounded-none md:rounded-2xl shadow-2xl z-50 flex flex-col animate-slide-up">
            <ChatHeader
              onClose={chatbot.toggleChat}
              onClear={chatbot.clearChat}
            />

            <ChatWindow
              messages={chatbot.messages}
              isLoading={chatbot.isLoading}
              messagesEndRef={chatbot.messagesEndRef}
            />

            <ChatInput
              onSend={chatbot.sendMessage}
              disabled={chatbot.isLoading}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ChatbotWidget;

