"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ZodError } from "zod";
import { useCategoryCreateStore } from "../stores/CategoryCreateStore";
import { createCategory, updateCategory } from "@/actions/categories/categoryActions";
import { createCategorySchema, updateCategorySchema } from "@/lib/schemas/category";

type UseCategoryCreateParams = {
  mode?: "create" | "edit";
  categoryId?: string;
};

export function useCategoryCreate({
  mode = "create",
  categoryId,
}: UseCategoryCreateParams = {}) {
  const router = useRouter();
  const { isSubmitting, setIsSubmitting, formErrors, setFormErrors, reset } =
    useCategoryCreateStore();

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setFormErrors({});

    try {
      const data = {
        name: formData.get("name") as string,
        slug: formData.get("slug") as string | null,
        description: formData.get("description") as string | null,
      };

      const validated =
        mode === "edit"
          ? updateCategorySchema.parse(data)
          : createCategorySchema.parse(data);

      const formDataToSend = new FormData();
      if (validated.name !== undefined) {
        formDataToSend.append("name", validated.name);
      }
      if (validated.slug !== undefined) {
        formDataToSend.append("slug", validated.slug || "");
      }
      if (validated.description !== undefined) {
        formDataToSend.append("description", validated.description || "");
      }

      if (mode === "edit") {
        if (!categoryId) {
          throw new Error("categoryId es requerido para editar");
        }
        formDataToSend.append("category_id", categoryId);
        await updateCategory(formDataToSend);
        router.push(`/category/${categoryId}`);
      } else {
        const category = await createCategory(formDataToSend);
        router.push(`/category/${category.id}`);
      }

      router.refresh();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const errors: Record<string, string> = {};
        error.issues.forEach((issue) => {
          const field = issue.path[0];
          if (typeof field === "string") {
            errors[field] = issue.message;
          }
        });
        setFormErrors(errors);
      } else {
        console.error("Error al guardar categoría:", error);
      }
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    formErrors,
    handleSubmit,
  };
}
