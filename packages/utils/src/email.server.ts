export const RESEND_URL = "https://api.resend.com" as const

import { Resend } from "resend"

const { RESEND_API_KEY, RESEND_AUDIENCE_ID } = process.env

const resend = new Resend(RESEND_API_KEY)

export async function sendEmail(options: {
	to: string
	subject: string
	react: React.ReactNode
}) {
	try {
		const emailData = {
			from: "TekBreed <noreply@mail.tekbreed.com>",
			...options,
		}
		const { data, error } = await resend.emails.send(emailData)
		if (!error) {
			return { status: "success", data } as const
		} else {
			return { status: "error", error: error.message } as const
		}
	} catch (error) {
		console.error("Send email error:", error)
		return { status: "error", error: "Failed to send email" } as const
	}
}

export async function subscribeUser(credentials: {
	name?: string
	email: string
}) {
	try {
		const [firstName = undefined, lastName = undefined] =
			credentials.name?.split(" ") ?? []

		const subscriptionData = {
			email: credentials.email,
			...(firstName && { first_name: firstName }),
			...(lastName && { last_name: lastName }),
			unsubscribed: false,
			audienceId: RESEND_AUDIENCE_ID,
		}
		const { data, error } = await resend.contacts.create(subscriptionData)
		if (!error) {
			return { status: "success", data } as const
		} else {
			return { status: "error", error: error.message } as const
		}
	} catch (error) {
		console.error("Subscribe user error:", error)
		return { status: "error", error: "Failed to subscribe user" } as const
	}
}

export async function listSubscribers(audienceId: string = RESEND_AUDIENCE_ID) {
	try {
		return await resend.contacts.list({ audienceId })
	} catch (error) {
		console.error(error)
		throw error
	}
}
