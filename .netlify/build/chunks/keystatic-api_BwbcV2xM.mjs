import { makeGenericAPIRouteHandler } from '@keystatic/core/api/generic';
import { parseString } from 'set-cookie-parser';
import { config as config$1, collection, fields } from '@keystatic/core';
import React from 'react';

function makeHandler(_config) {
  return async function keystaticAPIRoute(context) {
    var _context$locals, _ref, _config$clientId, _ref2, _config$clientSecret, _ref3, _config$secret;
    const envVarsForCf = (_context$locals = context.locals) === null || _context$locals === void 0 || (_context$locals = _context$locals.runtime) === null || _context$locals === void 0 ? void 0 : _context$locals.env;
    const handler = makeGenericAPIRouteHandler({
      ..._config,
      clientId: (_ref = (_config$clientId = _config.clientId) !== null && _config$clientId !== void 0 ? _config$clientId : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_GITHUB_CLIENT_ID) !== null && _ref !== void 0 ? _ref : tryOrUndefined(() => {
        return undefined                                          ;
      }),
      clientSecret: (_ref2 = (_config$clientSecret = _config.clientSecret) !== null && _config$clientSecret !== void 0 ? _config$clientSecret : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_GITHUB_CLIENT_SECRET) !== null && _ref2 !== void 0 ? _ref2 : tryOrUndefined(() => {
        return undefined                                              ;
      }),
      secret: (_ref3 = (_config$secret = _config.secret) !== null && _config$secret !== void 0 ? _config$secret : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_SECRET) !== null && _ref3 !== void 0 ? _ref3 : tryOrUndefined(() => {
        return undefined                                ;
      })
    }, {
      slugEnvName: "PUBLIC_KEYSTATIC_GITHUB_APP_SLUG"
    });
    const {
      body,
      headers,
      status
    } = await handler(context.request);
    let headersInADifferentStructure = /* @__PURE__ */ new Map();
    if (headers) {
      if (Array.isArray(headers)) {
        for (const [key, value] of headers) {
          if (!headersInADifferentStructure.has(key.toLowerCase())) {
            headersInADifferentStructure.set(key.toLowerCase(), []);
          }
          headersInADifferentStructure.get(key.toLowerCase()).push(value);
        }
      } else if (typeof headers.entries === "function") {
        for (const [key, value] of headers.entries()) {
          headersInADifferentStructure.set(key.toLowerCase(), [value]);
        }
        if ("getSetCookie" in headers && typeof headers.getSetCookie === "function") {
          const setCookieHeaders2 = headers.getSetCookie();
          if (setCookieHeaders2 !== null && setCookieHeaders2 !== void 0 && setCookieHeaders2.length) {
            headersInADifferentStructure.set("set-cookie", setCookieHeaders2);
          }
        }
      } else {
        for (const [key, value] of Object.entries(headers)) {
          headersInADifferentStructure.set(key.toLowerCase(), [value]);
        }
      }
    }
    const setCookieHeaders = headersInADifferentStructure.get("set-cookie");
    headersInADifferentStructure.delete("set-cookie");
    if (setCookieHeaders) {
      for (const setCookieValue of setCookieHeaders) {
        var _options$sameSite;
        const {
          name,
          value,
          ...options
        } = parseString(setCookieValue);
        const sameSite = (_options$sameSite = options.sameSite) === null || _options$sameSite === void 0 ? void 0 : _options$sameSite.toLowerCase();
        context.cookies.set(name, value, {
          domain: options.domain,
          expires: options.expires,
          httpOnly: options.httpOnly,
          maxAge: options.maxAge,
          path: options.path,
          sameSite: sameSite === "lax" || sameSite === "strict" || sameSite === "none" ? sameSite : void 0
        });
      }
    }
    return new Response(body, {
      status,
      headers: [...headersInADifferentStructure.entries()].flatMap(([key, val]) => val.map((x) => [key, x]))
    });
  };
}
function tryOrUndefined(fn) {
  try {
    return fn();
  } catch {
    return void 0;
  }
}

