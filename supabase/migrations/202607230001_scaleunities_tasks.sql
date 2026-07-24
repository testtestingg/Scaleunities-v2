-- ScaleUnities private task portal
-- Run this migration in the Supabase SQL editor before opening the portal.

create type public.user_role as enum ('admin', 'project_manager', 'member');
create type public.task_status as enum (
  'to_do', 'in_progress', 'under_review', 'blocked', 'completed', 'cancelled'
);
create type public.task_priority as enum ('low', 'medium', 'high', 'urgent');

create sequence public.task_number_seq start 1;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text not null,
  role public.user_role not null default 'member',
  is_active boolean not null default true,
  avatar_color text not null default '#6B21A8',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.businesses (
  id uuid primary key default gen_random_uuid(),
  name text not null unique check (char_length(name) between 2 and 100),
  color text not null default '#6B21A8',
  is_active boolean not null default true,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  task_number bigint not null,
  task_id text generated always as ('SU' || lpad(task_number::text, 3, '0')) stored,
  business_id uuid not null references public.businesses(id),
  title text not null check (char_length(title) between 2 and 180),
  description text not null default '',
  assigned_to uuid not null references public.profiles(id),
  status public.task_status not null default 'to_do',
  priority public.task_priority not null default 'medium',
  created_by uuid not null references public.profiles(id),
  due_date date,
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (task_number),
  unique (task_id)
);

