"use server";

import { createClient } from "@/lib/supabase/server";
import { PromptService } from "@/services/prompts";
import { revalidatePath } from "next/cache";
import type { Prompt, PromptVariable } from "@/lib/schemas/prompt";

async function requireAuthenticatedUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("No autenticado");
  }

  return { supabase, user };
}

export async function getPrompts() {
  const { supabase, user } = await requireAuthenticatedUser();
  const promptService = new PromptService(supabase);
  return promptService.getPromptsByUserId(user.id);
}

export async function getPromptById(promptId: string) {
  const { supabase, user } = await requireAuthenticatedUser();
  const promptService = new PromptService(supabase);
  return promptService.getPromptById(promptId, user.id);
}

export async function createPrompt(formData: FormData) {
  const { supabase, user } = await requireAuthenticatedUser();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string | null;
  const content = formData.get("content") as string;
  const project_id = formData.get("project_id") as string | null;
  const category_id = formData.get("categoryId") as string | null;
  const type = (formData.get("type") as string) || "text";
  const is_template = formData.get("is_template") === "on";
  const variablesStr = formData.get("variables") as string;
  const tagIdsStr = formData.get("tagIds") as string;

  let variables: PromptVariable[] = [];
  try {
    if (variablesStr) {
      variables = JSON.parse(variablesStr);
    }
  } catch {
    variables = [];
  }

  const tagIds = tagIdsStr ? JSON.parse(tagIdsStr) : [];

  const promptData: Omit<
    Prompt,
    "id" | "created_at" | "updated_at" | "user_id"
  > = {
    title,
    description: description || null,
    content,
    project_id: project_id && project_id !== "none" ? project_id : null,
    category_id: category_id && category_id !== "none" ? category_id : null,
    type: type as "text" | "image" | "video" | "audio",
    is_template,
    variables,
  };

  const promptService = new PromptService(supabase);
  const prompt = await promptService.createPrompt(
    promptData,
    user.id,
    tagIds
  );

  revalidatePath("/prompts");
  return prompt;
}

export async function updatePrompt(formData: FormData) {
  const { supabase, user } = await requireAuthenticatedUser();

  const promptId = formData.get("prompt_id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string | null;
  const content = formData.get("content") as string;
  const project_id = formData.get("project_id") as string | null;
  const category_id = formData.get("categoryId") as string | null;
  const type = formData.get("type") as string;
  const is_template = formData.get("is_template") === "on";
  const variablesStr = formData.get("variables") as string;
  const tagIdsStr = formData.get("tagIds") as string;

  let variables: PromptVariable[] = [];
  try {
    if (variablesStr) {
      variables = JSON.parse(variablesStr);
    }
  } catch {
    variables = [];
  }

  const tagIds = tagIdsStr ? JSON.parse(tagIdsStr) : undefined;

  const promptData: Partial<
    Omit<Prompt, "id" | "created_at" | "updated_at" | "user_id">
  > = {
    title,
    description: description || null,
    content,
    project_id: project_id && project_id !== "none" ? project_id : null,
    category_id: category_id && category_id !== "none" ? category_id : null,
    type: type as "text" | "image" | "video" | "audio",
    is_template,
    variables,
  };

  const promptService = new PromptService(supabase);
  const prompt = await promptService.updatePrompt(
    promptId,
    promptData,
    user.id,
    tagIds
  );

  revalidatePath("/prompts");
  revalidatePath(`/prompt/${promptId}`);
  return prompt;
}

export async function deletePrompt(promptId: string) {
  const { supabase, user } = await requireAuthenticatedUser();

  const promptService = new PromptService(supabase);
  await promptService.deletePrompt(promptId, user.id);

  revalidatePath("/prompts");
  return { success: true };
}
