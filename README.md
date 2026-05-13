# Clima

Sitio web para evaluación de medidas legislativas, construido con Astro 6 + Keystatic.

## Requisitos

- Node.js 22+
- pnpm

## Instalación

```bash
pnpm install
```

## Desarrollo

```bash
pnpm run dev
```

Admin UI: http://localhost:4321/keystatic
Homepage: http://localhost:4321

## Modelo de datos

El sitio gestiona 7 colecciones:

| Colección | Formato | Descripción |
|---|---|---|
| `categorias` | YAML | Categorías temáticas (ej: Libertad de expresión) |
| `instrumentos` | YAML | Tipos de instrumentos legales |
| `indicadores` | YAML | Indicadores de evaluación (relacionados a categoría e instrumento) |
| `medidas` | MDOC | Medidas/eventos legislativos evaluados |
| `boletines` | YAML | Boletines con PDF y fecha |
| `posts` | MDOC | Contenido editorial |
| `alertas` | MDOC | Alertas para envío masivo por correo |

Los esquemas se definen en `src/content.config.ts` (Astro) y `keystatic.config.ts` (CMS). Ambos deben mantenerse sincronizados.

## Sistema de alertas por correo

> La página `/alertas` muestra estado deshabilitado (503). El envío se realiza vía API o CLI.

### Crear una alerta

1. Ir a `/keystatic` → colección **Alertas**
2. Completar: título, mensaje, contenido, URL, y destinatarios (correos separados por comas)
3. Guardar

### Enviar una alerta

**Vía API (POST):**
```
POST /api/enviar-alerta/{slug}
```

**Vía CLI:**
```bash
SMTP_HOST=smtp.gmail.com SMTP_PORT=587 \
SMTP_USER=tu-correo@gmail.com SMTP_PASS=tu-contraseña \
EMAIL_FROM=tu-correo@gmail.com \
node scripts/enviar-alerta.mjs nombre-de-la-alerta
```

### Variables de entorno (SMTP)

| Variable | Descripción |
|---|---|
| `SMTP_HOST` | Servidor SMTP (ej: `smtp.gmail.com`) |
| `SMTP_PORT` | Puerto SMTP (ej: `587`) |
| `SMTP_USER` | Usuario SMTP |
| `SMTP_PASS` | Contraseña SMTP |
| `EMAIL_FROM` | Dirección de origen del correo |

## Autenticación del admin

Las rutas `/keystatic`, `/alertas`, y sus APIs están protegidas con HTTP Basic Auth.

Configurar la variable de entorno `ADMIN_PASSWORD` con una contraseña segura.

### En Netlify

Ir a **Site configuration** → **Environment variables** → agregar `ADMIN_PASSWORD`.

### Local

Crear archivo `.env` en la raíz del proyecto:

```bash
ADMIN_PASSWORD=mi-contraseña
```

El navegador mostrará un popup pidiendo usuario y contraseña al acceder a `/keystatic` o `/alertas`. El usuario puede ser cualquier valor (solo se valida la contraseña).

## Despliegue en Netlify

El proyecto usa `@astrojs/netlify` como adapter con `output: 'static'`. Configurar en Netlify:

- **Build command:** `pnpm run build`
- **Publish directory:** `dist/`
- **Environment variables:** `ADMIN_PASSWORD`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_FROM`
