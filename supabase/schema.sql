-- Democrat.ai Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Drafts table
create table if not exists drafts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  source_url text not null,
  source_platform text not null,
  source_content text,
  content_angle text not null,
  target_platform text not null,
  generated_title text not null,
  generated_content text not null,
  generated_hashtags text[] default '{}',
  generated_keywords text[] default '{}',
  image_url text,
  status text default 'draft' check (status in ('draft', 'approved', 'rejected', 'published')),
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Usage tracking (for free tier limits)
create table if not exists usage (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  action text not null,
  credits_used integer default 1,
  created_at timestamp with time zone default now() not null
);

-- Enable Row Level Security
alter table profiles enable row level security;
alter table drafts enable row level security;
alter table usage enable row level security;

-- Profiles policies
create policy "Users can view own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on profiles for insert
  with check (auth.uid() = id);

-- Drafts policies
create policy "Users can view own drafts"
  on drafts for select
  using (auth.uid() = user_id);

create policy "Users can create own drafts"
  on drafts for insert
  with check (auth.uid() = user_id);

create policy "Users can update own drafts"
  on drafts for update
  using (auth.uid() = user_id);

create policy "Users can delete own drafts"
  on drafts for delete
  using (auth.uid() = user_id);

-- Usage policies
create policy "Users can view own usage"
  on usage for select
  using (auth.uid() = user_id);

create policy "Users can insert own usage"
  on usage for insert
  with check (auth.uid() = user_id);

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    coalesce(new.raw_user_meta_data->>'avatar_url', null)
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user signup
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Indexes for performance
create index if not exists idx_drafts_user_id on drafts(user_id);
create index if not exists idx_drafts_status on drafts(status);
create index if not exists idx_drafts_created_at on drafts(created_at desc);
create index if not exists idx_usage_user_id on usage(user_id);
create index if not exists idx_usage_created_at on usage(created_at desc);
