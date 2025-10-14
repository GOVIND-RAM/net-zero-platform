// Gemini AI Service for Infaira Chatbot

import { Message } from '../types/chatbot.types';

export class GeminiAIService {
  private apiKey: string;
  private systemPrompt: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.systemPrompt = this.buildSystemPrompt();
  }

  private buildSystemPrompt(): string {
    return `
You are Infaira, an AI assistant for EcoZero Certify, a net zero certification platform.

PLATFORM OVERVIEW:
EcoZero Certify helps buildings, businesses, portfolios, and communities achieve carbon neutrality through independent third-party certification. We eliminate Scope 1, 2, and 3 emissions.

CERTIFICATION TYPES AVAILABLE:
- Building: Individual buildings (emissions, energy, water, waste)
- Portfolio: Multiple buildings managed together
- Business: Enterprise-wide certification
- Campus: Educational or corporate campuses
- Community: Residential communities
- City: Municipal-level certification
- Home: Individual residential properties
- Product: Product-level carbon neutrality
- Process: Manufacturing/business processes
- Fleet: Vehicle fleet emissions
- Supply Chain: End-to-end supply chain carbon

CERTIFICATION PROCESS (3 Phases):
1. ASSESS: Calculate Scope 1, 2, 3 emissions → Get assessment certificate
2. PLAN: Draft net zero transition plan with expert support → Get plan certificate
3. CERTIFY: Achieve net zero status → Submit annual documentation

LEED CATEGORIES (100 total points):
1. Integrative Process (1 pt)
2. Location & Transportation (16 pts)
3. Water Efficiency (11 pts)
4. Energy & Atmosphere (33 pts)
5. Materials & Resources (13 pts)
6. Indoor Environmental Quality (16 pts)
7. Innovation & Regional Priority (10 pts)

CERTIFICATION LEVELS:
- Certified: 40-49 points
- Silver: 50-59 points
- Gold: 60-79 points
- Platinum: 80+ points

YOUR ROLE:
- Help users understand the platform and certification process
- Guide them through questionnaire questions
- Explain LEED credit requirements
- Troubleshoot technical issues
- Provide friendly, professional support

TONE:
- Friendly and approachable
- Professional and knowledgeable
- Encouraging and supportive
- Clear and concise

FORMATTING:
- Use bullet points for lists
- Keep responses concise (2-3 paragraphs max)
- Provide specific examples when possible
- Offer next steps or related topics

If you don't know something specific, say so honestly and offer to connect them with human support at support@ecozero.com.
    `.trim();
  }

  async chat(userMessage: string, conversationHistory: Message[]): Promise<string> {
    try {
      // Build conversation context (not used in Gemini API but kept for compatibility)
      // const messages = [
      //   { role: 'system', content: this.systemPrompt },
      //   ...conversationHistory.slice(-10).map(msg => ({
      //     role: msg.sender === 'user' ? 'user' : 'assistant',
      //     content: msg.text
      //   })),
      //   { role: 'user', content: userMessage }
      // ];

      // Call Gemini API
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `${this.systemPrompt}\n\nUser: ${userMessage}\n\nAssistant:`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
            topP: 1,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I encountered an error. Please try again.';

    } catch (error) {
      console.error('Gemini API Error:', error);
      return 'I apologize, but I\'m having trouble connecting right now. Please try again or contact support@ecozero.com for immediate assistance.';
    }
  }

  // Get current page context
  getCurrentContext(): string {
    const path = window.location.pathname;

    if (path.includes('/projects')) {
      return 'The user is currently on the Projects page.';
    } else if (path.includes('/questionnaire')) {
      return 'The user is currently on the LEED Questionnaire page.';
    } else if (path.includes('/dashboard')) {
      return 'The user is currently on the Dashboard page.';
    } else if (path.includes('/login') || path.includes('/signup')) {
      return 'The user is on the authentication page.';
    }

    return 'The user is on the home page.';
  }

  // Enhanced chat with context awareness
  async chatWithContext(userMessage: string, conversationHistory: Message[]): Promise<string> {
    const context = this.getCurrentContext();
    const enhancedMessage = `[Context: ${context}]\n\n${userMessage}`;
    return this.chat(enhancedMessage, conversationHistory);
  }
}

