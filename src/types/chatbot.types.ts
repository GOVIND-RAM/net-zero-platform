// Chatbot TypeScript Interfaces

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isTyping?: boolean;
  relatedLinks?: Array<{ title: string; url: string }>;
}

export interface ChatbotState {
  isOpen: boolean;
  messages: Message[];
  isLoading: boolean;
  hasError: boolean;
}

export interface OpenAIRequest {
  userMessage: string;
  conversationHistory: Message[];
  context: PlatformContext;
}

export interface PlatformContext {
  currentPage?: string;
  userType?: 'customer' | 'admin';
  projectId?: string;
  certificationType?: string;
}

export interface KnowledgeBaseEntry {
  category: string;
  question: string;
  answer: string;
  keywords: string[];
  relatedTopics?: string[];
}

export interface QuickReply {
  id: string;
  text: string;
  icon?: string;
}

