"use client";

import { useRouter } from "next/navigation";
import { Plus, MoreVertical, Eye, Pencil, Trash2, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MainContainer } from "@/components/layout/MainContainer";
import { useProjectList } from "./hooks/useProjectList";
import type { Project } from "@/lib/schemas/project";
import Image from "next/image";

interface ProjectListProps {
  initialProjects: Project[];
}

export function ProjectList({ initialProjects }: ProjectListProps) {
  const router = useRouter();
  const {
    projects,
    searchQuery,
    setSearchQuery,
    deleteDialogOpen,
    setDeleteDialogOpen,
    projectToDelete,
    setProjectToDelete,
    handleDelete,
    handleCloseDialog,
    loading,
  } = useProjectList(initialProjects);

  return (
    <MainContainer
      title="Projects"
      description="Gestiona tus proyectos"
      action={
        <Button onClick={() => router.push("/project/create")}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Proyecto
        </Button>
      }
      isEmpty={initialProjects.length === 0}
    >
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Input
            placeholder="Buscar proyectos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-video bg-muted">
                {project.thumbnail_url ? (
                  <Image
                    src={project.thumbnail_url}
                    alt={project.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <ImageIcon className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
              </div>

              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="truncate">{project.name}</CardTitle>
                    {project.description && (
                      <CardDescription className="line-clamp-2 mt-1">
                        {project.description}
                      </CardDescription>
                    )}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="flex-shrink-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => router.push(`/project/${project.id}`)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Ver detalles
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => router.push(`/project/${project.id}/edit`)}
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setProjectToDelete(project);
                          setDeleteDialogOpen(true);
                        }}
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              <CardFooter className="flex items-center justify-between">
                <Badge variant={project.is_public ? "default" : "secondary"}>
                  {project.is_public ? "Público" : "Privado"}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {new Date(project.created_at).toLocaleDateString("es-MX")}
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>

        {projects.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No se encontraron proyectos que coincidan con tu búsqueda.
            </p>
          </div>
        )}
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar proyecto</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que quieres eliminar &quot;{projectToDelete?.name}&quot;?
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
              disabled={loading}
            >
              {loading ? "Eliminando..." : "Eliminar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainContainer>
  );
}
