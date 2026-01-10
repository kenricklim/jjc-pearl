# ✅ Quick Check - Is Everything Working?

Follow this checklist to verify your website is fully functional.

## 🚀 Part 1: Basic Website (No Supabase Needed)

### Step 1: Start the Server
```bash
npm run dev
```

**✅ Success:** You see:
```
▲ Next.js 14.x.x
- Local:        http://localhost:3000
✓ Ready in Xs
```

### Step 2: Open Browser
Go to: **http://localhost:3000**

**✅ Success:** You see the homepage with:
- "Empowered to Inspire" heading
- Navigation bar at top
- Two buttons: "Become a Member" and "Visit the Freedom Wall"

### Step 3: Test All Public Pages

Click through each link in the navigation:

- [ ] **Home** (`/`) - Hero section loads, animations work
- [ ] **About Us** (`/about`) - Shows JCI Values, Mission/Vision, History Timeline
- [ ] **Leadership** (`/leadership`) - Shows board members grid (7 executives + 5 commissioners)
- [ ] **Events** (`/events`) - Shows events including "Mangrove Tree Planting"
- [ ] **Membership** (`/membership`) - Shows benefits and Google Form link

**✅ Success:** All pages load without errors

### Step 4: Check Browser Console
1. Press **F12** to open Developer Tools
2. Click **Console** tab
3. Look for errors

**✅ Success:** No red error messages (yellow warnings are usually okay)

---

## 🔐 Part 2: Supabase Setup Check

### Step 5: Verify Environment Variables

Check if `.env.local` file exists in project root:
```bash
# In PowerShell
Test-Path .env.local
```

**✅ Success:** Returns `True`

### Step 6: Check .env.local Contents

Open `.env.local` and verify it contains:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**✅ Success:** Both variables are set with actual values (not placeholders)

### Step 7: Test Login Page

1. Navigate to `/login` or click "Community Login"
2. Check what you see:

**If Supabase is NOT configured:**
- Shows: "Supabase Not Configured" message
- Has a "Back to Home" button
- ✅ This is expected if you haven't set up Supabase yet

**If Supabase IS configured:**
- Shows: "Sign in with Google" button
- Has login instructions
- ✅ Ready for authentication testing

---

## 🗄️ Part 3: Database Check (Supabase Required)

### Step 8: Verify Tables in Supabase

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Table Editor**
4. Check if these tables exist:
   - [ ] `profiles`
   - [ ] `forum_posts`
   - [ ] `complaints_requests`

**✅ Success:** All three tables are visible

### Step 9: Verify Row Level Security (RLS)

1. In Supabase Dashboard, go to **Authentication** > **Policies**
2. Check each table has policies:
   - [ ] `profiles` - Has SELECT, INSERT, UPDATE policies
   - [ ] `forum_posts` - Has SELECT, INSERT, DELETE policies
   - [ ] `complaints_requests` - Has SELECT, INSERT, UPDATE policies

**✅ Success:** Policies are enabled and visible

### Step 10: Check Trigger Function

1. In Supabase Dashboard, go to **Database** > **Functions**
2. Look for: `handle_new_user`

**✅ Success:** Function exists

---

## 🔑 Part 4: Authentication Check (Supabase Required)

### Step 11: Test Google OAuth Setup

1. In Supabase Dashboard, go to **Authentication** > **Providers**
2. Find **Google** provider
3. Check:
   - [ ] Google provider is **Enabled** (toggle is ON)
   - [ ] Client ID is filled in
   - [ ] Client Secret is filled in

**✅ Success:** All fields are configured

### Step 12: Test Login Flow

1. Go to `/login` page
2. Click **"Sign in with Google"**
3. Complete Google sign-in
4. Check what happens:

**✅ Success:**
- Redirects to Google sign-in page
- After signing in, redirects back to `/community`
- Navbar shows your name instead of "Community Login"

**❌ If it fails:**
- Check redirect URI in Google Cloud Console matches Supabase callback URL
- Verify Google OAuth credentials in Supabase Dashboard

---

## 💬 Part 5: Community Features Check (Requires Login)

### Step 13: Test Freedom Wall

1. After logging in, you should be at `/community`
2. Check **Freedom Wall** tab:
   - [ ] "Share Your Thoughts" header is visible
   - [ ] "New Post" button is present
   - [ ] If no posts: Shows "No posts yet. Be the first to share!"

3. **Test creating a post:**
   - [ ] Click "New Post"
   - [ ] Dialog opens
   - [ ] Type a test message
   - [ ] Click "Post"
   - [ ] Post appears immediately in the feed

**✅ Success:** Post appears without page refresh (real-time)

### Step 14: Test Service Desk

