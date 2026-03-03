"use client";
import { useRouter } from "next/navigation";
import { usePromptCreateStore } from "../stores/PromptCreateStore";
import { createPrompt, updatePrompt } from "@/actions/prompts/promptActions";
import { createPromptSchema, updatePromptSchema } from "@/lib/schemas/prompt";
import { ZodError } from "zod";
import { useEffect } from "react";

interface UsePromptCreateProps {
  mode: "create" | "edit";
  promptId?: string;
}

export function usePromptCreate({ mode, promptId }: UsePromptCreateProps) {
  const router = useRouter();
  const {
    isSubmitting,
    formErrors,
    variables,
    tagIds,
    categoryId,
    setIsSubmitting,
    setFormErrors,
    reset,
  } = usePromptCreateStore();

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  async function handleSubmit(formData: FormData) {
    try {
      setIsSubmitting(true);
      setFormErrors({});

      formData.append("variables", JSON.stringify(variables));
      formData.append("tagIds", JSON.stringify(tagIds));
      formData.append("categoryId", categoryId || "");

      if (mode === "edit" && promptId) {
        formData.append("prompt_id", promptId);

        const projectIdValue = formData.get("project_id") as string;
        const descriptionValue = formData.get("description") as string;
        const categoryIdValue = formData.get("categoryId") as string;

        const rawData = {
          title: formData.get("title"),
          description: descriptionValue || null,
          content: formData.get("content"),
          project_id:
            projectIdValue && projectIdValue !== "none" ? projectIdValue : null,
          category_id:
            categoryIdValue && categoryIdValue !== "none" ? categoryIdValue : null,
          type: formData.get("type") || "text",
          is_template: formData.get("is_template") === "true",
          variables,
        };

        updatePromptSchema.parse(rawData);
        await updatePrompt(formData);
        router.push(`/prompt/${promptId}`);
      } else {
        const projectIdValue = formData.get("project_id") as string;
        const descriptionValue = formData.get("description") as string;
        const categoryIdValue = formData.get("categoryId") as string;

        const rawData = {
          title: formData.get("title"),
          description: descriptionValue || null,
          content: formData.get("content"),
          project_id:
            projectIdValue && projectIdValue !== "none" ? projectIdValue : null,
          category_id:
            categoryIdValue && categoryIdValue !== "none" ? categoryIdValue : null,
          type: formData.get("type") || "text",
          is_template: formData.get("is_template") === "true",
          variables,
        };

        createPromptSchema.parse(rawData);
        const prompt = await createPrompt(formData);
        router.push(`/prompt/${prompt.id}`);
      }

      router.refresh();
    } catch (error) {
      console.error("Error submitting prompt:", error);

      if (error instanceof ZodError) {
        const errors: Record<string, string> = {};
        error.issues.forEach((issue) => {
          if (issue.path[0]) {
            errors[issue.path[0].toString()] = issue.message;
          }
        });
        setFormErrors(errors);
      } else if (error instanceof Error) {
        setFormErrors({ general: error.message });
      } else {
        setFormErrors({ general: "Error al guardar el prompt" });
      }

      setIsSubmitting(false);
    }
  }

  return {
    isSubmitting,
    formErrors,
    handleSubmit,
  };
}
