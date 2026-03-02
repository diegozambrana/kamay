"use client";
import { useRouter } from "next/navigation";
import { useProjectDetailStore } from "../stores/ProjectDetailStore";
import { deleteProject } from "@/actions/projects/projectActions";

export function useProjectDetail(projectId: string) {
  const router = useRouter();
  const { deleteDialogOpen, setDeleteDialogOpen, isDeleting, setIsDeleting } =
    useProjectDetailStore();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteProject(projectId);
      router.push("/projects");
      router.refresh();
    } catch (error) {
      console.error("Error al eliminar proyecto:", error);
      setIsDeleting(false);
    }
  };

  const handleCloseDialog = () => {
    setDeleteDialogOpen(false);
  };

  return {
    deleteDialogOpen,
    setDeleteDialogOpen,
    isDeleting,
    handleDelete,
    handleCloseDialog,
  };
}
