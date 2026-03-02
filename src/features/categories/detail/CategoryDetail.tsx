"use client";

import { useRouter } from "next/navigation";
import { Pencil, Trash2, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MainContainer } from "@/components/layout/MainContainer";
import { useCategoryDetail } from "./hooks/useCategoryDetail";
import type { Category } from "@/lib/schemas/category";

interface CategoryDetailProps {
  category: Category;
}

export function CategoryDetail({ category }: CategoryDetailProps) {
  const router = useRouter();
  const {
    deleteDialogOpen,
    setDeleteDialogOpen,
    isDeleting,
    handleDelete,
    handleCloseDialog,
  } = useCategoryDetail(category.id);

  return (
    <MainContainer
      title={category.name}
      description="Detalles de la categoría"
      action={
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push(`/category/${category.id}/edit`)}>
            <Pencil className="mr-2 h-4 w-4" />
            Editar
          </Button>
          <Button variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
            <Trash2 className="mr-2 h-4 w-4" />
            Eliminar
          </Button>
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Información de la categoría</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Nombre</h3>
              <p className="text-base">{category.name}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Slug</h3>
              <p className="text-base">{category.slug || "Sin slug"}</p>
            </div>

            {category.description && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Descripción</h3>
                <p className="text-base">{category.description}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Creado</h3>
                <p className="text-sm">
                  {new Date(category.created_at).toLocaleDateString("es-MX", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Actualizado</h3>
                <p className="text-sm">
                  {new Date(category.updated_at || category.created_at).toLocaleDateString(
                    "es-MX",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Identificador</CardTitle>
            <CardDescription>Datos rápidos de la categoría</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border bg-muted/30 p-4">
              <div className="mb-2 inline-flex items-center gap-2 text-sm font-medium">
                <Tag className="h-4 w-4" />
                Slug
              </div>
              <p className="text-sm text-muted-foreground">{category.slug || "Sin slug"}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar categoría</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que quieres eliminar &quot;{category.name}&quot;? Esta acción no se
              puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "Eliminando..." : "Eliminar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainContainer>
  );
}
