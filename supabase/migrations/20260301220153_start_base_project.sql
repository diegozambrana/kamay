
  create table "public"."categories" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "name" character varying,
    "slug" character varying,
    "description" text,
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."categories" enable row level security;


  create table "public"."generated_images" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "project_id" uuid default gen_random_uuid(),
    "pipeline_step_id" uuid default gen_random_uuid(),
    "prompt_id" uuid default gen_random_uuid(),
    "prompt_used" text,
    "provider" character varying,
    "storage_url" text,
    "width" integer,
    "height" integer,
    "aspect_ratio" character varying,
    "style" character varying,
    "status" character varying,
    "token_used" bigint,
    "estimated_cost" double precision,
    "is_approved" boolean
      );


alter table "public"."generated_images" enable row level security;


  create table "public"."generated_videos" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "project_id" uuid not null default gen_random_uuid(),
    "pipeline_step_id" uuid not null default gen_random_uuid(),
    "source_image_id" uuid default gen_random_uuid(),
    "motion_prompt" text,
    "provider" character varying,
    "storage_url" character varying,
    "duration_seconds" integer,
    "resolution" character varying,
    "status" character varying not null default 'pending'::character varying,
    "estimated_cost" double precision,
    "is_approved" boolean not null default false
      );


alter table "public"."generated_videos" enable row level security;


  create table "public"."pipeline_steps" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "pipeline_id" uuid not null default gen_random_uuid(),
    "order_index" integer not null,
    "tool_type" character varying not null,
    "provider" character varying,
    "prompt_id" uuid not null default gen_random_uuid(),
    "parameters" jsonb,
    "input_from_step_id" uuid default gen_random_uuid()
      );


alter table "public"."pipeline_steps" enable row level security;


  create table "public"."pipelines" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "name" character varying not null,
    "description" text,
    "is_active" boolean not null default true,
    "last_run_at" timestamp with time zone,
    "project_id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null default auth.uid()
      );


alter table "public"."pipelines" enable row level security;


  create table "public"."projects" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "user_id" uuid not null default gen_random_uuid(),
    "name" character varying,
    "description" text,
    "thumbnail_url" character varying,
    "is_public" boolean default false
      );


alter table "public"."projects" enable row level security;


  create table "public"."prompt_categories" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null,
    "prompt_id" uuid not null default gen_random_uuid(),
    "category_id" uuid not null default gen_random_uuid()
      );


alter table "public"."prompt_categories" enable row level security;


  create table "public"."prompt_tags" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "prompt_id" uuid not null default gen_random_uuid(),
    "tag_id" uuid not null default gen_random_uuid()
      );


alter table "public"."prompt_tags" enable row level security;


  create table "public"."prompts" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone default now(),
    "user_id" uuid not null default auth.uid(),
    "project_id" uuid default gen_random_uuid(),
    "title" character varying not null,
    "description" text,
    "content" text not null,
    "variables" jsonb,
    "type" character varying not null default 'text'::character varying,
    "is_template" boolean default false
      );


alter table "public"."prompts" enable row level security;


  create table "public"."tags" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone default now(),
    "name" character varying not null,
    "slug" character varying not null
      );


alter table "public"."tags" enable row level security;

CREATE UNIQUE INDEX category_pkey ON public.categories USING btree (id);

CREATE UNIQUE INDEX generated_images_pkey ON public.generated_images USING btree (id);

CREATE UNIQUE INDEX generated_videos_pkey ON public.generated_videos USING btree (id);

CREATE UNIQUE INDEX pipeline_steps_pkey ON public.pipeline_steps USING btree (id);

CREATE UNIQUE INDEX pipelines_pkey ON public.pipelines USING btree (id);

CREATE UNIQUE INDEX projects_pkey ON public.projects USING btree (id);

CREATE UNIQUE INDEX prompt_categories_pkey ON public.prompt_categories USING btree (id);

CREATE UNIQUE INDEX prompt_tags_pkey ON public.prompt_tags USING btree (id);

CREATE UNIQUE INDEX prompts_pkey ON public.prompts USING btree (id);

CREATE UNIQUE INDEX tag_name_key ON public.tags USING btree (name);

CREATE UNIQUE INDEX tag_pkey ON public.tags USING btree (id);

