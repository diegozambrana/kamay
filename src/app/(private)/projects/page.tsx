import { getProjects } from "@/actions/projects/projectActions";
import { ProjectList } from "@/features/projects/list";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return <ProjectList initialProjects={projects || []} />;
}