create table public.task_comments (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.tasks(id) on delete cascade,
  author_id uuid not null references public.profiles(id),
  body text not null check (char_length(body) between 1 and 4000),
  is_pm_note boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.task_activity (
  id bigint generated always as identity primary key,
  task_id uuid not null references public.tasks(id) on delete cascade,
  actor_id uuid references public.profiles(id),
  action text not null,
  details jsonb,
  created_at timestamptz not null default now()
);

create index tasks_assigned_to_idx on public.tasks(assigned_to);
create index tasks_business_id_idx on public.tasks(business_id);
create index tasks_status_idx on public.tasks(status);
create index tasks_due_date_idx on public.tasks(due_date);
create index task_comments_task_id_idx on public.task_comments(task_id);
create index task_activity_task_id_idx on public.task_activity(task_id);

create or replace function public.current_user_role()
returns public.user_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles
  where id = auth.uid() and is_active = true
$$;

create or replace function public.can_view_task(requested_task_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.tasks
    where id = requested_task_id
      and (
        assigned_to = auth.uid()
        or public.current_user_role() in ('admin', 'project_manager')
      )
  )
$$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at before update on public.profiles
for each row execute function public.set_updated_at();
create trigger businesses_updated_at before update on public.businesses
for each row execute function public.set_updated_at();
create trigger tasks_updated_at before update on public.tasks
for each row execute function public.set_updated_at();
create trigger comments_updated_at before update on public.task_comments
for each row execute function public.set_updated_at();

create or replace function public.secure_task_insert()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if public.current_user_role() is distinct from 'admin' then
    raise exception 'Only administrators may create tasks';
  end if;
  if not exists (
    select 1 from public.profiles
    where id = new.assigned_to and is_active = true
  ) then
    raise exception 'Tasks must be assigned to an active approved user';
  end if;
  new.id := gen_random_uuid();
  new.task_number := nextval('public.task_number_seq');
  new.created_by := auth.uid();
  new.created_at := now();
  new.updated_at := now();
  return new;
end;
$$;

create trigger secure_task_before_insert
before insert on public.tasks
for each row execute function public.secure_task_insert();

create or replace function public.enforce_task_changes()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  actor_role public.user_role;
begin
  actor_role := public.current_user_role();

  if new.id <> old.id
    or new.task_number <> old.task_number
    or new.task_id <> old.task_id
    or new.created_by <> old.created_by
    or new.created_at <> old.created_at then
    raise exception 'Protected task fields cannot be changed';
  end if;

  if actor_role = 'member' then
    if old.assigned_to <> auth.uid()
      or new.business_id <> old.business_id
      or new.title <> old.title
      or new.description <> old.description
      or new.assigned_to <> old.assigned_to
      or new.priority <> old.priority
      or new.due_date is distinct from old.due_date
      or new.archived_at is distinct from old.archived_at then
      raise exception 'Members may only update the status of their own tasks';
    end if;
    if new.status not in ('to_do', 'in_progress', 'completed') then
      raise exception 'Members may use To Do, In Progress, or Completed';
    end if;
  elsif actor_role = 'project_manager' then
    if new.archived_at is distinct from old.archived_at then
      raise exception 'Only administrators may archive tasks';
    end if;
  elsif actor_role is distinct from 'admin' then
    raise exception 'Account is not authorized';
  end if;

  if not exists (
    select 1 from public.profiles
    where id = new.assigned_to and is_active = true
  ) then
    raise exception 'Tasks must be assigned to an active approved user';
  end if;

  return new;
end;
$$;

create trigger enforce_task_changes_before_update
before update on public.tasks
for each row execute function public.enforce_task_changes();

create or replace function public.log_task_activity()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  event_name text;
  event_details jsonb;
begin
  if tg_op = 'INSERT' then
    event_name := 'task_created';
    event_details := jsonb_build_object('status', new.status, 'priority', new.priority);
    insert into public.task_activity(task_id, actor_id, action, details)
    values (new.id, auth.uid(), event_name, event_details);
    return new;
  elsif tg_op = 'UPDATE' then
    if new.status is distinct from old.status then
      event_name := 'status_changed';
      event_details := jsonb_build_object('from', old.status, 'to', new.status);
    elsif new.assigned_to is distinct from old.assigned_to then
      event_name := 'task_reassigned';
      event_details := jsonb_build_object('from', old.assigned_to, 'to', new.assigned_to);
    elsif new.archived_at is distinct from old.archived_at then
      event_name := 'task_archived';
      event_details := null;
    else
      event_name := 'task_updated';
      event_details := null;
    end if;
    insert into public.task_activity(task_id, actor_id, action, details)
    values (new.id, auth.uid(), event_name, event_details);
    return new;
  end if;
  return null;
end;
$$;

create trigger log_task_activity_after_insert
after insert on public.tasks
for each row execute function public.log_task_activity();
create trigger log_task_activity_after_update
after update on public.tasks
for each row execute function public.log_task_activity();

create or replace function public.log_comment_activity()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.task_activity(task_id, actor_id, action, details)
  values (
    new.task_id,
    auth.uid(),
    case when new.is_pm_note then 'pm_note_added' else 'comment_added' end,
    null
  );
  return new;
end;
$$;

create trigger log_comment_after_insert
after insert on public.task_comments
for each row execute function public.log_comment_activity();

create or replace function public.enforce_profile_changes()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.id <> old.id
    or new.email <> old.email
    or new.created_at <> old.created_at then
    raise exception 'Protected profile fields cannot be changed';
  end if;
  return new;
end;
$$;

create trigger enforce_profile_changes_before_update
before update on public.profiles
for each row execute function public.enforce_profile_changes();

create or replace function public.enforce_business_changes()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.id <> old.id
    or new.created_by is distinct from old.created_by
    or new.created_at <> old.created_at then
    raise exception 'Protected business fields cannot be changed';
  end if;
  return new;
end;
$$;

create trigger enforce_business_changes_before_update
before update on public.businesses
for each row execute function public.enforce_business_changes();

create or replace function public.enforce_comment_changes()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.id <> old.id
    or new.task_id <> old.task_id
    or new.author_id <> old.author_id
    or new.is_pm_note <> old.is_pm_note
    or new.created_at <> old.created_at then
    raise exception 'Protected comment fields cannot be changed';
  end if;
  return new;
end;
$$;

create trigger enforce_comment_changes_before_update
before update on public.task_comments
for each row execute function public.enforce_comment_changes();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(coalesce(new.email, 'Team member'), '@', 1)),
    'member'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.businesses enable row level security;
