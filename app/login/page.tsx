"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [supabaseConfigured, setSupabaseConfigured] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    setSupabaseConfigured(!!(supabaseUrl && supabaseKey));
  }, []);

  useEffect(() => {
    if (user) {
      // Small delay to ensure session is fully established
      setTimeout(() => {
        router.push("/community");
        router.refresh();
      }, 100);
    }
  }, [user, router]);

  useEffect(() => {
    // Check for error in URL
    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");
    const details = params.get("details");
    
    if (error) {
      let message = "Authentication failed. Please try again.";
      if (error === "auth_failed") {
        message = details 
          ? `Authentication failed: ${decodeURIComponent(details)}`
          : "Failed to exchange authorization code. Please try again.";
      } else if (error === "no_session") {
        message = "Session was not created. Please try again.";
      } else if (error === "no_user") {
        message = "User not found after authentication. Please contact support.";
      }
      setErrorMessage(message);
      
      // Clean URL
      window.history.replaceState({}, "", "/login");
    }
  }, []);

  const handleGoogleLogin = async () => {
    if (!supabaseConfigured) {
      alert("Supabase is not configured. Please set up your .env.local file with Supabase credentials. See SETUP.md for instructions.");
      return;
    }

    try {
      setLoading(true);
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });
      
      if (error) {
        console.error("OAuth error:", error);
        throw error;
      }
      
      // The redirect will happen automatically
      // No need to manually redirect
    } catch (error: any) {
      console.error("Error signing in:", error);
      setErrorMessage(error?.message || "Failed to sign in. Please try again.");
      setLoading(false);
    }
  };

  if (!supabaseConfigured) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-yellow-100 flex items-center justify-center">
                <LogIn className="h-8 w-8 text-yellow-600" />
              </div>
              <CardTitle className="text-3xl">Supabase Not Configured</CardTitle>
              <CardDescription className="text-base mt-2">
                Community features require Supabase setup
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <p className="text-sm text-gray-700 mb-2">
                  To enable login and community features, you need to:
                </p>
                <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                  <li>Create a Supabase account at supabase.com</li>
                  <li>Create a new project</li>
                  <li>Run the schema.sql file in SQL Editor</li>
                  <li>Create a .env.local file with your credentials</li>
                </ol>
                <p className="text-xs text-gray-500 mt-3">
                  See <strong>SETUP.md</strong> for detailed instructions.
                </p>
              </div>
              <Link href="/">
                <Button variant="outline" size="lg" className="w-full">
                  Back to Home
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <LogIn className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-3xl">Community Login</CardTitle>
            <CardDescription className="text-base mt-2">
              Sign in with Google to access the Freedom Wall and Service Desk
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {errorMessage && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-600">{errorMessage}</p>
                <p className="text-xs text-red-500 mt-2">
                  Check browser console (F12) for more details.
                </p>
              </div>
            )}
            <div className="bg-secondary/50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                To interact with our community features, you need to sign in with
                your Google account. This allows you to:
              </p>
              <ul className="list-disc list-inside mt-2 text-sm text-gray-600 space-y-1">
                <li>Post on the Freedom Wall</li>
                <li>Submit complaints and requests</li>
                <li>Track your service requests</li>
              </ul>
            </div>
            <Button
              onClick={handleGoogleLogin}
              disabled={loading}
              size="lg"
              className="w-full"
            >
              {loading ? "Signing in..." : "Sign in with Google"}
            </Button>
            <p className="text-xs text-gray-500 text-center">
              By signing in, you agree to our community guidelines and terms of
              service.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

