"use client";

import { useRouter } from "next/navigation";
import { Pencil, Trash2, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { useProjectDetail } from "./hooks/useProjectDetail";
import type { Project } from "@/lib/schemas/project";
import Image from "next/image";

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const router = useRouter();
  const {
    deleteDialogOpen,
    setDeleteDialogOpen,
    isDeleting,
    handleDelete,
    handleCloseDialog,
  } = useProjectDetail(project.id);

  return (
    <MainContainer
      title={project.name}
      description="Detalles del proyecto"
      action={
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => router.push(`/project/${project.id}/edit`)}
          >
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
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Información del proyecto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                Nombre
              </h3>
              <p className="text-base">{project.name}</p>
            </div>

            {project.description && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Descripción
                </h3>
                <p className="text-base">{project.description}</p>
              </div>
            )}

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                Estado
              </h3>
              <Badge variant={project.is_public ? "default" : "secondary"}>
                {project.is_public ? "Público" : "Privado"}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Creado
                </h3>
                <p className="text-sm">
                  {new Date(project.created_at).toLocaleDateString("es-MX", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Actualizado
                </h3>
                <p className="text-sm">
                  {new Date(project.updated_at).toLocaleDateString("es-MX", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Imagen</CardTitle>
            <CardDescription>Miniatura del proyecto</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
              {project.thumbnail_url ? (
                <Image
                  src={project.thumbnail_url}
                  alt={project.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <ImageIcon className="h-16 w-16 text-muted-foreground" />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar proyecto</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que quieres eliminar &quot;{project.name}&quot;?
              Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Eliminando..." : "Eliminar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainContainer>
  );
}
