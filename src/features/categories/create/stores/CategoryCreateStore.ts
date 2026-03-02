import { create } from "zustand";

interface CategoryCreateStore {
  isSubmitting: boolean;
  setIsSubmitting: (submitting: boolean) => void;
  formErrors: Record<string, string>;
  setFormErrors: (errors: Record<string, string>) => void;
  reset: () => void;
}

export const useCategoryCreateStore = create<CategoryCreateStore>((set) => ({
  isSubmitting: false,
  setIsSubmitting: (submitting) => set({ isSubmitting: submitting }),
  formErrors: {},
  setFormErrors: (errors) => set({ formErrors: errors }),
  reset: () =>
    set({
      isSubmitting: false,
      formErrors: {},
    }),
}));
