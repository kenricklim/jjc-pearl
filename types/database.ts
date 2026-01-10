export type Profile = {
  id: string;
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
  role: "admin" | "user";
  created_at: string;
};

export type ForumPost = {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  likes_count: number;
  profiles?: Profile;
};

export type ComplaintRequest = {
  id: string;
  user_id: string;
  subject: string;
  description: string;
  type: "complaint" | "request";
  status: "pending" | "resolved" | "in_progress";
  created_at: string;
  admin_reply?: string | null;
  admin_reply_at?: string | null;
  admin_replied_by?: string | null;
  profiles?: Profile;
};

