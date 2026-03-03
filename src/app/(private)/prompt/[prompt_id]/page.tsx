import { getPromptById } from "@/actions/prompts/promptActions";
import { PromptDetail } from "@/features/prompts/detail";
import type { PromptWithRelations } from "@/services/prompts";
import { notFound } from "next/navigation";

export default async function PromptDetailPage({
  params,
}: {
  params: Promise<{ prompt_id: string }>;
}) {
  const { prompt_id } = await params;
  let prompt: PromptWithRelations;

  try {
    prompt = await getPromptById(prompt_id);
  } catch {
    notFound();
  }

  return <PromptDetail prompt={prompt} />;
}
