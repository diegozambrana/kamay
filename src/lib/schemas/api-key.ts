import { z } from "zod";

// ─── Enums ─────────────────────────────────────────────────────────────────
export const apiKeyProviderEnum = z.enum(
  ["openai", "anthropic", "google", "mistral", "groq", "custom"],
  "El proveedor es requerido"
);

// ─── Base (DB record shape) ────────────────────────────────────────────────
export const apiKeySchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  project_id: z.string().uuid().optional(), // null = org-level key
  provider: apiKeyProviderEnum,
  name: z
    .string()
    .min(1, "El nombre es requerido")
    .max(100, "Máximo 100 caracteres"),
  // Stored encrypted; masked in responses (e.g. "sk-...ab12")
  key_preview: z.string().max(20).optional(),
  is_active: z.boolean().default(true),
  last_used_at: z.string().datetime().nullable().optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

// ─── Create form ───────────────────────────────────────────────────────────
// The raw key is write-only: only accepted on creation, never returned.
export const createApiKeySchema = apiKeySchema
  .pick({ project_id: true, provider: true, name: true, is_active: true })
  .extend({
    key: z
      .string()
      .min(10, "La API key es demasiado corta")
      .max(512, "La API key es demasiado larga"),
  });

// ─── Update form ───────────────────────────────────────────────────────────
export const updateApiKeySchema = apiKeySchema
  .pick({ name: true, is_active: true })
  .partial();

// ─── Inferred types ────────────────────────────────────────────────────────
export type ApiKeyProvider = z.infer<typeof apiKeyProviderEnum>;
export type ApiKey = z.infer<typeof apiKeySchema>;
export type CreateApiKeyInput = z.infer<typeof createApiKeySchema>;
export type UpdateApiKeyInput = z.infer<typeof updateApiKeySchema>;