alter table public.tasks enable row level security;
alter table public.task_comments enable row level security;
alter table public.task_activity enable row level security;

create policy "Approved users can read permitted profiles"
on public.profiles for select
to authenticated
using (
  is_active = true
  and public.current_user_role() is not null
);

create policy "Admins can update profiles"
on public.profiles for update
to authenticated
using (public.current_user_role() = 'admin')
with check (public.current_user_role() = 'admin');

create policy "Approved users can read businesses"
on public.businesses for select
to authenticated
using (public.current_user_role() is not null);

create policy "Admins can create businesses"
on public.businesses for insert
to authenticated
with check (
  public.current_user_role() = 'admin'
  and created_by = auth.uid()
);

create policy "Admins can update businesses"
on public.businesses for update
to authenticated
using (public.current_user_role() = 'admin')
with check (public.current_user_role() = 'admin');

create policy "Admins can delete businesses"
on public.businesses for delete
to authenticated
using (public.current_user_role() = 'admin');

create policy "Users can read permitted tasks"
on public.tasks for select
to authenticated
using (
  assigned_to = auth.uid()
  or public.current_user_role() in ('admin', 'project_manager')
);

create policy "Admins can create tasks"
on public.tasks for insert
to authenticated
with check (
  public.current_user_role() = 'admin'
  and created_by = auth.uid()
);

create policy "Authorized users can update tasks"
on public.tasks for update
to authenticated
using (
  public.current_user_role() in ('admin', 'project_manager')
  or assigned_to = auth.uid()
)
with check (
  public.current_user_role() in ('admin', 'project_manager')
  or assigned_to = auth.uid()
);

create policy "Admins can delete tasks"
on public.tasks for delete
to authenticated
using (public.current_user_role() = 'admin');

create policy "Users can read comments on permitted tasks"
on public.task_comments for select
to authenticated
using (public.can_view_task(task_id));

create policy "Users can comment on permitted tasks"
on public.task_comments for insert
to authenticated
with check (
  author_id = auth.uid()
  and public.can_view_task(task_id)
  and (
    is_pm_note = false
    or public.current_user_role() in ('admin', 'project_manager')
  )
);

create policy "Authors can update their comments"
on public.task_comments for update
to authenticated
using (author_id = auth.uid())
with check (author_id = auth.uid() and public.can_view_task(task_id));

create policy "Authors and managers can delete comments"
on public.task_comments for delete
to authenticated
using (
  author_id = auth.uid()
  or public.current_user_role() in ('admin', 'project_manager')
);

create policy "Users can read activity for permitted tasks"
on public.task_activity for select
to authenticated
using (public.can_view_task(task_id));

grant usage on schema public to authenticated;
grant select, update on public.profiles to authenticated;
grant select, insert, update, delete on public.businesses to authenticated;
grant select, insert, update, delete on public.tasks to authenticated;
grant select, insert, update, delete on public.task_comments to authenticated;
grant select on public.task_activity to authenticated;
grant usage, select on sequence public.task_number_seq to authenticated;

insert into public.businesses (name, color) values
  ('Doura', '#7C3AED'),
  ('MBS School', '#2563EB'),
  ('La Villa Restaurant', '#EA580C'),
  ('ScaleUnities', '#6B21A8'),
  ('Relaxeo Djerba', '#0F766E')
on conflict (name) do nothing;

-- After inviting the four users in Supabase Authentication, assign their roles:
-- update public.profiles set full_name = 'Hala', role = 'admin' where email = 'hala@your-domain.com';
-- update public.profiles set full_name = 'Ali', role = 'project_manager' where email = 'ali@your-domain.com';
-- update public.profiles set full_name = 'Amir', role = 'member' where email = 'amir@your-domain.com';
-- update public.profiles set full_name = 'Ranim', role = 'member' where email = 'ranim@your-domain.com';
