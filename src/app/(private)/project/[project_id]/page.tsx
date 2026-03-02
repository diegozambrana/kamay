import { getProjectById } from "@/actions/projects/projectActions";
import { ProjectDetail } from "@/features/projects/detail";
import type { Project } from "@/lib/schemas/project";
import { notFound } from "next/navigation";

export default async function ProjectDetailPage({
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

  return <ProjectDetail project={project} />;
}
