"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MainContainer } from "@/components/layout/MainContainer";
import { CustomTable } from "@/components/Table";
import { Badge } from "@/components/ui/badge";
import { usePromptList } from "./hooks/usePromptList";
import type { PromptWithRelations } from "@/services/prompts";
import type { TableAction } from "@/components/Table";

interface PromptListProps {
  initialPrompts: PromptWithRelations[];
}

export function PromptList({ initialPrompts }: Readonly<PromptListProps>) {
  const router = useRouter();
  const {
    prompts,
    searchQuery,
    setSearchQuery,
    deleteDialogOpen,
    promptToDelete,
    setPromptToDelete,
    setDeleteDialogOpen,
    handleDelete,
    handleCloseDialog,
    loading,
  } = usePromptList(initialPrompts);

  return (
    <MainContainer
      title="Prompts"
      description="Gestiona tu librería de prompts"
      action={
        <Button onClick={() => router.push("/prompt/create")}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Prompt
        </Button>
      }
      isEmpty={initialPrompts.length === 0}
    >
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Input
            placeholder="Buscar prompts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>

        {prompts.length === 0 && searchQuery ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No se encontraron prompts que coincidan con tu búsqueda.
            </p>
          </div>
        ) : (
          <CustomTable
            data={prompts}
            searchable={false}
            searchKey="title"
            columns={[
              {
                accessorKey: "title",
                header: "Título",
              },
              {
                accessorKey: "type",
                header: "Tipo",
                value: (row) => (
                  <Badge variant="outline">{row.type}</Badge>
                ),
              },
              {
                accessorKey: "project",
                header: "Proyecto",
                value: (row) => row.project?.name || "-",
              },
              {
                accessorKey: "tags",
                header: "Tags",
                value: (row) => (
                  <div className="flex flex-wrap gap-1">
                    {row.tags && row.tags.length > 0 ? (
                      row.tags.map((tag) => (
                        <Badge key={tag.id} variant="secondary" className="text-xs">
                          {tag.name}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </div>
                ),
              },
              {
                accessorKey: "is_template",
                header: "Template",
                value: (row) => (row.is_template ? "Sí" : "No"),
              },
            ]}
            actions={["view", "edit", "delete"]}
            onAction={(row, action: TableAction) => {
              if (action === "view") {
                router.push(`/prompt/${row.id}`);
                return;
              }
              if (action === "edit") {
                router.push(`/prompt/${row.id}/edit`);
                return;
              }
              if (action === "delete") {
                setPromptToDelete(row);
                setDeleteDialogOpen(true);
              }
            }}
          />
        )}
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar prompt</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que quieres eliminar &quot;{promptToDelete?.title}&quot;? Esta
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
