"use client";

import { useMemo, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Category } from "@/lib/schemas/category";
import { deleteCategory } from "@/actions/categories/categoryActions";
import { useCategoryListStore } from "../stores/CategoryListStore";

export function useCategoryList(initialCategories: Category[]) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const {
    searchQuery,
    setSearchQuery,
    deleteDialogOpen,
    setDeleteDialogOpen,
    categoryToDelete,
    setCategoryToDelete,
  } = useCategoryListStore();

  const filteredCategories = useMemo(() => {
    if (!searchQuery) return initialCategories;
    const query = searchQuery.toLowerCase();

    return initialCategories.filter((category) => {
      const name = category.name.toLowerCase();
      const slug = category.slug?.toLowerCase() ?? "";
      return name.includes(query) || slug.includes(query);
    });
  }, [initialCategories, searchQuery]);

  const handleDelete = async () => {
    if (!categoryToDelete) return;

    try {
      await deleteCategory(categoryToDelete.id);
      setDeleteDialogOpen(false);
      setCategoryToDelete(null);
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      console.error("Error al eliminar categoría:", error);
    }
  };

  const handleCloseDialog = () => {
    setDeleteDialogOpen(false);
    setCategoryToDelete(null);
  };

  return {
    categories: filteredCategories,
    searchQuery,
    setSearchQuery,
    deleteDialogOpen,
    setDeleteDialogOpen,
    categoryToDelete,
    setCategoryToDelete,
    handleDelete,
    handleCloseDialog,
    loading: isPending,
  };
}
