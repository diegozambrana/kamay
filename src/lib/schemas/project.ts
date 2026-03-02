import { z } from "zod";

const optionalImageUrlSchema = z.preprocess(
  (value) => (value === "" ? null : value),
  z.string().url("URL inválida").nullable().optional(),
);

// ─── Base (DB record shape) ────────────────────────────────────────────────
export const projectSchema = z.object({
  id: z.uuid(),
  user_id: z.uuid(),
  name: z
    .string()
    .min(1, "El nombre es requerido")
    .max(100, "Máximo 100 caracteres"),
  description: z.string().max(500, "Máximo 500 caracteres").nullable().optional(),
  thumbnail_url: optionalImageUrlSchema,
  is_public: z.boolean().default(false),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
});

// ─── Create form ───────────────────────────────────────────────────────────
export const createProjectSchema = projectSchema.pick({
  name: true,
  description: true,
  thumbnail_url: true,
  is_public: true,
});

// ─── Update form ───────────────────────────────────────────────────────────
export const updateProjectSchema = projectSchema
  .pick({ 
    name: true, 
    description: true, 
    thumbnail_url: true, 
    is_public: true 
  })
  .partial();

// ─── Inferred types ────────────────────────────────────────────────────────
export type Project = z.infer<typeof projectSchema>;
export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
