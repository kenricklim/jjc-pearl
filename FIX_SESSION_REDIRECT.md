# Fix: Google Login Redirects Back to Login

## Problem
After signing in with Google, the user profile is created in Supabase, but the user is redirected back to the login page instead of staying logged in.

## Root Cause
The auth callback route wasn't properly setting session cookies when exchanging the OAuth code for a session.

## Solution Applied

### 1. Fixed Auth Callback Route
Updated `app/auth/callback/route.ts` to:
- Properly create a server client with cookie handling
- Exchange the code for a session
- Verify the session was created
- Set cookies correctly in the response

### 2. Additional Steps to Try

If the issue persists after the fix:

#### Step 1: Clear Browser Data
1. Open browser DevTools (F12)
2. Go to **Application** tab (Chrome) or **Storage** tab (Firefox)
3. Click **Clear site data**
4. Or manually delete cookies for `localhost:3000`

#### Step 2: Check Browser Console
1. After trying to login, check browser console (F12)
2. Look for any cookie-related errors
3. Check Network tab for failed requests

#### Step 3: Verify Cookie Settings
The callback now properly sets cookies. If still not working:

1. Check if cookies are being blocked:
   - Browser settings > Privacy > Cookies
   - Make sure localhost cookies are allowed

2. Try in incognito/private mode:
   - This eliminates extension interference

#### Step 4: Check Supabase Session
1. Go to Supabase Dashboard
2. Authentication > Users
3. Find your user
4. Check if session exists

#### Step 5: Verify Environment Variables
Make sure `.env.local` has correct values:
```env
NEXT_PUBLIC_SUPABASE_URL=https://atxgemaclzcvyqhlysvv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-key-here
```

**Important:** Restart dev server after changing env vars:
```bash
# Stop server (Ctrl+C)
npm run dev
```

## Testing the Fix

1. **Clear browser cache and cookies**
2. **Go to:** http://localhost:3000/login
3. **Click:** "Sign in with Google"
4. **Complete Google sign-in**
5. **Expected:** Should redirect to `/community` and stay logged in

## If Still Not Working

### Check These:

1. **Browser Console Errors:**
   - Open DevTools (F12) > Console
   - Look for red error messages
   - Share any errors you see

2. **Network Tab:**
   - Open DevTools (F12) > Network
   - Try login again
   - Look for failed requests (red)
   - Check the `/auth/callback` request

3. **Supabase Logs:**
   - Go to Supabase Dashboard
   - Check **Logs** > **Auth Logs**
   - Look for errors during login

4. **Cookie Inspection:**
   - Open DevTools (F12) > Application > Cookies
   - Check if Supabase cookies are being set
   - Look for cookies starting with `sb-`

## Common Issues

### Issue: Cookies Not Being Set
**Solution:** 
- Check browser cookie settings
- Try different browser
- Check if extensions are blocking cookies

### Issue: Session Expires Immediately
**Solution:**
- Check Supabase project settings
- Verify JWT expiration settings
- Check if RLS policies are blocking

### Issue: Redirect Loop
**Solution:**
- Clear all cookies
- Check middleware isn't redirecting incorrectly
- Verify `/auth/callback` is excluded from middleware checks

## Debug Mode

To see what's happening, add this to `app/auth/callback/route.ts` temporarily:

```typescript
console.log("Code:", code);
console.log("Session data:", data);
console.log("Error:", error);
```

Then check your terminal (where `npm run dev` is running) for logs.

---

**The fix has been applied. Try logging in again and let me know if it works!**