const config = config$1({
  storage: {
    kind: "local"
  },
  collections: {
    categorias: collection({
      label: "Categorías",
      format: { contentField: null },
      slugField: "nombre",
      path: "src/content/categorias/*",
      schema: {
        nombre: fields.slug({
          name: { label: "Nombre" }
        }),
        descripcion: fields.text({
          label: "Descripción",
          multiline: true
        })
      }
    }),
    tipos: collection({
      label: "Tipos",
      format: { contentField: null },
      slugField: "nombre",
      path: "src/content/tipos/*",
      schema: {
        nombre: fields.slug({
          name: { label: "Nombre" }
        }),
        descripcion: fields.text({
          label: "Descripción",
          multiline: true
        })
      }
    }),
    criterios: collection({
      label: "Criterios",
      format: { contentField: null },
      slugField: "nombre",
      path: "src/content/criterios/*",
      schema: {
        nombre: fields.slug({
          name: { label: "Nombre" }
        }),
        explicacion: fields.text({
          label: "Explicación",
          multiline: true
        }),
        tipo: fields.relationship({
          label: "Tipo",
          description: "Tipo al que pertenece el criterio",
          collection: "tipos"
        }),
        categoria: fields.relationship({
          label: "Categoría",
          description: "Categoría a la que pertenece el criterio",
          collection: "categorias"
        })
      }
    }),
    boletines: collection({
      label: "Boletines",
      format: { contentField: null },
      slugField: "nombre",
      path: "src/content/boletines/*",
      schema: {
        nombre: fields.slug({
          name: { label: "Nombre" }
        }),
        fecha: fields.date({
          label: "Fecha",
          validation: { isRequired: true }
        }),
        pdf: fields.file({
          label: "Archivo PDF",
          description: "Subir el boletín en formato PDF",
          directory: "public/boletines",
          publicPath: "/boletines/",
          validation: { isRequired: true }
        }),
        link: fields.url({
          label: "Enlace externo",
          description: "URL externa del boletín (opcional)"
        })
      }
    }),
    medidas: collection({
      label: "Medidas-Eventos",
      slugField: "nombre",
      path: "src/content/medidas/*",
      format: { contentField: "descripcion" },
      schema: {
        nombre: fields.slug({
          name: { label: "Nombre" }
        }),
        descripcion: fields.markdoc({
          label: "Descripción",
          options: {
            image: {
              directory: "src/assets/images/posts",
              publicPath: "../../assets/images/posts/"
            }
          }
        }),
        criterios: fields.array(
          fields.relationship({
            label: "Criterio",
            description: "Criterio aplicado",
            collection: "criterios"
          }),
          {
            label: "Criterios aplicados",
            itemLabel: (props) => props.value
          }
        )
      }
    }),
    alertas: collection({
      label: "Alertas",
      slugField: "titulo",
      path: "src/content/alertas/*",
      format: { contentField: "contenido" },
      schema: {
        titulo: fields.slug({
          name: { label: "Título" }
        }),
        mensaje: fields.text({
          label: "Mensaje",
          description: "Resumen breve para el asunto del correo",
          multiline: true
        }),
        contenido: fields.markdoc({
          label: "Contenido",
          options: {
            image: {
              directory: "src/assets/images/alertas",
              publicPath: "../../assets/images/alertas/"
            }
          }
        }),
        url: fields.url({
          label: "URL",
          description: "Enlace relacionado a la alerta"
        }),
        destinatarios: fields.text({
          label: "Destinatarios",
          description: "Correos electrónicos separados por comas"
        })
      }
    })
  },
  ui: {
    brand: {
      name: "Clima",
      mark: ({ colorScheme }) => React.createElement(
        "div",
        { style: { display: "flex", alignItems: "center", gap: 16 } },
        React.createElement("span", { style: { fontWeight: 700 } }, "Clima"),
        React.createElement(
          "a",
          {
            href: "/alertas",
            style: {
              fontSize: 14,
              fontWeight: 500,
              color: colorScheme === "dark" ? "#93c5fd" : "#2563eb",
              textDecoration: "none",
              padding: "4px 10px",
              borderRadius: 6,
              background: colorScheme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(37,99,235,0.1)"
            }
          },
          "+ Enviar Alertas"
        )
      )
    },
    navigation: {
      Contenido: ["categorias", "tipos", "criterios", "medidas"],
      Comunicación: ["boletines", "alertas"]
    }
  }
});

const all = makeHandler({ config });
const ALL = all;

const prerender = false;

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  ALL,
  all,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
