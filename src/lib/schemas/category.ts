import { z } from "zod";

const optionalSlugSchema = z.preprocess(
  (value) => (value === "" ? null : value),
  z
    .string()
    .max(120, "Máximo 120 caracteres")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug inválido")
    .nullable()
    .optional(),
);

export const categorySchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, "El nombre es requerido").max(100, "Máximo 100 caracteres"),
  slug: optionalSlugSchema,
  description: z.string().max(500, "Máximo 500 caracteres").nullable().optional(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime().nullable().optional(),
});

export const createCategorySchema = categorySchema.pick({
  name: true,
  slug: true,
  description: true,
});

export const updateCategorySchema = categorySchema
  .pick({
    name: true,
    slug: true,
    description: true,
  })
  .partial();

export type Category = z.infer<typeof categorySchema>;
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
