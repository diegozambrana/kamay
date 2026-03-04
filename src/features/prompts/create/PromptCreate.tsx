"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MainContainer } from "@/components/layout/MainContainer";
import { TagManager } from "@/components/TagManager";
import { usePromptCreate } from "./hooks/usePromptCreate";
import { usePromptCreateStore } from "./stores/PromptCreateStore";
import type { PromptWithRelations } from "@/services/prompts";
import type { Project } from "@/lib/schemas/project";
import type { Category } from "@/lib/schemas/category";
import { extractVariablesFromContent, syncVariablesWithContent } from "@/lib/schemas/prompt";
import { BREADCRUMB } from "@/components/Breadcrumb";

interface PromptCreateProps {
  mode?: "create" | "edit";
  initialPrompt?: PromptWithRelations;
  projects?: Project[];
  categories?: Category[];
}

export function PromptCreate({
  mode = "create",
  initialPrompt,
  projects = [],
  categories = [],
}: Readonly<PromptCreateProps>) {
  const router = useRouter();
  const { isSubmitting, formErrors, handleSubmit } = usePromptCreate({
    mode,
    promptId: initialPrompt?.id,
  });
  const { variables, tagIds, categoryId, setVariables, setTagIds, setCategoryId } =
    usePromptCreateStore();

  const [content, setContent] = useState(initialPrompt?.content ?? "");
  const isEditMode = mode === "edit";

  useEffect(() => {
    if (initialPrompt) {
      setVariables(initialPrompt.variables || []);
      setTagIds(initialPrompt.tags?.map((t) => t.id) || []);
      setCategoryId(initialPrompt.category?.id || null);
    } else {
      setVariables([]);
      setTagIds([]);
      setCategoryId(null);
    }
  }, [initialPrompt, setVariables, setTagIds, setCategoryId]);

  const detectedVariables = useMemo(() => {
    return extractVariablesFromContent(content);
  }, [content]);

  useEffect(() => {
    const synced = syncVariablesWithContent(content, variables);
    const variablesChanged = JSON.stringify(synced) !== JSON.stringify(variables);

    if (variablesChanged) {
      setVariables(synced);
    }
  }, [content, variables, setVariables]);

  function handleVariableDefaultChange(key: string, newDefault: string) {
    setVariables(
      variables.map((v) => (v.key === key ? { ...v, default: newDefault } : v))
    );
  }

  return (
    <MainContainer
      title={isEditMode ? "Editar Prompt" : "Crear Prompt"}
      description={
        isEditMode
          ? `Editando: ${initialPrompt?.title ?? "Prompt"}`
          : "Crea un nuevo prompt"
      }
      breadcrumb={isEditMode ? BREADCRUMB.EDIT_PROMPT : BREADCRUMB.CREATE_PROMPT}
    >
      <div className="">

        <form action={handleSubmit} className="space-y-6">
          {formErrors.general && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {formErrors.general}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">
              Título <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="Mi prompt"
              defaultValue={initialPrompt?.title ?? ""}
              required
            />
            {formErrors.title && (
              <p className="text-sm text-destructive">{formErrors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe tu prompt..."
              defaultValue={initialPrompt?.description ?? ""}
              // rows={8}
              className="min-h-32"
            />
            {formErrors.description && (
              <p className="text-sm text-destructive">
                {formErrors.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="project_id">Proyecto</Label>
              <Select
                name="project_id"
                defaultValue={initialPrompt?.project_id || "none"}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar proyecto (opcional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Sin proyecto</SelectItem>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Tipo</Label>
              <Select
                name="type"
                defaultValue={initialPrompt?.type ?? "text"}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">
              Contenido <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="content"
              name="content"
              placeholder="Escribe tu prompt aquí. Usa {{variable}} para definir variables..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              required
              className="font-mono text-sm"
            />
            {formErrors.content && (
              <p className="text-sm text-destructive">{formErrors.content}</p>
            )}
            {detectedVariables.length > 0 && (
              <p className="text-xs text-muted-foreground">
                Variables detectadas: {detectedVariables.map((v) => `{{${v}}}`).join(", ")}
              </p>
            )}
          </div>

          {variables.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Configuración de Variables
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {variables.map((variable) => (
                  <div key={variable.key} className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <Label 
                      htmlFor={`var-${variable.key}`} 
                      className="font-mono text-sm shrink-0 sm:w-40"
                    >
                      {`{{${variable.key}}}`}
                    </Label>
                    <Input
                      id={`var-${variable.key}`}
                      placeholder="Valor por defecto (opcional)"
                      value={variable.default}
                      onChange={(e) =>
                        handleVariableDefaultChange(variable.key, e.target.value)
                      }
                      className="flex-1"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          <div className="space-y-2">
            <Label>Tags</Label>
            <TagManager selectedTagIds={tagIds} onChange={setTagIds} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoryId">Categoría</Label>
            <Select
              key={`category-${initialPrompt?.id || "new"}`}
              name="categoryId"
              value={categoryId || initialPrompt?.category?.id || "none"}
              onValueChange={(value) => setCategoryId(value === "none" ? null : value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar categoría (opcional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Sin categoría</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_template"
              name="is_template"
              defaultChecked={initialPrompt?.is_template ?? false}
            />
            <Label htmlFor="is_template" className="cursor-pointer">
              Guardar como template
            </Label>
          </div>

          <div className="flex gap-3 pt-4 justify-end">
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
                  : "Crear prompt"}
            </Button>
          </div>
        </form>
      </div>
    </MainContainer>
  );
}
