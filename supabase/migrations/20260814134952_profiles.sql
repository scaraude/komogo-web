create table public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  pseudo text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_pseudo_length check (pseudo is null or char_length(pseudo) between 1 and 40)
);

alter table public.profiles enable row level security;

create policy profiles_select_own on public.profiles
  for select using (user_id = auth.uid());

create policy profiles_insert_own on public.profiles
  for insert with check (user_id = auth.uid());

create policy profiles_update_own on public.profiles
  for update using (user_id = auth.uid()) with check (user_id = auth.uid());

grant select, insert, update on public.profiles to authenticated;

create index participants_user_id_idx on public.participants (user_id) where user_id is not null;

create function public.touch_profile() returns trigger
language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row execute function public.touch_profile();

create function public.sync_participant_avatar() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  update public.participants
     set avatar_url = new.avatar_url
   where user_id = new.user_id
     and avatar_url is distinct from new.avatar_url;
  return null;
end;
$$;

create trigger profiles_sync_participant_avatar
  after insert or update of avatar_url on public.profiles
  for each row execute function public.sync_participant_avatar();

create function public.create_profile_for_new_user() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (user_id) values (new.id) on conflict (user_id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.create_profile_for_new_user();

insert into public.profiles (user_id, pseudo)
select distinct on (user_id) user_id, pseudo
  from public.participants
 where user_id is not null
 order by user_id, joined_at desc
on conflict (user_id) do nothing;

insert into public.profiles (user_id)
select id from auth.users
on conflict (user_id) do nothing;

update public.profiles p
   set avatar_url = latest.avatar_url
  from (
    select distinct on (user_id) user_id, avatar_url
      from public.participants
     where user_id is not null and avatar_url is not null
     order by user_id, joined_at desc
  ) latest
 where latest.user_id = p.user_id and p.avatar_url is null;
