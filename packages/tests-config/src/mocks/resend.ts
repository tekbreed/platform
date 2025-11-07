import { faker } from "@faker-js/faker"
import { type HttpHandler, HttpResponse, http } from "msw"
import { z } from "zod/v4"

import { RESEND_URL } from "@repo/utils/email.server"

const EmailSchema = z.object({
	from: z.string(),
	to: z.string(),
	subject: z.string(),
	html: z.string().optional(),
})

const SubscriptionSchema = z.object({
	email: z.email(),
	first_name: z.string().min(2).max(100).optional(),
	last_name: z.string().min(2).max(100).optional(),
	unsubscribed: z.boolean().default(false),
})

export const handlers: HttpHandler[] = [
	http.post(`${RESEND_URL}/emails`, async ({ request }) => {
		const body = EmailSchema.parse(await request.json())
		console.info("Mocked email:", body)
		return HttpResponse.json({
			id: faker.string.uuid(),
			from: body.from,
			to: body.to,
			created_at: new Date().toISOString(),
		})
	}),

	http.post(
		`${RESEND_URL}/audiences/${process.env.RESEND_AUDIENCE_ID}/contacts`,
		async ({ request }) => {
			const body = SubscriptionSchema.parse(await request.json())
			console.info("Mocked subscription:", body)
			return HttpResponse.json({
				subject: "contact",
				id: faker.string.uuid(),
			})
		},
	),

	http.get(
		`${RESEND_URL}/audiences/${process.env.RESEND_AUDIENCE_ID}/contacts`,
		async () => {
			return HttpResponse.json({
				object: "list",
				has_more: false,
				data: Array.from({ length: 5 }, () => ({
					id: faker.string.uuid(),
					email: faker.internet.email,
					first_name: faker.person.firstName,
					last_name: faker.person.lastName,
					created_at: faker.date.anytime,
					unsubscribed: false,
				})),
			})
		},
	),
]
