# Authentication System Documentation

## Overview

This is a complete authentication system for the Net Zero Certification Platform with login, signup, and dashboard selection functionality. The system uses React, TypeScript, React Router, and local storage for mock authentication.

## Features

✅ **Complete Authentication Flow**
- User signup with validation
- Customer and admin login (tabbed interface)
- Password strength indicator
- Remember me functionality
- Forgot password page (placeholder)
- Protected routes with authentication checks

✅ **Design System**
- Matches existing color scheme (slate/cyan/blue gradients)
- Fully responsive (mobile, tablet, desktop)
- Smooth animations with Framer Motion
- Split-screen auth layout
- Modern UI components

✅ **Security Features**
- Password hashing with bcryptjs
- JWT-like token generation
- Token expiration (24 hours)
- Protected routes for authenticated users
- Admin-only routes

✅ **State Management**
- React Context API for authentication state
- Persistent sessions with localStorage
- Real-time auth state updates

## File Structure

```
src/
├── types/
│   └── index.ts                          # TypeScript interfaces
├── utils/
│   ├── auth.ts                          # Authentication utilities
│   └── validation.ts                     # Form validation
├── context/
│   └── AuthContext.tsx                   # Authentication context
├── components/
│   ├── auth/
│   │   ├── AuthLayout.tsx               # Auth page wrapper
│   │   ├── LoginForm.tsx                # Login form component
│   │   ├── SignupForm.tsx               # Signup form component
│   │   └── GoogleSignInButton.tsx       # Google sign-in button
│   ├── dashboard/
│   │   └── CertificationTypeCard.tsx    # Certification type card
│   ├── common/
│   │   └── ProtectedRoute.tsx           # Protected route wrapper
│   └── Navbar.tsx                        # Updated navbar with routing
├── pages/
│   ├── LandingPage.tsx                  # Landing page
│   ├── LoginPage.tsx                    # Login page
│   ├── SignupPage.tsx                   # Signup page
│   ├── ForgotPasswordPage.tsx           # Forgot password page
│   └── DashboardSelection.tsx           # Certification type selection
└── App.tsx                               # Main app with routing
```

## Routes

### Public Routes
- `/` - Landing page
- `/login` - Login page (customer/admin tabs)
- `/signup` - Signup page
- `/forgot-password` - Forgot password page

### Protected Routes (Customer)
- `/dashboard` - Dashboard selection page
- `/certification/questionnaire` - Questionnaire page (placeholder)

### Protected Routes (Admin)
- `/admin/*` - Admin dashboard (placeholder)

## Getting Started

### 1. Installation
Dependencies are already installed. If needed:
```bash
npm install
```

### 2. Start Development Server
```bash
npm start
```

The app will open at `http://localhost:3000`

## Usage Guide

### Testing the Authentication System

#### 1. **Create a New Account**
- Go to `/signup`
- Fill in all required fields:
  - Full Name (min 3 characters)
  - Email (valid email format)
  - Password (min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char)
  - Confirm Password
  - Agree to Terms
- Click "Create Account"
- You'll be redirected to the dashboard

#### 2. **Login as Customer**
- Go to `/login`
- Ensure "Customer Login" tab is active
- Enter your email and password
- Click "Sign In"
- You'll be redirected to the dashboard

#### 3. **Login as Admin**
- Go to `/login`
- Switch to "Admin Login" tab
- Use default admin credentials:
  - Email: `admin@certifypro.com`
  - Password: `Admin@123`
- Click "Admin Sign In"
- You'll be redirected to the admin dashboard

#### 4. **Dashboard Selection**
- After login, you'll see 14 certification types
- Click any card to navigate to the questionnaire (placeholder)
- Click "Add new" to request a new certification type
- Click your avatar (top right) to:
  - View profile
  - Access settings
  - Logout

## Mock Authentication System

The authentication system uses localStorage to simulate a backend:

### Storage Keys
- `authToken` - Authentication token
- `userData` - User information
- `userType` - User type (customer/admin)
- `mockUsers` - Mock user database

### Default Admin Account
- Email: `prathik@gmail.com`
- Password: `Admin@123`
- Type: admin

### Token Expiration
Tokens expire after 24 hours. Users will need to login again.

