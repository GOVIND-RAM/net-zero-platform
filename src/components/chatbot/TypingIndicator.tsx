// Typing Indicator Component

import React from 'react';
import { Bot } from 'lucide-react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="infaira-typing-indicator flex justify-start">
      <div className="flex items-start space-x-2">
        {/* Bot Avatar */}
        <div className="w-8 h-8 bg-primary-emerald rounded-full flex items-center justify-center flex-shrink-0 mt-1">
          <Bot className="w-5 h-5 text-white" />
        </div>
        
        {/* Typing Animation */}
        <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-md">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;

