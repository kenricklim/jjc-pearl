"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Mail, Calendar, Shield, UserCheck, UserX, FileText, CheckCircle, Clock, AlertCircle, MessageSquare, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import type { Profile, ComplaintRequest } from "@/types/database";

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const supabase = createClient();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [tickets, setTickets] = useState<ComplaintRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      router.push("/login");
      return;
    }

    checkAdminStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, authLoading, router]);

  const checkAdminStatus = async () => {
    if (!user) return;

    try {
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (profileError) throw profileError;

      if (profile?.role === "admin") {
        setIsAdmin(true);
        loadAllUsers();
        loadAllTickets();
      } else {
        setError("Access denied. Admin privileges required.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Error checking admin status:", err);
      setError("Failed to verify admin status.");
      setLoading(false);
    }
  };

  const loadAllUsers = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProfiles(data || []);
    } catch (err) {
      console.error("Error loading users:", err);
      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  const loadAllTickets = async () => {
    try {
      // First try with join to get user info
      const { data, error } = await supabase
        .from("complaints_requests")
        .select(`
          *,
          profiles!inner(display_name, user_id, avatar_url)
        `)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading tickets with join:", error);
        // Fallback: load tickets without join
        const { data: fallbackData, error: fallbackError } = await supabase
          .from("complaints_requests")
          .select("*")
          .order("created_at", { ascending: false });
        
        if (fallbackError) {
          console.error("Error loading tickets without join:", fallbackError);
          throw fallbackError;
        }
        
        console.log("Loaded tickets without join:", fallbackData?.length || 0);
        setTickets(fallbackData || []);
        return;
      }
      
      console.log("Loaded tickets with join:", data?.length || 0);
      setTickets(data || []);
    } catch (err: any) {
      console.error("Error loading tickets:", err);
      setError(`Failed to load tickets: ${err.message}`);
    }
  };

  const updateTicketStatus = async (ticketId: string, newStatus: "pending" | "in_progress" | "resolved") => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from("complaints_requests")
        .update({ status: newStatus })
        .eq("id", ticketId);

      if (error) throw error;
      loadAllTickets(); // Refresh the list
    } catch (err) {
      console.error("Error updating ticket status:", err);
      alert("Failed to update ticket status.");
    }
  };

  const submitReply = async (ticketId: string) => {
    if (!user || !replyText[ticketId]?.trim()) {
      alert("Please enter a reply.");
      return;
    }

    try {
      const { error } = await supabase
        .from("complaints_requests")
        .update({
          admin_reply: replyText[ticketId],
          admin_reply_at: new Date().toISOString(),
          admin_replied_by: user.id,
        })
        .eq("id", ticketId);

      if (error) throw error;
      
      // Clear reply text and close reply section
      setReplyText(prev => ({ ...prev, [ticketId]: "" }));
      setReplyingTo(null);
      loadAllTickets(); // Refresh the list
    } catch (err) {
      console.error("Error submitting reply:", err);
      alert("Failed to submit reply.");
    }
  };

  const toggleUserRole = async (userId: string, currentRole: string) => {
    if (!isAdmin) return;

    const newRole = currentRole === "admin" ? "user" : "admin";

    try {
      const { error } = await supabase
        .from("profiles")
        .update({ role: newRole })
        .eq("user_id", userId);

      if (error) throw error;

      // Refresh the list
      loadAllUsers();
    } catch (err) {
      console.error("Error updating role:", err);
      alert("Failed to update user role.");
    }
  };

  if (authLoading || loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (error && !isAdmin) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={() => router.push("/")}>Go to Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
        <p className="text-gray-600">Manage registered users, tickets, and system administration</p>
      </div>

      {error && (
        <Card className="mb-6 border-red-200 bg-red-50">
          <CardContent className="p-4">
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="users" className="w-full mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="users" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Users ({profiles.length})</span>
          </TabsTrigger>
          <TabsTrigger value="tickets" className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Tickets ({tickets.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Registered Users ({profiles.length})</span>
            </CardTitle>
            <Button onClick={loadAllUsers} variant="outline" size="sm">
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {profiles.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No users found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 text-sm font-semibold text-gray-700">User</th>
                    <th className="text-left p-3 text-sm font-semibold text-gray-700">Email</th>
                    <th className="text-left p-3 text-sm font-semibold text-gray-700">Role</th>
                    <th className="text-left p-3 text-sm font-semibold text-gray-700">Joined</th>
                    <th className="text-left p-3 text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {profiles.map((profile) => (
                    <tr key={profile.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          {profile.avatar_url ? (
                            <Image
                              src={profile.avatar_url}
                              alt={profile.display_name || "User"}
                              width={32}
                              height={32}
                              className="h-8 w-8 rounded-full"
                            />
                          ) : (
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <Users className="h-4 w-4 text-primary" />
                            </div>
                          )}
                          <span className="font-medium">
                            {profile.display_name || "Anonymous"}
                          </span>
                        </div>
                      </td>
                      <td className="p-3 text-gray-600 text-sm">
                        {profile.user_id}
                      </td>
                      <td className="p-3">
                        <Badge
                          variant={profile.role === "admin" ? "accent" : "default"}
                        >
                          {profile.role === "admin" ? (
                            <span className="flex items-center">
                              <Shield className="h-3 w-3 mr-1" />
                              Admin
                            </span>
                          ) : (
                            "User"
                          )}
                        </Badge>
                      </td>
                      <td className="p-3 text-gray-600 text-sm">
                        {new Date(profile.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-3">
                        {profile.user_id !== user.id && (
                          <Button
                            onClick={() => toggleUserRole(profile.user_id, profile.role)}
                            variant="outline"
                            size="sm"
                          >
                            {profile.role === "admin" ? (
                              <span className="flex items-center">
                                <UserX className="h-3 w-3 mr-1" />
                                Remove Admin
                              </span>
                            ) : (
                              <span className="flex items-center">
                                <UserCheck className="h-3 w-3 mr-1" />
                                Make Admin
                              </span>
                            )}
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
        </TabsContent>

        <TabsContent value="tickets" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>All Tickets ({tickets.length})</span>
                </CardTitle>
                <Button onClick={loadAllTickets} variant="outline" size="sm">
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {tickets.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No tickets found.</p>
              ) : (
                <div className="space-y-4">
                  {tickets.map((ticket) => {
                    // Handle both joined profile and direct lookup
                    let userProfile: any = null;
                    if (ticket.profiles) {
                      userProfile = ticket.profiles;
                    } else {
                      // Fallback: find profile from profiles array if join didn't work
                      const profile = profiles.find(p => p.user_id === ticket.user_id);
                      userProfile = profile;
                    }
                    
                    return (
                      <Card key={ticket.id} className="border-l-4 border-l-primary">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="font-semibold text-gray-900">{ticket.subject}</h3>
                                <Badge
                                  variant={
                                    ticket.status === "resolved"
                                      ? "success"
                                      : ticket.status === "in_progress"
                                      ? "accent"
                                      : "warning"
                                  }
                                >
                                  {ticket.status === "resolved" ? (
                                    <span className="flex items-center">
                                      <CheckCircle className="h-3 w-3 mr-1" />
                                      Resolved
                                    </span>
                                  ) : ticket.status === "in_progress" ? (
                                    <span className="flex items-center">
                                      <Clock className="h-3 w-3 mr-1" />
                                      In Progress
                                    </span>
                                  ) : (
                                    <span className="flex items-center">
                                      <AlertCircle className="h-3 w-3 mr-1" />
                                      Pending
                                    </span>
                                  )}
                                </Badge>
                                <Badge variant={ticket.type === "complaint" ? "danger" : "default"}>
                                  {ticket.type === "complaint" ? "Complaint" : "Request"}
                                </Badge>
                              </div>
                              <div className="text-sm text-gray-500 mb-2">
                                <p>
                                  <strong>From:</strong> {userProfile?.display_name || userProfile?.user_id || "Unknown User"}
                                </p>
                                <p>
                                  <strong>User ID:</strong> {ticket.user_id.substring(0, 8)}...
                                </p>
                                <p>
                                  <strong>Submitted:</strong> {new Date(ticket.created_at).toLocaleString()}
                                </p>
                              </div>
                              <p className="text-gray-700 mb-3">{ticket.description}</p>
                              
                              {/* Admin Reply Section */}
                              {(ticket as any).admin_reply && (
                                <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-lg">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <MessageSquare className="h-4 w-4 text-primary" />
                                    <span className="text-sm font-semibold text-primary">Admin Reply:</span>
                                    {(ticket as any).admin_reply_at && (
                                      <span className="text-xs text-gray-500">
                                        {new Date((ticket as any).admin_reply_at).toLocaleString()}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-gray-700 text-sm whitespace-pre-wrap">
                                    {(ticket as any).admin_reply}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="space-y-3 pt-3 border-t">
                            {/* Status Update */}
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-gray-700 w-24">Status:</span>
                              <select
                                value={ticket.status}
                                onChange={(e) => updateTicketStatus(ticket.id, e.target.value as any)}
                                className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                              >
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="resolved">Resolved</option>
                              </select>
                            </div>
                            
                            {/* Reply Section */}
                            {replyingTo === ticket.id ? (
                              <div className="space-y-2">
                                <Textarea
                                  placeholder="Type your reply to the user..."
                                  value={replyText[ticket.id] || ""}
                                  onChange={(e) => setReplyText(prev => ({ ...prev, [ticket.id]: e.target.value }))}
                                  rows={4}
                                  className="w-full"
                                />
                                <div className="flex justify-end space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      setReplyingTo(null);
                                      setReplyText(prev => ({ ...prev, [ticket.id]: "" }));
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={() => submitReply(ticket.id)}
                                    className="flex items-center space-x-2"
                                  >
                                    <Send className="h-4 w-4" />
                                    <span>Send Reply</span>
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setReplyingTo(ticket.id)}
                                className="w-full flex items-center justify-center space-x-2"
                              >
                                <MessageSquare className="h-4 w-4" />
                                <span>{(ticket as any).admin_reply ? "Edit Reply" : "Add Reply"}</span>
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{profiles.length}</p>
                <p className="text-sm text-gray-600">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-accent" />
              <div>
                <p className="text-2xl font-bold">
                  {profiles.filter((p) => p.role === "admin").length}
                </p>
                <p className="text-sm text-gray-600">Admins</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <UserCheck className="h-8 w-8 text-primary-light" />
              <div>
                <p className="text-2xl font-bold">
                  {profiles.filter((p) => p.role === "user").length}
                </p>
                <p className="text-sm text-gray-600">Regular Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{tickets.length}</p>
                <p className="text-sm text-gray-600">Total Tickets</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold">
                  {tickets.filter((t) => t.status === "pending").length}
                </p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Clock className="h-8 w-8 text-accent" />
              <div>
                <p className="text-2xl font-bold">
                  {tickets.filter((t) => t.status === "in_progress").length}
                </p>
                <p className="text-sm text-gray-600">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-8 w-8 text-accent" />
              <div>
                <p className="text-2xl font-bold">
                  {tickets.filter((t) => t.status === "resolved").length}
                </p>
                <p className="text-sm text-gray-600">Resolved</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

