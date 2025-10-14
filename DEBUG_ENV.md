# Debug Environment Variables

## Check if .env is being read:

1. **Open browser console** (F12)
2. **Look for the log message**: "Gemini API Key: Found" or "Gemini API Key: Not found"
3. **If "Not found"**, the .env file isn't being read properly

## Solutions:

### Option 1: Hard Refresh
- Press `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac)
- This clears browser cache

### Option 2: Restart Server
```bash
# Stop server (Ctrl+C)
npm start
```

### Option 3: Check .env Location
Make sure `.env` is in the project root:
```
/Users/govind/Desktop/IGBSC/net-zero-platform/.env
```

### Option 4: Manual Test
Add this to your browser console:
```javascript
console.log('API Key:', process.env.REACT_APP_GEMINI_API_KEY);
```

## Expected Result:
- Console should show: "Gemini API Key: Found"
- Chatbot should work without "not configured" error
