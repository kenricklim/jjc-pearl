# Fix: Freedom Wall and Service Desk Issues

## Issues Fixed

### 1. Freedom Wall Posts Not Saving/Showing

**Problem:** Posts were being inserted but not appearing immediately.

**Fix Applied:**
- Added `await loadForumPosts()` after successful post insertion
- This ensures posts are reloaded immediately after posting
- Real-time updates still work, but this provides a fallback

**Changes:**
- `app/community/page.tsx`: Added post reload after successful insertion

### 2. Tickets Not Showing in Admin Page

**Problem:** Tickets were being saved but not visible in admin dashboard.

**Fix Applied:**
- Fixed the Supabase query to properly join with profiles table
- Added fallback query if join fails
- Improved error handling and user profile lookup
- Added user ID display as fallback

**Changes:**
- `app/admin/page.tsx`: 
  - Fixed `loadAllTickets()` query
  - Added fallback profile lookup
  - Better error messages

## How to Test

### Test Freedom Wall:
1. Go to `/community`
2. Click "Freedom Wall" tab
3. Click "New Post"
4. Type a message
5. Click "Post"
6. **Expected:** Post should appear immediately in the list

### Test Service Desk:
1. Go to `/community`
2. Click "Service Desk" tab
3. Click "New Ticket"
4. Fill out form and submit
5. Go to `/admin` (as admin user)
6. Click "Tickets" tab
7. **Expected:** Your ticket should appear in the list

## Troubleshooting

### If Freedom Wall still doesn't work:

1. **Check browser console** (F12) for errors
2. **Check terminal** (where `npm run dev` runs) for errors
3. **Verify RLS policies:**
   - Go to Supabase Dashboard
   - Check `forum_posts` table policies
   - Ensure "Authenticated users can create forum posts" policy exists

### If Tickets still don't show in admin:

1. **Check browser console** (F12) for errors
2. **Check terminal** for query errors
3. **Verify admin status:**
   - Go to Supabase Dashboard
   - Table Editor > `profiles`
   - Check your user has `role = 'admin'`
4. **Verify RLS policies:**
   - Check `complaints_requests` table
   - Ensure "Admins can view all complaints/requests" policy exists
5. **Try refreshing** the admin page

## Database Queries to Check

### Check if posts are being saved:
```sql
SELECT * FROM forum_posts ORDER BY created_at DESC LIMIT 10;
```

### Check if tickets are being saved:
```sql
SELECT * FROM complaints_requests ORDER BY created_at DESC LIMIT 10;
```

### Check admin policies:
```sql
SELECT * FROM pg_policies WHERE tablename = 'complaints_requests';
```

## Common Issues

### Issue: "Permission denied" errors
**Solution:** Check RLS policies in Supabase Dashboard

### Issue: Posts save but don't appear
**Solution:** 
- Check if `loadForumPosts()` is being called
- Check browser console for errors
- Verify real-time subscription is working

### Issue: Tickets save but admin can't see them
**Solution:**
- Verify user is admin (`role = 'admin'` in profiles table)
- Check RLS policy allows admins to view all tickets
- Try refreshing admin page
- Check browser console for query errors

---

**Both issues should now be fixed. Try posting and creating tickets again!**

