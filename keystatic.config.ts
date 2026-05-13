import { config, fields, collection } from '@keystatic/core';
import React from 'react';

const isDev = import.meta.env.DEV;

export default config({
  storage: isDev ? { kind: 'local' } : { kind: 'cloud' },
  ...(isDev ? {} : { cloud: { project: 'fciweb/clima026' } }),
  collections: {
    categorias: collection({
      label: 'Categorías',
      format: { contentField: undefined },
      slugField: 'nombre',
      path: 'src/content/categorias/*',
      schema: {
        nombre: fields.slug({
          name: { label: 'Nombre' },
        }),
        descripcion: fields.text({
          label: 'Descripción',
          multiline: true,
        }),
      },
    }),
    instrumentos: collection({
      label: 'Instrumentos',
      format: { contentField: undefined },
      slugField: 'nombre',
      path: 'src/content/instrumentos/*',
      schema: {
        nombre: fields.slug({
          name: { label: 'Nombre' },
        }),
        descripcion: fields.text({
          label: 'Descripción',
          multiline: true,
        }),
      },
    }),
    indicadores: collection({
      label: 'Indicadores',
      format: { contentField: undefined },
      slugField: 'nombre',
      path: 'src/content/indicadores/*',
      schema: {
        nombre: fields.slug({
          name: { label: 'Nombre' },
        }),
        explicacion: fields.text({
          label: 'Explicación',
          multiline: true,
        }),
        instrumento: fields.relationship({
          label: 'Instrumento',
          description: 'Instrumento al que pertenece el indicador',
          collection: 'instrumentos',
        }),
        categoria: fields.relationship({
          label: 'Categoría',
          description: 'Categoría a la que pertenece el indicador',
          collection: 'categorias',
        }),
      },
    }),
    boletines: collection({
      label: 'Boletines',
      format: { contentField: undefined },
      slugField: 'nombre',
      path: 'src/content/boletines/*',
      schema: {
        nombre: fields.slug({
          name: { label: 'Nombre' },
        }),
        fecha: fields.date({
          label: 'Fecha',
          validation: { isRequired: true },
        }),
        pdf: fields.file({
          label: 'Archivo PDF',
          description: 'Subir el boletín en formato PDF',
          directory: 'public/boletines',
          publicPath: '/boletines/',
          validation: { isRequired: true },
        }),
        link: fields.url({
          label: 'Enlace externo',
          description: 'URL externa del boletín (opcional)',
        }),
      },
    }),
    medidas: collection({
      label: 'Medidas-Eventos',
      slugField: 'nombre',
      path: 'src/content/medidas/*',
      format: { contentField: 'descripcion' },
      schema: {
        nombre: fields.slug({
          name: { label: 'Nombre' },
        }),
        descripcion: fields.markdoc({
          label: 'Descripción',
          options: {
            image: {
              directory: 'src/assets/images/posts',
              publicPath: '../../assets/images/posts/',
            },
          },
        }),
        indicadores: fields.array(
          fields.relationship({
            label: 'Indicador',
            description: 'Indicador aplicado',
            collection: 'indicadores',
          }),
          {
            label: 'Indicadores aplicados',
            itemLabel: props => props.value ?? '',
          }
        ),
      },
    }),
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'contenido' },
      schema: {
        title: fields.slug({
          name: { label: 'Título' },
        }),
        contenido: fields.markdoc({
          label: 'Contenido',
        }),
      },
    }),
    alertas: collection({
      label: 'Alertas',
      slugField: 'titulo',
      path: 'src/content/alertas/*',
      format: { contentField: 'contenido' },
      schema: {
        titulo: fields.slug({
          name: { label: 'Título' },
        }),
        mensaje: fields.text({
          label: 'Mensaje',
          description: 'Resumen breve para el asunto del correo',
          multiline: true,
        }),
        contenido: fields.markdoc({
          label: 'Contenido',
          options: {
            image: {
              directory: 'src/assets/images/alertas',
              publicPath: '../../assets/images/alertas/',
            },
          },
        }),
        url: fields.url({
          label: 'URL',
          description: 'Enlace relacionado a la alerta',
        }),
        destinatarios: fields.text({
          label: 'Destinatarios',
          description: 'Correos electrónicos separados por comas',
        }),
      },
    }),
  },
  ui: {
    brand: {
      name: 'Clima',
      mark: ({ colorScheme }) =>
        React.createElement(
          'div',
          { style: { display: 'flex', alignItems: 'center', gap: 16 } },
          React.createElement('span', { style: { fontWeight: 700 } }, 'Clima'),
        ),
    },
    navigation: {
      Análisis: ['categorias', 'instrumentos', 'indicadores', 'medidas'],
      Comunicación: ['posts'],
    },
  },
});
