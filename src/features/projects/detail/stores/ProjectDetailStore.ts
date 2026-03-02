import { create } from "zustand";

interface ProjectDetailStore {
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: (open: boolean) => void;
  isDeleting: boolean;
  setIsDeleting: (deleting: boolean) => void;
  reset: () => void;
}

export const useProjectDetailStore = create<ProjectDetailStore>((set) => ({
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
