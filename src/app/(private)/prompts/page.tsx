import { getPrompts } from "@/actions/prompts/promptActions";
import { PromptList } from "@/features/prompts/list";

export default async function PromptsPage() {
  const prompts = await getPrompts();

  return <PromptList initialPrompts={prompts || []} />;
}
