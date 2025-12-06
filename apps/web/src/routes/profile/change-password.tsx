import { data, Form, Link } from "react-router"

import { HoneypotInputs } from "remix-utils/honeypot/react"

import { getFormProps, getInputProps, useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod/v4"
import { StatusCodes } from "http-status-codes"
import { z } from "zod/v4"

import { prisma } from "@repo/database/client"

import { Button } from "@repo/ui/components/button"
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/card"
import { Input } from "@repo/ui/components/input"
import { Label } from "@repo/ui/components/label"
import { FormError } from "@repo/ui/composed/form-error"
import { Icons } from "@repo/ui/composed/icons"

import {
	getPasswordHash,
	requireUser,
	verifyUserPassword,
} from "@repo/utils/auth/auth.server"
import { PasswordSchema } from "@repo/utils/auth/user-validation"
import { checkHoneypot } from "@repo/utils/honeypot.server"
import { useIsPending } from "@repo/utils/misc"
import { redirectWithToast } from "@repo/utils/toast.server"

import type { Route } from "./+types/change-password"

export const UpdatePasswordSchema = z
	.object({
		currentPassword: PasswordSchema,
		password: PasswordSchema,
		confirmPassword: PasswordSchema,
	})
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				path: ["confirmPassword"],
				code: "custom",
				message: "The passwords must match",
			})
		}
	})

export async function loader({ request }: Route.LoaderArgs) {
	const user = await requireUser(request)
	return { user }
}

export async function action({ request }: Route.ActionArgs) {
	const user = await requireUser(request)
	const formData = await request.formData()
	await checkHoneypot(formData)
	const submission = await parseWithZod(formData, {
		schema: UpdatePasswordSchema.superRefine(async (data, ctx) => {
			const isValid = await verifyUserPassword(
				{ email: user.email },
				data.currentPassword,
			)
			if (!isValid) {
				ctx.addIssue({
					path: ["currentPassword"],
					code: "custom",
					message: "Incorrect current password.",
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

	const { password } = submission.value
	const update = await prisma.password.update({
		where: { userId: user.id },
		select: { userId: true },
		data: {
			hash: await getPasswordHash(password),
		},
	})

	if (!update) {
		return data({ status: "error", ...submission.reply() } as const, {
			status: StatusCodes.INTERNAL_SERVER_ERROR,
		})
	}
	throw await redirectWithToast("/profile", {
		title: "Password updated",
		description: "You have successfully updated your password",
		type: "success",
	})
}

export default function ResetPasswordRoute({
	actionData,
}: Route.ComponentProps) {
	// const metadata = generateMetadata({ title: "Update Password" });

	const isUpdating = useIsPending()
	const [form, fields] = useForm({
		id: "update-password",
		lastResult: actionData,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: UpdatePasswordSchema })
		},
		shouldValidate: "onSubmit",
	})
	return (
		<>
			{/* {metadata} */}
			<div className="mx-auto w-full max-w-lg">
				<Card className="w-full bg-card/80 shadow-xl backdrop-blur-sm">
					<Form {...getFormProps(form)} method="post">
						<HoneypotInputs />
						<CardHeader>
							<CardTitle>Update your password</CardTitle>
						</CardHeader>
						<CardContent className="my-8 space-y-6">
							<div className="space-y-2">
								<Label htmlFor={fields.currentPassword.id}>
									Current password
								</Label>
								<Input
									{...getInputProps(fields.currentPassword, {
										type: "password",
									})}
									className="border-border bg-background"
									placeholder="••••••"
								/>
								<FormError errors={fields.currentPassword.errors} />
							</div>
							<div className="space-y-2">
								<Label htmlFor={fields.password.id}>New Password</Label>
								<Input
									{...getInputProps(fields.password, { type: "password" })}
									className="border-border bg-background"
									placeholder="••••••"
								/>
								<FormError errors={fields.password.errors} />
							</div>
							<div className="space-y-2">
								<Label htmlFor={fields.confirmPassword.id}>
									Confirm new password
								</Label>
								<Input
									{...getInputProps(fields.confirmPassword, {
										type: "password",
									})}
									className="border-border bg-background"
									placeholder="••••••"
								/>
								<FormError errors={fields.confirmPassword.errors} />
							</div>
							<FormError errors={form.errors} />
						</CardContent>
						<CardFooter>
							<div className="flex w-full justify-end">
								<div className="flex gap-6">
									<Button asChild variant={"outline"}>
										<Link to={"/profile"}>Cancel</Link>
									</Button>
									<Button disabled={isUpdating} type="submit">
										Change{" "}
										{isUpdating ? (
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
