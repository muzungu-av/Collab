create table public.users (
  id uuid primary key default gen_random_uuid(),
  telegram_id text unique,
  email text unique,
  phone text unique,
  username text,
  hashed_password text,
  created_at timestamptz default now()
);