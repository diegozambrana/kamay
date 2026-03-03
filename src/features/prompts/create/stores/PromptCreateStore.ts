import { create } from "zustand";
import type { PromptVariable } from "@/lib/schemas/prompt";

interface FormErrors {
  title?: string;
  content?: string;
  description?: string;
  [key: string]: string | undefined;
}

interface PromptCreateStore {
  isSubmitting: boolean;
  formErrors: FormErrors;
  variables: PromptVariable[];
  tagIds: string[];
  categoryId: string | null;
  setIsSubmitting: (submitting: boolean) => void;
  setFormErrors: (errors: FormErrors) => void;
  setVariables: (variables: PromptVariable[]) => void;
  setTagIds: (tagIds: string[]) => void;
  setCategoryId: (categoryId: string | null) => void;
  reset: () => void;
}

export const usePromptCreateStore = create<PromptCreateStore>((set) => ({
  isSubmitting: false,
  formErrors: {},
  variables: [],
  tagIds: [],
  categoryId: null,
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
  setFormErrors: (formErrors) => set({ formErrors }),
  setVariables: (variables) => set({ variables }),
  setTagIds: (tagIds) => set({ tagIds }),
  setCategoryId: (categoryId) => set({ categoryId }),
  reset: () =>
    set({
      isSubmitting: false,
      formErrors: {},
      variables: [],
      tagIds: [],
      categoryId: null,
    }),
}));