CREATE UNIQUE INDEX tag_slug_key ON public.tags USING btree (slug);

alter table "public"."categories" add constraint "category_pkey" PRIMARY KEY using index "category_pkey";

alter table "public"."generated_images" add constraint "generated_images_pkey" PRIMARY KEY using index "generated_images_pkey";

alter table "public"."generated_videos" add constraint "generated_videos_pkey" PRIMARY KEY using index "generated_videos_pkey";

alter table "public"."pipeline_steps" add constraint "pipeline_steps_pkey" PRIMARY KEY using index "pipeline_steps_pkey";

alter table "public"."pipelines" add constraint "pipelines_pkey" PRIMARY KEY using index "pipelines_pkey";

alter table "public"."projects" add constraint "projects_pkey" PRIMARY KEY using index "projects_pkey";

alter table "public"."prompt_categories" add constraint "prompt_categories_pkey" PRIMARY KEY using index "prompt_categories_pkey";

alter table "public"."prompt_tags" add constraint "prompt_tags_pkey" PRIMARY KEY using index "prompt_tags_pkey";

alter table "public"."prompts" add constraint "prompts_pkey" PRIMARY KEY using index "prompts_pkey";

alter table "public"."tags" add constraint "tag_pkey" PRIMARY KEY using index "tag_pkey";

alter table "public"."generated_images" add constraint "generated_images_pipeline_step_id_fkey" FOREIGN KEY (pipeline_step_id) REFERENCES public.pipeline_steps(id) not valid;

alter table "public"."generated_images" validate constraint "generated_images_pipeline_step_id_fkey";

alter table "public"."generated_images" add constraint "generated_images_project_id_fkey" FOREIGN KEY (project_id) REFERENCES public.projects(id) not valid;

alter table "public"."generated_images" validate constraint "generated_images_project_id_fkey";

alter table "public"."generated_images" add constraint "generated_images_prompt_id_fkey" FOREIGN KEY (prompt_id) REFERENCES public.prompts(id) not valid;

alter table "public"."generated_images" validate constraint "generated_images_prompt_id_fkey";

alter table "public"."generated_videos" add constraint "generated_videos_pipeline_step_id_fkey" FOREIGN KEY (pipeline_step_id) REFERENCES public.pipeline_steps(id) not valid;

alter table "public"."generated_videos" validate constraint "generated_videos_pipeline_step_id_fkey";

alter table "public"."generated_videos" add constraint "generated_videos_project_id_fkey" FOREIGN KEY (project_id) REFERENCES public.projects(id) not valid;

alter table "public"."generated_videos" validate constraint "generated_videos_project_id_fkey";

alter table "public"."generated_videos" add constraint "generated_videos_source_image_id_fkey" FOREIGN KEY (source_image_id) REFERENCES public.generated_images(id) not valid;

alter table "public"."generated_videos" validate constraint "generated_videos_source_image_id_fkey";

alter table "public"."pipeline_steps" add constraint "pipeline_steps_input_from_step_id_fkey" FOREIGN KEY (input_from_step_id) REFERENCES public.pipeline_steps(id) ON DELETE SET NULL not valid;

alter table "public"."pipeline_steps" validate constraint "pipeline_steps_input_from_step_id_fkey";

