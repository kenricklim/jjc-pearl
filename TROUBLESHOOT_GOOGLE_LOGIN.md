# Troubleshooting Google Login

If Google login is not working, follow these steps to diagnose and fix the issue.

## 🔍 Step 1: Check Supabase Configuration

### Verify Environment Variables

1. Check if `.env.local` exists in project root
2. Open `.env.local` and verify:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```
3. **Important:** Restart dev server after changing env vars:
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

### Verify Supabase Project

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Check your project is active
3. Go to **Settings** > **API**
4. Verify your Project URL matches `.env.local`

## 🔍 Step 2: Check Google OAuth Setup

### In Supabase Dashboard

1. Go to **Authentication** > **Providers**
2. Find **Google** provider
3. Check:
   - [ ] Google provider is **Enabled** (toggle is ON)
   - [ ] **Client ID (for OAuth)** is filled in
   - [ ] **Client Secret (for OAuth)** is filled in
   - [ ] No error messages shown

### In Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to **APIs & Services** > **Credentials**
4. Find your OAuth 2.0 Client ID
5. Check **Authorized redirect URIs** includes:
   ```
   https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
   ```
   - Replace `YOUR_PROJECT_REF` with your actual Supabase project reference
   - Find this in Supabase Dashboard > Settings > API > Project URL

## 🔍 Step 3: Check Browser Console

1. Open browser DevTools (F12)
2. Go to **Console** tab
3. Try to login
4. Look for error messages

**Common errors:**
- `redirect_uri_mismatch` → Redirect URI doesn't match in Google Cloud Console
- `invalid_client` → Client ID or Secret is wrong
- `access_denied` → User denied permission

## 🔍 Step 4: Check Network Tab

1. Open browser DevTools (F12)
2. Go to **Network** tab
3. Try to login
4. Look for failed requests (red entries)
5. Click on failed requests to see error details

## 🔍 Step 5: Verify Redirect URL

The redirect URL must match **exactly**:

**Format:**
```
https://[YOUR_PROJECT_REF].supabase.co/auth/v1/callback
```

**To find YOUR_PROJECT_REF:**
1. Go to Supabase Dashboard
2. Settings > API
3. Look at Project URL
4. Extract the part before `.supabase.co`

**Example:**
- If Project URL is: `https://abcdefghijklmnop.supabase.co`
- Redirect URI should be: `https://abcdefghijklmnop.supabase.co/auth/v1/callback`

## ✅ Common Fixes

### Fix 1: Redirect URI Mismatch

**Problem:** `redirect_uri_mismatch` error

**Solution:**
1. Go to Google Cloud Console > Credentials
2. Edit your OAuth 2.0 Client ID
3. In **Authorized redirect URIs**, add:
   ```
   https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
   ```
4. Make sure it matches **exactly** (no trailing slash, correct protocol)
5. Click **Save**
6. Wait 1-2 minutes for changes to propagate
7. Try login again

### Fix 2: Invalid Client ID/Secret

**Problem:** `invalid_client` error

**Solution:**
1. Go to Google Cloud Console
2. Copy fresh Client ID and Client Secret
3. Go to Supabase Dashboard > Authentication > Providers > Google
4. Paste the credentials again
5. Click **Save**
6. Try login again

### Fix 3: OAuth Consent Screen Not Configured

**Problem:** Error about consent screen

**Solution:**
1. Go to Google Cloud Console
2. Go to **APIs & Services** > **OAuth consent screen**
3. Complete the setup:
   - App name: "JJC Puerto Princesa Perlas"
   - User support email: Your email
   - Developer contact: Your email
4. Save and continue through all steps
5. Try login again

### Fix 4: Environment Variables Not Loaded

**Problem:** "Supabase is not configured" message

**Solution:**
1. Verify `.env.local` exists
2. Check file contents are correct
3. **Restart dev server:**
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```
4. Clear browser cache
5. Try again

## 🧪 Test Steps

1. **Clear browser cache and cookies**
2. **Open incognito/private window**
3. **Go to:** http://localhost:3000/login
4. **Click:** "Sign in with Google"
5. **Expected:** Redirects to Google sign-in page
6. **After signing in:** Should redirect back to `/community`

## 📋 Checklist

Before reporting an issue, verify:

- [ ] `.env.local` file exists with correct values
- [ ] Dev server was restarted after changing env vars
- [ ] Google OAuth is enabled in Supabase Dashboard
- [ ] Client ID and Secret are correct in Supabase
- [ ] Redirect URI matches exactly in Google Cloud Console
- [ ] OAuth consent screen is configured
- [ ] No errors in browser console
- [ ] No failed network requests

## 🆘 Still Not Working?

If login still doesn't work after trying all fixes:

1. **Check Supabase Logs:**
   - Go to Supabase Dashboard
   - Check **Logs** > **Auth Logs**
   - Look for error messages

2. **Check Google Cloud Console Logs:**
   - Go to Google Cloud Console
   - Check **APIs & Services** > **Dashboard**
   - Look for errors

3. **Verify Project Status:**
   - Check Supabase project is not paused
   - Check Google Cloud project is active
   - Verify billing (if applicable)

4. **Test with Different Browser:**
   - Try Chrome, Firefox, or Edge
   - Clear all cookies and cache

---

**Need more help?** Check the main `SETUP.md` for detailed OAuth setup instructions.

