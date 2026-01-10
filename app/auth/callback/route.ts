import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") || "/community";
  const origin = requestUrl.origin;

  if (code) {
    const cookieStore = await cookies();
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch (error) {
              console.error("Error setting cookies:", error);
            }
          },
        },
      }
    );

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (error) {
      console.error("Error exchanging code for session:", error);
      console.error("Error details:", JSON.stringify(error, null, 2));
      return NextResponse.redirect(`${origin}/login?error=auth_failed&details=${encodeURIComponent(error.message)}`);
    }

    // Verify session was created
    if (!data?.session) {
      console.error("No session created after code exchange");
      console.error("Response data:", JSON.stringify(data, null, 2));
      return NextResponse.redirect(`${origin}/login?error=no_session`);
    }

    // Get the user to verify
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      console.error("No user found after session exchange");
      return NextResponse.redirect(`${origin}/login?error=no_user`);
    }

    // Create response with redirect - cookies should be set automatically by Supabase SSR
    return NextResponse.redirect(`${origin}${next}`);
  }

  // If no code, redirect to login
  return NextResponse.redirect(`${origin}/login`);
}

