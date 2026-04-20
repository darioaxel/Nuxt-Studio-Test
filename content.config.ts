import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const pageSchema = z.object({
  links: z.array(z.object({
    label: z.string(),
    icon: z.string(),
    to: z.string(),
    target: z.string().optional()
  })).optional()
})

export default defineContentConfig({
  collections: {
    landing: defineCollection({
      type: 'page',
      source: 'index.md'
    }),
    docs: defineCollection({
      type: 'page',
      source: 'docs/**',
      schema: pageSchema
    }),
    ayuda: defineCollection({
      type: 'page',
      source: 'ayuda/**',
      schema: pageSchema
    }),
    admin: defineCollection({
      type: 'page',
      source: 'admin/**',
      schema: pageSchema
    }),
    bienvenida: defineCollection({
      type: 'page',
      source: 'bienvenida/**',
      schema: pageSchema
    })
  }
})
