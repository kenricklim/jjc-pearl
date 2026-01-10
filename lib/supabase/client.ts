import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file. See SETUP.md for instructions."
    );
  }

  // createBrowserClient automatically handles cookies for PKCE in Next.js
  // The code verifier will be stored in cookies, accessible to both client and server
  return createBrowserClient(supabaseUrl, supabaseKey);
}

