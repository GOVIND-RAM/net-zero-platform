# 🚀 Quick Start Guide

## 30-Second Setup

```bash
# 1. Navigate to project
cd /Users/govind/Desktop/IGBSC/net-zero-platform

# 2. Start the server (if not already running)
npm start

# 3. Open browser
# http://localhost:3000
```

## 2-Minute Test

### 1️⃣ Create Account (30 seconds)
```
Navigate to: http://localhost:3000/signup

Fill in:
- Name: Test User
- Email: test@example.com
- Password: Test@123
- Confirm: Test@123
- ✓ Agree to terms

Click: "Create Account"
Result: ✅ Redirects to dashboard
```

### 2️⃣ Test Dashboard (30 seconds)
```
You should see:
- 14 certification type cards
- Your user avatar (top right)
- CertifyPro logo

Try:
- Click any card → Goes to questionnaire
- Click "Add new" → Opens modal
- Click avatar → Shows menu
```

### 3️⃣ Test Logout & Login (60 seconds)
```
1. Click avatar → "Logout"
   Result: ✅ Returns to landing page

2. Click "Login" button
   Result: ✅ Goes to login page

3. Enter credentials:
   - Email: test@example.com
   - Password: Test@123

4. Click "Sign In"
   Result: ✅ Back to dashboard
```

## Admin Access

```
Email: admin@certifypro.com
Password: Admin@123

1. Go to: http://localhost:3000/login
2. Switch to "Admin Login" tab
3. Enter credentials above
4. Click "Admin Sign In"

Result: ✅ Admin dashboard (placeholder)
```

## Key URLs

```
Landing:       http://localhost:3000/
Signup:        http://localhost:3000/signup
Login:         http://localhost:3000/login
Dashboard:     http://localhost:3000/dashboard  (protected)
Admin:         http://localhost:3000/admin      (protected)
```

## Troubleshooting

### Can't login?
```bash
# Clear browser localStorage
1. Open DevTools (F12)
2. Go to Application tab
3. Click "Local Storage"
4. Right-click → Clear
5. Refresh page
```

### Server won't start?
```bash
# Kill existing process and restart
killall node
npm start
```

### Page looks broken?
```bash
# Rebuild Tailwind
npm run build:css  # if available
# or
npm start  # restart server
```

## What's Working

✅ User signup with validation  
✅ Customer/admin login  
✅ Protected routes  
✅ Dashboard with 14 certification types  
✅ User menu & logout  
✅ Password strength indicator  
✅ Responsive design  
✅ Smooth animations  

## What's Placeholder

⏳ Google Sign-In (UI only)  
⏳ Forgot password (sends fake email)  
⏳ Questionnaire page (placeholder)  
⏳ Admin dashboard (placeholder)  
⏳ Email verification  

## File Structure Cheat Sheet

```
src/
├── pages/               ← All page components
├── components/
│   ├── auth/           ← Login/signup forms
│   ├── dashboard/      ← Dashboard components
│   └── common/         ← Shared components
├── context/            ← Auth state management
├── utils/              ← Helper functions
└── types/              ← TypeScript types
```

## Development Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Check for lint errors
npm run lint  # if configured
```

## Browser DevTools Tips

### Check Auth State
```
1. Open Console (F12)
2. Type: localStorage.getItem('userData')
3. See your user data (JSON)
```

### Check Token
```
localStorage.getItem('authToken')
```

### Manually Logout
```
localStorage.clear()
location.reload()
```

### Debug Protected Routes
```
1. Go to: http://localhost:3000/dashboard
2. Open DevTools Network tab
3. Refresh page
4. Check if redirects to /login
```

## Color Reference

```css
/* Quick copy-paste for new components */

/* Background */
className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"

/* Card */
className="bg-slate-800 border border-slate-700 rounded-lg"

/* Button Primary */
className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-full hover:shadow-xl hover:shadow-cyan-500/50"

/* Input */
className="bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-3 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50"

/* Link */
className="text-cyan-400 hover:text-cyan-300"
```

## Next Steps

1. ✅ Test the authentication system
2. ✅ Review the code structure
3. 📝 Plan backend API integration
4. 🔨 Build questionnaire pages
5. 🎨 Customize branding/colors
6. 🚀 Deploy to staging

## Resources

- **Full Documentation**: `AUTH_SYSTEM_README.md`
- **Testing Guide**: `TESTING_GUIDE.md`
- **Implementation Details**: `IMPLEMENTATION_SUMMARY.md`

## Support

Having issues? Check:
1. Console errors (F12)
2. Network tab in DevTools
3. localStorage data
4. Server terminal output

## Demo Credentials

```
Customer Account:
- Create your own via /signup

Admin Account:
- Email: admin@certifypro.com
- Password: Admin@123
```

---

**That's it! You're ready to go! 🎉**

Start exploring the authentication system and test all the features.

**Pro Tip**: Open DevTools (F12) and watch the Console tab while testing to see validation messages and auth state changes.

