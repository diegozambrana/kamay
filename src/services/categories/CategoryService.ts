import { SupabaseClient } from "@supabase/supabase-js";
import type { Category } from "@/lib/schemas/category";

export class CategoryService {
  constructor(private supabase: SupabaseClient) {}

  async getCategories() {
    const { data, error } = await this.supabase
      .from("categories")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as Category[];
  }

  async getCategoryById(id: string) {
    const { data, error } = await this.supabase
      .from("categories")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data as Category;
  }

  async createCategory(categoryData: Omit<Category, "id" | "created_at" | "updated_at">) {
    const { data, error } = await this.supabase
      .from("categories")
      .insert(categoryData)
      .select()
      .single();

    if (error) throw error;
    return data as Category;
  }

  async updateCategory(
    id: string,
    categoryData: Partial<Omit<Category, "id" | "created_at" | "updated_at">>,
  ) {
    const { data, error } = await this.supabase
      .from("categories")
      .update({
        ...categoryData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as Category;
  }

  async deleteCategory(id: string) {
    const { error } = await this.supabase.from("categories").delete().eq("id", id);

    if (error) throw error;
    return { success: true };
  }
}
