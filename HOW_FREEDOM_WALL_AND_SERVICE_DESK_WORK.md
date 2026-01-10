# How Freedom Wall and Service Desk Work

## 🗣️ Freedom Wall

### What It Is
A public forum where authenticated users can share thoughts, ideas, and messages with the community.

### How It Works

1. **Posting:**
   - Users must be logged in (Google authentication)
   - Click "New Post" button
   - Type message (max 500 characters)
   - Click "Post"
   - Post appears immediately (real-time)

2. **Viewing:**
   - All posts are **public** - anyone can see them
   - Posts show:
     - User's display name (from Google account)
     - Timestamp
     - Message content
   - Posts appear in reverse chronological order (newest first)

3. **Features:**
   - **Real-time updates:** New posts appear instantly without page refresh
   - **Basic profanity filter:** Blocks inappropriate content
   - **Public visibility:** All authenticated users can see all posts

### Who Can Use It
- ✅ Any authenticated user (logged in with Google)
- ✅ Users can post and view all posts
- ✅ Users can delete their own posts

### Privacy
- Posts are **public** to all logged-in users
- Display names are visible
- No private messaging

---

## 🎫 Service Desk (Complaints & Requests)

### What It Is
A private ticket system where users can submit complaints or requests to the organization administration.

### How It Works

#### For Regular Users:

1. **Creating a Ticket:**
   - User must be logged in
   - Click "New Ticket" button
   - Fill out form:
     - **Type:** Complaint or Request
     - **Subject:** Brief title (max 200 characters)
     - **Description:** Detailed information (max 1000 characters)
   - Click "Submit"
   - Ticket is created with "Pending" status

2. **Viewing Tickets:**
   - Users can only see **their own tickets**
   - See status: Pending, In Progress, or Resolved
   - See when ticket was created
   - Cannot see other users' tickets (privacy)

3. **Ticket Status:**
   - **Pending:** Newly submitted, waiting for admin review
   - **In Progress:** Admin is working on it
   - **Resolved:** Issue has been addressed

#### For Admins:

1. **Viewing All Tickets:**
   - Admins can see **all tickets** from all users
   - Access via Admin Dashboard (`/admin`)
   - See user information, ticket details, and status

2. **Managing Tickets:**
   - Update ticket status (Pending → In Progress → Resolved)
   - View ticket history
   - Assign tickets (future feature)
   - Add notes/comments (future feature)

### Who Is Responsible for Tickets?

**Current System:**
- **Admins** (users with `admin` role in database) are responsible
- Admins can view all tickets via Admin Dashboard
- Admins manually update ticket status in database (or via admin dashboard)

**Workflow:**
1. User submits ticket → Status: **Pending**
2. Admin reviews ticket → Updates status to **In Progress**
3. Admin resolves issue → Updates status to **Resolved**
4. User sees updated status in their Service Desk

### Privacy & Security

- ✅ Users can only see their own tickets
- ✅ Admins can see all tickets
- ✅ Tickets are stored securely in Supabase
- ✅ Row Level Security (RLS) enforces privacy

---

## 👥 Admin Responsibilities

### Who Can Be an Admin?
- Users with `role = 'admin'` in the `profiles` table
- Set in Supabase Dashboard > Table Editor > profiles

### Admin Tasks

1. **Monitor Freedom Wall:**
   - Review posts for inappropriate content
   - Delete posts if necessary (via database or admin interface)

2. **Manage Service Desk:**
   - Review all submitted tickets
   - Update ticket status
   - Respond to users (via email or other communication)
   - Resolve issues

3. **User Management:**
   - View all registered users
   - Promote users to admin (if needed)
   - Manage user roles

---

## 📊 Current Limitations

### What's Missing (Can Be Added):

1. **Admin Ticket Management Interface:**
   - Currently: Admins must use Supabase Dashboard or database
   - Future: Admin dashboard to manage tickets

2. **Email Notifications:**
   - Currently: No automatic notifications
   - Future: Email admins when new tickets are created

3. **Ticket Comments/Notes:**
   - Currently: Only subject and description
   - Future: Admin can add internal notes

4. **Ticket Assignment:**
   - Currently: All admins see all tickets
   - Future: Assign tickets to specific admins

5. **User Notifications:**
   - Currently: Users must check manually
   - Future: Notify users when ticket status changes

---

## 🔧 How to Manage Tickets (Current Method)

### Option 1: Via Supabase Dashboard

1. Go to Supabase Dashboard
2. Table Editor > `complaints_requests`
3. View all tickets
4. Edit ticket to update status:
   - Change `status` field to: `pending`, `in_progress`, or `resolved`
5. Save

### Option 2: Via Admin Dashboard (Enhanced)

The admin dashboard at `/admin` shows:
- All registered users
- (Future: All tickets with management interface)

---

## 📝 Ticket Types

### Request
- User needs something from the organization
- Examples:
  - "Request for membership certificate"
  - "Request for event information"
  - "Request for volunteer opportunity"

### Complaint
- User has an issue or concern
- Examples:
  - "Complaint about event organization"
  - "Complaint about member behavior"
  - "Complaint about website functionality"

---

## 🎯 Best Practices

### For Users:
- Be clear and specific in ticket descriptions
- Use appropriate type (Request vs Complaint)
- Check ticket status regularly
- Be patient - admins will respond

### For Admins:
- Review tickets regularly
- Update status promptly
- Communicate with users (via email or other means)
- Resolve issues in a timely manner

---

## 🔮 Future Enhancements

Potential features to add:
- Admin ticket management dashboard
- Email notifications
- Ticket comments/threads
- Ticket assignment system
- Ticket priority levels
- Response templates
- Analytics and reporting

---

**Need to manage tickets?** See the Admin Dashboard at `/admin` or use Supabase Dashboard directly.

