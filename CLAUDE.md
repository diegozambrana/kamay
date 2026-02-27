# Kamay — Claude Instructions

## Project Overview
Next.js 16 (App Router) + React 19 + TypeScript project. Currently a fresh scaffold — `src/app/` is the primary source directory.

## Tech Stack
- **Framework:** Next.js 16 with App Router (`src/app/`)
- **UI:** React 19 + shadcn/ui (New York style, neutral base, Lucide icons)
- **CSS:** Tailwind CSS v4 + CSS variables via `src/app/globals.css`
- **Database/Auth:** Supabase (`@supabase/supabase-js` + `@supabase/ssr`)
- **Language:** TypeScript (strict mode)
- **Fonts:** Geist Sans & Geist Mono via `next/font/google`
- **Path alias:** `@/*` → `./src/*`
- **Linting:** ESLint 9 + `eslint-config-next`

## Dev Commands
```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # Run ESLint
```

## shadcn/ui
- Add components: `npx shadcn@latest add <component>`
- Components land in `src/components/ui/`
- Utils helper: `src/lib/utils.ts` (exports `cn()`)
- Config: `components.json` (style: new-york, baseColor: neutral, cssVariables: true)
- Icons: use `lucide-react`

## Supabase
- **Env vars:** `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` (in `.env.local`)
- **Browser client** (Client Components): `import { createClient } from "@/lib/supabase/client"`
- **Server client** (Server Components, Server Actions, Route Handlers): `import { createClient } from "@/lib/supabase/server"`
- **Session refresh:** handled automatically by `src/proxy.ts` via `@/lib/supabase/middleware`
- Never use the browser client in Server Components — it won't have access to server-side cookies

## Code Conventions
- Use the `@/` alias for all internal imports (e.g. `import Foo from "@/components/Foo"`)
- Keep components in `src/components/`, shadcn primitives in `src/components/ui/`
- Pages/routes in `src/app/`
- Prefer TypeScript — avoid `any`, leverage strict mode
- Styling: prefer Tailwind utility classes; use `cn()` from `@/lib/utils` to merge class names
- Avoid CSS Modules for new code — Tailwind + CSS variables is the pattern
- Server Components by default; add `"use client"` only when necessary (event handlers, hooks, browser APIs)
- No `console.log` left in committed code

## Project Structure
```
src/
  app/
    layout.tsx        # Root layout (fonts, metadata)
    page.tsx          # Home page
    globals.css       # Global styles + Tailwind + shadcn CSS variables
    page.module.css   # Home page styles (legacy, avoid for new code)
  components/
    ui/               # shadcn primitives (auto-generated, do not edit manually)
  lib/
    utils.ts          # cn() helper
    supabase/
      client.ts       # Browser client (Client Components)
      server.ts       # Server client (Server Components / Actions)
      middleware.ts   # Session refresh helper
  proxy.ts            # Next.js proxy (Next.js 16) — refreshes Supabase session on every request
  hooks/              # Custom React hooks
```
