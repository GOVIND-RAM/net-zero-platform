// Chat Input Component

import React, { useState, KeyboardEvent } from 'react';
import { Send, Paperclip } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled = false }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim() && !disabled) {
      onSend(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="infaira-chat-input p-4 bg-white border-t border-slate-200 rounded-b-2xl">
      <div className="flex items-center space-x-2">
        {/* Attach Button (Optional - for future file upload) */}
        <button
          className="p-2 text-gray-400 hover:text-primary-emerald transition-colors disabled:opacity-50"
          title="Attach file (coming soon)"
          disabled={true}
        >
          <Paperclip className="w-5 h-5" />
        </button>
        
        {/* Text Input */}
        <input
          type="text"
          placeholder="Type your message and hit Enter..."
          className="flex-1 bg-slate-100 border-0 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-emerald/30 transition-all"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={disabled}
        />
        
        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={!inputValue.trim() || disabled}
          className="p-3 bg-gradient-to-r from-primary-emerald to-primary-forest text-white rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
          aria-label="Send message"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
      
      {/* Helper Text */}
      <p className="text-xs text-gray-500 mt-2 text-center">
        Press Enter to send • Shift + Enter for new line
      </p>
    </div>
  );
};

export default ChatInput;

