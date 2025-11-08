import { data } from "react-router"

import { format } from "date-fns"
import { StatusCodes } from "http-status-codes"

import { EmailChangeNotification } from "@repo/ui/email/email-change-notification"

import { sendEmail } from "@repo/utils/email.server"
import { invariant } from "@repo/utils/misc"
import { redirectWithToast } from "@repo/utils/toast.server"
import { verifySessionStorage } from "@repo/utils/verification.server"

import { prisma } from "@repo/database/client"

import type { VerifyFunctionArgs } from "../auth/verify.server"
import { newEmailAddressSessionKey } from "./change-email"

export async function handleVerification({
	request,
	submission,
}: VerifyFunctionArgs) {
	invariant(
		submission.status === "success",
		"Submission should be successful by now",
	)

	const verifySession = await verifySessionStorage.getSession(
		request.headers.get("cookie"),
	)
	const newEmail = verifySession.get(newEmailAddressSessionKey)
	if (!newEmail) {
		return data(
			{
				...submission.reply({
					formErrors: [
						"You must submit the code on the same device that requested the email change.",
					],
				}),
			},
			{ status: StatusCodes.BAD_REQUEST },
		)
	}
	const userIpAddress =
		request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip")

	const preUpdateUser = await prisma.user.findFirstOrThrow({
		select: { email: true, name: true },
		where: { id: submission.value.target },
	})
	const user = await prisma.user.update({
		where: { id: submission.value.target },
		select: { id: true, email: true },
		data: { email: newEmail },
	})

	const emailProps = {
		newEmail,
		oldEmail: preUpdateUser.email,
		name: preUpdateUser.name,
		ipAddress: userIpAddress as string,
		changeDate: format(new Date(), "MMMM d, yyyy 'at' h:mm a"),
	}

	void sendEmail({
		to: preUpdateUser.email,
		subject: "TekBreed Email changed",
		react: <EmailChangeNotification {...emailProps} />,
	})

	/**
	 * TODO: update newsletter user with new email
	 */

	return await redirectWithToast(
		"/profile",
		{
			title: "Email Changed",
			type: "success",
			description: `Your email has been changed to ${user.email}`,
		},
		{
			headers: {
				"set-cookie": await verifySessionStorage.destroySession(verifySession),
			},
		},
	)
}
