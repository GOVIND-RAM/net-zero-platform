# Quick Testing Guide - Authentication System

## 🚀 Getting Started

1. **Start the app**: `npm start`
2. **Open browser**: `http://localhost:3000`

## 🧪 Test Scenarios

### Scenario 1: New User Signup
1. Click "Get Started" or navigate to `/signup`
2. Fill in the form:
   ```
   Name: John Doe
   Email: john@example.com
   Password: Test@123
   Confirm Password: Test@123
   Organization: Test Corp (optional)
   ✓ Agree to Terms
   ```
3. Click "Create Account"
4. ✅ Should redirect to dashboard with 14 certification types

### Scenario 2: Customer Login
1. Navigate to `/login`
2. Ensure "Customer Login" tab is selected
3. Enter credentials:
   ```
   Email: john@example.com
   Password: Test@123
   ```
4. Click "Sign In"
5. ✅ Should show success message and redirect to dashboard

### Scenario 3: Admin Login
1. Navigate to `/login`
2. Switch to "Admin Login" tab
3. Enter admin credentials:
   ```
   Email: admin@certifypro.com
   Password: Admin@123
   ```
4. Click "Admin Sign In"
5. ✅ Should redirect to admin dashboard (placeholder)

### Scenario 4: Protected Routes
1. **Logout** from dashboard (click avatar → Logout)
2. Try to access `/dashboard` directly
3. ✅ Should redirect to `/login`

### Scenario 5: Form Validation
1. Go to `/signup`
2. Try to submit with:
   - Empty fields → ✅ Shows "required" errors
   - Invalid email → ✅ Shows email format error
   - Weak password → ✅ Shows password requirements
   - Mismatched passwords → ✅ Shows "passwords don't match"
   - No terms agreement → ✅ Shows terms error

### Scenario 6: Password Strength Indicator
1. Go to `/signup`
2. Type in password field:
   - `test` → ✅ Red bar (Weak)
   - `Test123` → ✅ Yellow bar (Medium)
   - `Test@123` → ✅ Green bar (Strong)

### Scenario 7: Dashboard Interactions
1. Login as customer
2. On dashboard:
   - Click any certification type → ✅ Navigate to questionnaire
   - Click "Add new" → ✅ Show modal
   - Click avatar → ✅ Show dropdown menu
   - Click "Logout" → ✅ Redirect to landing page

### Scenario 8: Navigation Flow
1. Landing page → Click "Login" → ✅ Go to `/login`
2. Landing page → Click "Get Started" → ✅ Go to `/signup`
3. Login page → Click "Sign up" link → ✅ Go to `/signup`
4. Signup page → Click "Log in" link → ✅ Go to `/login`
5. Login page → Click "Forgot password?" → ✅ Go to `/forgot-password`

### Scenario 9: Responsive Design
1. **Desktop** (> 1024px):
   - ✅ Split screen layout
   - ✅ Large form fields
   - ✅ 4-column dashboard grid

2. **Tablet** (768px - 1024px):
   - ✅ Split screen maintained
   - ✅ 3-column dashboard grid

3. **Mobile** (< 768px):
   - ✅ Stacked vertical layout
   - ✅ Full-width forms
   - ✅ 2-column dashboard grid

### Scenario 10: Session Persistence
1. Login as customer
2. Refresh the page
3. ✅ Should remain logged in
4. Close browser and reopen
5. Navigate to `/dashboard`
6. ✅ Should still be logged in (until token expires)

## 🎨 Visual Checks

### Auth Pages (Login/Signup)
- ✅ Gradient background (slate-900 → blue-900 → slate-900)
- ✅ Split screen on desktop
- ✅ Benefits list with checkmarks on left side
- ✅ Form on right with glass effect (backdrop-blur)
- ✅ Cyan/blue gradient buttons
- ✅ Smooth animations on page load

### Dashboard
- ✅ White navbar with CertifyPro logo
- ✅ Light gray background (bg-slate-100)
- ✅ White cards with slate borders
- ✅ Hover effects (cyan border, shadow, lift)
- ✅ User avatar with dropdown
- ✅ Grid layout responsive

### Forms
- ✅ Icons in input fields (left side)
- ✅ Show/hide password toggle (eye icon)
- ✅ Focus states (cyan border + glow)
- ✅ Error messages in red below fields
- ✅ Success messages in green

## 🐛 Common Issues & Solutions

### Issue: Token expired
**Solution**: Logout and login again

### Issue: Can't access dashboard
**Solution**: Check if logged in, clear localStorage and try again

### Issue: Form not submitting
**Solution**: Check console for validation errors

### Issue: Page not found (404)
**Solution**: Ensure you're using the correct routes

### Issue: Styling looks wrong
**Solution**: Check if Tailwind CSS is compiled correctly

## 📱 Browser Testing

Test on:
- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔐 Security Testing

1. **Token Expiration**: Wait 24 hours → ✅ Should require re-login
2. **Admin Route Protection**: Login as customer, try `/admin` → ✅ Redirect to dashboard
3. **Password Hashing**: Check localStorage → ✅ Passwords are hashed
4. **XSS Prevention**: Try entering `<script>` in forms → ✅ Sanitized

## ✅ Production Readiness Checklist

- [x] All forms validate properly
- [x] Protected routes work correctly
- [x] Responsive on all screen sizes
- [x] Animations are smooth
- [x] No console errors
- [x] Accessible with keyboard navigation
- [x] Loading states show during async operations
- [x] Error handling is graceful
- [ ] Backend API integration (next phase)
- [ ] Real email verification (next phase)
- [ ] Google OAuth functional (next phase)

## 📝 Notes

- Mock authentication uses localStorage
- Default admin: `admin@certifypro.com` / `Admin@123`
- Tokens expire after 24 hours
- Passwords are hashed with bcryptjs
- Google Sign-In is placeholder (not functional yet)

---

**Happy Testing! 🎉**

