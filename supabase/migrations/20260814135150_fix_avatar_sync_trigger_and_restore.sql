drop trigger profiles_sync_participant_avatar on public.profiles;

create trigger profiles_sync_participant_avatar_on_insert
  after insert on public.profiles
  for each row when (new.avatar_url is not null)
  execute function public.sync_participant_avatar();

create trigger profiles_sync_participant_avatar_on_update
  after update of avatar_url on public.profiles
  for each row when (new.avatar_url is distinct from old.avatar_url)
  execute function public.sync_participant_avatar();

update public.profiles p
   set avatar_url = 'https://ndoryaqqywaqdsthlkba.supabase.co/storage/v1/object/public/avatars/'
                    || o.name
                    || '?v='
                    || (extract(epoch from o.updated_at) * 1000)::bigint
  from storage.objects o
 where o.bucket_id = 'avatars'
   and o.owner = p.user_id
   and p.avatar_url is null;
