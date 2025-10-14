# Infaira Chatbot - Quick Reference Card

## 🚀 One-Minute Setup

```bash
# 1. Add API key to .env
echo "REACT_APP_OPENAI_API_KEY=sk-your-key-here" >> .env

# 2. Start the app
npm start

# 3. Look for the green floating button! 🟢
```

---

## 📁 File Structure

```
src/
├── components/chatbot/
│   ├── ChatbotWidget.tsx       → Main component
│   ├── ChatbotButton.tsx       → Floating button
│   ├── ChatHeader.tsx          → Header bar
│   ├── ChatWindow.tsx          → Messages area
│   ├── MessageBubble.tsx       → Individual messages
│   ├── ChatInput.tsx           → Input field
│   └── TypingIndicator.tsx     → Typing dots
│
├── services/
│   ├── openaiService.ts        → OpenAI API
│   └── knowledgeBase.ts        → Q&A database
│
├── hooks/
│   └── useChatbot.ts           → State logic
│
└── types/
    └── chatbot.types.ts        → TypeScript types
```

---

## 🎨 Color Palette

```css
/* User Messages */
bg-primary-emerald: #10B981

/* Bot Messages */
bg-white: #FFFFFF

/* Header */
from-primary-emerald to-primary-forest
#10B981 → #0D3B2E

/* Text */
text-neutral-charcoal: #1F2937
text-gray-600: #4B5563

/* Background */
bg-slate-50: #F8FAFC
```

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Enter` | Send message |
| `Shift + Enter` | New line |
| `Escape` | Close chat |

---

## 🔧 Quick Customizations

### Change AI Model (Save Money)

```typescript
// src/services/openaiService.ts (line ~60)
model: 'gpt-3.5-turbo'  // 20x cheaper than GPT-4!
```

### Add Knowledge Entry

```typescript
// src/services/knowledgeBase.ts
{
  category: 'Getting Started',
  question: 'How do I...?',
  answer: 'You can...',
  keywords: ['keyword1', 'keyword2']
}
```

### Change Colors

```tsx
// User message (green → blue)
className="bg-blue-500"

// Bot message (white → gray)
className="bg-gray-100"
```

---

## 🧪 Test Commands

```bash
# Check for linter errors
npm run lint

# Run tests
npm test

# Build for production
npm run build
```

---

## 📊 API Cost Calculator

```
GPT-4 Turbo:
• Input: $0.01 / 1K tokens
• Output: $0.03 / 1K tokens
• Average chat: ~$0.08

GPT-3.5 Turbo:
• Input: $0.0005 / 1K tokens
• Output: $0.0015 / 1K tokens
• Average chat: ~$0.004
```

---

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Button not showing | Check `App.tsx` has `<ChatbotWidget />` |
| "Not configured" | Add API key to `.env`, restart server |
| No responses | Verify API key is valid on OpenAI platform |
| Chat not scrolling | Clear browser cache |

---

## 📱 Responsive Breakpoints

```css
/* Desktop */
@media (min-width: 768px) {
  width: 384px;
  height: 600px;
  bottom: 1.5rem;
  right: 1.5rem;
}

/* Mobile */
@media (max-width: 768px) {
  width: 100vw;
  height: 100vh;
  bottom: 0;
  right: 0;
}
```

---

## 🎯 Component Props

### ChatbotWidget
```typescript
<ChatbotWidget apiKey={string} />
```

### ChatHeader
```typescript
<ChatHeader 
  onClose={() => void}
  onClear={() => void}
/>
```

### ChatWindow
```typescript
<ChatWindow 
  messages={Message[]}
  isLoading={boolean}
  messagesEndRef={RefObject}
/>
```

### ChatInput
```typescript
<ChatInput 
  onSend={(message: string) => void}
  disabled={boolean}
/>
```

---

## 🔐 Security Checklist

- [x] API key in `.env` (not in code)
- [x] Rate limiting (10 msgs/min)
- [x] Input sanitization
- [ ] Backend API proxy (production)
- [ ] User authentication
- [ ] Usage monitoring

---

## 📚 Knowledge Base Stats

- **Total Entries**: 21
- **Categories**: 13
- **Keywords**: 100+
- **Coverage**: Platform, LEED, Emissions, Support

---

## 💡 Quick Examples

**Getting Started**
```
"How do I create an account?"
"How do I start a new project?"
```

**LEED Credits**
```
"What are the LEED categories?"
"How many points for Gold certification?"
```

**Emissions**
```
"What is Scope 1, 2, and 3?"
"How do I calculate my carbon footprint?"
```

**Technical Support**
```
"I can't upload documents"
"My form won't save"
```

---

## 🚀 Performance Tips

1. **Limit conversation history** (currently 10 messages)
2. **Use GPT-3.5 Turbo** for simple queries
3. **Cache common responses** in knowledge base
4. **Implement backend proxy** for production
5. **Add rate limiting** per user

---

## 📞 Support Contacts

| Issue | Contact |
|-------|---------|
| Technical | Check `CHATBOT_SETUP_GUIDE.md` |
| Platform | support@ecozero.com |
| OpenAI API | platform.openai.com/account |

---

## 🎨 Animation Classes

```css
.animate-slide-up       /* Chat window entrance */
.animate-fade-in        /* Backdrop fade */
.animate-bounce         /* Typing dots */
.animate-pulse-ring     /* Button pulse */
```

---

## 📦 Dependencies Added

```json
{
  "openai": "^4.47.1"
}
```

Already installed:
- `lucide-react` (icons)
- `react` + `typescript` (framework)
- `tailwindcss` (styling)

---

## 🔄 Environment Variables

```env
# Required
REACT_APP_OPENAI_API_KEY=sk-...

# Optional (future)
REACT_APP_CHATBOT_BACKEND_URL=https://api.yourdomain.com
REACT_APP_ANALYTICS_ID=UA-...
```

---

## 📈 Analytics Events

```typescript
// Track these events
'chatbot_opened'
'message_sent'
'feedback_given'
'chat_cleared'
'error_occurred'
```

---

## 🎯 Useful Commands

```bash
# Find all chatbot files
find src -path "*/chatbot/*" -o -name "*chatbot*"

# Check bundle size
npm run build && ls -lh build/static/js/*.js

# Search knowledge base
grep -r "question:" src/services/knowledgeBase.ts

# Count lines of code
find src/components/chatbot -name "*.tsx" | xargs wc -l
```

---

## 🔗 Quick Links

- OpenAI Platform: https://platform.openai.com
- API Keys: https://platform.openai.com/api-keys
- Usage Dashboard: https://platform.openai.com/usage
- Pricing: https://openai.com/pricing

---

## ✅ Launch Checklist

Before going live:

- [ ] Add API key to `.env`
- [ ] Test all chatbot features
- [ ] Verify knowledge base answers
- [ ] Check mobile responsiveness
- [ ] Set up usage alerts on OpenAI
- [ ] Implement backend proxy (CRITICAL!)
- [ ] Add user authentication
- [ ] Set up conversation logging
- [ ] Enable error monitoring
- [ ] Add analytics tracking

---

## 🎉 Quick Win!

Your chatbot is ready in 3 commands:

```bash
echo "REACT_APP_OPENAI_API_KEY=sk-your-key" >> .env
npm start
# Click the green button! 🟢
```

---

**Version**: 1.0.0 | **Status**: ✅ Ready | **Platform**: EcoZero Certify

