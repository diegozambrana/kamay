import { SupabaseClient } from "@supabase/supabase-js";
import type { Project } from "@/lib/schemas/project";

export class ProjectService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getProjectsByUserId(userId: string) {
    const { data, error } = await this.supabase
      .from("projects")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as Project[];
  }

  async getProjectById(id: string, userId: string) {
    const { data, error } = await this.supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (error) throw error;
    return data as Project;
  }

  async createProject(
    projectData: Omit<Project, "id" | "created_at" | "updated_at">,
    userId: string,
    projectId?: string | null
  ) {
    const { data, error } = await this.supabase
      .from("projects")
      .insert({
        ...(projectId ? { id: projectId } : {}),
        ...projectData,
        user_id: userId,
      })
      .select()
      .single();

    if (error) throw error;
    return data as Project;
  }

  async updateProject(
    id: string,
    projectData: Partial<Omit<Project, "id" | "created_at" | "updated_at" | "user_id">>,
    userId: string
  ) {
    const { data, error } = await this.supabase
      .from("projects")
      .update({
        ...projectData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) throw error;
    return data as Project;
  }

  async deleteProject(id: string, userId: string) {
    const { error } = await this.supabase
      .from("projects")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) throw error;
    return { success: true };
  }
}
