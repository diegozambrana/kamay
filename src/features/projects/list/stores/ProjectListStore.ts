import { create } from "zustand";
import type { Project } from "@/lib/schemas/project";

interface ProjectListStore {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: (open: boolean) => void;
  projectToDelete: Project | null;
  setProjectToDelete: (project: Project | null) => void;
  reset: () => void;
}

export const useProjectListStore = create<ProjectListStore>((set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  deleteDialogOpen: false,
  setDeleteDialogOpen: (open) => set({ deleteDialogOpen: open }),
  projectToDelete: null,
  setProjectToDelete: (project) => set({ projectToDelete: project }),
  reset: () =>
    set({
      searchQuery: "",
      deleteDialogOpen: false,
      projectToDelete: null,
    }),
}));
