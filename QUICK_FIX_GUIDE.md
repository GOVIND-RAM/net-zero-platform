# Quick Fix Guide - Infaira Chatbot

## 🔧 Issue 1: Button Position Fixed

I've updated the chatbot button to force it to the **bottom-right corner** with these changes:

### ✅ Fixed in `ChatbotButton.tsx`:
- Added inline styles: `style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 9999 }}`
- Increased z-index to `z-[9999]` to ensure it's always on top

### ✅ Fixed in `index.css`:
- Added `!important` CSS rules to override any conflicting styles
- Force position: `position: fixed !important; bottom: 1.5rem !important; right: 1.5rem !important;`

**The button should now appear in the bottom-right corner!**

---

## 🔑 Issue 2: API Key Location

### Step 1: Get Your OpenAI API Key
1. Go to: https://platform.openai.com/api-keys
2. Sign in to your OpenAI account
3. Click **"Create new secret key"**
4. Copy the key (starts with `sk-`)

### Step 2: Add API Key to .env File
I've created a `.env` file in your project root. Open it and replace the placeholder:

```env
# Current content in .env file:
REACT_APP_OPENAI_API_KEY=your_openai_api_key_here

# Replace with your actual key:
REACT_APP_OPENAI_API_KEY=sk-proj-your-actual-key-here
```

### Step 3: Restart the Development Server
```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm start
```

---

## 🧪 Test the Fixes

1. **Check Button Position**: Look for the green floating button in the bottom-right corner
2. **Test Chatbot**: Click the button and try asking: "How do I create a new project?"
3. **Verify API**: If you see "Not configured" error, check your API key in `.env`

---

## 🐛 If Button Still Not Visible

### Option 1: Check Browser Console
1. Open Developer Tools (F12)
2. Look for any CSS errors
3. Check if the button element exists in the DOM

### Option 2: Force Refresh
```bash
# Clear browser cache and restart
npm start
# Then hard refresh: Ctrl+Shift+R (or Cmd+Shift+R on Mac)
```

### Option 3: Check Z-Index Conflicts
The button now has `z-index: 9999` which should be higher than most elements.

---

## 📍 File Locations

- **Button Code**: `src/components/chatbot/ChatbotButton.tsx`
- **API Key**: `.env` (in project root)
- **CSS Styles**: `src/styles/index.css`
- **App Integration**: `src/App.tsx`

---

## ✅ Success Indicators

You'll know it's working when:
- ✅ Green button appears in bottom-right corner
- ✅ Clicking opens chat window
- ✅ AI responds to questions (not "Not configured" error)
- ✅ Button stays in position when scrolling

---

## 🆘 Still Having Issues?

If the button is still not in the right position:

1. **Check for CSS conflicts** in your browser's developer tools
2. **Try a different browser** to see if it's browser-specific
3. **Check if other elements** are overlapping the button area

The button should now be **forced** to the bottom-right corner with the highest z-index!

---

**Need more help?** Check the full documentation in `CHATBOT_SETUP_GUIDE.md`
