# Testing Guide - JJC Puerto Princesa Perlas Website

This guide will help you verify that all features of the website are working correctly.

## Prerequisites Checklist

Before testing, ensure:
- [ ] Node.js 18+ is installed (`node --version`)
- [ ] Dependencies are installed (`npm install` completed)
- [ ] `.env.local` file exists with Supabase credentials
- [ ] Supabase project is set up with schema.sql executed
- [ ] Google OAuth is configured in Supabase Dashboard

## Step 1: Start the Development Server

```bash
npm run dev
```

Expected output:
```
▲ Next.js 14.x.x
- Local:        http://localhost:3000
- Ready in Xs
```

✅ **Test**: Open [http://localhost:3000](http://localhost:3000) in your browser. You should see the homepage.

## Step 2: Test Public Pages

### 2.1 Home Page (`/`)

**What to check:**
- [ ] Hero section displays "Empowered to Inspire"
- [ ] Two CTA buttons are visible: "Become a Member" and "Visit the Freedom Wall"
- [ ] Values section shows 3 cards (Brotherhood, Service, Leadership)
- [ ] Bottom CTA section is visible
- [ ] Page is responsive (try resizing browser window)

**Navigation test:**
- [ ] Click "Become a Member" → Should go to `/membership`
- [ ] Click "Visit the Freedom Wall" → Should redirect to `/login` (if not logged in)
- [ ] Click navigation links → Should navigate to respective pages

### 2.2 About Us Page (`/about`)

**What to check:**
- [ ] Page title "About Us" is visible
- [ ] JCI Values section shows 6 value cards
- [ ] Mission and Vision cards are displayed side by side
- [ ] History Timeline shows 3 events (1975, 2023, 2025)
- [ ] Timeline has visual line connecting events
- [ ] All content from PDF is displayed correctly

**Test navigation:**
- [ ] Click "About Us" in navbar → Should highlight active state

### 2.3 Leadership Page (`/leadership`)

**What to check:**
- [ ] Page title "Leadership" is visible
- [ ] Executive Board section shows 7 members
- [ ] Commissioners & Directors section shows 5 members
- [ ] Founding Members section shows 20 names
- [ ] All board member names match PDF data:
  - [ ] Suzane Valdez (President)
  - [ ] Jessa Merl G. Terrado (Immediate Past President)
  - [ ] Cristine V. Arzaga (Executive Vice-President)
  - [ ] Garry Loyd G. Lagan (Vice-President Internal)
  - [ ] Allysa Denise T. Ducax (Secretary)
  - [ ] Rosanie L. Eleazar (Treasurer)
  - [ ] Justine Jaye B. Delos Reyes (Auditor)
- [ ] Cards are responsive (grid adjusts on mobile)

### 2.4 Events Page (`/events`)

**What to check:**
- [ ] Page title "Events" is visible
- [ ] Featured event "Clean Up Drive & Mangrove Tree Planting" is displayed
- [ ] Event shows:
  - [ ] Date: September 20, 2025
  - [ ] Time: 07:00 AM
  - [ ] Location: Broy, Sicsican, Golden Tree
  - [ ] Partners: City ENRO, Puerto Princesa Este Municipal Office
  - [ ] Status badge: "Upcoming"
- [ ] Other events are displayed (Wellness Beyond Walls, etc.)
- [ ] Completed events show "Completed" badge

### 2.5 Membership Page (`/membership`)

**What to check:**
- [ ] Page title "Become a Member" is visible
- [ ] 4 benefit cards are displayed
- [ ] Application card is visible with instructions
- [ ] "Fill out the Official Membership Form" button is present
- [ ] Button opens Google Form in new tab (if URL is configured)

**Important**: Update Google Form URL in `app/membership/page.tsx` before testing this feature.

## Step 3: Test Authentication Flow

### 3.1 Login Page (`/login`)

**What to check:**
- [ ] Navigate to `/login` or click "Community Login"
- [ ] Login card is displayed
- [ ] "Sign in with Google" button is visible
- [ ] Instructions are clear

### 3.2 Google OAuth Flow

**Test steps:**
1. Click "Sign in with Google"
2. You should be redirected to Google sign-in page
3. Select/enter your Google account
4. Grant permissions
5. You should be redirected back to `/community`

**What to check:**
- [ ] Redirect happens smoothly
- [ ] No error messages appear
- [ ] User profile is created automatically in Supabase
- [ ] Navbar shows user name/avatar instead of "Community Login"

**Verify in Supabase Dashboard:**
- [ ] Go to Authentication > Users → Your user should appear
- [ ] Go to Table Editor > profiles → Your profile should exist

### 3.3 Logout

**Test steps:**
1. Click logout icon (door icon) in navbar
2. You should be redirected to homepage
3. Navbar should show "Community Login" again

## Step 4: Test Community Portal (Protected Route)

### 4.1 Access Control

**Test without login:**
- [ ] Navigate to `/community` directly
- [ ] Should redirect to `/login`

**Test with login:**
- [ ] After logging in, navigate to `/community`
- [ ] Should show Community Portal page

### 4.2 Freedom Wall Tab

**What to check:**
- [ ] "Freedom Wall" tab is active by default
- [ ] "Share Your Thoughts" header is visible
- [ ] "New Post" button is present
- [ ] If no posts: Shows "No posts yet. Be the first to share!"

**Test creating a post:**
1. Click "New Post"
2. Dialog opens
3. Enter a test message (e.g., "Hello from the Freedom Wall!")
4. Click "Post"
5. **Expected**: Post appears immediately in the feed (real-time)
6. Post shows:
   - [ ] Your display name
   - [ ] Timestamp
   - [ ] Message content

**Test real-time updates:**
1. Open `/community` in two browser windows/tabs
2. Post from one window
3. **Expected**: Post appears in second window without refresh

**Test validation:**
- [ ] Try posting empty message → Should show error
- [ ] Try posting very long message (>500 chars) → Should show error

**Verify in Supabase:**
- [ ] Go to Table Editor > forum_posts → Your post should appear

### 4.3 Service Desk Tab

**What to check:**
- [ ] Click "Service Desk" tab
- [ ] "Complaints & Requests" header is visible
- [ ] "New Ticket" button is present
- [ ] If no tickets: Shows "No tickets yet..."

**Test creating a request:**
1. Click "New Ticket"
2. Dialog opens
3. Fill form:
   - Type: Select "Request"
   - Subject: "Test Request"
   - Description: "This is a test request"
4. Click "Submit"
5. **Expected**: Ticket appears in the list
6. Ticket shows:
   - [ ] Subject
   - [ ] Status badge: "Pending"
   - [ ] Type: "Request"
   - [ ] Date
   - [ ] Description

**Test creating a complaint:**
1. Click "New Ticket"
2. Select Type: "Complaint"
3. Fill subject and description
4. Submit
5. **Expected**: Complaint appears with "Complaint" type

**Test validation:**
- [ ] Try submitting empty form → Should show errors
- [ ] Try very long subject/description → Should show errors

**Verify privacy:**
- [ ] Log in with different Google account
- [ ] Navigate to Service Desk
- [ ] **Expected**: Only see your own tickets (not other users')

**Verify in Supabase:**
- [ ] Go to Table Editor > complaints_requests → Your tickets should appear
- [ ] Verify `user_id` matches your auth user ID

## Step 5: Test Responsive Design

**Test on different screen sizes:**

### Mobile (< 768px)
- [ ] Navigation menu is accessible
- [ ] Cards stack vertically
- [ ] Text is readable
- [ ] Buttons are tappable
- [ ] Forms are usable

### Tablet (768px - 1024px)
- [ ] Grid layouts adjust appropriately
- [ ] Navigation is accessible
- [ ] Content is well-spaced

### Desktop (> 1024px)
- [ ] Full layout is displayed
- [ ] Multi-column grids work
- [ ] Hover effects work

**How to test:**
- Use browser DevTools (F12)
- Toggle device toolbar (Ctrl+Shift+M)
- Test common sizes: iPhone, iPad, Desktop

## Step 6: Test Error Handling

### 6.1 Network Errors
- [ ] Disconnect internet
- [ ] Try to post on Freedom Wall
- [ ] **Expected**: Error message appears

### 6.2 Invalid Data
- [ ] Try posting extremely long content
- [ ] Try submitting forms with invalid data
- [ ] **Expected**: Validation errors appear

### 6.3 Protected Routes
- [ ] Log out
- [ ] Try accessing `/community` directly
- [ ] **Expected**: Redirects to login

## Step 7: Performance Testing

**Check loading times:**
- [ ] Homepage loads quickly (< 2 seconds)
- [ ] Navigation between pages is smooth
- [ ] Images load properly (if added)
- [ ] No console errors in browser DevTools

**Check browser console:**
1. Open DevTools (F12)
2. Go to Console tab
3. **Expected**: No red errors
4. Warnings are acceptable (but note them)

## Step 8: Database Verification

**Check Supabase Dashboard:**

### Tables
- [ ] `profiles` table exists
- [ ] `forum_posts` table exists
- [ ] `complaints_requests` table exists

### Row Level Security (RLS)
- [ ] Go to Authentication > Policies
- [ ] Verify policies are enabled for all tables
- [ ] Test: Try querying from Supabase SQL Editor as different users

### Realtime
- [ ] Go to Database > Replication
- [ ] Verify `forum_posts` has replication enabled
- [ ] This enables real-time updates

## Common Issues & Solutions

### Issue: "Invalid API key" error
**Solution**: 
- Check `.env.local` file exists
- Verify variable names start with `NEXT_PUBLIC_`
- Restart dev server after changing env vars

### Issue: Google OAuth not working
**Solution**:
- Verify Google OAuth is enabled in Supabase Dashboard
- Check redirect URLs match exactly
- Ensure Google Cloud Console has correct redirect URIs

### Issue: Real-time not working
**Solution**:
- Check Database > Replication in Supabase
- Enable replication for `forum_posts` table
- Verify Supabase client is initialized correctly

### Issue: Posts not appearing
**Solution**:
- Check browser console for errors
- Verify RLS policies allow SELECT
- Check Supabase logs for errors

### Issue: Can't see other users' posts
**Solution**: This is correct! Forum posts are public, but complaints are private. Verify RLS policies.

### Issue: Profile not created automatically
**Solution**:
- Check if trigger function exists in Supabase
- Verify `handle_new_user()` function was created
- Check Supabase logs for trigger errors

## Testing Checklist Summary

Print this checklist and mark items as you test:

**Setup:**
- [ ] Dev server runs without errors
- [ ] Environment variables configured
- [ ] Supabase schema executed

**Public Pages:**
- [ ] Home page loads
- [ ] About Us displays correctly
- [ ] Leadership shows all members
- [ ] Events page works
- [ ] Membership page works

**Authentication:**
- [ ] Login page accessible
- [ ] Google OAuth works
- [ ] User profile created
- [ ] Logout works

**Community Features:**
- [ ] Freedom Wall accessible after login
- [ ] Can create posts
- [ ] Real-time updates work
- [ ] Service Desk accessible
- [ ] Can create tickets
- [ ] Privacy works (only see own tickets)

**Responsive:**
- [ ] Mobile layout works
- [ ] Tablet layout works
- [ ] Desktop layout works

**Errors:**
- [ ] No console errors
- [ ] Error handling works
- [ ] Validation works

## Next Steps After Testing

1. **Fix any issues** found during testing
2. **Update Google Form URL** in membership page
3. **Customize content** (colors, images, text)
4. **Deploy to production** (see README.md)
5. **Set up monitoring** (optional)

---

**Need help?** Check the main README.md or SETUP.md for detailed instructions.

