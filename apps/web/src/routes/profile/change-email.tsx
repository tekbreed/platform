import { data, Form, Link, redirect } from "react-router"

import { HoneypotInputs } from "remix-utils/honeypot/react"

import { getFormProps, getInputProps, useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod/v4"
import { StatusCodes } from "http-status-codes"
import { Loader2 } from "lucide-react"
import { z } from "zod/v4"

import { Button } from "@repo/ui/components/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/card"
import { Input } from "@repo/ui/components/input"
import { Label } from "@repo/ui/components/label"
import { FormError } from "@repo/ui/composed/form-error"
import { Verification } from "@repo/ui/email/verification"

import { requireUserId } from "@repo/utils/auth/auth.server"
import { EmailSchema } from "@repo/utils/auth/user-validation"
import { verifySessionStorage } from "@repo/utils/auth/verification.server"
import { sendEmail } from "@repo/utils/email.server"
import { checkHoneypot } from "@repo/utils/honeypot.server"
import { useIsPending } from "@repo/utils/misc"

import { prisma } from "@repo/database/client"

import { prepareVerification } from "../auth/verify.server"
import type { Route } from "./+types/change-email"

const ChangeEmailSchema = z.object({
	email: EmailSchema,
})

export const newEmailAddressSessionKey = "new-email-address"

export async function loader({ request }: Route.LoaderArgs) {
	const userId = await requireUserId(request)
	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: { email: true },
	})
	if (!user) {
		const params = new URLSearchParams({ redirectTo: request.url })
		throw redirect(`/signin?${params}`)
	}
	return { user }
}

export async function action({ request }: Route.ActionArgs) {
	const userId = await requireUserId(request)
	const formData = await request.formData()
	await checkHoneypot(formData)
	const submission = await parseWithZod(formData, {
		schema: ChangeEmailSchema.superRefine(async (data, ctx) => {
			const existingUser = await prisma.user.findUnique({
				where: { email: data.email },
				select: { email: true },
			})
			if (existingUser) {
				ctx.addIssue({
					path: ["email"],
					code: "custom",
					message: "This email is already in use.",
				})
				return z.NEVER
			}
			// return data;
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
	const { otp, redirectTo, verifyUrl } = await prepareVerification({
		period: 10 * 60,
		request,
		target: userId,
		type: "change_email",
	})

	const { email } = submission.value

	const response = await sendEmail({
		to: email,
		subject: `TekBreed Email Change Verification`,
		react: <Verification code={otp} verificationUrl={verifyUrl.toString()} />,
	})

	if (response.status === "success") {
		const verifySession = await verifySessionStorage.getSession()
		verifySession.set(newEmailAddressSessionKey, email)
		return redirect(redirectTo.toString(), {
			headers: {
				"set-cookie": await verifySessionStorage.commitSession(verifySession),
			},
		})
	} else {
		return data(
			{
				...submission.reply(),
				formErrors: [response.error],
			} as const,
			{ status: StatusCodes.INTERNAL_SERVER_ERROR },
		)
	}
}

export default function ChangeEmail({
	actionData,
	loaderData,
}: Route.ComponentProps) {
	// const metadata = generateMetadata({ title: "Change Email" });
	const user = loaderData.user
	const isSubmitting = useIsPending()

	const [form, fields] = useForm({
		id: "change-email",
		lastResult: actionData,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: ChangeEmailSchema })
		},
		shouldValidate: "onSubmit",
	})

	return (
		<>
			{/* {metadata} */}
			<div className="!h-[90%] flex">
				<Card className="m-auto w-full max-w-md bg-card/80 shadow-xl backdrop-blur-sm">
					<Form
						{...getFormProps(form)}
						className="mx-auto w-full space-y-6"
						method="post"
					>
						<HoneypotInputs />
						<CardHeader>
							<CardTitle>
								A confirmation email will be sent to your{" "}
								<strong>new email address</strong>.
							</CardTitle>
							<CardDescription>
								A security notification will also be sent to your current email:{" "}
								<strong className="font-bold">{user.email}</strong>.
							</CardDescription>
						</CardHeader>
						<CardContent className="my-8">
							<div className="space-y-2">
								<Label htmlFor={fields.email.id}>New Email</Label>
								<Input
									{...getInputProps(fields.email, { type: "email" })}
									className="border-border bg-background"
									placeholder="tonymax@tekbreed.com"
								/>
								<FormError errors={fields.email.errors} />
							</div>
							<FormError errors={form.errors} />
						</CardContent>
						<CardFooter>
							<div className="flex w-full justify-end">
								<div className="flex gap-6">
									<Button asChild variant={"outline"}>
										<Link to={"/profile"}>Cancel</Link>
									</Button>
									<Button disabled={isSubmitting} type="submit">
										Send confirmation{" "}
										{isSubmitting ? (
											<Loader2 className="ml-2 animate-spin" />
										) : null}
									</Button>
								</div>
							</div>
						</CardFooter>
					</Form>
				</Card>
			</div>
		</>
	)
}
