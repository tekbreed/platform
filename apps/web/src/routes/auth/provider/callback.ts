import { redirect } from "react-router"

import { prisma } from "@repo/database"

import {
	authenticator,
	getSessionExpirationDate,
	getUserId,
} from "@repo/utils/auth/auth.server"
import { handleNewSession } from "@repo/utils/auth/session.server"
import { verifySessionStorage } from "@repo/utils/auth/verification.server"
import { combineHeaders, combineResponseInits } from "@repo/utils/misc"
import { onboardingSessionKey } from "@repo/utils/onboarding"
import {
	destroyRedirectToHeader,
	getRedirectCookieValue,
} from "@repo/utils/redirect-cookie.server"
import { createToastHeaders, redirectWithToast } from "@repo/utils/toast.server"

import { providerLabels } from "@/components/connection-form"
import { prefilledProfileKey, providerIdKey } from "../onboarding/provider"
import type { Route } from "./+types/callback"

const destroyRedirectTo = { "set-cookie": destroyRedirectToHeader }

export async function loader({ request }: Route.LoaderArgs) {
	const providerName = "github"

	const redirectTo = getRedirectCookieValue(request)
	const label = providerLabels[providerName]

	const profile = await authenticator
		.authenticate(providerName, request)
		.catch(async () => {
			const signinRedirect = [
				"/auth/signin",
				redirectTo ? new URLSearchParams({ redirectTo }) : null,
			]
				.filter(Boolean)
				.join("?")
			throw await redirectWithToast(
				signinRedirect,
				{
					title: "Auth Failed",
					description: `There was an error authenticating with ${label}.`,
					type: "error",
				},
				{ headers: destroyRedirectTo },
			)
		})

	const existingConnection = await prisma.connection.findUnique({
		select: { userId: true },
		where: {
			providerName_providerId: { providerName, providerId: profile.id },
		},
	})

	const userId = await getUserId(request)

	if (existingConnection && userId) {
		throw await redirectWithToast(
			"/profile",
			{
				title: "Already Connected",
				description:
					existingConnection.userId === userId
						? `Your "${profile.username}" ${label} account is already connected.`
						: `The "${profile.username}" ${label} account is already connected to another account.`,
			},
			{ headers: destroyRedirectTo },
		)
	}

	// If we're already logged in, then link the account
	if (userId) {
		await prisma.connection.create({
			data: { providerName, providerId: profile.id, userId },
		})

		throw await redirectWithToast(
			"/profile",
			{
				title: "Connected",
				type: "success",
				description: `Your "${profile.username}" ${label} account has been connected.`,
			},
			{ headers: destroyRedirectTo },
		)
	}

	if (existingConnection) {
		return makeSession({
			request,
			userId: existingConnection.userId,
			redirectTo,
		})
	}

	// if the email matches a user in the database, then link the account and
	// make a new session
	const user = await prisma.user.findUnique({
		select: { id: true },
		where: { email: profile.email.toLowerCase() },
	})
	if (user) {
		await prisma.connection.create({
			data: { providerName, providerId: profile.id, userId: user.id },
		})
		return makeSession(
			{
				request,
				userId: user.id,
				redirectTo: redirectTo ?? "/profile",
			},
			{
				headers: await createToastHeaders({
					title: "Connected",
					description: `Your "${profile.username}" ${label} account has been connected.`,
				}),
			},
		)
	}

	const verifySession = await verifySessionStorage.getSession(
		request.headers.get("cookie"),
	)

	verifySession.set(onboardingSessionKey, profile.email)
	verifySession.set(prefilledProfileKey, profile)
	verifySession.set(providerIdKey, profile.id)
	const onboardingRedirect = [
		`/auth/onboarding/${providerName}`,
		redirectTo ? new URLSearchParams({ redirectTo }) : null,
	]
		.filter(Boolean)
		.join("?")
	return redirect(onboardingRedirect, {
		headers: combineHeaders(
			{ "set-cookie": await verifySessionStorage.commitSession(verifySession) },
			destroyRedirectTo,
		),
	})
}

async function makeSession(
	{
		request,
		userId,
		redirectTo,
	}: { request: Request; userId: string; redirectTo?: string | null },
	responseInit?: ResponseInit,
) {
	redirectTo ??= "/"
	const session = await prisma.session.create({
		select: { id: true, expirationDate: true, userId: true },
		data: {
			expirationDate: getSessionExpirationDate(),
			userId,
		},
	})
	return handleNewSession(
		{ request, session, redirectTo, rememberMe: "true" },
		combineResponseInits({ headers: destroyRedirectTo }, responseInit),
	)
}
