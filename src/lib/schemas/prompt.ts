import { z } from "zod";

// ─── Enums ─────────────────────────────────────────────────────────────────
export const promptRoleEnum = z.enum(
  ["system", "user", "assistant"],
  "El rol es requerido"
);

export const promptModelEnum = z.enum(
  [
    // OpenAI
    "gpt-4o",
    "gpt-4o-mini",
    "gpt-4-turbo",
    // Anthropic
    "claude-3-5-sonnet-20241022",
    "claude-3-5-haiku-20241022",
    "claude-3-opus-20240229",
    // Google
    "gemini-1.5-pro",
    "gemini-1.5-flash",
  ],
  "El modelo es requerido"
);

// ─── Variable ──────────────────────────────────────────────────────────────
// Matches {{variable_name}} tokens in prompt content
export const promptVariableSchema = z.object({
  name: z
    .string()
    .min(1)
    .regex(/^[a-zA-Z_][a-zA-Z0-9_]*$/, "Nombre de variable inválido"),
  description: z.string().max(200).optional(),
  default_value: z.string().optional(),
  required: z.boolean().default(true),
});

// ─── Base (DB record shape) ────────────────────────────────────────────────
export const promptSchema = z.object({
  id: z.string().uuid(),
  project_id: z.string().uuid(),
  name: z
    .string()
    .min(1, "El nombre es requerido")
    .max(100, "Máximo 100 caracteres"),
  description: z.string().max(500, "Máximo 500 caracteres").optional(),
  role: promptRoleEnum.default("user"),
  content: z
    .string()
    .min(1, "El contenido es requerido")
    .max(32_000, "Máximo 32 000 caracteres"),
  model: promptModelEnum,
  temperature: z
    .number()
    .min(0, "Mínimo 0")
    .max(2, "Máximo 2")
    .default(0.7),
  max_tokens: z
    .number()
    .int()
    .min(1)
    .max(128_000, "Máximo 128 000 tokens")
    .optional(),
  variables: z.array(promptVariableSchema).default([]),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

// ─── Create form ───────────────────────────────────────────────────────────
export const createPromptSchema = promptSchema.pick({
  project_id: true,
  name: true,
  description: true,
  role: true,
  content: true,
  model: true,
  temperature: true,
  max_tokens: true,
  variables: true,
});

// ─── Update form ───────────────────────────────────────────────────────────
export const updatePromptSchema = promptSchema
  .pick({
    name: true,
    description: true,
    role: true,
    content: true,
    model: true,
    temperature: true,
    max_tokens: true,
    variables: true,
  })
  .partial();

// ─── Inferred types ────────────────────────────────────────────────────────
export type PromptRole = z.infer<typeof promptRoleEnum>;
export type PromptModel = z.infer<typeof promptModelEnum>;
export type PromptVariable = z.infer<typeof promptVariableSchema>;
export type Prompt = z.infer<typeof promptSchema>;
export type CreatePromptInput = z.infer<typeof createPromptSchema>;
export type UpdatePromptInput = z.infer<typeof updatePromptSchema>;
