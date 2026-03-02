"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MainContainer } from "@/components/layout/MainContainer";
import { useCategoryCreate } from "./hooks/useCategoryCreate";
import type { Category } from "@/lib/schemas/category";

interface CategoryCreateProps {
  mode?: "create" | "edit";
  initialCategory?: Category;
}

function toSlug(value: string) {
  return value
    .normalize("NFD")
    .replaceAll(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replaceAll(/[^a-z0-9\s-]/g, "")
    .replaceAll(/\s+/g, "-")
    .replaceAll(/-+/g, "-")
    .replaceAll(/(^-+)|(-+$)/g, "");
}

export function CategoryCreate({ mode = "create", initialCategory }: Readonly<CategoryCreateProps>) {
  const router = useRouter();
  const [name, setName] = useState(initialCategory?.name ?? "");
  const { isSubmitting, formErrors, handleSubmit } = useCategoryCreate({
    mode,
    categoryId: initialCategory?.id,
  });
  const isEditMode = mode === "edit";
  const generatedSlug = useMemo(() => toSlug(name), [name]);
  let submitLabel = "Crear categoría";

  if (isSubmitting) {
    submitLabel = isEditMode ? "Guardando..." : "Creando...";
  } else if (isEditMode) {
    submitLabel = "Guardar cambios";
  }

  return (
    <MainContainer
      title={isEditMode ? "Editar Categoría" : "Crear Categoría"}
      description={
        isEditMode
          ? `Editando: ${initialCategory?.name ?? "Categoría"}`
          : "Crea una nueva categoría"
      }
    >
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Información de la categoría</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">
                Nombre <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Mi categoría"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
              {formErrors.name && <p className="text-sm text-destructive">{formErrors.name}</p>}
              <p className="text-xs text-muted-foreground">
                Slug: {generatedSlug || "se generará cuando escribas el nombre"}
              </p>
            </div>

            <input type="hidden" name="slug" value={generatedSlug} />
            {formErrors.slug && <p className="text-sm text-destructive">{formErrors.slug}</p>}

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe tu categoría..."
                defaultValue={initialCategory?.description ?? ""}
                rows={4}
              />
              {formErrors.description && (
                <p className="text-sm text-destructive">{formErrors.description}</p>
              )}
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
                {submitLabel}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </MainContainer>
  );
}
