# Debug Authentication Issues

## Current Issue: `error=auth_failed`

The auth callback is failing. Here's how to debug:

## Step 1: Check Server Logs

When you try to login, check your terminal (where `npm run dev` is running) for error messages. The callback route now logs:
- Error details when code exchange fails
- User verification errors
- Success messages

## Step 2: Check Browser Console

1. Open DevTools (F12)
2. Go to **Console** tab
3. Try logging in
4. Look for error messages

## Step 3: Check Network Tab

1. Open DevTools (F12)
2. Go to **Network** tab
3. Try logging in
4. Find the `/auth/callback` request
5. Click on it
6. Check:
   - **Status**: Should be 302 (redirect) or 200
   - **Response**: Check what it returns
   - **Headers**: Check cookies being set

## Step 4: Common Issues

### Issue: "Error exchanging code for session"

**Possible causes:**
1. **Code already used** - OAuth codes can only be used once
   - Solution: Try logging in again (fresh code)

2. **Code expired** - OAuth codes expire quickly
   - Solution: Make sure you complete login quickly

3. **Redirect URI mismatch** - Must match exactly
   - Check Google Cloud Console
   - Check Supabase Dashboard > Authentication > Providers > Google
   - Must be: `https://atxgemaclzcvyqhlysvv.supabase.co/auth/v1/callback`

4. **Invalid credentials** - Client ID/Secret mismatch
   - Verify in Supabase Dashboard
   - Verify in Google Cloud Console

### Issue: "No session created"

**Possible causes:**
1. **Supabase project paused** - Check project status
2. **RLS blocking** - Check Row Level Security policies
3. **Database issue** - Check Supabase logs

## Step 5: Verify Supabase Configuration

1. Go to Supabase Dashboard
2. **Authentication** > **Providers** > **Google**
3. Verify:
   - ✅ Enabled (toggle ON)
   - ✅ Client ID matches Google Cloud Console
   - ✅ Client Secret matches Google Cloud Console

## Step 6: Test with Fresh Session

1. **Clear all cookies:**
   - DevTools > Application > Cookies
   - Delete all for `localhost:3000`
   - Delete all for `atxgemaclzcvyqhlysvv.supabase.co`

2. **Try incognito/private mode:**
   - Eliminates extension interference

3. **Try different browser:**
   - Test in Chrome, Firefox, or Edge

## Step 7: Check Supabase Logs

1. Go to Supabase Dashboard
2. **Logs** > **Auth Logs**
3. Look for errors during login attempt
4. Check timestamps match your login attempt

## Debugging Code Added

The callback route now includes:
- Detailed error logging
- User verification
- Success confirmation

Check your terminal for these logs when testing.

## Quick Test

1. Clear cookies
2. Go to `/login`
3. Click "Sign in with Google"
4. Complete Google sign-in
5. **Watch terminal** for error messages
6. **Check browser console** for errors
7. **Check Network tab** for failed requests

## If Still Failing

Share:
1. Error message from terminal
2. Error message from browser console
3. Status code from Network tab (`/auth/callback` request)
4. Any Supabase log errors

---

**The callback route has been improved with better error handling. Check your terminal logs for specific error messages!**

