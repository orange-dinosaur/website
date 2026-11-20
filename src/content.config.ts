import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { TAGS } from './data/tags';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    lede: z.string(),
    tags: z.array(z.enum(TAGS)).nonempty(),
    project: reference('projects').optional(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    startYear: z.number().int(),
    status: z.enum(['in corso', 'in pausa']),
    summary: z.string(),
    code: z.url().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts, projects };
