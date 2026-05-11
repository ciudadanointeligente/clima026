import { c as createComponent } from './astro-component_iO6ieQVW.mjs';
import 'piccolore';
import { m as maybeRenderHead, g as addAttribute, r as renderTemplate, k as renderHead, l as renderComponent, n as renderSlot, o as generateCspDigest, s as spreadAttributes, u as unescapeHTML, p as removeBase, a as isRemotePath, A as AstroError, q as UnknownContentCollectionError } from './ssr-function_DmM6Njke.mjs';
import 'clsx';
import 'html-escaper';
import { Traverse } from 'neotraverse/modern';
import * as z from 'zod/v4';
import { b as VALID_INPUT_FORMATS } from './consts_BLFvATRa.mjs';
import * as devalue from 'devalue';

const $$Header = createComponent(($$result, $$props, $$slots) => {
  const siteTitle = "Clima";
  const links = [
    { href: "/", label: "Inicio" },
    { href: "/keystatic", label: "Admin" }
  ];
  return renderTemplate`${maybeRenderHead()}<header class="border-b border-border py-4 mb-8"> <nav aria-label="Navegación principal" class="flex items-center justify-between max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"> <a href="/" class="text-xl font-bold text-text no-underline hover:text-primary cursor-pointer transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"> ${siteTitle} </a> <ul class="flex gap-6 list-none m-0 p-0"> ${links.map((link) => renderTemplate`<li> <a${addAttribute(link.href, "href")} class="text-muted no-underline hover:text-text cursor-pointer transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"> ${link.label} </a> </li>`)} </ul> </nav> </header>`;
}, "/media/felipe/felipe/FCI/clima/src/components/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${maybeRenderHead()}<footer class="border-t border-border py-6 mt-12"> <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"> <p class="text-center text-sm text-muted m-0">&copy; ${year} Clima. Todos los derechos reservados.</p> </div> </footer>`;
}, "/media/felipe/felipe/FCI/clima/src/components/Footer.astro", void 0);

const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description = "Blog de Clima" } = Astro2.props;
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="description"${addAttribute(description, "content")}><meta name="viewport" content="width=device-width"><meta name="theme-color" content="#0369A1"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body> <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded">
Ir al contenido principal
</a> ${renderComponent($$result, "Header", $$Header, {})} <main id="main-content" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "/media/felipe/felipe/FCI/clima/src/layouts/Layout.astro", void 0);

function createSvgComponent({ meta, attributes, children, styles }) {
  const hasStyles = styles.length > 0;
  const Component = createComponent({
    async factory(result, props) {
      const normalizedProps = normalizeProps(attributes, props);
      if (hasStyles && result.cspDestination) {
        for (const style of styles) {
          const hash = await generateCspDigest(style, result.cspAlgorithm);
          result._metadata.extraStyleHashes.push(hash);
        }
      }
      return renderTemplate`<svg${spreadAttributes(normalizedProps)}>${unescapeHTML(children)}</svg>`;
    },
    propagation: hasStyles ? "self" : "none"
  });
  Object.defineProperty(Component, "toJSON", {
    value: () => meta,
    enumerable: false
  });
  return Object.assign(Component, meta);
}
const ATTRS_TO_DROP = ["xmlns", "xmlns:xlink", "version"];
const DEFAULT_ATTRS = {};
function dropAttributes(attributes) {
  for (const attr of ATTRS_TO_DROP) {
    delete attributes[attr];
  }
  return attributes;
}
function normalizeProps(attributes, props) {
  return dropAttributes({ ...DEFAULT_ATTRS, ...attributes, ...props });
}

const CONTENT_IMAGE_FLAG = "astroContentImageFlag";
const IMAGE_IMPORT_PREFIX = "__ASTRO_IMAGE_";

function imageSrcToImportId(imageSrc, filePath) {
  imageSrc = removeBase(imageSrc, IMAGE_IMPORT_PREFIX);
  if (isRemotePath(imageSrc)) {
    return;
  }
  const ext = imageSrc.split(".").at(-1)?.toLowerCase();
  if (!ext || !VALID_INPUT_FORMATS.includes(ext)) {
    return;
  }
  const params = new URLSearchParams(CONTENT_IMAGE_FLAG);
  if (filePath) {
    params.set("importer", filePath);
  }
  return `${imageSrc}?${params.toString()}`;
}

class ImmutableDataStore {
  _collections = /* @__PURE__ */ new Map();
  constructor() {
    this._collections = /* @__PURE__ */ new Map();
  }
  get(collectionName, key) {
    return this._collections.get(collectionName)?.get(String(key));
  }
  entries(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.entries()];
  }
  values(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.values()];
  }
  keys(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.keys()];
  }
  has(collectionName, key) {
    const collection = this._collections.get(collectionName);
    if (collection) {
      return collection.has(String(key));
    }
    return false;
  }
  hasCollection(collectionName) {
    return this._collections.has(collectionName);
  }
  collections() {
    return this._collections;
  }
  /**
   * Attempts to load a DataStore from the virtual module.
   * This only works in Vite.
   */
  static async fromModule() {
    try {
      const data = await import('./_astro_data-layer-content_zXf9WFPb.mjs');
      if (data.default instanceof Map) {
        return ImmutableDataStore.fromMap(data.default);
      }
      const map = devalue.unflatten(data.default);
      return ImmutableDataStore.fromMap(map);
    } catch {
    }
    return new ImmutableDataStore();
  }
  static async fromMap(data) {
    const store = new ImmutableDataStore();
    store._collections = data;
    return store;
  }
}
function dataStoreSingleton() {
  let instance = void 0;
  return {
    get: async () => {
      if (!instance) {
        instance = ImmutableDataStore.fromModule();
      }
      return instance;
    },
    set: (store) => {
      instance = store;
    }
  };
}
const globalDataStore = dataStoreSingleton();

z.object({
  tags: z.array(z.string()).optional(),
  lastModified: z.date().optional()
});
function createGetCollection({
  liveCollections
}) {
  return async function getCollection(collection, filter) {
    if (collection in liveCollections) {
      throw new AstroError({
        ...UnknownContentCollectionError,
        message: `Collection "${collection}" is a live collection. Use getLiveCollection() instead of getCollection().`
      });
    }
    const hasFilter = typeof filter === "function";
    const store = await globalDataStore.get();
    if (store.hasCollection(collection)) {
      const { default: imageAssetMap } = await import('./content-assets_DloNRoa4.mjs');
      const result = [];
      for (const rawEntry of store.values(collection)) {
        const data = updateImageReferencesInData(rawEntry.data, rawEntry.filePath, imageAssetMap);
        let entry = {
          ...rawEntry,
          data,
          collection
        };
        if (hasFilter && !filter(entry)) {
          continue;
        }
        result.push(entry);
      }
      return result;
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Please check your content config file for errors.`
      );
      return [];
    }
  };
}
function updateImageReferencesInData(data, fileName, imageAssetMap) {
  return new Traverse(data).map(function(ctx, val) {
    if (typeof val === "string" && val.startsWith(IMAGE_IMPORT_PREFIX)) {
      const src = val.replace(IMAGE_IMPORT_PREFIX, "");
      const id = imageSrcToImportId(src, fileName);
      if (!id) {
        ctx.update(src);
        return;
      }
      const imported = imageAssetMap?.get(id);
      if (imported) {
        if (imported.__svgData) {
          const { __svgData: svgData, ...meta } = imported;
          ctx.update(createSvgComponent({ meta, ...svgData }));
        } else {
          ctx.update(imported);
        }
      } else {
        ctx.update(src);
      }
    }
  });
}

