import { redirect } from "react-router"

import { requireAnonymous } from "@repo/utils/auth/auth.server"
import { verifySessionStorage } from "@repo/utils/auth/verification.server"

import { resetPasswordEmailSessionKey } from "../forgot-password"

export async function requireResetPasswordEmail(request: Request) {
	await requireAnonymous(request)
	const verifySession = await verifySessionStorage.getSession(
		request.headers.get("cookie"),
	)
	const resetPasswordEmail = verifySession.get(resetPasswordEmailSessionKey)
	if (typeof resetPasswordEmail !== "string" || !resetPasswordEmail) {
		throw redirect("/auth/signin")
	}
	return resetPasswordEmail
}
