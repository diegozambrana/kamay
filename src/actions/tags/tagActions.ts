"use server";

import { createClient } from "@/lib/supabase/server";
import { TagService } from "@/services/tags";
import { revalidatePath } from "next/cache";
import type { Tag } from "@/lib/schemas/tag";
import { toSlug } from "@/lib/schemas/tag";

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

export async function getTags() {
  const supabase = await requireAuthenticatedUser();
  const tagService = new TagService(supabase);
  return tagService.getTags();
}

export async function getTagById(tagId: string) {
  const supabase = await requireAuthenticatedUser();
  const tagService = new TagService(supabase);
  return tagService.getTagById(tagId);
}

export async function createTag(formData: FormData) {
  const supabase = await requireAuthenticatedUser();
  const name = formData.get("name") as string;
  const slug = (formData.get("slug") as string) || toSlug(name);

  const tagData: Omit<Tag, "id" | "created_at" | "updated_at"> = {
    name,
    slug,
  };

  const tagService = new TagService(supabase);
  const tag = await tagService.createTag(tagData);

  revalidatePath("/prompts");
  return tag;
}

export async function findOrCreateTag(name: string) {
  const supabase = await requireAuthenticatedUser();
  const tagService = new TagService(supabase);
  return tagService.findOrCreateTag(name);
}

export async function deleteTag(tagId: string) {
  const supabase = await requireAuthenticatedUser();
  const tagService = new TagService(supabase);
  await tagService.deleteTag(tagId);

  revalidatePath("/prompts");
  return { success: true };
}
