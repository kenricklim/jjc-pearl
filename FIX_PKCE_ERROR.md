# Fix: PKCE Code Verifier Not Found Error

## Problem
Error: "PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared."

## Root Cause
The PKCE (Proof Key for Code Exchange) code verifier needs to be stored in cookies (not localStorage) for Next.js SSR to work properly. The server-side callback can't access localStorage.

## Solution Applied

### 1. Simplified Client Creation
Updated `lib/supabase/client.ts` to use `createBrowserClient` from `@supabase/ssr` which automatically handles cookies for PKCE.

### 2. Important Notes

**The `@supabase/ssr` package automatically:**
- Stores PKCE code verifier in cookies (not localStorage)
- Makes it accessible to both client and server
- Handles cookie management properly

## Additional Steps to Fix

### Step 1: Clear All Cookies and Storage

1. Open DevTools (F12)
2. Go to **Application** tab
3. **Clear site data:**
   - Click "Clear site data" button
   - Or manually:
     - Delete all cookies for `localhost:3000`
     - Delete all cookies for `atxgemaclzcvyqhlysvv.supabase.co`
     - Clear Local Storage
     - Clear Session Storage

### Step 2: Restart Dev Server

```bash
# Stop server (Ctrl+C)
npm run dev
```

### Step 3: Try Login in Incognito/Private Mode

This ensures no cached data interferes:
1. Open incognito/private window
2. Go to http://localhost:3000/login
3. Try Google login

### Step 3: Verify Cookie Settings

Make sure your browser allows cookies:
- Chrome: Settings > Privacy and security > Cookies and other site data
- Make sure "Allow all cookies" or "Block third-party cookies" (but allow first-party)

## How It Works Now

1. **User clicks "Sign in with Google"**
   - Client creates PKCE code verifier
   - Stores it in **cookies** (via @supabase/ssr)
   - Redirects to Google

2. **Google redirects back to `/auth/callback`**
   - Server can read PKCE code verifier from **cookies**
   - Exchanges code for session
   - Sets session cookies
   - Redirects to `/community`

3. **User is logged in**
   - Session cookies are set
   - User stays logged in

## Testing

1. **Clear all cookies** (see Step 1 above)
2. **Restart dev server**
3. **Go to:** http://localhost:3000/login
4. **Click:** "Sign in with Google"
5. **Complete Google sign-in**
6. **Expected:** Should redirect to `/community` and stay logged in

## If Still Not Working

### Check 1: Verify @supabase/ssr Version
```bash
npm list @supabase/ssr
```
Should show version `0.1.0` or higher.

### Check 2: Check Browser Console
1. Open DevTools (F12)
2. Go to **Application** > **Cookies**
3. After clicking "Sign in with Google", check if cookies are being set
4. Look for cookies starting with `sb-` or `supabase.auth`

### Check 3: Check Network Tab
1. Open DevTools (F12) > **Network** tab
2. Try login
3. Check the `/auth/callback` request
4. Look at **Request Headers** - should include cookies

### Check 4: Terminal Logs
Check your terminal (where `npm run dev` is running) for:
- Cookie-related errors
- PKCE errors
- Session exchange errors

## Common Issues

### Issue: Cookies Still Not Working
**Solution:**
- Try different browser
- Check browser extensions (ad blockers, privacy tools)
- Disable extensions temporarily

### Issue: "Code verifier not found" Still Appears
**Solution:**
1. Make sure you're using `createBrowserClient` from `@supabase/ssr` (not `createClient` from `@supabase/supabase-js`)
2. Clear all cookies and try again
3. Check that cookies are being set (DevTools > Application > Cookies)

### Issue: Session Not Persisting
**Solution:**
- Check cookie expiration settings
- Verify SameSite cookie settings
- Check if browser is blocking third-party cookies

---

**The fix has been applied. Clear cookies, restart server, and try again!**

