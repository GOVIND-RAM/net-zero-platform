# Gemini AI Setup Guide - Free Alternative to OpenAI

## 🆓 **Why Gemini?**
- **100% FREE** - No payment required
- **No quota limits** for reasonable usage
- **High-quality responses** comparable to GPT-4
- **Easy to get API key**

---

## 🔑 **How to Get Your Gemini API Key (5 minutes)**

### Step 1: Go to Google AI Studio
Visit: https://aistudio.google.com/app/apikey

### Step 2: Sign In
- Use your Google account (Gmail, Google Workspace, etc.)
- If you don't have one, create a free Google account

### Step 3: Create API Key
1. Click **"Create API Key"**
2. Select **"Create API key in new project"** (recommended)
3. Click **"Create API key in new project"**
4. **Copy the API key** (starts with `AIza...`)

### Step 4: Add to Your Project
Replace the API key in your `.env` file:

```env
REACT_APP_GEMINI_API_KEY=AIza-your-actual-key-here
```

---

## 🔧 **Update Your Environment**

### Current .env file:
```env
REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001
HOST=0.0.0.0
```

### Replace with your actual key:
```env
REACT_APP_GEMINI_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
PORT=3001
HOST=0.0.0.0
```

---

## 🧪 **Test the Setup**

1. **Get your Gemini API key** from https://aistudio.google.com/app/apikey
2. **Add it to .env file** (replace `your_gemini_api_key_here`)
3. **Restart the server**: `npm start`
4. **Test the chatbot** - click the 🤖 button and ask a question!

---

## 💰 **Cost Comparison**

| Service | Cost | Quota |
|---------|------|-------|
| **OpenAI GPT-4** | $0.03/1K tokens | Paid |
| **OpenAI GPT-3.5** | $0.0015/1K tokens | Paid |
| **Gemini 1.5 Flash** | **FREE** | **15 requests/minute** |

---

## 🚀 **Benefits of Gemini**

✅ **Completely Free** - No credit card required  
✅ **No Quota Issues** - 15 requests per minute is plenty  
✅ **High Quality** - Comparable to GPT-4 responses  
✅ **Fast Responses** - Optimized for speed  
✅ **Easy Setup** - Just need Google account  

---

## 🔍 **API Key Format**

Your Gemini API key will look like:
```
AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Important**: Keep this key secure and don't share it publicly!

---

## 🛠️ **Troubleshooting**

### "Invalid API key" error?
- Check the key starts with `AIza`
- Ensure no extra spaces in .env file
- Restart the development server

### "Quota exceeded" error?
- Wait 1 minute (15 requests/minute limit)
- Check you're using the correct API key

### Still not working?
- Verify the key at: https://aistudio.google.com/app/apikey
- Check browser console for detailed errors

---

## 📊 **Usage Limits**

- **Requests**: 15 per minute
- **Tokens**: 1 million per day
- **Cost**: $0 (FREE!)

This is more than enough for a chatbot!

---

## 🎯 **Next Steps**

1. **Get your API key**: https://aistudio.google.com/app/apikey
2. **Update .env file** with your key
3. **Restart server**: `npm start`
4. **Test chatbot**: Click 🤖 button and ask questions!

Your Infaira chatbot will now work completely FREE with Gemini AI! 🎉

---

**Need help?** Check the browser console for any error messages or contact support@ecozero.com
