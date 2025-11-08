import { data, type Params, redirect } from "react-router"

import { safeRedirect } from "remix-utils/safe-redirect"

import { parseWithZod } from "@conform-to/zod/v4"
import { StatusCodes } from "http-status-codes"
import { z } from "zod/v4"

import {
	requireAnonymous,
	sessionKey,
	signupWithConnection,
} from "@repo/utils/auth.server"
import { ProviderNameSchema } from "@repo/utils/connection"
import { subscribeUser } from "@repo/utils/email.server"
import { checkHoneypot } from "@repo/utils/honeypot.server"
import { onboardingSessionKey } from "@repo/utils/onboarding"
import { authSessionStorage } from "@repo/utils/session.server"
import { redirectWithToast } from "@repo/utils/toast.server"
import { verifySessionStorage } from "@repo/utils/verification.server"

import { prisma } from "@repo/database"

import { OnboardingSchema, providerIdKey } from "./provider"

export async function requireData({
	request,
	params,
}: {
	request: Request
	params: Params
}) {
	await requireAnonymous(request)
	const verifySession = await verifySessionStorage.getSession(
		request.headers.get("cookie"),
	)
	const email = verifySession.get(onboardingSessionKey)
	const providerId = verifySession.get(providerIdKey)
	const result = z
		.object({
			email: z.string(),
			providerName: ProviderNameSchema,
			providerId: z.string(),
		})
		.safeParse({ email, providerName: params.provider, providerId })
	if (result.success) {
		return result.data
	} else {
		throw redirect("/auth/signup")
	}
}

export async function handleProviderOnboarding(
	request: Request,
	params: Params,
) {
	const { email, providerId, providerName } = await requireData({
		request,
		params,
	})

	const formData = await request.formData()
	await checkHoneypot(formData)
	const verifySession = await verifySessionStorage.getSession(
		request.headers.get("cookie"),
	)

	const submission = await parseWithZod(formData, {
		schema: OnboardingSchema.superRefine(async (_data, ctx) => {
			const existingUser = await prisma.user.findUnique({
				where: { email },
				select: { id: true },
			})
			if (existingUser) {
				ctx.addIssue({
					path: ["email"],
					code: "custom",
					message: "A user already exists with this email address.",
				})
				return
			}
		}).transform(async (data) => {
			const session = await signupWithConnection({
				...data,
				email,
				providerId: String(providerId),
				providerName,
			})
			//Add user to newsletter
			void subscribeUser({ name: data.name, email })
			return { ...data, session }
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

	const { session, rememberMe, redirectTo } = submission.value

	const authSession = await authSessionStorage.getSession(
		request.headers.get("cookie"),
	)
	authSession.set(sessionKey, session.id)
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

	return await redirectWithToast(
		safeRedirect(redirectTo),
		{
			title: "Welcome aboard!",
			description: "Signup successful.",
			type: "success",
		},
		{ headers },
	)
}
