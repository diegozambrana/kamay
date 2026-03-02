"use client";
import { useRouter } from "next/navigation";
import { useProjectCreateStore } from "../stores/ProjectCreateStore";
import { createProject, updateProject } from "@/actions/projects/projectActions";
import { createProjectSchema, updateProjectSchema } from "@/lib/schemas/project";
import { ZodError } from "zod";
import { useEffect } from "react";

type UseProjectCreateParams = {
  mode?: "create" | "edit";
  projectId?: string;
};

export function useProjectCreate({
  mode = "create",
  projectId,
}: UseProjectCreateParams = {}) {
  const router = useRouter();
  const { isSubmitting, setIsSubmitting, formErrors, setFormErrors, reset } =
    useProjectCreateStore();

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
        description: formData.get("description") as string | null,
        thumbnail_url: formData.get("thumbnail_url") as string | null,
        is_public: formData.get("is_public") === "on",
      };

      const validated =
        mode === "edit"
          ? updateProjectSchema.parse(data)
          : createProjectSchema.parse(data);

      const formDataToSend = new FormData();
      if (validated.name) {
        formDataToSend.append("name", validated.name);
      }
      if (validated.description !== undefined) {
        formDataToSend.append("description", validated.description || "");
      }
      if (validated.thumbnail_url !== undefined) {
        formDataToSend.append("thumbnail_url", validated.thumbnail_url || "");
      }
      formDataToSend.append(
        "is_public",
        validated.is_public ? "true" : "false",
      );

      if (mode === "edit") {
        if (!projectId) {
          throw new Error("projectId es requerido para editar");
        }
        formDataToSend.append("project_id", projectId);
        await updateProject(formDataToSend);
        router.push(`/project/${projectId}`);
      } else {
        const project = await createProject(formDataToSend);
        router.push(`/project/${project.id}`);
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
        console.error("Error al crear proyecto:", error);
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
