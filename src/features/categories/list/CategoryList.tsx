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
import { useCategoryList } from "./hooks/useCategoryList";
import type { Category } from "@/lib/schemas/category";
import type { TableAction } from "@/components/Table";
import { CustomTable } from "@/components/Table";

interface CategoryListProps {
  initialCategories: Category[];
}

export function CategoryList({ initialCategories }: Readonly<CategoryListProps>) {
  const router = useRouter();
  const {
    categories,
    searchQuery,
    setSearchQuery,
    deleteDialogOpen,
    categoryToDelete,
    setCategoryToDelete,
    setDeleteDialogOpen,
    handleDelete,
    handleCloseDialog,
    loading,
  } = useCategoryList(initialCategories);

  return (
    <MainContainer
      title="Categories"
      description="Gestiona tus categorías"
      action={
        <Button onClick={() => router.push("/category/create")}>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Categoría
        </Button>
      }
      isEmpty={initialCategories.length === 0}
    >
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Input
            placeholder="Buscar categorías..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>

        {categories.length === 0 && searchQuery ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No se encontraron categorías que coincidan con tu búsqueda.
            </p>
          </div>
        ) : (
          <CustomTable
            data={categories}
            searchable={false}
            searchKey="name"
            columns={[
              {
                accessorKey: "name",
                header: "Nombre",
              },
              {
                accessorKey: "slug",
                header: "Slug",
                value: (row) => row.slug || "Sin slug",
              },
              {
                accessorKey: "description",
                header: "Descripción",
                value: (row) => row.description || "-",
              },

            ]}
            actions={["view", "edit", "delete"]}
            onAction={(row, action: TableAction) => {
              if (action === "view") {
                router.push(`/category/${row.id}`);
                return;
              }
              if (action === "edit") {
                router.push(`/category/${row.id}/edit`);
                return;
              }
              if (action === "delete") {
                setCategoryToDelete(row);
                setDeleteDialogOpen(true);
              }
            }}
          />
        )}
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar categoría</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que quieres eliminar &quot;{categoryToDelete?.name}&quot;? Esta
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
