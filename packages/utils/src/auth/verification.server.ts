import { createCookieSessionStorage, redirect } from "react-router"

import { invariant } from "../misc"
import { onboardingSessionKey } from "../onboarding"
import type { VerifyFunctionArgs } from "./verify"

const isProduction = process.env.NODE_ENV === "production"

export const verifySessionStorage = createCookieSessionStorage({
	cookie: {
		name: "__tb_verification",
		sameSite: "lax",
		path: "/",
		httpOnly: true,
		maxAge: 60 * 10, // 10 minutes
		secrets: [process.env.SESSION_SECRET],
		...(isProduction
			? {
					domain: ".tekbreed.com",
					secure: true,
				}
			: {}),
	},
})

export async function handleVerification({
	request,
	submission,
}: VerifyFunctionArgs) {
	invariant(submission.payload, "submission.payload should be defined by now")
	const verifySession = await verifySessionStorage.getSession(
		request.headers.get("cookie"),
	)
	verifySession.set(onboardingSessionKey, submission.payload.target)
	return redirect("/auth/onboarding", {
		headers: {
			"set-cookie": await verifySessionStorage.commitSession(verifySession),
		},
	})
}
