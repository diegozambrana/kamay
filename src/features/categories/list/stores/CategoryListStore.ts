import { create } from "zustand";
import type { Category } from "@/lib/schemas/category";

interface CategoryListStore {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: (open: boolean) => void;
  categoryToDelete: Category | null;
  setCategoryToDelete: (category: Category | null) => void;
  reset: () => void;
}

export const useCategoryListStore = create<CategoryListStore>((set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  deleteDialogOpen: false,
  setDeleteDialogOpen: (open) => set({ deleteDialogOpen: open }),
  categoryToDelete: null,
  setCategoryToDelete: (category) => set({ categoryToDelete: category }),
  reset: () =>
    set({
      searchQuery: "",
      deleteDialogOpen: false,
      categoryToDelete: null,
    }),
}));
