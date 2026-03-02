"use client";
import { useRouter } from "next/navigation";
import { useProjectCreateStore } from "../stores/ProjectCreateStore";
import { createProject, updateProject } from "@/actions/projects/projectActions";
import { createProjectSchema, updateProjectSchema } from "@/lib/schemas/project";
import { uploadImageToSupabase } from "@/utils/imageUpload";
import { ZodError } from "zod";
import { useEffect } from "react";

type UseProjectCreateParams = {
  mode?: "create" | "edit";
  projectId?: string;
  thumbnailFile?: File | null;
  uploadPath?: string;
  uploadBucket?: string;
};

export function useProjectCreate({
  mode = "create",
  projectId,
  thumbnailFile,
  uploadPath,
  uploadBucket = "projects",
}: UseProjectCreateParams = {}) {
  const router = useRouter();
  const { isSubmitting, setIsSubmitting, formErrors, setFormErrors, reset } =
    useProjectCreateStore();

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  const resolveThumbnailUrl = async (formData: FormData) => {
    const currentThumbnailUrl = formData.get("thumbnail_url") as string | null;
    if (!thumbnailFile) {
      return currentThumbnailUrl;
    }

    if (!uploadPath) {
      throw new Error("Path de subida requerido");
    }

    const uploadResult = await uploadImageToSupabase({
      file: thumbnailFile,
      path: uploadPath,
      bucket: uploadBucket,
      maxSizeMB: 10,
    });

    if (!uploadResult.success || !uploadResult.url) {
      throw new Error(uploadResult.error || "Error al subir la imagen");
    }

    return uploadResult.url;
  };

  const submitProject = async (
    formDataToSend: FormData,
    projectIdFromForm: string | null
  ) => {
    if (mode === "edit") {
      if (!projectId) {
        throw new Error("projectId es requerido para editar");
      }
      formDataToSend.append("project_id", projectId);
      await updateProject(formDataToSend);
      return `/project/${projectId}`;
    }

    if (!projectIdFromForm) {
      throw new Error("project_id es requerido para crear");
    }
    formDataToSend.append("project_id", projectIdFromForm);
    const project = await createProject(formDataToSend);
    return `/project/${project.id}`;
  };

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setFormErrors({});

    try {
      const projectIdFromForm = formData.get("project_id") as string | null;
      const thumbnailUrl = await resolveThumbnailUrl(formData);

      const data = {
        name: formData.get("name") as string,
        description: formData.get("description") as string | null,
        thumbnail_url: thumbnailUrl,
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

      const redirectPath = await submitProject(formDataToSend, projectIdFromForm);
      router.push(redirectPath);
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
      } else if (error instanceof Error) {
        setFormErrors({ thumbnail_url: error.message });
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
