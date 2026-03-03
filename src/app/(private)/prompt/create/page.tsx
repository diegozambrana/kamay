import { PromptCreate } from "@/features/prompts/create";
import { getProjects } from "@/actions/projects/projectActions";
import { getCategories } from "@/actions/categories/categoryActions";

export default async function PromptCreatePage() {
  const [projects, categories] = await Promise.all([
    getProjects(),
    getCategories(),
  ]);

  return (
    <PromptCreate
      mode="create"
      projects={projects || []}
      categories={categories || []}
    />
  );
}
