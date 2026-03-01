import { z } from "zod";

// ─── Base (DB record shape) ────────────────────────────────────────────────
export const projectSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  name: z
    .string()
    .min(1, "El nombre es requerido")
    .max(100, "Máximo 100 caracteres"),
  description: z.string().max(500, "Máximo 500 caracteres").optional(),
  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Solo letras minúsculas, números y guiones"),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

// ─── Create form ───────────────────────────────────────────────────────────
export const createProjectSchema = projectSchema.pick({
  name: true,
  description: true,
});

// ─── Update form ───────────────────────────────────────────────────────────
export const updateProjectSchema = projectSchema
  .pick({ name: true, description: true })
  .partial();

// ─── Inferred types ────────────────────────────────────────────────────────
export type Project = z.infer<typeof projectSchema>;
export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
