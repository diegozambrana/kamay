import { SupabaseClient } from "@supabase/supabase-js";
import type { Tag } from "@/lib/schemas/tag";
import { toSlug } from "@/lib/schemas/tag";

export class TagService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getTags() {
    const { data, error } = await this.supabase
      .from("tags")
      .select("*")
      .order("name", { ascending: true });

    if (error) throw error;
    return data as Tag[];
  }

  async getTagById(id: string) {
    const { data, error } = await this.supabase
      .from("tags")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data as Tag;
  }

  async getTagByName(name: string) {
    const { data, error } = await this.supabase
      .from("tags")
      .select("*")
      .eq("name", name)
      .maybeSingle();

    if (error) throw error;
    return data as Tag | null;
  }

  async getTagBySlug(slug: string) {
    const { data, error } = await this.supabase
      .from("tags")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error) throw error;
    return data as Tag | null;
  }

  async createTag(tagData: Omit<Tag, "id" | "created_at" | "updated_at">) {
    const slug = tagData.slug || toSlug(tagData.name);
    
    const { data, error } = await this.supabase
      .from("tags")
      .insert({
        name: tagData.name,
        slug,
      })
      .select()
      .single();

    if (error) throw error;
    return data as Tag;
  }

  async updateTag(
    id: string,
    tagData: Partial<Omit<Tag, "id" | "created_at" | "updated_at">>
  ) {
    const { data, error } = await this.supabase
      .from("tags")
      .update({
        ...tagData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as Tag;
  }

  async deleteTag(id: string) {
    const { error } = await this.supabase.from("tags").delete().eq("id", id);

    if (error) throw error;
    return { success: true };
  }

  async findOrCreateTag(name: string): Promise<Tag> {
    const existing = await this.getTagByName(name);
    
    if (existing) {
      return existing;
    }

    return this.createTag({ name, slug: toSlug(name) });
  }
}
