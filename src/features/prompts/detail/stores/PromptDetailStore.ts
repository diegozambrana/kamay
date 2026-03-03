import { create } from "zustand";

interface PromptDetailStore {
  deleteDialogOpen: boolean;
  loading: boolean;
  setDeleteDialogOpen: (open: boolean) => void;
  setLoading: (loading: boolean) => void;
}

export const usePromptDetailStore = create<PromptDetailStore>((set) => ({
  deleteDialogOpen: false,
  loading: false,
  setDeleteDialogOpen: (deleteDialogOpen) => set({ deleteDialogOpen }),
  setLoading: (loading) => set({ loading }),
}));
