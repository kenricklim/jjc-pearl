# Events Admin Feature

This document explains how to set up and use the admin event creation feature on the Events page.

## Setup Instructions

### Step 1: Create the Events Table

Run the SQL migration to create the events table in your Supabase database:

1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Open the file `supabase/add_events_table.sql`
4. Copy and paste the SQL into the editor
5. Click **Run** to execute

This will create:
- The `events` table with all necessary fields
- Row Level Security (RLS) policies
- Indexes for performance
- A trigger to update the `updated_at` timestamp

### Step 1.5: Set Up Storage Bucket (Required for Image Uploads)

Set up Supabase Storage for event images:

1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Open the file `supabase/setup_events_storage.sql`
4. Copy and paste the SQL into the editor
5. Click **Run** to execute

This will create:
- A public storage bucket named `event-images`
- Storage policies allowing:
  - Anyone to view images (public bucket)
  - Admins to upload, update, and delete images

### Step 2: Migrate Existing Events (Optional)

If you want to migrate the existing hardcoded events to the database:

1. Go to Supabase Dashboard > **SQL Editor**
2. Open the file `supabase/migrate_existing_events.sql`
3. Copy and paste the SQL into the editor
4. Click **Run** to execute

This will populate the database with all 24 existing events.

### Step 3: Verify Setup

1. Log in to the website as an admin user
2. Navigate to the **Events** page (`/events`)
3. You should see an **"Add Event"** button in the top right (if you're an admin)
4. If you migrated existing events, they should all be visible

## Features

### For Admins

- **Add Event Button**: Visible only to users with `admin` role
- **Create Event Form**: Dialog form with all event fields:
  - Title (required, max 500 characters)
  - Description (required, max 2000 characters)
  - Status (Completed/Upcoming)
  - Date (optional, text format)
  - Time (optional)
  - Location (optional)
  - Partners (optional, comma-separated list)
  - Image Paths (optional, one per line)

### Event Fields

All events support the following fields:
- **Title**: Event name
- **Description**: Detailed event description
- **Status**: `completed` or `upcoming`
- **Date**: Event date (text format, e.g., "January 10, 2026")
- **Time**: Event time (optional, e.g., "2:00 PM")
- **Location**: Event location (optional)
- **Partners**: Array of partner organization names
- **Images**: Array of image paths (relative to public folder)

## Adding Images

You can add images to events in two ways:

### Method 1: Direct Upload (Recommended)

1. Click **"Upload Images"** button in the event form
2. Select one or more image files from your computer
3. Images will be automatically uploaded to Supabase Storage
4. Preview thumbnails will appear in the form
5. Click the **X** button on any thumbnail to remove it before submitting

**Supported Formats:**
- JPEG/JPG
- PNG
- WebP
- GIF

**File Size Limit:** 5MB per image

**Storage Location:** Images are stored in Supabase Storage bucket `event-images` and are publicly accessible.

### Method 2: Manual Image Paths (Legacy)

You can also manually enter image paths:
- **Public folder paths**: `/Events picture/filename.jpg` (images must exist in public folder)
- **Full URLs**: `https://example.com/image.jpg` (external images)

Click "Or enter image paths manually" in the form to use this method.

## Database Schema

The `events` table structure:

```sql
- id: UUID (primary key)
- title: TEXT (required, max 500 chars)
- description: TEXT (required, max 2000 chars)
- status: TEXT ('upcoming' or 'completed')
- date: TEXT (optional)
- time: TEXT (optional)
- location: TEXT (optional)
- partners: TEXT[] (array of partner names)
- images: TEXT[] (array of image paths)
- created_by: UUID (references auth.users)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

## Security

- **View Events**: Anyone can view events (public)
- **Create Events**: Only admins can create events
- **Update Events**: Only admins can update events
- **Delete Events**: Only admins can delete events

Row Level Security (RLS) policies enforce these permissions automatically.

## Troubleshooting

### "Add Event" button not showing

1. Verify you're logged in
2. Check your user role in Supabase:
   - Go to **Table Editor** > **profiles**
   - Find your user
   - Ensure `role` is set to `admin`
3. Refresh the page

### Events not loading

1. Check if the `events` table exists in Supabase
2. Verify RLS policies are enabled
3. Check browser console for errors
4. Ensure you've run the migration SQL

### Can't create events

1. Verify you have admin role
2. Check browser console for errors
3. Ensure all required fields are filled
4. Check Supabase logs for database errors

## Image Storage

Images uploaded through the form are stored in Supabase Storage:
- **Bucket Name**: `event-images`
- **Access**: Public (anyone can view)
- **Upload Permissions**: Admin only
- **File Organization**: Files are organized by user ID (`{user_id}/{filename}`)

The database stores the public URLs returned by Supabase Storage, which look like:
```
https://{project-ref}.supabase.co/storage/v1/object/public/event-images/{user_id}/{filename}
```

## Supabase Storage Limits

### File Size Limits

**Per File:**
- **Free Plan**: Maximum **50 MB** per file (global limit)
- **Paid Plans (Pro, Team, Enterprise)**: 
  - Standard uploads: Up to **5 GB** per file
  - Resumable uploads (S3 protocol): Up to **50 GB** per file
  - Global limit can be configured up to **500 GB** per file

**Current Implementation:**
- The form enforces a **5 MB limit per image** (client-side validation)
- This is well below the Free tier limit and ensures fast uploads
- You can increase this limit in the code if needed (see `app/events/page.tsx`)

### Total Storage Limits

**Free Tier:**
- **1 GB** total storage included
- Additional storage: $0.021 per GB/month

**Paid Plans:**
- **Pro Plan**: 100 GB included, then $0.021 per GB/month
- **Team Plan**: 200 GB included, then $0.021 per GB/month
- **Enterprise Plan**: Custom storage allocation

### Bandwidth Limits

**Free Tier:**
- **2 GB** egress (download) bandwidth per month
- Additional bandwidth: $0.09 per GB

**Paid Plans:**
- **Pro Plan**: 250 GB egress included, then $0.09 per GB
- **Team Plan**: 500 GB egress included, then $0.09 per GB
- **Enterprise Plan**: Custom bandwidth allocation

### Recommendations

For event images:
1. **Optimize images before upload**:
   - Compress JPEG images (aim for 80-90% quality)
   - Use WebP format when possible (better compression)
   - Resize large images to reasonable dimensions (e.g., 1920x1080 max)
   - This reduces storage usage and improves load times

2. **Monitor your usage**:
   - Check Supabase Dashboard > Storage to see current usage
   - Set up alerts if approaching limits

3. **If you exceed Free tier limits**:
   - Consider upgrading to Pro plan ($25/month) for more storage and bandwidth
   - Or implement image compression/optimization before upload
   - Or use a CDN for image delivery

### Current Code Limits

The current implementation has these limits:
- **File size**: 5 MB per image (can be adjusted)
- **File types**: JPEG, JPG, PNG, WebP, GIF
- **No limit on number of images** per event (limited by total storage)

To change the file size limit, edit `app/events/page.tsx` and modify:
```typescript
if (file.size > 5 * 1024 * 1024) { // Change 5 to your desired MB limit
```

## Future Enhancements

Potential improvements:
- Edit/Delete existing events
- Delete images from storage when events are deleted
- Image compression/optimization before upload
- Event categories/tags
- Event search and filtering
- Event registration/RSVP functionality
