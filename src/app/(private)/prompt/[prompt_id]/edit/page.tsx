import { getPromptById } from "@/actions/prompts/promptActions";
import { getProjects } from "@/actions/projects/projectActions";
import { getCategories } from "@/actions/categories/categoryActions";
import { PromptCreate } from "@/features/prompts/create";
import type { PromptWithRelations } from "@/services/prompts";
import { notFound } from "next/navigation";

export default async function PromptEditPage({
  params,
}: {
  params: Promise<{ prompt_id: string }>;
}) {
  const { prompt_id } = await params;
  let prompt: PromptWithRelations;

  try {
    [prompt] = await Promise.all([getPromptById(prompt_id)]);
  } catch {
    notFound();
  }

  const [projects, categories] = await Promise.all([
    getProjects(),
    getCategories(),
  ]);

  return (
    <PromptCreate
      mode="edit"
      initialPrompt={prompt}
      projects={projects || []}
      categories={categories || []}
    />
  );
}
