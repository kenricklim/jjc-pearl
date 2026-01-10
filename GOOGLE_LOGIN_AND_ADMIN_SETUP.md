# Google Login & Admin Dashboard Setup

## 🔐 Issue 1: Google Login Not Working

### Quick Troubleshooting Steps

1. **Check Supabase Configuration**
   - Verify `.env.local` exists with correct credentials
   - Restart dev server after changing env vars

2. **Check Google OAuth Setup**
   - Supabase Dashboard > Authentication > Providers > Google
   - Verify it's enabled with Client ID and Secret
   - Google Cloud Console > Credentials > OAuth 2.0 Client ID
   - Verify redirect URI matches: `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`

3. **Check Browser Console**
   - Press F12 > Console tab
   - Look for error messages when trying to login

**For detailed troubleshooting, see:** `TROUBLESHOOT_GOOGLE_LOGIN.md`

## 👥 Issue 2: How to View All Registered Users

### Method 1: Admin Dashboard (Best Option)

**Step 1: Make Yourself Admin**

1. Sign in to the website with Google
2. Go to [Supabase Dashboard](https://supabase.com/dashboard)
3. Go to **Table Editor** > **profiles**
4. Find your user profile (search by email)
5. Edit the row
6. Change `role` from `user` to `admin`
7. Save

**Step 2: Access Admin Dashboard**

1. Log out and log back in
2. You'll see an **"Admin"** button (shield icon) in the navbar
3. Click it or go to: http://localhost:3000/admin

**What You Can Do:**
- View all registered users
- See user details (name, email, role, join date)
- Promote users to admin
- Remove admin privileges
- See statistics (total users, admins, regular users)

### Method 2: Supabase Dashboard

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. **Authentication** > **Users** - See all auth users
3. **Table Editor** > **profiles** - See user profiles with roles

**For detailed instructions, see:** `HOW_TO_VIEW_USERS.md`

## 🎯 Quick Start Guide

### To Fix Google Login:

1. **Verify Setup:**
   ```bash
   # Check .env.local exists
   # Should have:
   NEXT_PUBLIC_SUPABASE_URL=https://...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ```

2. **Check Supabase:**
   - Authentication > Providers > Google (should be enabled)
   - Settings > API (copy your project URL)

3. **Check Google Cloud:**
   - Credentials > OAuth 2.0 Client ID
   - Authorized redirect URIs should include:
     `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`

4. **Test:**
   - Go to `/login`
   - Click "Sign in with Google"
   - Should redirect to Google sign-in

### To View Users:

1. **Make yourself admin** (see Method 1 above)
2. **Access admin dashboard** at `/admin`
3. **View all users** in the table

## 📋 Files Created

1. **`TROUBLESHOOT_GOOGLE_LOGIN.md`** - Detailed Google login troubleshooting
2. **`HOW_TO_VIEW_USERS.md`** - Complete guide to viewing/managing users
3. **`app/admin/page.tsx`** - Admin dashboard page
4. **Updated `components/navbar.tsx`** - Added Admin button

## ✅ What's Working Now

- ✅ Admin dashboard at `/admin`
- ✅ Admin button in navbar (only shows for admins)
- ✅ User management (view, promote, demote)
- ✅ User statistics
- ✅ Security (only admins can access)

## 🔒 Security

- Only users with `admin` role can access `/admin`
- Regular users see "Access Denied"
- You cannot remove your own admin status
- All actions are logged in Supabase

---

**Need help?** Check the detailed guides:
- `TROUBLESHOOT_GOOGLE_LOGIN.md` for login issues
- `HOW_TO_VIEW_USERS.md` for user management

