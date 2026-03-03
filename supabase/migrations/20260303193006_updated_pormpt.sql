drop policy "prompt_categories_delete_authenticated" on "public"."prompt_categories";

drop policy "prompt_categories_insert_authenticated" on "public"."prompt_categories";

drop policy "prompt_categories_select_all" on "public"."prompt_categories";

drop policy "prompt_categories_update_authenticated" on "public"."prompt_categories";

revoke delete on table "public"."prompt_categories" from "anon";

revoke insert on table "public"."prompt_categories" from "anon";

revoke references on table "public"."prompt_categories" from "anon";

revoke select on table "public"."prompt_categories" from "anon";

revoke trigger on table "public"."prompt_categories" from "anon";

revoke truncate on table "public"."prompt_categories" from "anon";

revoke update on table "public"."prompt_categories" from "anon";

revoke delete on table "public"."prompt_categories" from "authenticated";

revoke insert on table "public"."prompt_categories" from "authenticated";

revoke references on table "public"."prompt_categories" from "authenticated";

revoke select on table "public"."prompt_categories" from "authenticated";

revoke trigger on table "public"."prompt_categories" from "authenticated";

revoke truncate on table "public"."prompt_categories" from "authenticated";

revoke update on table "public"."prompt_categories" from "authenticated";

revoke delete on table "public"."prompt_categories" from "service_role";

revoke insert on table "public"."prompt_categories" from "service_role";

revoke references on table "public"."prompt_categories" from "service_role";

revoke select on table "public"."prompt_categories" from "service_role";

revoke trigger on table "public"."prompt_categories" from "service_role";

revoke truncate on table "public"."prompt_categories" from "service_role";

revoke update on table "public"."prompt_categories" from "service_role";

alter table "public"."prompt_categories" drop constraint "prompt_categories_category_id_fkey";

alter table "public"."prompt_categories" drop constraint "prompt_categories_prompt_id_fkey";

alter table "public"."prompt_categories" drop constraint "prompt_categories_pkey";

drop index if exists "public"."prompt_categories_pkey";

drop table "public"."prompt_categories";


  create table "public"."social_accounts" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "user_id" uuid not null default gen_random_uuid(),
    "project_id" uuid default gen_random_uuid(),
    "platform" character varying not null,
    "platform_user_id" character varying not null,
    "platform_username" character varying not null,
    "access_token_encrypted" text not null,
    "refresh_token_encrypted" text not null,
    "token_expires_at" timestamp without time zone not null,
    "is_active" boolean not null default true
      );


alter table "public"."social_accounts" enable row level security;

alter table "public"."prompts" add column "category_id" uuid;

CREATE UNIQUE INDEX social_accounts_pkey ON public.social_accounts USING btree (id);

alter table "public"."social_accounts" add constraint "social_accounts_pkey" PRIMARY KEY using index "social_accounts_pkey";

alter table "public"."prompts" add constraint "prompts_category_id_fkey" FOREIGN KEY (category_id) REFERENCES public.categories(id) not valid;

alter table "public"."prompts" validate constraint "prompts_category_id_fkey";

alter table "public"."social_accounts" add constraint "social_accounts_project_id_fkey" FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE not valid;

alter table "public"."social_accounts" validate constraint "social_accounts_project_id_fkey";

alter table "public"."social_accounts" add constraint "social_accounts_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."social_accounts" validate constraint "social_accounts_user_id_fkey";

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

grant delete on table "public"."social_accounts" to "anon";

grant insert on table "public"."social_accounts" to "anon";

grant references on table "public"."social_accounts" to "anon";

grant select on table "public"."social_accounts" to "anon";

grant trigger on table "public"."social_accounts" to "anon";

grant truncate on table "public"."social_accounts" to "anon";

grant update on table "public"."social_accounts" to "anon";

grant delete on table "public"."social_accounts" to "authenticated";

grant insert on table "public"."social_accounts" to "authenticated";

grant references on table "public"."social_accounts" to "authenticated";

grant select on table "public"."social_accounts" to "authenticated";

grant trigger on table "public"."social_accounts" to "authenticated";

grant truncate on table "public"."social_accounts" to "authenticated";

grant update on table "public"."social_accounts" to "authenticated";

grant delete on table "public"."social_accounts" to "postgres";

grant insert on table "public"."social_accounts" to "postgres";

grant references on table "public"."social_accounts" to "postgres";

grant select on table "public"."social_accounts" to "postgres";

grant trigger on table "public"."social_accounts" to "postgres";

grant truncate on table "public"."social_accounts" to "postgres";

grant update on table "public"."social_accounts" to "postgres";

grant delete on table "public"."social_accounts" to "service_role";

grant insert on table "public"."social_accounts" to "service_role";

grant references on table "public"."social_accounts" to "service_role";

grant select on table "public"."social_accounts" to "service_role";

grant trigger on table "public"."social_accounts" to "service_role";

grant truncate on table "public"."social_accounts" to "service_role";

grant update on table "public"."social_accounts" to "service_role";

grant delete on table "public"."tags" to "postgres";

grant insert on table "public"."tags" to "postgres";

grant references on table "public"."tags" to "postgres";

grant select on table "public"."tags" to "postgres";

grant trigger on table "public"."tags" to "postgres";

grant truncate on table "public"."tags" to "postgres";

grant update on table "public"."tags" to "postgres";

drop policy "policies base 1iiiika_0" on "storage"."objects";

drop policy "policies base 1iiiika_1" on "storage"."objects";

drop policy "policies base 1iiiika_2" on "storage"."objects";

drop policy "policies base 1iiiika_3" on "storage"."objects";


  create policy "projects_objects_delete_authenticated"
  on "storage"."objects"
  as permissive
  for delete
  to authenticated
using (((bucket_id = 'projects'::text) AND (auth.role() = 'authenticated'::text)));



  create policy "projects_objects_insert_authenticated"
  on "storage"."objects"
  as permissive
  for insert
  to authenticated
with check (((bucket_id = 'projects'::text) AND (auth.role() = 'authenticated'::text) AND (array_length(storage.foldername(name), 1) = 1) AND ((storage.foldername(name))[1] ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12};
::text) AND (lower(storage.extension(name)) = ANY (ARRAY['jpg'::text, 'jpeg'::text, 'png'::text, 'webp'::text, 'gif'::text]))));



  create policy "projects_objects_select_public"
  on "storage"."objects"
  as permissive
  for select
  to public
using ((bucket_id = 'projects'::text));



  create policy "projects_objects_update_authenticated"
  on "storage"."objects"
  as permissive
  for update
  to authenticated
using (((bucket_id = 'projects'::text) AND (auth.role() = 'authenticated'::text)))
with check (((bucket_id = 'projects'::text) AND (auth.role() = 'authenticated'::text) AND (array_length(storage.foldername(name), 1) = 1) AND ((storage.foldername(name))[1] ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12};
::text) AND (lower(storage.extension(name)) = ANY (ARRAY['jpg'::text, 'jpeg'::text, 'png'::text, 'webp'::text, 'gif'::text]))));



