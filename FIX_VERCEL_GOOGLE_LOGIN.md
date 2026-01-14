# Fix Google Login on Vercel

If Google sign-in is not working on your Vercel deployment, follow these steps.

## 🔴 The Problem

When you deploy to Vercel, Google OAuth needs to know about your Vercel domain. The error you're seeing (redirecting to localhost) happens because:

1. **Environment variables** might not be set in Vercel
2. **Google Cloud Console** needs your Vercel domain in authorized origins
3. **Supabase** needs to allow your Vercel domain

## ✅ Step-by-Step Fix

### Step 1: Add Environment Variables to Vercel

1. Go to your Vercel project dashboard
2. Click on **Settings** → **Environment Variables**
3. Add these two variables:

   **Variable 1:**
   - **Key:** `NEXT_PUBLIC_SUPABASE_URL`
   - **Value:** Your Supabase project URL (e.g., `https://abcdefghijklmnop.supabase.co`)
   - **Environments:** Select "All Environments" (or Production, Preview, Development)

   **Variable 2:**
   - **Key:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value:** Your Supabase anon key (from Supabase Dashboard → Settings → API)
   - **Environments:** Select "All Environments"

4. Click **Save**
5. **Important:** Vercel will automatically redeploy after saving

### Step 2: Find Your Vercel Domain

1. Go to your Vercel project dashboard
2. Look at the top of the page - you'll see your domain
3. It will be something like:
   - `your-project-name.vercel.app` (default)
   - Or your custom domain if you've set one up

**Example domains:**
- `jjc-perlas.vercel.app`
- `www.yourdomain.com` (if you have a custom domain)

### Step 3: Update Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to **APIs & Services** → **Credentials**
4. Find your **OAuth 2.0 Client ID** and click to edit it
5. In **Authorized JavaScript origins**, click **+ ADD URI** and add:
   ```
   https://your-vercel-domain.vercel.app
   ```
   - Replace `your-vercel-domain` with your actual Vercel domain
   - If you have a custom domain, add that too:
     ```
     https://www.yourdomain.com
     ```
6. In **Authorized redirect URIs**, make sure you have:
   ```
   https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
   ```
   - Replace `YOUR_PROJECT_REF` with your Supabase project reference
   - Find this in Supabase Dashboard → Settings → API → Project URL
   - Example: If your Project URL is `https://abcdefghijklmnop.supabase.co`
   - Then the redirect URI is: `https://abcdefghijklmnop.supabase.co/auth/v1/callback`
7. Click **Save**
8. **Wait 1-2 minutes** for changes to propagate

### Step 4: Verify Supabase Configuration

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Authentication** → **URL Configuration**
4. Under **Site URL**, make sure it includes your Vercel domain:
   ```
   https://your-vercel-domain.vercel.app
   ```
5. Under **Redirect URLs**, add:
   ```
   https://your-vercel-domain.vercel.app/auth/callback
   ```
   - Click **+ Add URL** if needed
6. Click **Save**

### Step 5: Redeploy on Vercel

After making all changes:

1. Go to your Vercel project dashboard
2. Go to **Deployments** tab
3. Click the **⋯** (three dots) on the latest deployment
4. Click **Redeploy**
5. Or, make a small change and push to GitHub to trigger a new deployment

### Step 6: Test

1. **Clear your browser cache and cookies** (important!)
2. Go to your Vercel site: `https://your-vercel-domain.vercel.app`
3. Navigate to the login page
4. Click "Sign in with Google"
5. You should be redirected to Google sign-in
6. After signing in, you should be redirected back to your Vercel site

## 🔍 Troubleshooting

### Still redirecting to localhost?

1. **Check browser console (F12):**
   - Look for errors
   - Check the Network tab for failed requests

2. **Verify environment variables:**
   - Go to Vercel → Settings → Environment Variables
   - Make sure both variables are there
   - Make sure they're set for "All Environments"

3. **Check Vercel deployment logs:**
   - Go to Vercel → Deployments
   - Click on the latest deployment
   - Check the build logs for errors

4. **Verify Google Cloud Console:**
   - Make sure your Vercel domain is in **Authorized JavaScript origins**
   - Make sure Supabase callback URL is in **Authorized redirect URIs**

### Getting "redirect_uri_mismatch" error?

This means the redirect URI in Google Cloud Console doesn't match what's being sent.

**Fix:**
1. Check what redirect URI is being used (look in browser console or network tab)
2. Make sure that **exact** URI is in Google Cloud Console → Authorized redirect URIs
3. The Supabase callback URL should be: `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`

### Getting "invalid_client" error?

This means the Client ID or Secret is wrong.

**Fix:**
1. Go to Google Cloud Console → Credentials
2. Copy the **Client ID** and **Client Secret** again
3. Go to Supabase Dashboard → Authentication → Providers → Google
4. Paste the credentials again
5. Click **Save**
6. Wait a few minutes and try again

## 📋 Quick Checklist

Before testing, make sure:

- [ ] Environment variables are set in Vercel (`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
- [ ] Vercel domain is in Google Cloud Console → Authorized JavaScript origins
- [ ] Supabase callback URL is in Google Cloud Console → Authorized redirect URIs
- [ ] Vercel domain is in Supabase → Authentication → URL Configuration → Redirect URLs
- [ ] Site URL is set in Supabase → Authentication → URL Configuration
- [ ] Google provider is enabled in Supabase → Authentication → Providers
- [ ] Client ID and Secret are correct in Supabase
- [ ] You've waited 1-2 minutes after making changes
- [ ] You've cleared browser cache and cookies
- [ ] You've redeployed on Vercel

## 🎯 Summary

The key points for Vercel deployment:

1. **Environment variables** must be set in Vercel (not just locally)
2. **Google Cloud Console** needs your Vercel domain in authorized origins
3. **Supabase** needs your Vercel domain in redirect URLs
4. **Wait a few minutes** after making changes for them to propagate
5. **Clear browser cache** before testing

---

**Still having issues?** Check the main `TROUBLESHOOT_GOOGLE_LOGIN.md` for more detailed troubleshooting steps.
