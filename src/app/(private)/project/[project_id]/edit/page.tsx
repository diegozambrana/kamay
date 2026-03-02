import { getProjectById } from "@/actions/projects/projectActions";
import { ProjectCreate } from "@/features/projects/create";
import type { Project } from "@/lib/schemas/project";
import { notFound } from "next/navigation";

export default async function ProjectEditPage({
  params,
}: {
  params: Promise<{ project_id: string }>;
}) {
  const { project_id } = await params;
  let project: Project;

  try {
    project = await getProjectById(project_id);
  } catch {
    notFound();
  }

  return <ProjectCreate mode="edit" initialProject={project} />;
}
