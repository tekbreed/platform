import { data, Form, Link } from "react-router"

import { HoneypotInputs } from "remix-utils/honeypot/react"

import { getFormProps, getInputProps, useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod/v4"
import { StatusCodes } from "http-status-codes"
import { z } from "zod/v4"

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

import { getPasswordHash, requireUser } from "@repo/utils/auth/auth.server"
import { PasswordSchema } from "@repo/utils/auth/user-validation"
import { checkHoneypot } from "@repo/utils/honeypot.server"
import { generateMetadata } from "@repo/utils/meta"
import { useIsPending } from "@repo/utils/misc"
import { redirectWithToast } from "@repo/utils/toast.server"

import { prisma } from "@repo/database/client"

import type { Route } from "./+types/create-password"

export const CreatePasswordSchema = z
	.object({
		password: PasswordSchema,
		confirmPassword: PasswordSchema,
	})
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				path: ["confirmPassword"],
				code: "custom",
				message: "Passwords must match",
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
		schema: CreatePasswordSchema,
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
	const newPassword = await prisma.password.create({
		data: {
			hash: await getPasswordHash(password),
			user: { connect: { id: user.id } },
		},
		select: { userId: true },
	})

	if (!newPassword) {
		return data({ status: "error", ...submission.reply() } as const, {
			status: StatusCodes.INTERNAL_SERVER_ERROR,
		})
	}
	throw await redirectWithToast("/profile", {
		title: "Password created",
		description: "You have successfully created your password",
		type: "success",
	})
}

export default function CreatePasswordRoute({
	actionData,
}: Route.ComponentProps) {
	const metadata = generateMetadata({ title: "Create Password" })
	const isCreaating = useIsPending()
	const [form, fields] = useForm({
		id: "create-password",
		lastResult: actionData,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: CreatePasswordSchema })
		},
		shouldValidate: "onSubmit",
	})
	return (
		<>
			{metadata}
			<div className="!h-[90%] flex">
				<Card className="m-auto w-full max-w-md bg-card/80 shadow-xl backdrop-blur-sm">
					<Form {...getFormProps(form)} method="post">
						<HoneypotInputs />
						<CardHeader>
							<CardTitle>Create a password</CardTitle>
						</CardHeader>
						<CardContent className="my-8 space-y-6">
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
									<Button disabled={isCreaating} type="submit">
										Create{" "}
										{isCreaating ? (
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
