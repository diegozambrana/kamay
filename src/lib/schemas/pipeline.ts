import { z } from "zod";

// ─── Enums ─────────────────────────────────────────────────────────────────
export const pipelineStatusEnum = z.enum(
  ["draft", "active", "archived"],
  "El estado es requerido"
);

export const pipelineStepTypeEnum = z.enum([
  "prompt",
  "transform",
  "condition",
  "output",
]);

// ─── Step ──────────────────────────────────────────────────────────────────
export const pipelineStepSchema = z.object({
  id: z.string().uuid(),
  type: pipelineStepTypeEnum,
  prompt_id: z.string().uuid().optional(),
  order: z.number().int().min(0),
  config: z.record(z.string(), z.unknown()).default({}),
});

// ─── Base (DB record shape) ────────────────────────────────────────────────
export const pipelineSchema = z.object({
  id: z.string().uuid(),
  project_id: z.string().uuid(),
  name: z
    .string()
    .min(1, "El nombre es requerido")
    .max(100, "Máximo 100 caracteres"),
  description: z.string().max(500, "Máximo 500 caracteres").optional(),
  status: pipelineStatusEnum.default("draft"),
  steps: z.array(pipelineStepSchema).default([]),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

// ─── Create form ───────────────────────────────────────────────────────────
export const createPipelineSchema = pipelineSchema.pick({
  project_id: true,
  name: true,
  description: true,
  status: true,
});

// ─── Update form ───────────────────────────────────────────────────────────
export const updatePipelineSchema = pipelineSchema
  .pick({ name: true, description: true, status: true, steps: true })
  .partial();

// ─── Inferred types ────────────────────────────────────────────────────────
export type PipelineStatus = z.infer<typeof pipelineStatusEnum>;
export type PipelineStepType = z.infer<typeof pipelineStepTypeEnum>;
export type PipelineStep = z.infer<typeof pipelineStepSchema>;
export type Pipeline = z.infer<typeof pipelineSchema>;
export type CreatePipelineInput = z.infer<typeof createPipelineSchema>;
export type UpdatePipelineInput = z.infer<typeof updatePipelineSchema>;
