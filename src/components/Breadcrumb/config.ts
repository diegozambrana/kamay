export enum BREADCRUMB {
  CREATE_PROJECT = "CREATE_PROJECT",
  EDIT_PROJECT = "EDIT_PROJECT",
  DETAIL_PROJECT = "DETAIL_PROJECT",
  CREATE_PROMPT = "CREATE_PROMPT",
  EDIT_PROMPT = "EDIT_PROMPT",
  DETAIL_PROMPT = "DETAIL_PROMPT",
  CREATE_CATEGORY = "CREATE_CATEGORY",
  EDIT_CATEGORY = "EDIT_CATEGORY",
  DETAIL_CATEGORY = "DETAIL_CATEGORY",
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export const BREADCRUMB_CONFIG: Record<BREADCRUMB, BreadcrumbItem[]> = {
  [BREADCRUMB.CREATE_PROJECT]: [
    { label: "Proyectos", href: "/projects" },
    { label: "Nuevo Proyecto", href: "#" },
  ],
  [BREADCRUMB.EDIT_PROJECT]: [
    { label: "Proyectos", href: "/projects" },
    { label: "Editar Proyecto", href: "#" },
  ],
  [BREADCRUMB.DETAIL_PROJECT]: [
    { label: "Proyectos", href: "/projects" },
    { label: "Detalles", href: "#" },
  ],
  [BREADCRUMB.CREATE_PROMPT]: [
    { label: "Prompts", href: "/prompts" },
    { label: "Nuevo Prompt", href: "#" },
  ],
  [BREADCRUMB.EDIT_PROMPT]: [
    { label: "Prompts", href: "/prompts" },
    { label: "Editar Prompt", href: "#" },
  ],
  [BREADCRUMB.DETAIL_PROMPT]: [
    { label: "Prompts", href: "/prompts" },
    { label: "Detalles", href: "#" },
  ],
  [BREADCRUMB.CREATE_CATEGORY]: [
    { label: "Categorías", href: "/categories" },
    { label: "Nueva Categoría", href: "#" },
  ],
  [BREADCRUMB.EDIT_CATEGORY]: [
    { label: "Categorías", href: "/categories" },
    { label: "Editar Categoría", href: "#" },
  ],
  [BREADCRUMB.DETAIL_CATEGORY]: [
    { label: "Categorías", href: "/categories" },
    { label: "Detalles", href: "#" },
  ],
};
