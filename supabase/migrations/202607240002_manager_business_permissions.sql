-- Allow administrators and project managers to remove businesses from the
-- active workspace while keeping existing task history intact.

drop policy if exists "Admins can update businesses" on public.businesses;
drop policy if exists "Admins can delete businesses" on public.businesses;
drop policy if exists "Managers can update businesses" on public.businesses;
drop policy if exists "Managers can delete businesses" on public.businesses;

create policy "Managers can update businesses"
on public.businesses for update
to authenticated
using (public.current_user_role() in ('admin', 'project_manager'))
with check (public.current_user_role() in ('admin', 'project_manager'));

create policy "Managers can delete businesses"
on public.businesses for delete
to authenticated
using (public.current_user_role() in ('admin', 'project_manager'));
