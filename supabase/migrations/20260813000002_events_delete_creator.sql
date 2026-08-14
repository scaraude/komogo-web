-- Suppression d'un event réservée à son créateur. Les enfants (participants,
-- meals, transport_legs, date_proposals, activities, etc.) sont supprimés en
-- cascade via leurs FK on delete cascade — un seul delete suffit côté client.
-- Sans cette policy, RLS refusait tout DELETE (deny par défaut).

drop policy if exists events_delete_creator on public.events;
create policy events_delete_creator
  on public.events
  for delete
  using (created_by = auth.uid());
