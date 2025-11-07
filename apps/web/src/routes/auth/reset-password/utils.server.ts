import { data, redirect } from "react-router"

import { StatusCodes } from "http-status-codes"

import { prisma } from "@repo/database"
import { invariant } from "@repo/utils/misc"
import { verifySessionStorage } from "@repo/utils/verification.server"

import { resetPasswordEmailSessionKey } from "../forgot-password"
import type { VerifyFunctionArgs } from "../verify.server"

export async function handleVerification({ submission }: VerifyFunctionArgs) {
	invariant(
		submission.status === "success",
		"Submission should be successful by now",
	)
	const target = submission.value.target
	const user = await prisma.user.findFirst({
		where: { email: target },
		select: { email: true },
	})
	if (!user) {
		return data(
			{ ...submission.reply({ fieldErrors: { code: ["Invalid code"] } }) },
			{ status: StatusCodes.BAD_REQUEST },
		)
	}

	const verifySession = await verifySessionStorage.getSession()
	verifySession.set(resetPasswordEmailSessionKey, user.email)
	return redirect("/auth/reset-password", {
		headers: {
			"set-cookie": await verifySessionStorage.commitSession(verifySession),
		},
	})
}
