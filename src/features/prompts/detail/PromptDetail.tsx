"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { MainContainer } from "@/components/layout/MainContainer";
import { Pencil, Trash2 } from "lucide-react";
import { usePromptDetail } from "./hooks/usePromptDetail";
import type { PromptWithRelations } from "@/services/prompts";

interface PromptDetailProps {
  prompt: PromptWithRelations;
}

export function PromptDetail({ prompt }: Readonly<PromptDetailProps>) {
  const {
    deleteDialogOpen,
    setDeleteDialogOpen,
    handleDelete,
    handleCloseDialog,
    handleEdit,
    loading,
  } = usePromptDetail(prompt.id);

  return (
    <MainContainer
      title={prompt.title}
      description={prompt.description || "Sin descripción"}
      action={
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleEdit}>
            <Pencil className="mr-2 h-4 w-4" />
            Editar
          </Button>
          <Button
            variant="destructive"
            onClick={() => setDeleteDialogOpen(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Eliminar
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Información General</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Tipo
              </p>
              <Badge variant="outline" className="mt-1">
                {prompt.type}
              </Badge>
            </div>

            {prompt.project && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Proyecto
                </p>
                <p className="mt-1">{prompt.project.name}</p>
              </div>
            )}

            {prompt.tags && prompt.tags.length > 0 && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Tags
                </p>
                <div className="flex flex-wrap gap-2">
                  {prompt.tags.map((tag) => (
                    <Badge key={tag.id} variant="secondary">
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {prompt.category && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Categoría
                </p>
                <Badge variant="outline" className="mt-1">
                  {prompt.category.name}
                </Badge>
              </div>
            )}

            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Template
              </p>
              <p className="mt-1">{prompt.is_template ? "Sí" : "No"}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contenido</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap rounded-md bg-muted p-4 text-sm">
              {prompt.content}
            </pre>
          </CardContent>
        </Card>

        {prompt.variables && prompt.variables.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Variables</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {prompt.variables.map((variable, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-md border p-3"
                  >
                    <code className="text-sm font-mono">{`{{${variable.key}}}`}</code>
                    <span className="text-sm text-muted-foreground">
                      {variable.default ? `Default: ${variable.default}` : "Sin valor por defecto"}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar prompt</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que quieres eliminar &quot;{prompt.title}&quot;? Esta
              acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={loading}>
              {loading ? "Eliminando..." : "Eliminar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainContainer>
  );
}
