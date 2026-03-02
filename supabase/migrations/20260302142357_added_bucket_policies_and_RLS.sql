alter table "public"."projects" alter column "user_id" set default auth.uid();

grant delete on table "public"."categories" to "postgres";

grant insert on table "public"."categories" to "postgres";

grant references on table "public"."categories" to "postgres";

grant select on table "public"."categories" to "postgres";

grant trigger on table "public"."categories" to "postgres";

grant truncate on table "public"."categories" to "postgres";

grant update on table "public"."categories" to "postgres";

grant delete on table "public"."generated_images" to "postgres";

grant insert on table "public"."generated_images" to "postgres";

grant references on table "public"."generated_images" to "postgres";

grant select on table "public"."generated_images" to "postgres";

grant trigger on table "public"."generated_images" to "postgres";

grant truncate on table "public"."generated_images" to "postgres";

grant update on table "public"."generated_images" to "postgres";

grant delete on table "public"."generated_videos" to "postgres";

grant insert on table "public"."generated_videos" to "postgres";

grant references on table "public"."generated_videos" to "postgres";

grant select on table "public"."generated_videos" to "postgres";

grant trigger on table "public"."generated_videos" to "postgres";

grant truncate on table "public"."generated_videos" to "postgres";

grant update on table "public"."generated_videos" to "postgres";

grant delete on table "public"."pipeline_steps" to "postgres";

grant insert on table "public"."pipeline_steps" to "postgres";

grant references on table "public"."pipeline_steps" to "postgres";

grant select on table "public"."pipeline_steps" to "postgres";

grant trigger on table "public"."pipeline_steps" to "postgres";

grant truncate on table "public"."pipeline_steps" to "postgres";

grant update on table "public"."pipeline_steps" to "postgres";

grant delete on table "public"."pipelines" to "postgres";

grant insert on table "public"."pipelines" to "postgres";

grant references on table "public"."pipelines" to "postgres";

grant select on table "public"."pipelines" to "postgres";

grant trigger on table "public"."pipelines" to "postgres";

grant truncate on table "public"."pipelines" to "postgres";

grant update on table "public"."pipelines" to "postgres";

grant delete on table "public"."projects" to "postgres";

grant insert on table "public"."projects" to "postgres";

grant references on table "public"."projects" to "postgres";

grant select on table "public"."projects" to "postgres";

grant trigger on table "public"."projects" to "postgres";

grant truncate on table "public"."projects" to "postgres";

grant update on table "public"."projects" to "postgres";

grant delete on table "public"."prompt_categories" to "postgres";

grant insert on table "public"."prompt_categories" to "postgres";

grant references on table "public"."prompt_categories" to "postgres";

grant select on table "public"."prompt_categories" to "postgres";

grant trigger on table "public"."prompt_categories" to "postgres";

grant truncate on table "public"."prompt_categories" to "postgres";

grant update on table "public"."prompt_categories" to "postgres";

grant delete on table "public"."prompt_tags" to "postgres";

grant insert on table "public"."prompt_tags" to "postgres";

grant references on table "public"."prompt_tags" to "postgres";

grant select on table "public"."prompt_tags" to "postgres";

grant trigger on table "public"."prompt_tags" to "postgres";

grant truncate on table "public"."prompt_tags" to "postgres";

grant update on table "public"."prompt_tags" to "postgres";

grant delete on table "public"."prompts" to "postgres";

grant insert on table "public"."prompts" to "postgres";

grant references on table "public"."prompts" to "postgres";

grant select on table "public"."prompts" to "postgres";

grant trigger on table "public"."prompts" to "postgres";

grant truncate on table "public"."prompts" to "postgres";

grant update on table "public"."prompts" to "postgres";

grant delete on table "public"."tags" to "postgres";

grant insert on table "public"."tags" to "postgres";

grant references on table "public"."tags" to "postgres";

grant select on table "public"."tags" to "postgres";

grant trigger on table "public"."tags" to "postgres";

grant truncate on table "public"."tags" to "postgres";

grant update on table "public"."tags" to "postgres";


  create policy "pipelines_delete_owner"
  on "public"."pipelines"
  as permissive
  for delete
  to authenticated
using ((user_id = auth.uid()));



  create policy "pipelines_insert_owner"
  on "public"."pipelines"
  as permissive
  for insert
  to authenticated
with check ((user_id = auth.uid()));



  create policy "pipelines_select_all"
  on "public"."pipelines"
  as permissive
  for select
  to anon, authenticated
using (true);



  create policy "pipelines_update_owner"
  on "public"."pipelines"
  as permissive
  for update
  to authenticated
using ((user_id = auth.uid()))
with check ((user_id = auth.uid()));



  create policy "projects_delete_owner"
  on "public"."projects"
  as permissive
  for delete
  to authenticated
using ((user_id = auth.uid()));



  create policy "projects_insert_owner"
  on "public"."projects"
  as permissive
  for insert
  to authenticated
with check ((user_id = auth.uid()));



  create policy "projects_select_all"
  on "public"."projects"
  as permissive
  for select
  to anon, authenticated
using (true);



  create policy "projects_update_owner"
  on "public"."projects"
  as permissive
  for update
  to authenticated
using ((user_id = auth.uid()))
with check ((user_id = auth.uid()));



  create policy "prompts_delete_owner"
  on "public"."prompts"
  as permissive
  for delete
  to authenticated
using ((user_id = auth.uid()));



  create policy "prompts_insert_owner"
  on "public"."prompts"
  as permissive
  for insert
  to authenticated
with check ((user_id = auth.uid()));



  create policy "prompts_select_all"
  on "public"."prompts"
  as permissive
  for select
  to anon, authenticated
using (true);



  create policy "prompts_update_owner"
  on "public"."prompts"
  as permissive
  for update
  to authenticated
using ((user_id = auth.uid()))
with check ((user_id = auth.uid()));



  create policy "policies base 1iiiika_0"
  on "storage"."objects"
  as permissive
  for select
  to public
using (((bucket_id = 'projects'::text) AND (storage.extension(name) = 'jpg'::text) AND (lower((storage.foldername(name))[1]) = 'public'::text) AND (auth.role() = 'anon'::text)));



  create policy "policies base 1iiiika_1"
  on "storage"."objects"
  as permissive
  for insert
  to public
with check (((bucket_id = 'projects'::text) AND (storage.extension(name) = 'jpg'::text) AND (lower((storage.foldername(name))[1]) = 'public'::text) AND (auth.role() = 'anon'::text)));



  create policy "policies base 1iiiika_2"
  on "storage"."objects"
  as permissive
  for update
  to public
using (((bucket_id = 'projects'::text) AND (storage.extension(name) = 'jpg'::text) AND (lower((storage.foldername(name))[1]) = 'public'::text) AND (auth.role() = 'anon'::text)));



  create policy "policies base 1iiiika_3"
  on "storage"."objects"
  as permissive
  for delete
  to public
using (((bucket_id = 'projects'::text) AND (storage.extension(name) = 'jpg'::text) AND (lower((storage.foldername(name))[1]) = 'public'::text) AND (auth.role() = 'anon'::text)));



