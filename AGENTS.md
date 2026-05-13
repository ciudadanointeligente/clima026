# AGENTS.md — Clima

## Proyecto
Sitio web chileno para evaluación de medidas legislativas, construido con Astro 6 + Keystatic.

## Tech Stack
- **Astro 6** + **React 19** + **Alpine.js**
- **Tailwind CSS 4** (Vite plugin, con `@tailwindcss/typography`)
- **Keystatic** (storage: local en dev, cloud `fciweb/clima026` en prod; admin UI en `/keystatic`)
- **Markdoc** para contenido de `medidas`, `posts` y `alertas`
- **Nodemailer** + **Marked** para envío de alertas por correo
- **@astrojs/netlify** como adapter de deploy

## Commands
- `pnpm install` — instalar dependencias
- `pnpm run dev` — servidor de desarrollo
- `pnpm run build` — build a `dist/`
- `pnpm run preview` — previsualizar build de producción

> No hay scripts de test, lint ni typecheck. Astro chequea tipos con `astro/tsconfigs/strict`.

## Colecciones (7)

| Colección | Formato | Path | Slug | Campos clave |
|---|---|---|---|---|
| `categorias` | YAML | `src/content/categorias/*` | `nombre` | `nombre`, `descripcion` |
| `instrumentos` | YAML | `src/content/instrumentos/*` | `nombre` | `nombre`, `descripcion` |
| `indicadores` | YAML | `src/content/indicadores/*` | `nombre` | `nombre`, `explicacion`, `instrumento` (rel→instrumentos), `categoria` (rel→categorias) |
| `boletines` | YAML | `src/content/boletines/*` | `nombre` | `nombre`, `fecha` (requerido), `pdf` (archivo en `public/boletines/`, requerido), `link` (opcional) |
| `medidas` | MDOC | `src/content/medidas/*` | `nombre` | `nombre`, `descripcion` (markdoc, imágenes en `src/assets/images/posts/`), `indicadores` (array rel→indicadores) |
| `posts` | MDOC | `src/content/posts/*` | `title` | `title`, `contenido` (markdoc) |
| `alertas` | MDOC | `src/content/alertas/*` | `titulo` | `titulo`, `mensaje`, `contenido` (markdoc, imágenes en `src/assets/images/alertas/`), `url` (opcional), `destinatarios` |

Los grupos de navegación en Keystatic son:
- **Análisis**: categorias, instrumentos, indicadores, medidas
- **Comunicación**: posts

## Schemas en dos lugares
- `src/content.config.ts` — schema Zod de Astro
- `keystatic.config.ts` — schema de Keystatic CMS
- **Ambos deben mantenerse sincronizados** al agregar campos.

## Astro 6 Content Collections
- Archivo de config: `src/content.config.ts` (no `src/content/config.ts`)
- Loader: `glob()` de `astro/loaders`
- Los entries usan `.id` (no `.slug`)
- Para renderizar: importar `render()` de `astro:content`

## Astro 6 Adapter
- `output: 'static'` con `adapter: netlify()` (`@astrojs/netlify`)
- Keystatic inyecta rutas SSR que el adapter de Netlify maneja con on-demand rendering.

## Tailwind CSS v4
- Plugin de Vite (`@tailwindcss/vite`) en `astro.config.mjs`
- `@import "tailwindcss"` en `src/styles/global.css`
- Plugin `@tailwindcss/typography` para estilos de contenido
- No hay `tailwind.config.js`

## Sistema de alertas
- API endpoint: `src/pages/api/enviar-alerta/[slug].ts` (POST)
- Script CLI: `scripts/enviar-alerta.mjs`
- Las alertas se crean en la colección `alertas` desde Keystatic
- Requiere variables de entorno SMTP para funcionar
- Página `/alertas` muestra estado deshabilitado (503) por defecto

## Autenticación del admin
- Rutas `/keystatic` y `/alertas` protegidas con HTTP Basic Auth
- Variable de entorno: `ADMIN_PASSWORD`
- En Netlify configurar en Site configuration → Environment variables

## Variables de entorno
| Variable | Descripción |
|---|---|
| `ADMIN_PASSWORD` | Contraseña HTTP Basic Auth para admin |
| `SMTP_HOST` | Servidor SMTP |
| `SMTP_PORT` | Puerto SMTP |
| `SMTP_USER` | Usuario SMTP |
| `SMTP_PASS` | Contraseña SMTP |
| `EMAIL_FROM` | Remitente de correos |

## Entrypoints
- `src/pages/index.astro` — homepage, lista medidas como tarjetas
- `src/pages/medidas/[slug].astro` — página dinámica de medida individual
- `src/pages/alertas/index.astro` — página de alertas (deshabilitada: 503)
- `src/pages/api/enviar-alerta/[slug].ts` — API endpoint para envío de alertas
- `src/pages/404.astro` — página 404 personalizada
- `src/layouts/Layout.astro` — layout HTML base (español)
- `src/components/Header.astro` — barra de navegación
- `src/components/Footer.astro` — pie de página
- `keystatic.config.ts` — configuración del CMS
- `scripts/enviar-alerta.mjs` — script CLI para envío de alertas

## Generated / Ignored
- `.astro/` — tipos y caché generados por Astro
- `dist/` — build de producción
- `.netlify/` — artefactos locales de Netlify CLI
- `node_modules/` — dependencias (instaladas por pnpm)
- `pnpm-lock.yaml` — lockfile de pnpm

## Conventions
- TypeScript strict mode (`astro/tsconfigs/strict`)
- JSX con `react-jsx` import source
- Idioma del sitio: español (`lang="es"`)
- `.npmrc` con `shamefully-hoist=true` para compatibilidad
