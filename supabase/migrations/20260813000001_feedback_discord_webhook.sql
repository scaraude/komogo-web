-- Ping Discord des feedbacks au niveau DB (trigger + pg_net), pour que web ET
-- mobile notifient par le même chemin. Avant, le ping vivait uniquement dans la
-- server action Next.js : les feedbacks mobiles (insert direct via le client
-- Supabase) étaient stockés mais jamais notifiés.
--
-- L'URL du webhook Discord est lue depuis Vault (secret `feedback_webhook_url`),
-- jamais en dur ici ni dans le bundle client. À définir une fois via :
--   select vault.create_secret('<URL_DISCORD>', 'feedback_webhook_url');

create extension if not exists pg_net;

create or replace function public.notify_feedback_discord()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  webhook_url text;
  source text;
  content text;
begin
  select decrypted_secret into webhook_url
  from vault.decrypted_secrets
  where name = 'feedback_webhook_url'
  limit 1;

  if webhook_url is null then
    return new;
  end if;

  source := case
    when new.user_agent like 'komo-mobile%' then 'mobile'
    else 'web'
  end;

  content := left(
    '💬 **Nouveau feedback Komo** · ' || source || E'\n' || new.message
    || case
         when new.event_id is not null
         then E'\n— event `' || new.event_id::text || '`'
         else ''
       end,
    2000
  );

  perform net.http_post(
    url := webhook_url,
    headers := jsonb_build_object('Content-Type', 'application/json'),
    body := jsonb_build_object('content', content)
  );

  return new;
end;
$$;

drop trigger if exists feedback_notify_discord on public.feedback;
create trigger feedback_notify_discord
  after insert on public.feedback
  for each row execute function public.notify_feedback_discord();
