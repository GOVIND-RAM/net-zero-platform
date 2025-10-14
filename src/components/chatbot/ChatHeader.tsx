// Chat Header Component

import React from 'react';
import { Bot, X, Minimize2, RotateCcw } from 'lucide-react';

interface ChatHeaderProps {
  onClose: () => void;
  onClear?: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onClose, onClear }) => {
  return (
    <div className="infaira-chat-header bg-gradient-to-r from-primary-emerald to-primary-forest p-4 rounded-t-2xl flex items-center justify-between">
      <div className="flex items-center space-x-3">
        {/* Bot Avatar */}
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="w-6 h-6 text-primary-emerald" />
        </div>
        
        {/* Bot Name & Status */}
        <div>
          <h3 className="text-white font-semibold text-lg">Infaira</h3>
          <div className="text-white/80 text-xs flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            Online
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex items-center space-x-2">
        {onClear && (
          <button
            onClick={onClear}
            className="text-white/80 hover:text-white p-1 transition-colors"
            title="Clear chat history"
            aria-label="Clear chat history"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        )}
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white p-1 transition-colors"
          title="Minimize chat"
          aria-label="Minimize chat"
        >
          <Minimize2 className="w-5 h-5" />
        </button>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white p-1 transition-colors"
          title="Close chat"
          aria-label="Close chat"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;

