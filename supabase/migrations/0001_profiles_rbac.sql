-- Create User Role Enum
create type user_role as enum ('admin', 'user');

-- Create Profiles Table
create table profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  role user_role default 'user',
  full_name text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Trigger to create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url, role)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    'user' -- Default role
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Policy: Users can view their own profile
alter table profiles enable row level security;

create policy "Users can view own profile"
  on profiles for select
  using ( auth.uid() = id );

create policy "Users can update own profile"
  on profiles for update
  using ( auth.uid() = id );

-- Policy: Admin can view all profiles
create policy "Admins can view all profiles"
  on profiles for select
  using (
    auth.uid() in (
      select id from profiles where role = 'admin'
    )
  );
