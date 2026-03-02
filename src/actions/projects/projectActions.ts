"use server";

import { createClient } from "@/lib/supabase/server";
import { ProjectService } from "@/services/projects";
import { revalidatePath } from "next/cache";
import type { Project } from "@/lib/schemas/project";

export async function getProjects() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("No autenticado");
  }

  const projectService = new ProjectService(supabase);
  const projects = await projectService.getProjectsByUserId(user.id);
  return projects;
}

export async function getProjectById(projectId: string) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("No autenticado");
  }

  const projectService = new ProjectService(supabase);
  const project = await projectService.getProjectById(projectId, user.id);
  return project;
}

export async function createProject(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("No autenticado");

  const name = formData.get("name") as string;
  const description = formData.get("description") as string | null;
  const thumbnail_url = formData.get("thumbnail_url") as string | null;
  const is_public = formData.get("is_public") === "true";

  const projectData: Omit<Project, "id" | "created_at" | "updated_at"> = {
    name,
    description: description || null,
    thumbnail_url: thumbnail_url || null,
    is_public,
    user_id: user.id,
  };

  const projectService = new ProjectService(supabase);
  const project = await projectService.createProject(projectData, user.id);

  revalidatePath("/projects");
  return project;
}

export async function updateProject(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("No autenticado");

  const projectId = formData.get("project_id") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string | null;
  const thumbnail_url = formData.get("thumbnail_url") as string | null;
  const is_public = formData.get("is_public") === "true";

  const projectData: Partial<
    Omit<Project, "id" | "created_at" | "updated_at" | "user_id">
  > = {
    name,
    description: description || null,
    thumbnail_url: thumbnail_url || null,
    is_public,
  };

  const projectService = new ProjectService(supabase);
  const project = await projectService.updateProject(
    projectId,
    projectData,
    user.id
  );

  revalidatePath("/projects");
  revalidatePath(`/project/${projectId}`);
  return project;
}

export async function deleteProject(projectId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("No autenticado");

  const projectService = new ProjectService(supabase);
  await projectService.deleteProject(projectId, user.id);

  revalidatePath("/projects");
  return { success: true };
}
