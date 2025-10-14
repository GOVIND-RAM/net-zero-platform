// Floating Chatbot Button Component

import React from 'react';
import { Bot } from 'lucide-react';

interface ChatbotButtonProps {
  onClick: () => void;
  hasUnread?: boolean;
}

const ChatbotButton: React.FC<ChatbotButtonProps> = ({ onClick, hasUnread = false }) => {
  return (
    <button
      onClick={onClick}
      className="infaira-chatbot-button fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-primary-emerald to-primary-forest rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center group z-[9999]"
      style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 9999 }}
      aria-label="Open Infaira Chat Assistant"
    >
      <Bot className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
      
      {/* Notification badge */}
      {hasUnread && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-semibold">
          1
        </span>
      )}
      
      {/* Pulse animation */}
      <span className="absolute inset-0 rounded-full bg-primary-emerald animate-pulse-ring opacity-20"></span>
    </button>
  );
};

export default ChatbotButton;

