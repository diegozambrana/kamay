import { SupabaseClient } from "@supabase/supabase-js";
import type { Prompt } from "@/lib/schemas/prompt";
import type { Tag } from "@/lib/schemas/tag";
import type { Category } from "@/lib/schemas/category";

export interface PromptWithRelations extends Prompt {
  tags?: Tag[];
  category?: Category | null;
  project?: {
    id: string;
    name: string;
  } | null;
}

export class PromptService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getPromptsByUserId(userId: string): Promise<PromptWithRelations[]> {
    const { data, error } = await this.supabase
      .from("prompts")
      .select(
        `
        *,
        project:projects(id, name),
        category:categories(*),
        prompt_tags(tag:tags(*))
      `
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return (data || []).map((prompt) => {
      const promptData = prompt as Record<string, unknown>;
      return {
        ...promptData,
        tags: Array.isArray(promptData.prompt_tags)
          ? promptData.prompt_tags
              .map((pt: Record<string, unknown>) => pt.tag)
              .filter(Boolean)
          : [],
        prompt_tags: undefined,
      } as unknown as PromptWithRelations;
    });
  }

  async getPromptById(
    id: string,
    userId: string
  ): Promise<PromptWithRelations> {
    const { data, error } = await this.supabase
      .from("prompts")
      .select(
        `
        *,
        project:projects(id, name),
        category:categories(*),
        prompt_tags(tag:tags(*))
      `
      )
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (error) throw error;

    const result = data as Record<string, unknown>;
    return {
      ...result,
      tags: Array.isArray(result.prompt_tags)
        ? result.prompt_tags
            .map((pt: Record<string, unknown>) => pt.tag)
            .filter(Boolean)
        : [],
      prompt_tags: undefined,
    } as unknown as PromptWithRelations;
  }

  async createPrompt(
    promptData: Omit<Prompt, "id" | "created_at" | "updated_at" | "user_id">,
    userId: string,
    tagIds?: string[]
  ): Promise<Prompt> {
    const { data, error } = await this.supabase
      .from("prompts")
      .insert({
        ...promptData,
        user_id: userId,
      })
      .select()
      .single();

    if (error) throw error;

    const prompt = data as Prompt;

    if (tagIds && tagIds.length > 0) {
      await this.setPromptTags(prompt.id, tagIds);
    }

    return prompt;
  }

  async updatePrompt(
    id: string,
    promptData: Partial<
      Omit<Prompt, "id" | "created_at" | "updated_at" | "user_id">
    >,
    userId: string,
    tagIds?: string[]
  ): Promise<Prompt> {
    const { data, error } = await this.supabase
      .from("prompts")
      .update({
        ...promptData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) throw error;

    if (tagIds !== undefined) {
      await this.setPromptTags(id, tagIds);
    }

    return data as Prompt;
  }

  async deletePrompt(id: string, userId: string) {
    const { error } = await this.supabase
      .from("prompts")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) throw error;
    return { success: true };
  }

  private async setPromptTags(promptId: string, tagIds: string[]) {
    await this.supabase.from("prompt_tags").delete().eq("prompt_id", promptId);

    if (tagIds.length > 0) {
      const now = new Date().toISOString();
      const { error } = await this.supabase
        .from("prompt_tags")
        .insert(
          tagIds.map((tagId) => ({
            prompt_id: promptId,
            tag_id: tagId,
            updated_at: now,
          }))
        );

      if (error) throw error;
    }
  }
}
