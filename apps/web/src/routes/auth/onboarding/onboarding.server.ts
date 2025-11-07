import { data, redirect } from "react-router"

import { safeRedirect } from "remix-utils/safe-redirect"

import { parseWithZod } from "@conform-to/zod/v4"
import { StatusCodes } from "http-status-codes"
import { z } from "zod/v4"

import { sessionKey, signup } from "@repo/utils/auth.server"
import { subscribeUser } from "@repo/utils/email.server"
import { invariant } from "@repo/utils/misc"
import { onboardingSessionKey } from "@repo/utils/onboarding"
import { authSessionStorage } from "@repo/utils/session.server"
import { verifySessionStorage } from "@repo/utils/verification.server"

import type { VerifyFunctionArgs } from "../verify.server"
import { OnboardingSchema } from "."

export async function requireOnboardingEmail(request: Request) {
	const verifySesison = await verifySessionStorage.getSession(
		request.headers.get("cookie"),
	)
	const email = await verifySesison.get(onboardingSessionKey)
	if (typeof email !== "string" || !email) {
		throw redirect("/auth/signup")
	}
	return email
}

export async function handleVerification({ submission }: VerifyFunctionArgs) {
	invariant(
		submission.status === "success",
		"Submission should be successful by now",
	)
	const verifySession = await verifySessionStorage.getSession()
	verifySession.set(onboardingSessionKey, submission.value.target)
	return redirect("/auth/onboarding", {
		headers: {
			"set-cookie": await verifySessionStorage.commitSession(verifySession),
		},
	})
}

export async function handleOnboarding(request: Request, formData: FormData) {
	const submission = await parseWithZod(formData, {
		schema: OnboardingSchema.transform(async (data, ctx) => {
			const { name, password, email } = data
			try {
				const session = await signup({
					email,
					name,
					password,
				})

				if (!session) {
					ctx.addIssue({
						path: ["root"],
						code: "custom",
						message: "Failed to create account. Please try again.",
					})
					return z.NEVER
				}

				return { ...data, session }
			} catch (e) {
				console.error(e)
				ctx.addIssue({
					path: ["root"],
					code: "custom",
					message: "An unexpected error occurred. Please try again.",
				})
				return z.NEVER
			}
		}),
		async: true,
	})

	if (submission.status !== "success") {
		return data({ status: "error", ...submission.reply() } as const, {
			status:
				submission.status === "error"
					? StatusCodes.BAD_REQUEST
					: StatusCodes.OK,
		})
	}

	if (!submission.value.session) {
		return data({ status: "error", ...submission.reply() } as const, {
			status: StatusCodes.INTERNAL_SERVER_ERROR,
		})
	}

	const { rememberMe, session, redirectTo, name, email } = submission.value
	//Add user to newsletter
	void subscribeUser({ name, email })
	const authSession = await authSessionStorage.getSession(
		request.headers.get("cookie"),
	)
	authSession.set(sessionKey, session.id)

	const verifySession = await verifySessionStorage.getSession(
		request.headers.get("cookie"),
	)

	const headers = new Headers()
	headers.append(
		"set-cookie",
		await authSessionStorage.commitSession(authSession, {
			expires: rememberMe ? session.expirationDate : undefined,
		}),
	)

	headers.append(
		"set-cookie",
		await verifySessionStorage.destroySession(verifySession),
	)

	return redirect(safeRedirect(redirectTo), { headers })
}
