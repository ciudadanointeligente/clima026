# Clima

Sitio web para evaluacion de medidas legislativas, construido con Astro + Keystatic.

## Requisitos

- Node.js 22+
- npm

## Instalacion

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Admin UI: http://localhost:4321/keystatic
Homepage: http://localhost:4321

## Sistema de alertas por correo

### Crear una alerta

1. Ir a `/keystatic` → coleccion **Alertas**
2. Completar: titulo, mensaje, contenido, URL, y destinatarios (correos separados por comas)
3. Guardar

### Enviar una alerta

**Desde el admin:** Ir a `/keystatic` → en el header hacer click en **+ Enviar Alertas** → se listan las alertas con un boton **Enviar** cada una.

**Via CLI:**
```bash
SMTP_HOST=smtp.gmail.com SMTP_PORT=587 \
SMTP_USER=tu-correo@gmail.com SMTP_PASS=tu-contraseña \
EMAIL_FROM=tu-correo@gmail.com \
node scripts/enviar-alerta.mjs nombre-de-la-alerta
```

### Variables de entorno (SMTP)

| Variable | Descripcion |
|---|---|
| `SMTP_HOST` | Servidor SMTP (ej: `smtp.gmail.com`) |
| `SMTP_PORT` | Puerto SMTP (ej: `587`) |
| `SMTP_USER` | Usuario SMTP |
| `SMTP_PASS` | Contraseña SMTP |
| `EMAIL_FROM` | Direccion de origen del correo |

## Autenticacion del admin

Las rutas `/keystatic`, `/alertas`, y sus APIs estan protegidas con HTTP Basic Auth.

Configurar la variable de entorno `ADMIN_PASSWORD` con una contraseña segura.

### En Netlify

Ir a **Site configuration** → **Environment variables** → agregar `ADMIN_PASSWORD`.

### Local

Crear archivo `.env` en la raiz del proyecto:

```bash
ADMIN_PASSWORD=mi-contraseña
```

El navegador mostrara un popup pidiendo usuario y contraseña al acceder a `/keystatic` o `/alertas`. El usuario puede ser cualquier valor (el popup lo pide, pero solo se valida la contraseña).

## Despliegue en Netlify

El proyecto usa `@astrojs/netlify` como adapter. Configurar en Netlify:

- **Build command:** `npm run build`
- **Publish directory:** `dist/`
- **Environment variables:** `ADMIN_PASSWORD`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_FROM`
