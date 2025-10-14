// Message Bubble Component

import React from 'react';
import { Bot } from 'lucide-react';
import { Message } from '../../types/chatbot.types';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (message.sender === 'user') {
    // User Message (Right Side)
    return (
      <div className="infaira-message-user flex justify-end">
        <div className="bg-primary-emerald text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%] shadow-md">
          <p className="text-sm whitespace-pre-wrap">{message.text}</p>
          <span className="text-xs text-white/70 mt-1 block text-right">
            {formatTime(message.timestamp)}
          </span>
        </div>
      </div>
    );
  }

  // Bot Message (Left Side)
  return (
    <div className="infaira-message-bot flex justify-start">
      <div className="flex items-start space-x-2">
        {/* Bot Avatar */}
        <div className="w-8 h-8 bg-primary-emerald rounded-full flex items-center justify-center flex-shrink-0 mt-1">
          <Bot className="w-5 h-5 text-white" />
        </div>
        
        {/* Message Content */}
        <div className="bg-white text-neutral-charcoal rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%] shadow-md">
          <p className="text-sm whitespace-pre-wrap">{message.text}</p>
          
          {/* Related Links (if provided) */}
          {message.relatedLinks && message.relatedLinks.length > 0 && (
            <div className="mt-3 space-y-2">
              <p className="text-xs font-semibold text-gray-600">Related articles:</p>
              {message.relatedLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="block text-xs text-primary-emerald hover:text-primary-forest transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📄 {link.title}
                </a>
              ))}
            </div>
          )}
          
          <span className="text-xs text-gray-500 mt-1 block">
            {formatTime(message.timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;

