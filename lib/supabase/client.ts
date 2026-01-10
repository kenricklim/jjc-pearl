import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // During build time, if Supabase is not configured, return a mock client
  // This allows static page generation to succeed
  if (!supabaseUrl || !supabaseKey) {
    // Return a mock client that won't throw during build
    // In production, this will be handled by the AuthProvider
    return createBrowserClient(
      supabaseUrl || "https://placeholder.supabase.co",
      supabaseKey || "placeholder-key"
    );
  }

  // createBrowserClient automatically handles cookies for PKCE in Next.js
  // The code verifier will be stored in cookies, accessible to both client and server
  return createBrowserClient(supabaseUrl, supabaseKey);
}

