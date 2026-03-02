"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MainContainer } from "@/components/layout/MainContainer";
import { useProjectCreate } from "./hooks/useProjectCreate";
import type { Project } from "@/lib/schemas/project";

interface ProjectCreateProps {
  mode?: "create" | "edit";
  initialProject?: Project;
}

export function ProjectCreate({
  mode = "create",
  initialProject,
}: ProjectCreateProps) {
  const router = useRouter();
  const { isSubmitting, formErrors, handleSubmit } = useProjectCreate({
    mode,
    projectId: initialProject?.id,
  });
  const isEditMode = mode === "edit";

  return (
    <MainContainer
      title={isEditMode ? "Editar Proyecto" : "Crear Proyecto"}
      description={
        isEditMode
          ? `Editando: ${initialProject?.name ?? "Proyecto"}`
          : "Crea un nuevo proyecto"
      }
    >
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Información del proyecto</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            action={handleSubmit}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label htmlFor="name">
                Nombre <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Mi proyecto"
                defaultValue={initialProject?.name ?? ""}
                required
              />
              {formErrors.name && (
                <p className="text-sm text-destructive">{formErrors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe tu proyecto..."
                defaultValue={initialProject?.description ?? ""}
                rows={4}
              />
              {formErrors.description && (
                <p className="text-sm text-destructive">
                  {formErrors.description}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="thumbnail_url">URL de imagen</Label>
              <Input
                id="thumbnail_url"
                name="thumbnail_url"
                type="url"
                placeholder="https://ejemplo.com/imagen.jpg"
                defaultValue={initialProject?.thumbnail_url ?? ""}
              />
              {formErrors.thumbnail_url && (
                <p className="text-sm text-destructive">
                  {formErrors.thumbnail_url}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_public"
                name="is_public"
                defaultChecked={initialProject?.is_public ?? false}
              />
              <Label htmlFor="is_public" className="cursor-pointer">
                Hacer proyecto público
              </Label>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? isEditMode
                    ? "Guardando..."
                    : "Creando..."
                  : isEditMode
                    ? "Guardar cambios"
                    : "Crear proyecto"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </MainContainer>
  );
}
