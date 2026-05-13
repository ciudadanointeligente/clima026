import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const categorias = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/categorias' }),
  schema: z.object({
    nombre: z.string(),
    descripcion: z.string().optional(),
  }),
});


const instrumentos = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/instrumentos' }),
  schema: z.object({
    nombre: z.string(),
    descripcion: z.string().optional(),
  }),
});


const indicadores = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/indicadores' }),
  schema: z.object({
    nombre: z.string(),
    explicacion: z.string().optional(),
    instrumento: z.string(),
    categoria: z.string(),
  }),
});

const boletines = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/boletines' }),
  schema: z.object({
    nombre: z.string(),
    fecha: z.date(),
    pdf: z.string(),
    link: z.string().url().optional(),
  }),
});

const medidas = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/medidas' }),
  schema: z.object({
    nombre: z.string(),
    indicadores: z.array(z.string()),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
  }),
});

const alertas = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/alertas' }),
  schema: z.object({
    titulo: z.string(),
    mensaje: z.string(),
    url: z.string().url().optional(),
    destinatarios: z.string(),
  }),
});

export const collections = {
  categorias,
  instrumentos,
  indicadores,
  boletines,
  medidas,
  posts,
  alertas,
};
