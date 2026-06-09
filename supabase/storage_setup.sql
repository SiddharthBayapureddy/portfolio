-- Run this in the Supabase SQL Editor to allow public access to your thumbnails
-- Note: You must first manually create a bucket named 'projects' in the Supabase Storage dashboard.

-- Allow public access to the 'projects' bucket
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'projects' );

-- Allow public uploads (optional, but keep it restricted to authenticated if possible)
-- For a personal portfolio, you usually upload via the Dashboard.
