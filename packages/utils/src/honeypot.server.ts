import {
	Honeypot,
	type HoneypotInputProps,
	SpamError,
} from "remix-utils/honeypot/server"

import { StatusCodes } from "http-status-codes"

export type { HoneypotInputProps }

export const honeypot = new Honeypot({
	nameFieldName: "name__confirm",
	validFromFieldName: "from__confirm",
	encryptionSeed: process.env.SESSION_SECRET,
})

export async function checkHoneypot(formData: FormData) {
	try {
		await honeypot.check(formData)
	} catch (error) {
		if (error instanceof SpamError) {
			throw new Response("Form not submitted properly", {
				status: StatusCodes.BAD_REQUEST,
			})
		}
		throw error
	}
}
