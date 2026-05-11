import { config, fields, collection } from '@keystatic/core';
import React from 'react';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    categorias: collection({
      label: 'Categorías',
      format: { contentField: null },
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
    tipos: collection({
      label: 'Tipos',
      format: { contentField: null },
      slugField: 'nombre',
      path: 'src/content/tipos/*',
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
    criterios: collection({
      label: 'Criterios',
      format: { contentField: null },
      slugField: 'nombre',
      path: 'src/content/criterios/*',
      schema: {
        nombre: fields.slug({
          name: { label: 'Nombre' },
        }),
        explicacion: fields.text({
          label: 'Explicación',
          multiline: true,
        }),
        tipo: fields.relationship({
          label: 'Tipo',
          description: 'Tipo al que pertenece el criterio',
          collection: 'tipos',
        }),
        categoria: fields.relationship({
          label: 'Categoría',
          description: 'Categoría a la que pertenece el criterio',
          collection: 'categorias',
        }),
      },
    }),
    boletines: collection({
      label: 'Boletines',
      format: { contentField: null },
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
        criterios: fields.array(
          fields.relationship({
            label: 'Criterio',
            description: 'Criterio aplicado',
            collection: 'criterios',
          }),
          {
            label: 'Criterios aplicados',
            itemLabel: props => props.value,
          }
        ),
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
          React.createElement(
            'a',
            {
              href: '/alertas',
              style: {
                fontSize: 14,
                fontWeight: 500,
                color: colorScheme === 'dark' ? '#93c5fd' : '#2563eb',
                textDecoration: 'none',
                padding: '4px 10px',
                borderRadius: 6,
                background: colorScheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(37,99,235,0.1)',
              },
            },
            '+ Enviar Alertas'
          )
        ),
    },
    navigation: {
      Contenido: ['categorias', 'tipos', 'criterios', 'medidas'],
      Comunicación: ['boletines', 'alertas'],
    },
  },
});
