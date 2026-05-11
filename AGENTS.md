# AGENTS.md — Keystatic Astro Template

## Tech Stack
- **Astro 6** + **React 19** + **Alpine.js**
- **Tailwind CSS 4** (Vite plugin, no `tailwind.config` file)
- **Keystatic** (local storage, admin UI at `/keystatic`)
- **Markdoc** for content

## Commands
- `npm install --legacy-peer-deps` — install dependencies (Keystatic hasn't updated peer deps for Astro 6)
- `npm run dev` — start dev server
- `npm run build` — build to `dist/`
- `npm run preview` — preview production build

> No test, lint, or typecheck scripts are defined. The project relies on Astro's built-in TypeScript checking via `astro/tsconfigs/strict`.

## Content & Keystatic
- Posts live in `src/content/posts/*.mdoc` (Markdoc format, not Markdown).
- Content schema is defined in two places:
  - `src/content.config.ts` — Astro content collections schema (Zod)
  - `keystatic.config.ts` — Keystatic admin UI schema
- **Keep both schemas in sync** when adding fields.
- Images referenced in posts are stored in `src/assets/images/posts/`.
- Keystatic uses **local file storage** (git-based). No cloud API keys needed.

## Astro 6 Content Collections (New API)
- Config file moved from `src/content/config.ts` to **`src/content.config.ts`**.
- Collections now require a **loader**. Use `glob()` from `astro/loaders` for local files:
  ```ts
  import { glob } from 'astro/loaders';
  const posts = defineCollection({
    loader: glob({ pattern: '**/*.mdoc', base: './src/content/posts' }),
    schema: z.object({ title: z.string() }),
  });
  ```
- Entries no longer have `.slug`; use `.id` instead.
- To render an entry, import `render()` from `astro:content` instead of calling `entry.render()`.

## Astro 6 Adapter Requirement
- Astro 6 requires an adapter for any server-rendered routes.
- Keystatic injects SSR admin routes, so **`@astrojs/node`** is configured in `astro.config.mjs` with `output: 'static'`.
- `output: 'hybrid'` was removed in Astro 6; `static` now handles on-demand routes with an adapter.

## Tailwind CSS v4 Notes
- Configured via the Vite plugin (`@tailwindcss/vite`) in `astro.config.mjs`.
- Global styles import Tailwind with `@import "tailwindcss";` in `src/styles/global.css`.
- There is **no `tailwind.config.js`** — v4 uses CSS-based configuration.

## Entrypoints
- `src/pages/index.astro` — homepage, lists posts
- `src/pages/posts/[slug].astro` — dynamic post pages
- `src/layouts/Layout.astro` — base HTML layout
- `keystatic.config.ts` — Keystatic configuration

## Generated / Ignored
- `.astro/` — Astro generated types and cache
- `dist/` — build output

## Conventions
- TypeScript strict mode is enabled (`astro/tsconfigs/strict`).
- JSX uses `react-jsx` import source.
