# Setup Guide - JJC Puerto Princesa Perlas Platform

This guide will walk you through setting up the JJC Puerto Princesa Perlas website from scratch.

## Step 1: Install Node.js and Package Manager

1. Download and install Node.js 18+ from [nodejs.org](https://nodejs.org/)
2. Verify installation:
   ```bash
   node --version
   npm --version
   ```

## Step 2: Install Project Dependencies

Navigate to the project directory and run:

```bash
npm install
```

This will install all required packages including:
- Next.js 14+
- React 18+
- Supabase client libraries
- Tailwind CSS
- Framer Motion
- And other dependencies

## Step 3: Set Up Supabase Project

### 3.1 Create Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Sign up for a free account
3. Create a new project
4. Wait for the project to finish provisioning (takes ~2 minutes)

### 3.2 Set Up Database Schema

1. In your Supabase Dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste the entire contents of `supabase/schema.sql`
4. Click **Run** (or press Ctrl+Enter)
5. Verify tables were created by going to **Table Editor** - you should see:
   - `profiles`
   - `forum_posts`
   - `complaints_requests`

### 3.3 Configure Google OAuth

#### Step A: Set Up OAuth Consent Screen (First Time Only)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. **Create a new project** (or select existing):
   - Click the project dropdown at the top
   - Click "New Project"
   - Enter project name (e.g., "JJC Puerto Princesa Perlas")
   - Click "Create"
3. **Configure OAuth Consent Screen**:
   - Go to **APIs & Services** > **OAuth consent screen**
   - Select **External** (unless you have a Google Workspace)
   - Click **Create**
   - Fill in required fields:
     - **App name**: "JJC Puerto Princesa Perlas" (or your app name)
     - **User support email**: Your email address
     - **Developer contact information**: Your email
   - Click **Save and Continue**
   - On "Scopes" page, click **Save and Continue** (no scopes needed for basic auth)
   - On "Test users" page, click **Save and Continue** (skip for now)
   - Review and click **Back to Dashboard**

#### Step B: Create OAuth 2.0 Credentials

1. In Google Cloud Console, go to **APIs & Services** > **Credentials**
2. Click **+ CREATE CREDENTIALS** > **OAuth 2.0 Client ID**
3. If prompted, configure consent screen first (follow Step A above)
4. Fill in the form:
   - **Application type**: Select **Web application**
   - **Name**: "JJC Puerto Princesa Perlas Web Client" (or any name)
   - **Authorized JavaScript origins**: (Leave empty or add your domain)
   - **Authorized redirect URIs**: Click **+ ADD URI** and add:
     - `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`
       - Replace `YOUR_PROJECT_REF` with your actual Supabase project reference
       - Find this in Supabase Dashboard > Settings > API > Project URL
       - Example: `https://abcdefghijklmnop.supabase.co/auth/v1/callback`
     - `http://localhost:3000/auth/callback` (for local development)
5. Click **Create**
6. **Copy the credentials**:
   - **Client ID** (starts with something like `123456789-abc...`)
   - **Client Secret** (click "Show" to reveal it)
   - Keep these safe - you'll need them in the next step

#### Step C: Enable Google Provider in Supabase

1. In Supabase Dashboard, go to **Authentication** > **Providers**
2. Find **Google** in the list and click to expand it
3. Toggle **Enable Google provider** to ON
4. Paste your credentials:
   - **Client ID (for OAuth)**: Paste the Client ID from Google Cloud Console
   - **Client Secret (for OAuth)**: Paste the Client Secret from Google Cloud Console
5. Click **Save**

**Important Notes:**
- Make sure the redirect URI in Google Cloud Console **exactly matches** your Supabase project URL
- The redirect URI format is: `https://[YOUR_PROJECT_REF].supabase.co/auth/v1/callback`
- You can find your project reference in Supabase Dashboard > Settings > API

### 3.4 Get API Keys

1. In Supabase Dashboard, go to **Settings** > **API**
2. Copy the following:
   - **Project URL** (this is your `NEXT_PUBLIC_SUPABASE_URL`)
   - **anon/public key** (this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

## Step 4: Configure Environment Variables

1. Create a file named `.env.local` in the project root
2. Add the following:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace the values with your actual Supabase credentials from Step 3.4.

**Important**: Never commit `.env.local` to git (it's already in `.gitignore`)

## Step 5: Update Google Form URL

1. Open `app/membership/page.tsx`
2. Find the line:
   ```typescript
   const googleFormUrl = "https://forms.gle/YOUR_FORM_ID_HERE";
   ```
3. Replace `YOUR_FORM_ID_HERE` with your actual Google Form URL

To create a Google Form:
1. Go to [Google Forms](https://forms.google.com)
2. Create your membership application form
3. Click **Send** > Copy the link
4. Use that link in the code

## Step 6: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

You should see the homepage! 🎉

## Step 7: Test the Application

### Test Public Pages:
- ✅ Home page loads
- ✅ About Us page displays values and history
- ✅ Leadership page shows board members
- ✅ Events page shows events
- ✅ Membership page has Google Form link

### Test Authentication:
1. Click **Community Login** or navigate to `/login`
2. Click **Sign in with Google**
3. Complete Google OAuth flow
4. You should be redirected to `/community`

### Test Community Features:
1. **Freedom Wall**:
   - Click **New Post**
   - Write a message and submit
   - Post should appear immediately (real-time)

2. **Service Desk**:
   - Click **New Ticket**
   - Fill out complaint/request form
   - Submit and verify it appears in your list

## Step 8: Set Up Admin Access (Optional)

To grant admin access to a user:

1. In Supabase Dashboard, go to **Table Editor** > **profiles**
2. Find the user's profile (by email or user_id)
3. Edit the `role` field from `user` to `admin`
4. Save

Admins can view all complaints/requests in the database (you may want to build an admin dashboard later).

## Troubleshooting

### "Invalid API key" error
- Double-check your `.env.local` file
- Ensure variable names start with `NEXT_PUBLIC_`
- Restart the dev server after changing env vars

### Google OAuth not working
- Verify redirect URLs match exactly in Google Cloud Console
- Check Supabase Dashboard > Authentication > Providers > Google is enabled
- Ensure you're using the correct Client ID and Secret

### Database errors
- Verify schema.sql was run successfully
- Check Table Editor to see if tables exist
- Ensure RLS policies are enabled (they should be from schema.sql)

### Real-time not working
- Check Supabase Dashboard > Database > Replication
- Ensure `forum_posts` table has replication enabled
- Verify you're using the correct Supabase client

## Next Steps

- Customize colors in `tailwind.config.ts`
- Add more events in `app/events/page.tsx`
- Update board members in `app/leadership/page.tsx`
- Enhance profanity filter in `app/community/page.tsx`
- Add more features as needed!

## Production Deployment

See the main `README.md` for deployment instructions to Vercel or other platforms.

---

Need help? Check the main README.md or Supabase/Next.js documentation.

