import { z } from "zod";

function toSlug(value: string): string {
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

export const tagSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  name: z
    .string()
    .min(1, "El nombre es requerido")
    .max(50, "Máximo 50 caracteres"),
  slug: z
    .string()
    .min(1, "El slug es requerido")
    .max(50, "Máximo 50 caracteres")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug inválido"),
});

export const createTagSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es requerido")
    .max(50, "Máximo 50 caracteres"),
  slug: z.string().optional(),
});

export const updateTagSchema = z
  .object({
    name: z
      .string()
      .min(1, "El nombre es requerido")
      .max(50, "Máximo 50 caracteres")
      .optional(),
    slug: z
      .string()
      .min(1, "El slug es requerido")
      .max(50, "Máximo 50 caracteres")
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug inválido")
      .optional(),
  })
  .partial();

export type Tag = z.infer<typeof tagSchema>;
export type CreateTagInput = z.infer<typeof createTagSchema>;
export type UpdateTagInput = z.infer<typeof updateTagSchema>;

export { toSlug };
