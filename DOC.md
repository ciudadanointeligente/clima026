## Sitio web y app

* Stack: Astro 6, Keystatic, React 19, Tailwind CSS 4, Alpine.js, Markdoc, Nodemailer, Marked.
* Deploy: Netlify (`@astrojs/netlify`).

## Descripción

* Sitio web chileno para mostrar la evaluación realizada a propuestas y/o medidas legislativas.
* Admin CMS en `/keystatic` para gestionar contenido.
* Sistema de alertas por correo electrónico (vía API o CLI).

## Modelo de datos

### Colecciones

1. **Categorías** (`categorias`) — YAML
   - `nombre` (slug), `descripcion` (texto multilínea)
   - Agrupa indicadores por área temática.

2. **Instrumentos** (`instrumentos`) — YAML
   - `nombre` (slug), `descripcion` (texto multilínea)
   - Tipos de instrumentos legales (ej: normativa legal, normativa reglamentaria).

3. **Indicadores** (`indicadores`) — YAML
   - `nombre` (slug), `explicacion` (texto multilínea)
   - `instrumento` → relación a `instrumentos`
   - `categoria` → relación a `categorias`
   - Cada indicador pertenece a un instrumento y una categoría.
   - Se aplican a las medidas para evaluarlas.

4. **Medidas-Eventos** (`medidas`) — MDOC
   - `nombre` (slug), `descripcion` (markdoc con imágenes en `src/assets/images/posts/`)
   - `indicadores` → array de relaciones a `indicadores`
   - Una medida puede tener múltiples indicadores aplicados.
   - Contenido principal del sitio (homepage y páginas de detalle).

5. **Boletines** (`boletines`) — YAML
   - `nombre` (slug), `fecha` (requerido)
   - `pdf` → archivo PDF en `public/boletines/` (requerido)
   - `link` → URL externa (opcional)

6. **Posts** (`posts`) — MDOC
   - `title` (slug), `contenido` (markdoc)
   - Contenido editorial/comunicacional.

7. **Alertas** (`alertas`) — MDOC
   - `titulo` (slug), `mensaje` (texto), `contenido` (markdoc con imágenes en `src/assets/images/alertas/`)
   - `url` → enlace externo (opcional)
   - `destinatarios` → correos separados por comas
   - Para envío masivo de correos vía nodemailer.

### Relaciones

```
categorias ← indicadores → instrumentos
                 ↓
              medidas
```

- Un indicador pertenece a una categoría y un instrumento.
- Una medida se evalúa con uno o más indicadores.
- Posts, alertas y boletines son independientes.

### Formatos de archivo
- **YAML**: `categorias`, `instrumentos`, `indicadores`, `boletines`
- **MDOC** (Markdoc): `medidas`, `posts`, `alertas`

### Schemas
Los esquemas de contenido se definen en dos lugares que deben mantenerse sincronizados:
- `src/content.config.ts` — schema Zod para Astro Content Collections
- `keystatic.config.ts` — schema para el CMS Keystatic
