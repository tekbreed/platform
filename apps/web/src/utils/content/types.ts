import { z } from "zod/v4"

const HomePageContentSchema = z.object({
	latestFeature: z.string(),
	features: z.array(
		z.object({
			icon: z.string(),
			name: z.string(),
			released: z.boolean().default(false),
			description: z.string(),
		}),
	),
})

export type HomePageContent = z.infer<typeof HomePageContentSchema>