1. Click **Service Desk** tab
2. Check:
   - [ ] "Complaints & Requests" header is visible
   - [ ] "New Ticket" button is present
   - [ ] If no tickets: Shows "No tickets yet..."

3. **Test creating a ticket:**
   - [ ] Click "New Ticket"
   - [ ] Dialog opens
   - [ ] Fill form:
     - Type: Select "Request"
     - Subject: "Test Request"
     - Description: "This is a test"
   - [ ] Click "Submit"
   - [ ] Ticket appears in the list with "Pending" status

**✅ Success:** Ticket is created and visible

### Step 15: Test Privacy (Service Desk)

1. Log out (click logout icon in navbar)
2. Sign in with a **different Google account**
3. Go to `/community` > **Service Desk**
4. Check:
   - [ ] You only see tickets from your current account
   - [ ] You don't see tickets from the previous account

**✅ Success:** Privacy is working - users only see their own tickets

---

## 📱 Part 6: Responsive Design Check

### Step 16: Test Mobile View

1. Press **F12** to open Developer Tools
2. Click the **device toggle** icon (or press `Ctrl+Shift+M`)
3. Select a mobile device (e.g., iPhone 12)
4. Check:
   - [ ] Navigation is accessible (hamburger menu or visible links)
   - [ ] Text is readable
   - [ ] Buttons are tappable
   - [ ] Layout adjusts properly
   - [ ] No horizontal scrolling

**✅ Success:** Website looks good on mobile

### Step 17: Test Tablet View

1. In device toolbar, select iPad
2. Check:
   - [ ] Grid layouts adjust appropriately
   - [ ] Content is well-spaced
   - [ ] Navigation works

**✅ Success:** Website looks good on tablet

---

## 🔍 Part 7: Performance Check

### Step 18: Check Loading Speed

1. Open browser DevTools (F12)
2. Go to **Network** tab
3. Refresh the page (Ctrl+R)
4. Check:
   - [ ] Page loads in under 3 seconds
   - [ ] No failed requests (red entries)

**✅ Success:** Fast loading, no errors

### Step 19: Check for Console Errors

1. Open browser DevTools (F12)
2. Go to **Console** tab
3. Navigate through all pages
4. Check:
   - [ ] No red error messages
   - [ ] No critical warnings

**✅ Success:** Clean console

---

## 📊 Quick Status Summary

### ✅ Everything Working
- [x] Server runs
- [x] All pages load
- [x] No console errors
- [x] Supabase configured
- [x] Database tables exist
- [x] Login works
- [x] Community features work
- [x] Mobile responsive

### ⚠️ Partial Setup
- [x] Server runs
- [x] All pages load
- [ ] Supabase not configured (public pages work, login/community don't)

### ❌ Issues Found
- [ ] Server won't start
- [ ] Pages show errors
- [ ] Console has red errors

---

## 🐛 Common Issues & Quick Fixes

### Issue: "Supabase is not configured" message
**Fix:** Create `.env.local` with Supabase credentials (see SETUP.md)

### Issue: Login redirects but shows error
**Fix:** Check Google OAuth redirect URI matches exactly

### Issue: Posts don't appear in real-time
**Fix:** Enable replication for `forum_posts` table in Supabase Dashboard

### Issue: Can't see other users' forum posts
**Fix:** This is correct! Forum posts are public, but check RLS policies if needed

### Issue: Can see other users' tickets
**Fix:** This is a bug! Check RLS policies on `complaints_requests` table

---

## 📝 Testing Checklist Printout

Copy this and check off as you test:

**Basic Functionality:**
- [ ] Server starts
- [ ] Homepage loads
- [ ] All navigation links work
- [ ] No console errors
- [ ] Mobile responsive

**Supabase Setup:**
- [ ] .env.local exists
- [ ] Credentials are set
- [ ] Tables exist
- [ ] RLS policies enabled
- [ ] Google OAuth configured

**Authentication:**
- [ ] Login page accessible
- [ ] Google sign-in works
- [ ] Redirects correctly
- [ ] User profile created

**Community Features:**
- [ ] Freedom Wall accessible
- [ ] Can create posts
- [ ] Real-time updates work
- [ ] Service Desk accessible
- [ ] Can create tickets
- [ ] Privacy works (only own tickets)

---

## 🎯 What to Test Right Now

**If you haven't set up Supabase yet:**
1. ✅ Test Part 1 (Basic Website) - Should all work!
2. ⏭️ Skip Parts 2-5 until Supabase is configured

**If Supabase is configured:**
1. ✅ Test Part 1 (Basic Website)
2. ✅ Test Part 2 (Supabase Setup)
3. ✅ Test Part 3 (Database)
4. ✅ Test Part 4 (Authentication)
5. ✅ Test Part 5 (Community Features)

---

**Need help?** See `TESTING.md` for detailed testing instructions or `SETUP.md` for setup help.