## Form Validation

### Email Validation
- Required field
- Must be valid email format
- Error: "Please enter a valid email address"

### Name Validation
- Required field
- Minimum 3 characters
- Only letters and spaces
- Error: "Name must be at least 3 characters long"

### Password Validation (Signup)
Password must contain:
- ✓ At least 8 characters
- ✓ At least 1 uppercase letter
- ✓ At least 1 lowercase letter
- ✓ At least 1 number
- ✓ At least 1 special character

### Password Strength Indicator
- **Weak** (Red): 1-2 requirements met
- **Medium** (Yellow): 3-4 requirements met
- **Strong** (Green): All requirements met

## Color Scheme

The authentication system uses these colors to match the landing page:

```css
/* Backgrounds */
bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900  /* Main background */
bg-slate-800                                                  /* Card backgrounds */
bg-slate-900                                                  /* Form containers */

/* Accents */
text-cyan-400, bg-cyan-500, from-cyan-500 to-blue-600       /* Primary accent */
text-blue-500, bg-blue-600                                   /* Secondary accent */

/* Text */
text-white, text-slate-300, text-slate-400                   /* Text colors */

/* Borders */
border-slate-700, border-cyan-500/30                         /* Border colors */

/* Hover Effects */
hover:border-cyan-500, hover:shadow-cyan-500/50              /* Hover states */
```

## Responsive Design

### Desktop (1024px+)
- Split screen layout (50/50)
- Large form fields and spacing
- 4-column dashboard grid

### Tablet (768px - 1024px)
- Split screen layout (40/60)
- 3-column dashboard grid
- Slightly reduced padding

### Mobile (< 768px)
- Stacked vertical layout
- Full-width forms
- 2-column or single-column dashboard grid
- Condensed branding section

## Animation Details

### Page Load
- Fade in effect (opacity 0 → 1)
- Slide up from bottom (y: 20 → 0)

### Form Interactions
- Input focus: Border color transition + ring glow
- Button hover: Scale transform (1.02) + shadow increase
- Submit: Loading spinner animation

### Dashboard Cards
- Hover: Border color change + lift effect (translateY -4px)
- Click: Scale down (0.98)
- Icon color change on hover

### Transitions
- Duration: 200-400ms
- Easing: CSS ease-out

## Testing Checklist

- [x] Signup form validation works correctly
- [x] Login form switches between customer/admin
- [x] Dashboard shows after successful login
- [x] Protected routes redirect to login when not authenticated
- [x] Logout clears session and redirects to landing page
- [x] Responsive design works on all screen sizes
- [x] Password strength indicator works
- [x] Form error messages display correctly
- [x] Navigation between pages works smoothly
- [x] Mock authentication stores/retrieves data

## API Integration (Future)

To integrate with a real backend:

1. **Update `src/utils/auth.ts`**
   - Replace localStorage calls with API calls
   - Use real JWT tokens
   - Implement proper password hashing on backend

2. **Update `src/context/AuthContext.tsx`**
   - Replace mock functions with API calls
   - Handle API errors properly
   - Implement token refresh logic

3. **Add Environment Variables**
   ```
   REACT_APP_API_URL=https://api.example.com
   ```

4. **Implement Google OAuth**
   - Set up Google OAuth credentials
   - Implement OAuth flow in `googleSignIn` function

## Known Limitations

1. **Mock Authentication**: Uses localStorage instead of real backend
2. **Google Sign-In**: Placeholder button (not functional)
3. **Forgot Password**: UI only, no email sending
4. **Questionnaire Page**: Placeholder page
5. **Admin Dashboard**: Placeholder page

## Next Steps

1. Integrate with real backend API
2. Implement Google OAuth
3. Add email verification
4. Build questionnaire pages for each certification type
5. Create admin dashboard with management features
6. Add 2FA for admin accounts
7. Implement password reset via email

## Support

For issues or questions:
1. Check console for error messages
2. Verify localStorage data in browser DevTools
3. Check network tab for routing issues
4. Clear localStorage if experiencing session issues

## License

This project is part of the Net Zero Certification Platform.

---

**Built with:** React 19, TypeScript, React Router 6, Tailwind CSS, Framer Motion, Lucide Icons

