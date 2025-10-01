# Fix Admin Login - Quick Solution

## ⚠️ Problem
The old admin email (`admin@certifypro.com`) is cached in localStorage. We need to clear it to use the new admin email (`prathik@gmail.com`).

## ✅ SOLUTION - Do This Now!

### Easy Fix (30 Seconds)

1. **Open your browser** at `http://localhost:3001`

2. **Press F12** to open Developer Tools

3. **Click the Console tab**

4. **Copy and paste this command:**
   ```javascript
   localStorage.clear(); location.reload();
   ```

5. **Press Enter**

6. The page will refresh automatically ✅

7. **Now try admin login:**
   - Go to `/login`
   - Click "Admin Login" tab
   - Email: `prathik@gmail.com`
   - Password: `Admin@123`
   - Click "Admin Sign In"

**Done! It should work now!** 🎉

---

## Alternative Methods

### Method 2: Application Tab
1. Open `http://localhost:3001`
2. Press `F12` → Go to **Application** tab
3. Click **Local Storage** → `http://localhost:3001`
4. Right-click → **Clear**
5. Refresh page (`Cmd+R` or `Ctrl+R`)

### Method 3: Incognito Window
1. Open **Incognito/Private window**
2. Go to `http://localhost:3001/login`
3. Login with new credentials (no clearing needed)

## New Admin Credentials

```
Email: prathik@gmail.com
Password: Admin@123
```

## How to Login as Admin

1. Go to: `http://localhost:3001/login`
2. Click the **"Admin Login"** tab (not Customer Login)
3. Enter:
   - Email: `prathik@gmail.com`
   - Password: `Admin@123`
4. Click **"Admin Sign In"**
5. ✅ Should redirect to admin dashboard

## Verify It's Working

After clearing localStorage:
1. Go to `http://localhost:3001/login`
2. Switch to "Admin Login" tab
3. Try the new credentials
4. You should see "Welcome back, Admin User!" message
5. Should redirect to admin dashboard

## Why This Happened

The authentication system uses localStorage to store mock user data. When we changed the admin email in the code from `admin@certifypro.com` to `prathik@gmail.com`, the old data was still cached in your browser.

Clearing localStorage forces the app to reinitialize with the new admin credentials.

## Prevent This in Future

If you change admin credentials again, always clear localStorage:
```javascript
localStorage.clear();
```

Or use the helper function in console:
```javascript
resetAuth();
```

---

**Quick Command:**
```javascript
// Paste this in browser console
localStorage.clear(); location.reload();
```

Then login with `prathik@gmail.com` / `Admin@123` ✅

