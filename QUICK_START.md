# Quick Start Guide

Get up and running in 5 minutes!

## Prerequisites
- Node.js 18+ installed
- A Supabase account (free tier works)

## Steps

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up Supabase**
   - Create project at [supabase.com](https://supabase.com)
   - Run `supabase/schema.sql` in SQL Editor
   - Enable Google OAuth in Authentication > Providers
   - Copy API keys from Settings > API

3. **Create `.env.local`**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
   ```

4. **Update Google Form URL**
   - Edit `app/membership/page.tsx`
   - Replace `YOUR_FORM_ID_HERE` with your actual Google Form URL

5. **Run the app**
   ```bash
   npm run dev
   ```

6. **Open browser**
   - Go to [http://localhost:3000](http://localhost:3000)

That's it! 🎉

For detailed setup instructions, see `SETUP.md`.

