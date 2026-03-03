import { create } from "zustand";
import type { PromptWithRelations } from "@/services/prompts";

interface PromptListStore {
  prompts: PromptWithRelations[];
  searchQuery: string;
  deleteDialogOpen: boolean;
  promptToDelete: PromptWithRelations | null;
  loading: boolean;
  setPrompts: (prompts: PromptWithRelations[]) => void;
  setSearchQuery: (query: string) => void;
  setDeleteDialogOpen: (open: boolean) => void;
  setPromptToDelete: (prompt: PromptWithRelations | null) => void;
  setLoading: (loading: boolean) => void;
}

export const usePromptListStore = create<PromptListStore>((set) => ({
  prompts: [],
  searchQuery: "",
  deleteDialogOpen: false,
  promptToDelete: null,
  loading: false,
  setPrompts: (prompts) => set({ prompts }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setDeleteDialogOpen: (deleteDialogOpen) => set({ deleteDialogOpen }),
  setPromptToDelete: (promptToDelete) => set({ promptToDelete }),
  setLoading: (loading) => set({ loading }),
}));
