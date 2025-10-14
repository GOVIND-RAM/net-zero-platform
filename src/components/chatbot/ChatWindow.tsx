// Chat Window Component

import React, { RefObject } from 'react';
import { Sparkles } from 'lucide-react';
import { Message } from '../../types/chatbot.types';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
  messagesEndRef: RefObject<HTMLDivElement | null>;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading, messagesEndRef }) => {
  return (
    <div className="infaira-chat-window flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 chat-scrollbar">
      {/* Welcome Message (shown when no messages) */}
      {messages.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-primary-emerald/10 rounded-full mx-auto flex items-center justify-center mb-3">
            <Sparkles className="w-8 h-8 text-primary-emerald" />
          </div>
          <h4 className="text-neutral-charcoal font-semibold mb-2 text-lg">
            Hi! I'm Infaira 👋
          </h4>
          <p className="text-gray-600 text-sm max-w-xs mx-auto">
            Your AI assistant for net zero certification. How can I help you today?
          </p>
          
          {/* Quick Suggestions */}
          <div className="mt-6 space-y-2 max-w-sm mx-auto">
            <p className="text-xs text-gray-500 font-semibold mb-3">Popular topics:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <button className="px-3 py-2 bg-white border border-slate-200 rounded-full text-xs text-gray-700 hover:border-primary-emerald hover:text-primary-emerald transition-colors">
                🚀 Getting Started
              </button>
              <button className="px-3 py-2 bg-white border border-slate-200 rounded-full text-xs text-gray-700 hover:border-primary-emerald hover:text-primary-emerald transition-colors">
                📋 Certification Process
              </button>
              <button className="px-3 py-2 bg-white border border-slate-200 rounded-full text-xs text-gray-700 hover:border-primary-emerald hover:text-primary-emerald transition-colors">
                ❓ LEED Credits
              </button>
              <button className="px-3 py-2 bg-white border border-slate-200 rounded-full text-xs text-gray-700 hover:border-primary-emerald hover:text-primary-emerald transition-colors">
                🌍 Emissions
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Messages */}
      {messages.map(message => (
        <MessageBubble key={message.id} message={message} />
      ))}
      
      {/* Typing Indicator */}
      {isLoading && <TypingIndicator />}
      
      {/* Scroll to bottom anchor */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatWindow;

