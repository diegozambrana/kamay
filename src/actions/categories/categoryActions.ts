"use server";

import { createClient } from "@/lib/supabase/server";
import type { Category } from "@/lib/schemas/category";
import { CategoryService } from "@/services/categories";
import { revalidatePath } from "next/cache";

async function requireAuthenticatedUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("No autenticado");
  }

  return supabase;
}

export async function getCategories() {
  const supabase = await requireAuthenticatedUser();
  const categoryService = new CategoryService(supabase);
  return categoryService.getCategories();
}

export async function getCategoryById(categoryId: string) {
  const supabase = await requireAuthenticatedUser();
  const categoryService = new CategoryService(supabase);
  return categoryService.getCategoryById(categoryId);
}

export async function createCategory(formData: FormData) {
  const supabase = await requireAuthenticatedUser();
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string | null;
  const description = formData.get("description") as string | null;

  const categoryData: Omit<Category, "id" | "created_at" | "updated_at"> = {
    name,
    slug: slug || null,
    description: description || null,
  };

  const categoryService = new CategoryService(supabase);
  const category = await categoryService.createCategory(categoryData);

  revalidatePath("/categories");
  return category;
}

export async function updateCategory(formData: FormData) {
  const supabase = await requireAuthenticatedUser();
  const categoryId = formData.get("category_id") as string;
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string | null;
  const description = formData.get("description") as string | null;

  const categoryData: Partial<Omit<Category, "id" | "created_at" | "updated_at">> = {
    name,
    slug: slug || null,
    description: description || null,
  };

  const categoryService = new CategoryService(supabase);
  const category = await categoryService.updateCategory(categoryId, categoryData);

  revalidatePath("/categories");
  revalidatePath(`/category/${categoryId}`);
  return category;
}

export async function deleteCategory(categoryId: string) {
  const supabase = await requireAuthenticatedUser();
  const categoryService = new CategoryService(supabase);
  await categoryService.deleteCategory(categoryId);

  revalidatePath("/categories");
  return { success: true };
}
