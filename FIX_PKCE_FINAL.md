# Final Fix: PKCE Code Verifier Error

## Problem
"PKCE code verifier not found in storage" error persists even after fixes.

## Root Cause
The `@supabase/ssr` package version might be outdated, or cookies aren't being properly shared between client and server.

## Solution Applied

### 1. Updated @supabase/ssr Package
Updated from `^0.1.0` to `^0.5.1` in `package.json` for better cookie handling.

### 2. Simplified Client Creation
Removed manual cookie handling - `createBrowserClient` from `@supabase/ssr` handles it automatically.

## Steps to Fix

### Step 1: Update Dependencies

```bash
npm install
```

This will install the updated `@supabase/ssr` version.

### Step 2: Clear Everything

1. **Stop dev server** (Ctrl+C)

2. **Clear browser data:**
   - Open DevTools (F12)
   - Application tab > Clear site data
   - Or manually delete:
     - All cookies for `localhost:3000`
     - All cookies for `atxgemaclzcvyqhlysvv.supabase.co`
     - Local Storage
     - Session Storage

3. **Clear Next.js cache:**
   ```bash
   # Delete .next folder
   rm -rf .next
   # Or on Windows PowerShell:
   Remove-Item -Recurse -Force .next
   ```

### Step 3: Restart Dev Server

```bash
npm run dev
```

### Step 4: Test in Fresh Browser

1. **Use incognito/private mode** (cleanest test)
2. Go to http://localhost:3000/login
3. Click "Sign in with Google"
4. Complete sign-in

## How PKCE Works with Cookies

1. **User clicks "Sign in with Google"**
   - `createBrowserClient` generates PKCE code verifier
   - Stores it in a **cookie** (not localStorage)
   - Cookie is accessible to both client and server

2. **Google redirects to `/auth/callback`**
   - Server reads PKCE code verifier from **cookies**
   - Exchanges code for session
   - Sets session cookies

3. **User is logged in**
   - Session persists in cookies

## Verification

After updating, check that cookies are being set:

1. **Before clicking "Sign in with Google":**
   - DevTools > Application > Cookies
   - Should be empty or minimal

2. **After clicking "Sign in with Google" (before redirect):**
   - Check cookies for `localhost:3000`
   - Should see cookies starting with `sb-` or `supabase.auth`
   - Look for PKCE-related cookies

3. **After redirect back from Google:**
   - Check cookies again
   - Should see session cookies

## If Still Not Working

### Check 1: Verify Package Update

```bash
npm list @supabase/ssr
```

Should show version `0.5.1` or higher.

### Check 2: Check Cookie Settings

Make sure your browser allows cookies:
- **Chrome:** Settings > Privacy > Cookies > Allow all cookies
- **Firefox:** Settings > Privacy > Cookies > Accept cookies
- **Edge:** Settings > Cookies > Allow all cookies

### Check 3: Check Browser Extensions

Some extensions block cookies:
- Ad blockers
- Privacy tools
- Cookie managers

**Test:** Disable extensions temporarily

### Check 4: Check SameSite Cookie Policy

If cookies are being blocked due to SameSite policy:
- Try accessing via `http://localhost:3000` (not `https://`)
- Check if you're using any proxy/VPN

### Check 5: Terminal Logs

Check your terminal (where `npm run dev` runs) for:
- Cookie-related errors
- PKCE errors
- Any warnings

## Alternative: Manual Cookie Check

If cookies still aren't working, you can verify manually:

1. **Open DevTools** (F12)
2. **Application** > **Cookies** > `http://localhost:3000`
3. **Click "Sign in with Google"**
4. **Before redirect**, check if cookies appear
5. **If no cookies appear**, there's a browser/extension blocking them

## Expected Behavior

After the fix:
- ✅ PKCE code verifier stored in cookies
- ✅ Server can read code verifier
- ✅ Session exchange succeeds
- ✅ User stays logged in

---

**After running `npm install` and clearing cache, try again!**