// astro-head-inject

const liveCollections = {};

const getCollection = createGetCollection({
	liveCollections,
});

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const alertas = await getCollection("alertas");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Alertas - Administrar envíos", "data-astro-cid-3okkff7h": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div data-astro-cid-3okkff7h> <h1 class="text-2xl font-bold mb-6" data-astro-cid-3okkff7h>Alertas</h1> ${alertas.length === 0 ? renderTemplate`<p class="text-gray-500" data-astro-cid-3okkff7h>No hay alertas todavía. Créalas desde <a href="/keystatic" class="text-blue-600 underline" data-astro-cid-3okkff7h>Keystatic</a>.</p>` : renderTemplate`<div class="space-y-4" data-astro-cid-3okkff7h> ${alertas.map((alerta) => renderTemplate`<div class="border rounded-lg p-4 bg-white shadow-sm" x-data="{ sending: false, result: null }" data-astro-cid-3okkff7h> <div class="flex items-start justify-between gap-4" data-astro-cid-3okkff7h> <div class="flex-1 min-w-0" data-astro-cid-3okkff7h> <h2 class="text-lg font-semibold truncate" data-astro-cid-3okkff7h>${alerta.data.titulo}</h2> <p class="text-sm text-gray-600 mt-1 line-clamp-2" data-astro-cid-3okkff7h>${alerta.data.mensaje}</p> ${alerta.data.url && renderTemplate`<a${addAttribute(alerta.data.url, "href")} target="_blank" class="text-sm text-blue-600 underline mt-1 block truncate" data-astro-cid-3okkff7h> ${alerta.data.url} </a>`} <div class="flex flex-wrap gap-1 mt-2" data-astro-cid-3okkff7h> ${(alerta.data.destinatarios ?? "").split(",").map((e) => e.trim()).filter(Boolean).map((email) => renderTemplate`<span class="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full" data-astro-cid-3okkff7h>${email}</span>`)} </div> </div> <button id="send-btn-{alerta.id}" class="shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50" :class="sending ? 'bg-gray-300 text-gray-500' : result === 'ok' ? 'bg-green-100 text-green-700' : result === 'error' ? 'bg-red-100 text-red-700' : 'bg-blue-600 text-white hover:bg-blue-700'" :disabled="sending" x-text="sending ? 'Enviando...' : result === 'ok' ? '✓ Enviado' : result === 'error' ? 'Error' : 'Enviar'"${addAttribute(`
                  sending = true;
                  result = null;
                  fetch('/api/enviar-alerta/${alerta.id}', { method: 'POST' })
                    .then(r => r.json())
                    .then(d => { result = d.success ? 'ok' : 'error'; })
                    .catch(() => { result = 'error'; })
                    .finally(() => { sending = false; })
                `, "@click")} data-astro-cid-3okkff7h></button> </div> <div x-show="result === 'ok'" x-cloak class="mt-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded px-3 py-2" data-astro-cid-3okkff7h>
Alerta enviada correctamente
</div> <div x-show="result === 'error'" x-cloak class="mt-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2" data-astro-cid-3okkff7h>
Error al enviar. Revisa que las credenciales SMTP estén configuradas en las variables de entorno.
</div> </div>`)} </div>`} <p class="mt-8 text-sm text-gray-400" data-astro-cid-3okkff7h>
Las alertas se crean desde <a href="/keystatic" class="underline" data-astro-cid-3okkff7h>Keystatic</a> y se envían con SMTP configurado via variables de entorno.
</p> </div> ` })}`;
}, "/media/felipe/felipe/FCI/clima/src/pages/alertas/index.astro", void 0);

const $$file = "/media/felipe/felipe/FCI/clima/src/pages/alertas/index.astro";
const $$url = "/alertas";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