alter table "public"."pipeline_steps" add constraint "pipeline_steps_pipeline_id_fkey" FOREIGN KEY (pipeline_id) REFERENCES public.pipelines(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."pipeline_steps" validate constraint "pipeline_steps_pipeline_id_fkey";

alter table "public"."pipeline_steps" add constraint "pipeline_steps_prompt_id_fkey" FOREIGN KEY (prompt_id) REFERENCES public.prompts(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."pipeline_steps" validate constraint "pipeline_steps_prompt_id_fkey";

alter table "public"."pipelines" add constraint "pipelines_project_id_fkey" FOREIGN KEY (project_id) REFERENCES public.projects(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."pipelines" validate constraint "pipelines_project_id_fkey";

alter table "public"."pipelines" add constraint "pipelines_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."pipelines" validate constraint "pipelines_user_id_fkey";

alter table "public"."projects" add constraint "projects_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."projects" validate constraint "projects_user_id_fkey";

alter table "public"."prompt_categories" add constraint "prompt_categories_category_id_fkey" FOREIGN KEY (category_id) REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."prompt_categories" validate constraint "prompt_categories_category_id_fkey";

alter table "public"."prompt_categories" add constraint "prompt_categories_prompt_id_fkey" FOREIGN KEY (prompt_id) REFERENCES public.prompts(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."prompt_categories" validate constraint "prompt_categories_prompt_id_fkey";

alter table "public"."prompt_tags" add constraint "prompt_tags_prompt_id_fkey" FOREIGN KEY (prompt_id) REFERENCES public.prompts(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."prompt_tags" validate constraint "prompt_tags_prompt_id_fkey";

alter table "public"."prompt_tags" add constraint "prompt_tags_tag_id_fkey" FOREIGN KEY (tag_id) REFERENCES public.tags(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."prompt_tags" validate constraint "prompt_tags_tag_id_fkey";

alter table "public"."prompts" add constraint "prompts_project_id_fkey" FOREIGN KEY (project_id) REFERENCES public.projects(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."prompts" validate constraint "prompts_project_id_fkey";

alter table "public"."prompts" add constraint "prompts_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."prompts" validate constraint "prompts_user_id_fkey";

alter table "public"."tags" add constraint "tag_name_key" UNIQUE using index "tag_name_key";

alter table "public"."tags" add constraint "tag_slug_key" UNIQUE using index "tag_slug_key";

grant delete on table "public"."categories" to "anon";

grant insert on table "public"."categories" to "anon";

grant references on table "public"."categories" to "anon";

grant select on table "public"."categories" to "anon";

grant trigger on table "public"."categories" to "anon";

grant truncate on table "public"."categories" to "anon";

grant update on table "public"."categories" to "anon";

grant delete on table "public"."categories" to "authenticated";

grant insert on table "public"."categories" to "authenticated";

grant references on table "public"."categories" to "authenticated";

grant select on table "public"."categories" to "authenticated";

grant trigger on table "public"."categories" to "authenticated";

grant truncate on table "public"."categories" to "authenticated";

grant update on table "public"."categories" to "authenticated";

grant delete on table "public"."categories" to "postgres";

grant insert on table "public"."categories" to "postgres";

grant references on table "public"."categories" to "postgres";

grant select on table "public"."categories" to "postgres";

grant trigger on table "public"."categories" to "postgres";

grant truncate on table "public"."categories" to "postgres";

grant update on table "public"."categories" to "postgres";

grant delete on table "public"."categories" to "service_role";

grant insert on table "public"."categories" to "service_role";

grant references on table "public"."categories" to "service_role";

grant select on table "public"."categories" to "service_role";

grant trigger on table "public"."categories" to "service_role";

grant truncate on table "public"."categories" to "service_role";

grant update on table "public"."categories" to "service_role";

grant delete on table "public"."generated_images" to "anon";

grant insert on table "public"."generated_images" to "anon";

grant references on table "public"."generated_images" to "anon";

grant select on table "public"."generated_images" to "anon";

grant trigger on table "public"."generated_images" to "anon";

grant truncate on table "public"."generated_images" to "anon";

grant update on table "public"."generated_images" to "anon";

grant delete on table "public"."generated_images" to "authenticated";

grant insert on table "public"."generated_images" to "authenticated";

grant references on table "public"."generated_images" to "authenticated";

grant select on table "public"."generated_images" to "authenticated";

grant trigger on table "public"."generated_images" to "authenticated";

grant truncate on table "public"."generated_images" to "authenticated";

grant update on table "public"."generated_images" to "authenticated";

grant delete on table "public"."generated_images" to "postgres";

grant insert on table "public"."generated_images" to "postgres";

grant references on table "public"."generated_images" to "postgres";

grant select on table "public"."generated_images" to "postgres";

grant trigger on table "public"."generated_images" to "postgres";

grant truncate on table "public"."generated_images" to "postgres";

grant update on table "public"."generated_images" to "postgres";

grant delete on table "public"."generated_images" to "service_role";

grant insert on table "public"."generated_images" to "service_role";

grant references on table "public"."generated_images" to "service_role";

grant select on table "public"."generated_images" to "service_role";

grant trigger on table "public"."generated_images" to "service_role";

grant truncate on table "public"."generated_images" to "service_role";

grant update on table "public"."generated_images" to "service_role";

grant delete on table "public"."generated_videos" to "anon";

grant insert on table "public"."generated_videos" to "anon";

grant references on table "public"."generated_videos" to "anon";

grant select on table "public"."generated_videos" to "anon";

grant trigger on table "public"."generated_videos" to "anon";

grant truncate on table "public"."generated_videos" to "anon";

grant update on table "public"."generated_videos" to "anon";

grant delete on table "public"."generated_videos" to "authenticated";

grant insert on table "public"."generated_videos" to "authenticated";

grant references on table "public"."generated_videos" to "authenticated";

grant select on table "public"."generated_videos" to "authenticated";

grant trigger on table "public"."generated_videos" to "authenticated";

grant truncate on table "public"."generated_videos" to "authenticated";

grant update on table "public"."generated_videos" to "authenticated";

grant delete on table "public"."generated_videos" to "postgres";

grant insert on table "public"."generated_videos" to "postgres";

grant references on table "public"."generated_videos" to "postgres";

grant select on table "public"."generated_videos" to "postgres";

grant trigger on table "public"."generated_videos" to "postgres";

grant truncate on table "public"."generated_videos" to "postgres";

grant update on table "public"."generated_videos" to "postgres";

grant delete on table "public"."generated_videos" to "service_role";

grant insert on table "public"."generated_videos" to "service_role";

grant references on table "public"."generated_videos" to "service_role";

grant select on table "public"."generated_videos" to "service_role";

grant trigger on table "public"."generated_videos" to "service_role";

grant truncate on table "public"."generated_videos" to "service_role";

grant update on table "public"."generated_videos" to "service_role";

grant delete on table "public"."pipeline_steps" to "anon";

grant insert on table "public"."pipeline_steps" to "anon";

grant references on table "public"."pipeline_steps" to "anon";

grant select on table "public"."pipeline_steps" to "anon";

grant trigger on table "public"."pipeline_steps" to "anon";

grant truncate on table "public"."pipeline_steps" to "anon";

grant update on table "public"."pipeline_steps" to "anon";

grant delete on table "public"."pipeline_steps" to "authenticated";

grant insert on table "public"."pipeline_steps" to "authenticated";

grant references on table "public"."pipeline_steps" to "authenticated";

grant select on table "public"."pipeline_steps" to "authenticated";

grant trigger on table "public"."pipeline_steps" to "authenticated";

grant truncate on table "public"."pipeline_steps" to "authenticated";

grant update on table "public"."pipeline_steps" to "authenticated";

grant delete on table "public"."pipeline_steps" to "postgres";

grant insert on table "public"."pipeline_steps" to "postgres";

grant references on table "public"."pipeline_steps" to "postgres";

grant select on table "public"."pipeline_steps" to "postgres";

grant trigger on table "public"."pipeline_steps" to "postgres";

grant truncate on table "public"."pipeline_steps" to "postgres";

grant update on table "public"."pipeline_steps" to "postgres";

grant delete on table "public"."pipeline_steps" to "service_role";

grant insert on table "public"."pipeline_steps" to "service_role";

grant references on table "public"."pipeline_steps" to "service_role";

grant select on table "public"."pipeline_steps" to "service_role";

grant trigger on table "public"."pipeline_steps" to "service_role";

grant truncate on table "public"."pipeline_steps" to "service_role";

grant update on table "public"."pipeline_steps" to "service_role";

grant delete on table "public"."pipelines" to "anon";

grant insert on table "public"."pipelines" to "anon";

grant references on table "public"."pipelines" to "anon";

grant select on table "public"."pipelines" to "anon";

grant trigger on table "public"."pipelines" to "anon";

grant truncate on table "public"."pipelines" to "anon";

grant update on table "public"."pipelines" to "anon";

grant delete on table "public"."pipelines" to "authenticated";

grant insert on table "public"."pipelines" to "authenticated";

grant references on table "public"."pipelines" to "authenticated";

grant select on table "public"."pipelines" to "authenticated";

grant trigger on table "public"."pipelines" to "authenticated";

grant truncate on table "public"."pipelines" to "authenticated";

grant update on table "public"."pipelines" to "authenticated";

grant delete on table "public"."pipelines" to "postgres";

grant insert on table "public"."pipelines" to "postgres";

grant references on table "public"."pipelines" to "postgres";

grant select on table "public"."pipelines" to "postgres";

grant trigger on table "public"."pipelines" to "postgres";

grant truncate on table "public"."pipelines" to "postgres";

grant update on table "public"."pipelines" to "postgres";

grant delete on table "public"."pipelines" to "service_role";

grant insert on table "public"."pipelines" to "service_role";

grant references on table "public"."pipelines" to "service_role";

grant select on table "public"."pipelines" to "service_role";

grant trigger on table "public"."pipelines" to "service_role";

grant truncate on table "public"."pipelines" to "service_role";

grant update on table "public"."pipelines" to "service_role";

grant delete on table "public"."projects" to "anon";

grant insert on table "public"."projects" to "anon";

grant references on table "public"."projects" to "anon";

grant select on table "public"."projects" to "anon";

grant trigger on table "public"."projects" to "anon";

grant truncate on table "public"."projects" to "anon";

grant update on table "public"."projects" to "anon";

grant delete on table "public"."projects" to "authenticated";

grant insert on table "public"."projects" to "authenticated";

grant references on table "public"."projects" to "authenticated";

grant select on table "public"."projects" to "authenticated";

grant trigger on table "public"."projects" to "authenticated";

grant truncate on table "public"."projects" to "authenticated";

grant update on table "public"."projects" to "authenticated";

grant delete on table "public"."projects" to "postgres";

grant insert on table "public"."projects" to "postgres";

grant references on table "public"."projects" to "postgres";

grant select on table "public"."projects" to "postgres";

grant trigger on table "public"."projects" to "postgres";

grant truncate on table "public"."projects" to "postgres";

grant update on table "public"."projects" to "postgres";

grant delete on table "public"."projects" to "service_role";

grant insert on table "public"."projects" to "service_role";

grant references on table "public"."projects" to "service_role";

grant select on table "public"."projects" to "service_role";

grant trigger on table "public"."projects" to "service_role";

grant truncate on table "public"."projects" to "service_role";

grant update on table "public"."projects" to "service_role";

grant delete on table "public"."prompt_categories" to "anon";

grant insert on table "public"."prompt_categories" to "anon";

grant references on table "public"."prompt_categories" to "anon";

grant select on table "public"."prompt_categories" to "anon";

grant trigger on table "public"."prompt_categories" to "anon";

grant truncate on table "public"."prompt_categories" to "anon";

grant update on table "public"."prompt_categories" to "anon";

grant delete on table "public"."prompt_categories" to "authenticated";

grant insert on table "public"."prompt_categories" to "authenticated";

grant references on table "public"."prompt_categories" to "authenticated";

grant select on table "public"."prompt_categories" to "authenticated";

grant trigger on table "public"."prompt_categories" to "authenticated";

grant truncate on table "public"."prompt_categories" to "authenticated";

grant update on table "public"."prompt_categories" to "authenticated";

grant delete on table "public"."prompt_categories" to "postgres";

grant insert on table "public"."prompt_categories" to "postgres";

grant references on table "public"."prompt_categories" to "postgres";

grant select on table "public"."prompt_categories" to "postgres";

grant trigger on table "public"."prompt_categories" to "postgres";

grant truncate on table "public"."prompt_categories" to "postgres";

grant update on table "public"."prompt_categories" to "postgres";

grant delete on table "public"."prompt_categories" to "service_role";

grant insert on table "public"."prompt_categories" to "service_role";

grant references on table "public"."prompt_categories" to "service_role";

grant select on table "public"."prompt_categories" to "service_role";

grant trigger on table "public"."prompt_categories" to "service_role";

grant truncate on table "public"."prompt_categories" to "service_role";

grant update on table "public"."prompt_categories" to "service_role";

grant delete on table "public"."prompt_tags" to "anon";

grant insert on table "public"."prompt_tags" to "anon";

grant references on table "public"."prompt_tags" to "anon";

grant select on table "public"."prompt_tags" to "anon";

grant trigger on table "public"."prompt_tags" to "anon";

grant truncate on table "public"."prompt_tags" to "anon";

grant update on table "public"."prompt_tags" to "anon";

grant delete on table "public"."prompt_tags" to "authenticated";

grant insert on table "public"."prompt_tags" to "authenticated";

grant references on table "public"."prompt_tags" to "authenticated";

grant select on table "public"."prompt_tags" to "authenticated";

grant trigger on table "public"."prompt_tags" to "authenticated";

grant truncate on table "public"."prompt_tags" to "authenticated";

grant update on table "public"."prompt_tags" to "authenticated";

grant delete on table "public"."prompt_tags" to "postgres";

grant insert on table "public"."prompt_tags" to "postgres";

grant references on table "public"."prompt_tags" to "postgres";

grant select on table "public"."prompt_tags" to "postgres";

grant trigger on table "public"."prompt_tags" to "postgres";

grant truncate on table "public"."prompt_tags" to "postgres";

grant update on table "public"."prompt_tags" to "postgres";

grant delete on table "public"."prompt_tags" to "service_role";

grant insert on table "public"."prompt_tags" to "service_role";

grant references on table "public"."prompt_tags" to "service_role";

grant select on table "public"."prompt_tags" to "service_role";

grant trigger on table "public"."prompt_tags" to "service_role";

grant truncate on table "public"."prompt_tags" to "service_role";

grant update on table "public"."prompt_tags" to "service_role";

grant delete on table "public"."prompts" to "anon";

grant insert on table "public"."prompts" to "anon";

grant references on table "public"."prompts" to "anon";

grant select on table "public"."prompts" to "anon";

grant trigger on table "public"."prompts" to "anon";

grant truncate on table "public"."prompts" to "anon";

grant update on table "public"."prompts" to "anon";

grant delete on table "public"."prompts" to "authenticated";

grant insert on table "public"."prompts" to "authenticated";

grant references on table "public"."prompts" to "authenticated";

grant select on table "public"."prompts" to "authenticated";

grant trigger on table "public"."prompts" to "authenticated";

grant truncate on table "public"."prompts" to "authenticated";

grant update on table "public"."prompts" to "authenticated";

grant delete on table "public"."prompts" to "postgres";

grant insert on table "public"."prompts" to "postgres";

grant references on table "public"."prompts" to "postgres";

grant select on table "public"."prompts" to "postgres";

grant trigger on table "public"."prompts" to "postgres";

grant truncate on table "public"."prompts" to "postgres";

grant update on table "public"."prompts" to "postgres";

grant delete on table "public"."prompts" to "service_role";

grant insert on table "public"."prompts" to "service_role";

grant references on table "public"."prompts" to "service_role";

grant select on table "public"."prompts" to "service_role";

grant trigger on table "public"."prompts" to "service_role";

grant truncate on table "public"."prompts" to "service_role";

grant update on table "public"."prompts" to "service_role";

grant delete on table "public"."tags" to "anon";

grant insert on table "public"."tags" to "anon";

grant references on table "public"."tags" to "anon";

grant select on table "public"."tags" to "anon";

grant trigger on table "public"."tags" to "anon";

grant truncate on table "public"."tags" to "anon";

grant update on table "public"."tags" to "anon";

grant delete on table "public"."tags" to "authenticated";

grant insert on table "public"."tags" to "authenticated";

grant references on table "public"."tags" to "authenticated";

grant select on table "public"."tags" to "authenticated";

grant trigger on table "public"."tags" to "authenticated";

grant truncate on table "public"."tags" to "authenticated";

grant update on table "public"."tags" to "authenticated";

grant delete on table "public"."tags" to "postgres";

grant insert on table "public"."tags" to "postgres";

grant references on table "public"."tags" to "postgres";

grant select on table "public"."tags" to "postgres";

grant trigger on table "public"."tags" to "postgres";

grant truncate on table "public"."tags" to "postgres";

grant update on table "public"."tags" to "postgres";

grant delete on table "public"."tags" to "service_role";

grant insert on table "public"."tags" to "service_role";

grant references on table "public"."tags" to "service_role";

grant select on table "public"."tags" to "service_role";

grant trigger on table "public"."tags" to "service_role";

grant truncate on table "public"."tags" to "service_role";

grant update on table "public"."tags" to "service_role";


