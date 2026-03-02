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


  create policy "categories_delete_authenticated"
  on "public"."categories"
  as permissive
  for delete
  to authenticated
using (true);



  create policy "categories_insert_authenticated"
  on "public"."categories"
  as permissive
  for insert
  to authenticated
with check (true);



  create policy "categories_select_all"
  on "public"."categories"
  as permissive
  for select
  to anon, authenticated
using (true);



  create policy "categories_update_authenticated"
  on "public"."categories"
  as permissive
  for update
  to authenticated
using (true)
with check (true);



  create policy "generated_images_delete_authenticated"
  on "public"."generated_images"
  as permissive
  for delete
  to authenticated
using (true);



  create policy "generated_images_insert_authenticated"
  on "public"."generated_images"
  as permissive
  for insert
  to authenticated
with check (true);



  create policy "generated_images_select_all"
  on "public"."generated_images"
  as permissive
  for select
  to anon, authenticated
using (true);



  create policy "generated_images_update_authenticated"
  on "public"."generated_images"
  as permissive
  for update
  to authenticated
using (true)
with check (true);



  create policy "generated_videos_delete_authenticated"
  on "public"."generated_videos"
  as permissive
  for delete
  to authenticated
using (true);



  create policy "generated_videos_insert_authenticated"
  on "public"."generated_videos"
  as permissive
  for insert
  to authenticated
with check (true);



  create policy "generated_videos_select_all"
  on "public"."generated_videos"
  as permissive
  for select
  to anon, authenticated
using (true);



  create policy "generated_videos_update_authenticated"
  on "public"."generated_videos"
  as permissive
  for update
  to authenticated
using (true)
with check (true);



  create policy "pipeline_steps_delete_authenticated"
  on "public"."pipeline_steps"
  as permissive
  for delete
  to authenticated
using (true);



  create policy "pipeline_steps_insert_authenticated"
  on "public"."pipeline_steps"
  as permissive
  for insert
  to authenticated
with check (true);



  create policy "pipeline_steps_select_all"
  on "public"."pipeline_steps"
  as permissive
  for select
  to anon, authenticated
using (true);



  create policy "pipeline_steps_update_authenticated"
  on "public"."pipeline_steps"
  as permissive
  for update
  to authenticated
using (true)
with check (true);



  create policy "prompt_categories_delete_authenticated"
  on "public"."prompt_categories"
  as permissive
  for delete
  to authenticated
using (true);



  create policy "prompt_categories_insert_authenticated"
  on "public"."prompt_categories"
  as permissive
  for insert
  to authenticated
with check (true);



  create policy "prompt_categories_select_all"
  on "public"."prompt_categories"
  as permissive
  for select
  to anon, authenticated
using (true);



  create policy "prompt_categories_update_authenticated"
  on "public"."prompt_categories"
  as permissive
  for update
  to authenticated
using (true)
with check (true);



  create policy "prompt_tags_delete_authenticated"
  on "public"."prompt_tags"
  as permissive
  for delete
  to authenticated
using (true);



  create policy "prompt_tags_insert_authenticated"
  on "public"."prompt_tags"
  as permissive
  for insert
  to authenticated
with check (true);



  create policy "prompt_tags_select_all"
  on "public"."prompt_tags"
  as permissive
  for select
  to anon, authenticated
using (true);



  create policy "prompt_tags_update_authenticated"
  on "public"."prompt_tags"
  as permissive
  for update
  to authenticated
using (true)
with check (true);



  create policy "tags_delete_authenticated"
  on "public"."tags"
  as permissive
  for delete
  to authenticated
using (true);



  create policy "tags_insert_authenticated"
  on "public"."tags"
  as permissive
  for insert
  to authenticated
with check (true);



  create policy "tags_select_all"
  on "public"."tags"
  as permissive
  for select
  to anon, authenticated
using (true);



  create policy "tags_update_authenticated"
  on "public"."tags"
  as permissive
  for update
  to authenticated
using (true)
with check (true);



