import { defineCollection, z } from "astro:content";

const blog = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.date(),
		updatedDate: z.date().optional(),
		tags: z.array(z.string()).default([]),
	}),
});

const projects = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string(),
		technologies: z.array(z.string()).default([]),
		github: z.string(),
		demo: z.string(),
		featured: z.boolean().default(false),
		type: z.enum(["personal", "open-source", "professional", "team"]).default("personal"),
	}),
});

export const collections = { blog, projects };
