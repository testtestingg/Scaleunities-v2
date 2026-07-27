-- Let every administrator review intake answers and upload records,
-- including forms collected by another administrator.

drop policy if exists "Admins read all intake answers"
on public.intake_answers;

create policy "Admins read all intake answers"
on public.intake_answers for select
to authenticated
using (public.current_user_role() = 'admin');

drop policy if exists "Admins read all intake file records"
on public.intake_files;

create policy "Admins read all intake file records"
on public.intake_files for select
to authenticated
using (public.current_user_role() = 'admin');
