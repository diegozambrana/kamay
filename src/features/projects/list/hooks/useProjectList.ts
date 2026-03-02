"use client";
import { useMemo, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useProjectListStore } from "../stores/ProjectListStore";
import { deleteProject } from "@/actions/projects/projectActions";
import type { Project } from "@/lib/schemas/project";

export function useProjectList(initialProjects: Project[]) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const {
    searchQuery,
    setSearchQuery,
    deleteDialogOpen,
    setDeleteDialogOpen,
    projectToDelete,
    setProjectToDelete,
  } = useProjectListStore();

  const filteredProjects = useMemo(() => {
    if (!searchQuery) return initialProjects;
    const query = searchQuery.toLowerCase();
    return initialProjects.filter((project) =>
      project.name.toLowerCase().includes(query),
    );
  }, [initialProjects, searchQuery]);

  const handleDelete = async () => {
    if (!projectToDelete) return;

    try {
      await deleteProject(projectToDelete.id);
      setDeleteDialogOpen(false);
      setProjectToDelete(null);
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      console.error("Error al eliminar proyecto:", error);
    }
  };

  const handleCloseDialog = () => {
    setDeleteDialogOpen(false);
    setProjectToDelete(null);
  };

  return {
    projects: filteredProjects,
    searchQuery,
    setSearchQuery,
    deleteDialogOpen,
    setDeleteDialogOpen,
    projectToDelete,
    setProjectToDelete,
    handleDelete,
    handleCloseDialog,
    loading: isPending,
  };
}
