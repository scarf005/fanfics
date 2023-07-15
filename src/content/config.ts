import { defineCollection, z } from "astro:content"

const posts = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    image: z.string().url().optional(),
    imagePosition: z
      .enum([
        "top",
        "center",
        "bottom",
        "left",
        "right",
        "top left",
        "top right",
        "bottom left",
        "bottom right",
        "50% 50%",
      ])
      .default("50% 50%"),
  }),
})

export const collections = { posts }
