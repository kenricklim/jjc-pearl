# JJC Puerto Princesa Perlas - Community & Organization Platform

A modern, full-stack website for the non-profit organization JJC Puerto Princesa Perlas, built with Next.js 14+ and Supabase.

## Features

- **Public Portfolio**: Showcase organization history, board members, values, and events
- **Community Hub**: Interactive Freedom Wall and Service Desk for community engagement
- **Google Authentication**: Secure sign-in via Supabase Auth
- **Real-time Updates**: Freedom Wall posts appear instantly using Supabase Realtime
- **Responsive Design**: Beautiful, mobile-friendly interface with Framer Motion animations

## Tech Stack

- **Framework**: Next.js 14+ (App Router) with TypeScript
- **Styling**: Tailwind CSS + Custom UI Components
- **Animations**: Framer Motion
- **Backend/Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (Google OAuth)
- **Form Handling**: React Hook Form + Zod
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- A Supabase account (free tier works)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd jci-pearl-1
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up Supabase**

   a. Create a new project at [supabase.com](https://supabase.com)

   b. Go to SQL Editor and run the schema from `supabase/schema.sql`

   c. Go to Authentication > Providers and enable Google OAuth:
      - Add your Google OAuth credentials (Client ID and Secret)
      - Set redirect URL to: `https://your-project-ref.supabase.co/auth/v1/callback`
      - Add authorized redirect URLs in Google Cloud Console:
        - `http://localhost:3000/auth/callback` (for development)
        - `https://yourdomain.com/auth/callback` (for production)

4. **Configure environment variables**

   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

   Fill in your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

   You can find these in your Supabase Dashboard > Settings > API

5. **Update Google Form URL**

   Edit `app/membership/page.tsx` and replace the placeholder URL:
   ```typescript
   const googleFormUrl = "https://forms.gle/YOUR_ACTUAL_FORM_ID";
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── about/             # About Us page
│   ├── auth/             # Auth callback route
│   ├── community/        # Community portal (protected)
│   ├── events/           # Events page
│   ├── leadership/        # Leadership/Board page
│   ├── login/            # Login page
│   ├── membership/       # Membership application page
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── auth-provider.tsx # Auth context provider
│   └── navbar.tsx       # Navigation component
├── lib/                   # Utility functions
│   ├── supabase/         # Supabase client setup
│   └── utils.ts          # Helper functions
├── supabase/              # Database schema
│   └── schema.sql        # SQL schema file
└── types/                 # TypeScript type definitions
```

## Database Schema

The application uses three main tables:

1. **profiles**: User profiles linked to auth.users
2. **forum_posts**: Freedom Wall posts (public, real-time)
3. **complaints_requests**: Service desk tickets (private, user-specific)

Row Level Security (RLS) is enabled on all tables to ensure data privacy.

## Key Features Explained

### Freedom Wall
- Public forum where authenticated users can post thoughts
- Real-time updates using Supabase Realtime subscriptions
- Basic profanity filtering (customize in `app/community/page.tsx`)

### Service Desk
- Private ticket system for complaints and requests
- Users can only see their own tickets
- Admins can view all tickets (configure admin role in profiles table)

### Authentication Flow
1. User clicks "Sign in with Google"
2. Redirected to Google OAuth
3. Callback handled at `/auth/callback`
4. User profile automatically created via database trigger
5. Redirected to `/community`

## Customization

### Colors
Edit `tailwind.config.ts` to customize the color palette:
- Primary: Emerald Green (environmental theme)
- Secondary: Pearl White/Cream (Perlas reference)
- Accent: Gold/Yellow (JCI branding)

### Content
- Board members: Edit `app/leadership/page.tsx`
- Events: Edit `app/events/page.tsx`
- Values/Mission: Edit `app/about/page.tsx`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Update Supabase redirect URLs to include your Vercel domain

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- Self-hosted (Docker, etc.)

## Security Notes

- Row Level Security (RLS) is enabled on all tables
- Users can only access their own data (except forum posts which are public)
- Admin role can be assigned in the profiles table for elevated access
- Environment variables should never be committed to git

## Support

For issues or questions:
- Check Supabase documentation: https://supabase.com/docs
- Check Next.js documentation: https://nextjs.org/docs

## License

This project is for the JJC Puerto Princesa Perlas organization.

