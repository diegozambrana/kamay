begin;

-- 1) Asegurar RLS
alter table public.projects  enable row level security;
alter table public.pipelines enable row level security;
alter table public.prompts   enable row level security;

-- 2) Corregir default de projects.user_id
alter table public.projects alter column user_id set default auth.uid();

-- 3) Limpiar políticas previas (si existen)
drop policy if exists "projects_select_all"   on public.projects;
drop policy if exists "projects_insert_owner" on public.projects;
drop policy if exists "projects_update_owner" on public.projects;
drop policy if exists "projects_delete_owner" on public.projects;

drop policy if exists "pipelines_select_all"   on public.pipelines;
drop policy if exists "pipelines_insert_owner" on public.pipelines;
drop policy if exists "pipelines_update_owner" on public.pipelines;
drop policy if exists "pipelines_delete_owner" on public.pipelines;

drop policy if exists "prompts_select_all"   on public.prompts;
drop policy if exists "prompts_insert_owner" on public.prompts;
drop policy if exists "prompts_update_owner" on public.prompts;
drop policy if exists "prompts_delete_owner" on public.prompts;

-- 4) SELECT: cualquiera puede acceder (anon + authenticated)
create policy "projects_select_all"
on public.projects
for select
to anon, authenticated
using (true);

create policy "pipelines_select_all"
on public.pipelines
for select
to anon, authenticated
using (true);

create policy "prompts_select_all"
on public.prompts
for select
to anon, authenticated
using (true);

-- 5) INSERT: solo autenticados y dueños
create policy "projects_insert_owner"
on public.projects
for insert
to authenticated
with check (user_id = auth.uid());

create policy "pipelines_insert_owner"
on public.pipelines
for insert
to authenticated
with check (user_id = auth.uid());

create policy "prompts_insert_owner"
on public.prompts
for insert
to authenticated
with check (user_id = auth.uid());

-- 6) UPDATE: solo dueños
create policy "projects_update_owner"
on public.projects
for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy "pipelines_update_owner"
on public.pipelines
for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy "prompts_update_owner"
on public.prompts
for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

-- 7) DELETE: solo dueños
create policy "projects_delete_owner"
on public.projects
for delete
to authenticated
using (user_id = auth.uid());

create policy "pipelines_delete_owner"
on public.pipelines
for delete
to authenticated
using (user_id = auth.uid());

create policy "prompts_delete_owner"
on public.prompts
for delete
to authenticated
using (user_id = auth.uid());

commit;