# How to View and Manage Registered Users

This guide explains how to view all registered users on your website and manage admin access.

## 🎯 Two Ways to View Users

### Method 1: Admin Dashboard (Recommended)

The website includes an admin dashboard where you can:
- View all registered users
- See user details (name, email, role, join date)
- Promote users to admin
- Remove admin privileges

**Access the Admin Dashboard:**
1. Log in to the website with your Google account
2. Make sure your account has admin role (see "How to Become Admin" below)
3. Click the **"Admin"** button in the navbar (shield icon)
4. Or go directly to: http://localhost:3000/admin

**Features:**
- View all users in a table
- See total user count
- See admin count
- Toggle user roles (make admin / remove admin)

### Method 2: Supabase Dashboard

You can also view users directly in Supabase:

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Authentication** > **Users**
   - See all authenticated users
   - View user emails and metadata
   - See when they signed up
4. Go to **Table Editor** > **profiles**
   - See user profiles with display names
   - View user roles (admin/user)
   - Edit user information

## 👑 How to Become an Admin

To access the admin dashboard, you need admin privileges:

### Step 1: Sign Up First

1. Go to http://localhost:3000/login
2. Sign in with Google
3. Your profile will be automatically created

### Step 2: Grant Admin Access

**Option A: Via Supabase Dashboard (Easiest)**

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Table Editor** > **profiles**
4. Find your user profile (search by email or user_id)
5. Click to edit the row
6. Change the `role` field from `user` to `admin`
7. Click **Save**

**Option B: Via Admin Dashboard (If you have another admin)**

1. Ask an existing admin to:
   - Go to `/admin`
   - Find your user
   - Click "Make Admin" button

**Option C: Via SQL (Advanced)**

1. Go to Supabase Dashboard > SQL Editor
2. Run this query (replace `YOUR_USER_ID` with your actual user ID):
   ```sql
   UPDATE public.profiles
   SET role = 'admin'
   WHERE user_id = 'YOUR_USER_ID';
   ```

### Step 3: Verify Admin Access

1. Log out and log back in
2. You should see an **"Admin"** button in the navbar
3. Click it to access the admin dashboard

## 📊 What You Can See in Admin Dashboard

### User Information
- **Display Name**: User's name from Google account
- **User ID**: Unique identifier
- **Role**: Admin or User
- **Join Date**: When they registered
- **Avatar**: Profile picture (if available)

### Statistics
- **Total Users**: Count of all registered users
- **Admins**: Count of users with admin role
- **Regular Users**: Count of regular users

### Actions
- **Make Admin**: Promote a user to admin
- **Remove Admin**: Demote an admin to regular user
- **Refresh**: Reload the user list

## 🔒 Security Notes

- Only users with `admin` role can access `/admin`
- Regular users will see "Access Denied" if they try to access
- You cannot remove your own admin status
- Admin actions are logged in Supabase

## 🐛 Troubleshooting

### "Access Denied" when accessing /admin

**Solution:**
1. Verify your role in Supabase Dashboard > Table Editor > profiles
2. Make sure `role` is set to `admin` (not `user`)
3. Log out and log back in
4. Try again

### Admin button not showing in navbar

**Solution:**
1. Check browser console for errors (F12)
2. Verify your profile exists in `profiles` table
3. Make sure `role` is `admin` in the database
4. Refresh the page

### Can't see any users

**Solution:**
1. Check if users have actually signed up
2. Verify `profiles` table exists
3. Check Supabase Dashboard > Table Editor > profiles
4. Make sure RLS policies allow admins to view all profiles

### Can't update user roles

**Solution:**
1. Verify you're logged in as admin
2. Check RLS policies allow admins to update profiles
3. Check browser console for errors
4. Try refreshing the page

## 📝 Quick Reference

**Admin Dashboard URL:** `/admin`

**To make someone admin:**
1. Supabase Dashboard > Table Editor > profiles
2. Find user > Edit > Change role to `admin` > Save

**To view users in Supabase:**
- Authentication > Users (all auth users)
- Table Editor > profiles (user profiles with roles)

---

**Need help?** Check `TROUBLESHOOT_GOOGLE_LOGIN.md` if login isn't working.

