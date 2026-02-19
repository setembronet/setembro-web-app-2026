-- Create Testimonials Table
create table testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  content text not null,
  image_url text,
  link text,
  "order" int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Trigger for updated_at
create trigger set_timestamp_testimonials
  before update on testimonials
  for each row execute procedure handle_updated_at();

-- RLS Policies
alter table testimonials enable row level security;

-- Everyone can read testimonials
create policy "Public can view testimonials"
  on testimonials for select
  using (true);

-- Only admins can insert/update/delete
create policy "Admins can manage testimonials"
  on testimonials for all
  using (
    auth.uid() in (
      select id from profiles where role = 'admin'
    )
  );
