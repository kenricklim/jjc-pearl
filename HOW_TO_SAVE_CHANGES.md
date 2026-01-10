# How to Save Changes

## Saving Changes in the Application

### 1. Profile Page (`/profile`)

**How to save your profile changes:**

1. Go to `/profile` (click "Profile" in the navbar)
2. Edit your **Display Name** or **Avatar URL**
3. Click the **"Save Changes"** button
4. Wait for the success message: "Profile updated successfully!"
5. Your changes are automatically saved to the database

**What gets saved:**
- Display Name (shown on posts and tickets)
- Avatar URL (your profile picture)

**What doesn't change:**
- Email (managed by Google Auth)
- Role (admin/user - managed by admins)
- User ID (system-generated)

---

### 2. Admin Dashboard - Ticket Replies

**How to save ticket replies:**

1. Go to `/admin` → Click "Tickets" tab
2. Find the ticket you want to reply to
3. Click **"Add Reply"** button
4. Type your reply in the textarea
5. Click **"Send Reply"** button
6. The reply is automatically saved and displayed

**Note:** Replies are saved immediately when you click "Send Reply"

---

### 3. Admin Dashboard - Ticket Status

**How to change ticket status:**

1. Go to `/admin` → Click "Tickets" tab
2. Find the ticket
3. Use the **Status dropdown** (Pending/In Progress/Resolved)
4. Select the new status
5. **Status is saved automatically** when you change it

**No "Save" button needed** - changes apply immediately!

---

### 4. Admin Dashboard - User Roles

**How to promote/demote users:**

1. Go to `/admin` → Click "Users" tab
2. Find the user
3. Click **"Make Admin"** or **"Remove Admin"** button
4. **Changes are saved immediately** - no confirmation needed

---

## Saving Code Changes (For Development)

### In Your Code Editor (VS Code, etc.):

1. **Auto-save:** Most editors auto-save when you switch tabs
2. **Manual save:** Press `Ctrl+S` (Windows) or `Cmd+S` (Mac)
3. **Save all:** Press `Ctrl+K S` (Windows) or `Cmd+K S` (Mac)

### In Next.js Development:

- **Hot Reload:** Changes are automatically reflected in the browser
- **No restart needed** for most changes
- **Restart dev server** only if:
  - You change environment variables (`.env.local`)
  - You add new dependencies (`package.json`)
  - You modify `next.config.js`

### To Restart Dev Server:

```bash
# Stop server (Ctrl+C in terminal)
# Then restart:
npm run dev
```

---

## Database Changes

### If you modify the database schema:

1. Go to **Supabase Dashboard** → **SQL Editor**
2. Write your SQL migration
3. Click **"Run"** to execute
4. Changes are saved immediately to the database

**Example:** Adding admin reply fields:
- Run the SQL from `supabase/add_admin_reply.sql`
- Changes are permanent and saved to the database

---

## Troubleshooting

### Changes not saving?

1. **Check browser console** (F12) for errors
2. **Check terminal** (where `npm run dev` runs) for errors
3. **Verify you're logged in** (required for profile changes)
4. **Check RLS policies** in Supabase (might block updates)

### Profile changes not appearing?

1. **Refresh the page** (F5)
2. **Check if success message appeared**
3. **Verify in Supabase Dashboard** → Table Editor → `profiles`
4. **Clear browser cache** if needed

### Ticket replies not saving?

1. **Check if you're an admin** (required for replies)
2. **Check browser console** for errors
3. **Verify RLS policy** allows admins to update tickets
4. **Check Supabase Dashboard** → Table Editor → `complaints_requests`

---

## Quick Reference

| Action | How to Save | Auto-save? |
|--------|-------------|------------|
| Profile changes | Click "Save Changes" button | ❌ No |
| Ticket reply | Click "Send Reply" button | ❌ No |
| Ticket status | Select from dropdown | ✅ Yes |
| User role | Click "Make Admin"/"Remove Admin" | ✅ Yes |
| Code changes | Press Ctrl+S | ✅ Yes (auto-save) |

---

**Remember:** Always look for a "Save" button or success message to confirm your changes were saved!

