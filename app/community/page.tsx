"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/components/auth-provider";
import { createClient } from "@/lib/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { MessageSquare, FileText, Plus, Clock, CheckCircle, AlertCircle } from "lucide-react";
import type { ForumPost, ComplaintRequest } from "@/types/database";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const forumPostSchema = z.object({
  content: z.string().min(1, "Please enter a message").max(500, "Message too long"),
});

const complaintSchema = z.object({
  type: z.enum(["complaint", "request"]),
  subject: z.string().min(1, "Subject is required").max(200),
  description: z.string().min(1, "Description is required").max(1000),
});

export default function CommunityPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([]);
  const [complaints, setComplaints] = useState<ComplaintRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [postDialogOpen, setPostDialogOpen] = useState(false);
  const [complaintDialogOpen, setComplaintDialogOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<ComplaintRequest | null>(null);
  const [ticketDetailsOpen, setTicketDetailsOpen] = useState(false);
  const [supabaseConfigured, setSupabaseConfigured] = useState(false);

  useEffect(() => {
    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    setSupabaseConfigured(!!(supabaseUrl && supabaseKey));
    
    if (!supabaseUrl || !supabaseKey) {
      setLoading(false);
      return;
    }
  }, []);

  const forumForm = useForm({
    resolver: zodResolver(forumPostSchema),
    defaultValues: { content: "" },
  });

  const complaintForm = useForm({
    resolver: zodResolver(complaintSchema),
    defaultValues: { type: "request" as const, subject: "", description: "" },
  });

  const loadForumPosts = useCallback(async () => {
    if (!supabaseConfigured) return;
    
    try {
      const supabase = createClient();
      // First get all posts
      const { data: posts, error: postsError } = await supabase
        .from("forum_posts")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);

      if (postsError) throw postsError;

      // Then get all unique user IDs
      const userIds = [...new Set(posts?.map(p => p.user_id) || [])];
      
      // Fetch profiles for all users
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("user_id, display_name, avatar_url")
        .in("user_id", userIds);

      if (profilesError) {
        console.error("Error loading profiles:", profilesError);
        // Continue without profiles
      }

      // Combine posts with profiles
      const postsWithProfiles = posts?.map(post => ({
        ...post,
        profiles: profiles?.find(p => p.user_id === post.user_id) || null
      })) || [];

      setForumPosts(postsWithProfiles);
    } catch (error) {
      console.error("Error loading forum posts:", error);
    } finally {
      setLoading(false);
    }
  }, [supabaseConfigured]);

  const loadComplaints = useCallback(async () => {
    if (!user || !supabaseConfigured) return;

    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("complaints_requests")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setComplaints(data || []);
    } catch (error) {
      console.error("Error loading complaints:", error);
    }
  }, [user, supabaseConfigured]);

  const setupRealtime = useCallback(() => {
    if (!supabaseConfigured) return undefined;
    
    const supabase = createClient();
    const channel = supabase
      .channel("forum_posts")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "forum_posts",
        },
        async (payload) => {
          // Fetch the new post and its profile
          const newPost = payload.new as ForumPost;
          try {
            const { data: profile } = await supabase
              .from("profiles")
              .select("user_id, display_name, avatar_url")
              .eq("user_id", newPost.user_id)
              .single();
            
            const postWithProfile: ForumPost = {
              ...newPost,
              profiles: profile ? {
                id: profile.user_id,
                user_id: profile.user_id,
                display_name: profile.display_name,
                avatar_url: profile.avatar_url,
                role: "user" as const,
                created_at: ""
              } : undefined
            };
            setForumPosts((prev) => [postWithProfile, ...prev]);
          } catch {
            // If profile fetch fails, add post without profile
            const postWithoutProfile: ForumPost = {
              ...newPost,
              profiles: undefined
            };
            setForumPosts((prev) => [postWithoutProfile, ...prev]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabaseConfigured]);

  useEffect(() => {
    if (supabaseConfigured) {
      // Always load forum posts (public)
      loadForumPosts();
      const cleanup = setupRealtime();
      
      // Only load complaints if user is logged in
      if (user) {
        loadComplaints();
      } else {
        setLoading(false);
      }
      
      return cleanup;
    } else if (!supabaseConfigured) {
      setLoading(false);
    }
  }, [user, supabaseConfigured, loadForumPosts, loadComplaints, setupRealtime]);

  const onSubmitPost = async (data: z.infer<typeof forumPostSchema>) => {
    if (!user) {
      router.push("/login");
      return;
    }
    
    if (!supabaseConfigured) {
      alert("Supabase is not configured. Please set up your .env.local file.");
      return;
    }

    // Basic profanity filter (you can enhance this)
    const profanityWords = ["badword1", "badword2"]; // Add your list
    const hasProfanity = profanityWords.some((word) =>
      data.content.toLowerCase().includes(word)
    );

    if (hasProfanity) {
      alert("Please keep your message respectful.");
      return;
    }

    try {
      const supabase = createClient();
      const { error } = await supabase.from("forum_posts").insert({
        user_id: user.id,
        content: data.content,
        likes_count: 0,
      });

      if (error) {
        console.error("Error posting:", error);
        throw error;
      }
      
      // Reload posts to show the new one
      await loadForumPosts();
      forumForm.reset();
      setPostDialogOpen(false);
    } catch (error: any) {
      console.error("Error posting:", error);
      alert(`Failed to post: ${error.message || "Please try again."}`);
    }
  };

  const onSubmitComplaint = async (data: z.infer<typeof complaintSchema>) => {
    if (!user || !supabaseConfigured) {
      alert("Supabase is not configured. Please set up your .env.local file.");
      return;
    }

    try {
      const supabase = createClient();
      const { error } = await supabase.from("complaints_requests").insert({
        user_id: user.id,
        type: data.type,
        subject: data.subject,
        description: data.description,
        status: "pending",
      });

      if (error) throw error;
      complaintForm.reset();
      setComplaintDialogOpen(false);
      loadComplaints();
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("Failed to submit. Please try again.");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "resolved":
        return <Badge variant="success">Resolved</Badge>;
      case "in_progress":
        return <Badge variant="accent">In Progress</Badge>;
      default:
        return <Badge variant="warning">Pending</Badge>;
    }
  };

  if (!supabaseConfigured) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle>Supabase Not Configured</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Community features require Supabase setup. Please configure your environment variables.
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>For Local Development:</strong></p>
              <p className="text-gray-500 ml-4">
                Create a <code className="bg-gray-100 px-1 rounded">.env.local</code> file with your Supabase credentials.
              </p>
              <p className="mt-4"><strong>For Vercel Deployment:</strong></p>
              <p className="text-gray-500 ml-4">
                Add environment variables in Vercel Dashboard: Settings → Environment Variables
              </p>
              <p className="text-gray-500 ml-4">
                Required variables: <code className="bg-gray-100 px-1 rounded">NEXT_PUBLIC_SUPABASE_URL</code> and <code className="bg-gray-100 px-1 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>
              </p>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              See <strong>SETUP.md</strong> for local setup or <strong>VERCEL_ENV_SETUP.md</strong> for Vercel deployment instructions.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (authLoading || loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Community Portal</h1>
        <p className="text-gray-600">Connect, share, and engage with the community</p>
      </div>

      <Tabs defaultValue="forum" className="w-full">
        <TabsList className={user ? "grid w-full grid-cols-2" : "grid w-full grid-cols-1"}>
          <TabsTrigger value="forum" className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span>Freedom Wall</span>
          </TabsTrigger>
          {user && (
            <TabsTrigger value="service" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Service Desk</span>
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="forum" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Share Your Thoughts</CardTitle>
                {user ? (
                  <Button onClick={() => setPostDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Post
                  </Button>
                ) : (
                  <Link href="/login">
                    <Button variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Sign in to Post
                    </Button>
                  </Link>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {forumPosts.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No posts yet. Be the first to share!
                </p>
              ) : (
                <div className="space-y-4">
                  {forumPosts.map((post) => (
                    <Card key={post.id} className="bg-gray-50">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold text-gray-900">
                              {post.profiles?.display_name || "Anonymous"}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(post.created_at).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {user && (
          <TabsContent value="service" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Complaints & Requests</CardTitle>
                  <Button onClick={() => setComplaintDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Ticket
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {complaints.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No tickets yet. Submit a complaint or request to get started.
                  </p>
                ) : (
                <div className="space-y-4">
                  {complaints.map((ticket) => (
                    <Card 
                      key={ticket.id}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => {
                        setSelectedTicket(ticket);
                        setTicketDetailsOpen(true);
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold text-gray-900">{ticket.subject}</h3>
                              {getStatusBadge(ticket.status)}
                            </div>
                            <p className="text-sm text-gray-500 mb-2">
                              {ticket.type === "complaint" ? "Complaint" : "Request"} •{" "}
                              {new Date(ticket.created_at).toLocaleDateString()}
                            </p>
                            <p className="text-gray-700 line-clamp-2">{ticket.description}</p>
                            {ticket.status === "resolved" && ticket.admin_reply && (
                              <p className="text-sm text-primary mt-2 font-medium">
                                ✓ Resolved - Click to view details
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        )}
      </Tabs>

      {/* Post Dialog */}
      <Dialog open={postDialogOpen} onOpenChange={setPostDialogOpen}>
        <DialogContent onClose={() => setPostDialogOpen(false)}>
          <DialogHeader>
            <DialogTitle>Share a Thought</DialogTitle>
            <DialogDescription>
              Share your thoughts with the community. Keep it respectful and positive.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={forumForm.handleSubmit(onSubmitPost)} className="space-y-4">
            <Textarea
              {...forumForm.register("content")}
              placeholder="What&apos;s on your mind?"
              rows={4}
            />
            {forumForm.formState.errors.content && (
              <p className="text-sm text-red-500">
                {forumForm.formState.errors.content.message}
              </p>
            )}
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setPostDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Post</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Complaint Dialog */}
      <Dialog open={complaintDialogOpen} onOpenChange={setComplaintDialogOpen}>
        <DialogContent onClose={() => setComplaintDialogOpen(false)}>
          <DialogHeader>
            <DialogTitle>Submit Complaint or Request</DialogTitle>
            <DialogDescription>
              Let us know how we can help. We&apos;ll review your submission and get back to you.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={complaintForm.handleSubmit(onSubmitComplaint)} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Type</label>
              <select
                {...complaintForm.register("type")}
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="request">Request</option>
                <option value="complaint">Complaint</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Subject</label>
              <Input
                {...complaintForm.register("subject")}
                placeholder="Brief description"
              />
              {complaintForm.formState.errors.subject && (
                <p className="text-sm text-red-500 mt-1">
                  {complaintForm.formState.errors.subject.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Description</label>
              <Textarea
                {...complaintForm.register("description")}
                placeholder="Provide details..."
                rows={5}
              />
              {complaintForm.formState.errors.description && (
                <p className="text-sm text-red-500 mt-1">
                  {complaintForm.formState.errors.description.message}
                </p>
              )}
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setComplaintDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Ticket Details Dialog */}
      <Dialog open={ticketDetailsOpen} onOpenChange={setTicketDetailsOpen}>
        <DialogContent onClose={() => setTicketDetailsOpen(false)} className="max-w-2xl">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>Ticket Details</DialogTitle>
              {selectedTicket && getStatusBadge(selectedTicket.status)}
            </div>
            <DialogDescription>
              {selectedTicket?.type === "complaint" ? "Complaint" : "Request"} submitted on{" "}
              {selectedTicket && new Date(selectedTicket.created_at).toLocaleString()}
            </DialogDescription>
          </DialogHeader>
          {selectedTicket && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-1">Subject</h3>
                <p className="text-gray-900 font-medium">{selectedTicket.subject}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-1">Description</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{selectedTicket.description}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-1">Status</h3>
                <div className="flex items-center gap-2">
                  {getStatusBadge(selectedTicket.status)}
                  <span className="text-sm text-gray-600">
                    {selectedTicket.status === "pending" && "Waiting for admin review"}
                    {selectedTicket.status === "in_progress" && "Admin is working on this"}
                    {selectedTicket.status === "resolved" && "This ticket has been resolved"}
                  </span>
                </div>
              </div>

              {selectedTicket.status === "resolved" && selectedTicket.admin_reply && (
                <div className="bg-primary/10 border-l-4 border-primary p-4 rounded-r-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <h3 className="text-sm font-semibold text-primary">Resolution</h3>
                  </div>
                  {selectedTicket.admin_reply_at && (
                    <p className="text-xs text-gray-500 mb-2">
                      Resolved on {new Date(selectedTicket.admin_reply_at).toLocaleString()}
                    </p>
                  )}
                  <p className="text-gray-900 whitespace-pre-wrap">{selectedTicket.admin_reply}</p>
                </div>
              )}

              {selectedTicket.status !== "resolved" && (
                <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <p className="text-sm text-gray-600">
                      {selectedTicket.status === "pending" 
                        ? "Your ticket is pending review. An admin will respond soon."
                        : "Your ticket is being processed. We'll update you once it's resolved."}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="flex justify-end mt-6">
            <Button variant="outline" onClick={() => setTicketDetailsOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

