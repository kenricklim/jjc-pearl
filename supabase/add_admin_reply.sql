-- Add admin_reply field to complaints_requests table
ALTER TABLE public.complaints_requests 
ADD COLUMN IF NOT EXISTS admin_reply TEXT,
ADD COLUMN IF NOT EXISTS admin_reply_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS admin_replied_by UUID REFERENCES auth.users(id);

-- Add policy for admins to update complaints/requests (for replies)
CREATE POLICY "Admins can update all complaints/requests"
  ON public.complaints_requests FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.user_id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Create index for admin_replied_by
CREATE INDEX IF NOT EXISTS idx_complaints_admin_replied_by ON public.complaints_requests(admin_replied_by);

