import { data, Form, Link, redirect } from "react-router"

// import { generateMetadata } from "~/utils/meta";
import { HoneypotInputs } from "remix-utils/honeypot/react"

import type { SEOHandle } from "@nasa-gcn/remix-seo"
import { getFormProps, getInputProps, useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod/v4"
import { StatusCodes } from "http-status-codes"
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
import { Icons } from "@repo/ui/composed/icons"
import { Verification } from "@repo/ui/email/verification"

import { sendEmail } from "@repo/utils/email.server"
import { checkHoneypot } from "@repo/utils/honeypot.server"
import { useIsPending } from "@repo/utils/misc"
import { EmailSchema } from "@repo/utils/user-validation"

import { prisma } from "@repo/database"

import type { Route } from "./+types/forgot-password"
import { prepareVerification } from "./verify.server"

const ForgotPasswordSchema = z.object({
	email: EmailSchema,
})

export const resetPasswordEmailSessionKey = "resetPasswordEmailKey"

export async function action({ request }: Route.ActionArgs) {
	const formData = await request.formData()
	await checkHoneypot(formData)
	const submission = await parseWithZod(formData, {
		schema: ForgotPasswordSchema.superRefine(async (data, ctx) => {
			const user = await prisma.user.findFirst({
				where: { email: data.email },
				select: { id: true },
			})
			if (!user) {
				ctx.addIssue({
					path: ["email"],
					code: "custom",
					message: "No user exists with this email",
				})
				return z.NEVER
			}
			// return data;
		}),
		async: true,
	})
	if (submission.status !== "success") {
		return data(
			{ ...submission.reply() },
			{
				status:
					submission.status === "error"
						? StatusCodes.BAD_REQUEST
						: StatusCodes.OK,
			},
		)
	}
	const { email } = submission.value
	const user = await prisma.user.findFirstOrThrow({
		where: { email },
		select: { email: true },
	})

	const { verifyUrl, redirectTo, otp } = await prepareVerification({
		period: 10 * 60,
		request,
		type: "reset_password",
		target: email,
	})

	const response = await sendEmail({
		to: user.email,
		subject: `TekBreed Password Reset`,
		react: <Verification code={otp} verificationUrl={verifyUrl.toString()} />,
	})

	if (response.status === "success") {
		return redirect(redirectTo.toString())
	} else {
		return data(
			{ ...submission.reply({ formErrors: [response.error] }) },
			{ status: StatusCodes.INTERNAL_SERVER_ERROR },
		)
	}
}

export const handle: SEOHandle = {
	getSitemapEntries: () => null,
}

export default function ForgotPasswordRoute({
	actionData,
}: Route.ComponentProps) {
	// const metadata = generateMetadata({ title: "Forgot Password" });

	const isSubmitting = useIsPending()
	const [form, fields] = useForm({
		id: "forgot-password",
		lastResult: actionData,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: ForgotPasswordSchema })
		},
		shouldValidate: "onSubmit",
	})
	return (
		<>
			{/* {metadata} */}
			<div className="!h-[90%] flex">
				<Card className="m-auto max-w-md bg-card/80 shadow-xl backdrop-blur-sm">
					<Form
						{...getFormProps(form)}
						className="mx-auto w-full space-y-6"
						method="post"
					>
						<HoneypotInputs />
						<CardHeader>
							<CardTitle>Forgot password</CardTitle>
							<CardDescription>
								Enter your email, and we’ll send you a secure link to reset your
								password.
							</CardDescription>
						</CardHeader>
						<CardContent className="my-8">
							<div className="space-y-2">
								<Label htmlFor={fields.email.id}>Email</Label>
								<Input
									{...getInputProps(fields.email, { type: "email" })}
									className="border-border bg-background"
									placeholder="johndoe@example.com"
								/>
								<FormError errors={fields.email.errors} />
							</div>
							<FormError errors={form.errors} />
						</CardContent>
						<CardFooter>
							<div className="flex w-full justify-end">
								<div className="flex gap-6">
									<Button asChild variant={"outline"}>
										<Link to={"/auth/signin"}>Cancel</Link>
									</Button>
									<Button disabled={isSubmitting} type="submit">
										Recover password
										{isSubmitting ? (
											<Icons.loader2 className="ml-2 animate-spin" />
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
