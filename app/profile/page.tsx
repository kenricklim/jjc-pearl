"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { User, Save, ArrowLeft, Mail, Calendar, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    display_name: "",
    avatar_url: "",
    role: "user" as "admin" | "user",
    created_at: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      router.push("/login");
      return;
    }

    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, authLoading, router]);

  const loadProfile = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) throw error;

      if (data) {
        setProfile({
          display_name: data.display_name || "",
          avatar_url: data.avatar_url || "",
          role: data.role || "user",
          created_at: data.created_at || "",
        });
      }
    } catch (err: any) {
      console.error("Error loading profile:", err);
      setError("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      setSaving(true);
      setError(null);
      setSuccess(false);

      const { error } = await supabase
        .from("profiles")
        .update({
          display_name: profile.display_name.trim() || null,
          avatar_url: profile.avatar_url.trim() || null,
        })
        .eq("user_id", user.id);

      if (error) throw error;

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      console.error("Error saving profile:", err);
      setError(err.message || "Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex items-center space-x-3 mb-2">
          <User className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold text-gray-900">My Profile</h1>
        </div>
        <p className="text-gray-600">Manage your personal information and preferences</p>
      </div>

      {error && (
        <Card className="mb-6 border-red-200 bg-red-50">
          <CardContent className="p-4">
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      )}

      {success && (
        <Card className="mb-6 border-primary/20 bg-primary/10">
          <CardContent className="p-4">
            <p className="text-primary">Profile updated successfully!</p>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Profile Information Card */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your display name and avatar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Display Name</label>
              <Input
                value={profile.display_name}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, display_name: e.target.value }))
                }
                placeholder="Your display name"
                maxLength={100}
              />
              <p className="text-xs text-gray-500 mt-1">
                This name will be shown on your posts and tickets
              </p>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Avatar URL</label>
              <Input
                value={profile.avatar_url}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, avatar_url: e.target.value }))
                }
                placeholder="https://example.com/avatar.jpg"
                type="url"
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter a URL to your profile picture
              </p>
              {profile.avatar_url && (
                <div className="mt-2">
                  <Image
                    src={profile.avatar_url}
                    alt="Avatar preview"
                    width={64}
                    height={64}
                    className="rounded-full border-2 border-gray-200"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            <Button
              onClick={handleSave}
              disabled={saving}
              className="w-full"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Account Information Card */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">Email:</span>
                <span className="font-medium">{user.email}</span>
              </div>

              <div className="flex items-center space-x-2 text-sm">
                <Shield className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">Role:</span>
                <Badge variant={profile.role === "admin" ? "accent" : "default"}>
                  {profile.role === "admin" ? (
                    <span className="flex items-center">
                      <Shield className="h-3 w-3 mr-1" />
                      Admin
                    </span>
                  ) : (
                    "User"
                  )}
                </Badge>
              </div>

              {profile.created_at && (
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Member since:</span>
                  <span className="font-medium">
                    {new Date(profile.created_at).toLocaleDateString()}
                  </span>
                </div>
              )}

              <div className="flex items-center space-x-2 text-sm">
                <User className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">User ID:</span>
                <span className="font-mono text-xs text-gray-500">
                  {user.id.substring(0, 8)}...
                </span>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Note:</strong> Your email and role are managed by the system and cannot be changed here.
              </p>
              {profile.role === "admin" && (
                <p className="text-sm text-primary">
                  You have administrator privileges. Visit the{" "}
                  <button
                    onClick={() => router.push("/admin")}
                    className="underline font-semibold"
                  >
                    Admin Dashboard
                  </button>{" "}
                  to manage users and tickets.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

