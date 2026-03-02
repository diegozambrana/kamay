import { create } from "zustand";

interface CategoryDetailStore {
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: (open: boolean) => void;
  isDeleting: boolean;
  setIsDeleting: (deleting: boolean) => void;
  reset: () => void;
}

export const useCategoryDetailStore = create<CategoryDetailStore>((set) => ({
  deleteDialogOpen: false,
  setDeleteDialogOpen: (open) => set({ deleteDialogOpen: open }),
  isDeleting: false,
  setIsDeleting: (deleting) => set({ isDeleting: deleting }),
  reset: () =>
    set({
      deleteDialogOpen: false,
      isDeleting: false,
    }),
}));
