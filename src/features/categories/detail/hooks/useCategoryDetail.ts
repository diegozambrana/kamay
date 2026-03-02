"use client";

import { useRouter } from "next/navigation";
import { deleteCategory } from "@/actions/categories/categoryActions";
import { useCategoryDetailStore } from "../stores/CategoryDetailStore";

export function useCategoryDetail(categoryId: string) {
  const router = useRouter();
  const { deleteDialogOpen, setDeleteDialogOpen, isDeleting, setIsDeleting } =
    useCategoryDetailStore();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteCategory(categoryId);
      router.push("/categories");
      router.refresh();
    } catch (error) {
      console.error("Error al eliminar categoría:", error);
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
