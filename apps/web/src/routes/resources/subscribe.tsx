import { data, redirect } from "react-router"

import { parseWithZod } from "@conform-to/zod/v4"
import { StatusCodes } from "http-status-codes"
import { z } from "zod/v4"

import { SubscriptionSchema } from "@repo/ui/composed/subscription-forms"
import { WaitlistEmail } from "@repo/ui/email/waitlist"

import { sendEmail, subscribeUser } from "@repo/utils/email.server"
import { checkHoneypot } from "@repo/utils/honeypot.server"

import type { Route } from "./+types/subscribe"

export async function loader() {
	return redirect("/")
}

export async function action({ request }: Route.ActionArgs) {
	const formData = await request.formData()
	await checkHoneypot(formData)
	const submission = await parseWithZod(formData, {
		schema: SubscriptionSchema.transform(async (data, ctx) => {
			const { name, email, intent } = data
			const response = await subscribeUser({ name, email })

			if (response.status !== "success") {
				ctx.addIssue({
					path: ["root"],
					code: "custom",
					message: "Invalid credentials.",
				})
				return z.NEVER
			}

			switch (intent) {
				case "waitlist":
					void sendEmail({
						to: email,
						subject: "Welcome to TekBreed - You're on the waitlist!",
						react: (
							<WaitlistEmail firstName={name?.split(" ")[0] || "Developer"} />
						),
					})
					break
			}

			return { response }
		}),
		async: true,
	})

	if (submission.status !== "success") {
		return data(
			{
				result: { status: "error", ...submission.reply() },
				response: null,
			} as const,
			{
				status:
					submission.status === "error"
						? StatusCodes.BAD_REQUEST
						: StatusCodes.OK,
			},
		)
	}

	if (!submission.value.response) {
		return data(
			{
				result: { status: "error", ...submission.reply() },
				response: null,
			} as const,
			{
				status: StatusCodes.INTERNAL_SERVER_ERROR,
			},
		)
	}

	return { result: null, response: submission.value.response }
}
