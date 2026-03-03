import { z } from "zod";

// ─── Enums ─────────────────────────────────────────────────────────────────
export const promptTypeEnum = z.enum(["text", "image", "video", "audio"]);

// ─── Variable ──────────────────────────────────────────────────────────────
// Matches {{variable_name}} tokens in prompt content
// Format: [{"key": "tema", "default": "naturaleza"}]
export const promptVariableSchema = z.object({
  key: z
    .string()
    .min(1)
    .regex(/^[a-zA-Z_][a-zA-Z0-9_]*$/, "Nombre de variable inválido"),
  default: z.string().default(""),
});

// ─── Base (DB record shape) ────────────────────────────────────────────────
export const promptSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  user_id: z.string().uuid(),
  project_id: z.string().uuid().nullable(),
  category_id: z.string().uuid().nullable(),
  title: z
    .string()
    .min(1, "El título es requerido")
    .max(200, "Máximo 200 caracteres"),
  description: z.string().max(1000, "Máximo 1000 caracteres").nullable(),
  content: z
    .string()
    .min(1, "El contenido es requerido")
    .max(32_000, "Máximo 32 000 caracteres"),
  variables: z.array(promptVariableSchema).nullable().default([]),
  type: promptTypeEnum.default("text"),
  is_template: z.boolean().default(false),
});

// ─── Create form ───────────────────────────────────────────────────────────
export const createPromptSchema = z.object({
  project_id: z.string().uuid().nullable().optional(),
  category_id: z.string().uuid().nullable().optional(),
  title: z
    .string()
    .min(1, "El título es requerido")
    .max(200, "Máximo 200 caracteres"),
  description: z.string().max(1000, "Máximo 1000 caracteres").nullable().optional(),
  content: z
    .string()
    .min(1, "El contenido es requerido")
    .max(32_000, "Máximo 32 000 caracteres"),
  variables: z.array(promptVariableSchema).default([]),
  type: promptTypeEnum.default("text"),
  is_template: z.boolean().default(false),
});

// ─── Update form ───────────────────────────────────────────────────────────
export const updatePromptSchema = z
  .object({
    project_id: z.string().uuid().nullable().optional(),
    category_id: z.string().uuid().nullable().optional(),
    title: z
      .string()
      .min(1, "El título es requerido")
      .max(200, "Máximo 200 caracteres")
      .optional(),
    description: z.string().max(1000, "Máximo 1000 caracteres").nullable().optional(),
    content: z
      .string()
      .min(1, "El contenido es requerido")
      .max(32_000, "Máximo 32 000 caracteres")
      .optional(),
    variables: z.array(promptVariableSchema).optional(),
    type: promptTypeEnum.optional(),
    is_template: z.boolean().optional(),
  })
  .partial();

// ─── Helper: Extract variables from content ───────────────────────────────
export function extractVariablesFromContent(content: string): string[] {
  const regex = /{{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*}}/g;
  const matches = content.matchAll(regex);
  const variables = new Set<string>();
  
  for (const match of matches) {
    variables.add(match[1]);
  }
  
  return Array.from(variables);
}

// ─── Helper: Sync variables with content ──────────────────────────────────
export function syncVariablesWithContent(
  content: string,
  existingVariables: PromptVariable[]
): PromptVariable[] {
  const detectedKeys = extractVariablesFromContent(content);
  const existingMap = new Map(
    existingVariables.map((v) => [v.key, v.default])
  );
  
  return detectedKeys.map((key) => ({
    key,
    default: existingMap.get(key) || "",
  }));
}

// ─── Inferred types ────────────────────────────────────────────────────────
export type PromptType = z.infer<typeof promptTypeEnum>;
export type PromptVariable = z.infer<typeof promptVariableSchema>;
export type Prompt = z.infer<typeof promptSchema>;
export type CreatePromptInput = z.infer<typeof createPromptSchema>;
export type UpdatePromptInput = z.infer<typeof updatePromptSchema>;
