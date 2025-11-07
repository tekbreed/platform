import { Form, Link } from "react-router"

// import { generateMetadata } from "~/utils/meta";
import { HoneypotInputs } from "remix-utils/honeypot/react"

import { getFormProps, getInputProps, useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod/v4"
import { motion } from "framer-motion"

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
import { checkHoneypot } from "@repo/utils/honeypot.server"
import { useIsPending } from "@repo/utils/misc"
import { PasswordAndConfirmPasswordSchema } from "@repo/utils/user-validation"

import type { Route } from "./+types/index"
import { handlePasswordReset } from "./action.server"
import { requireResetPasswordEmail } from "./loader.server"

export const ResetPasswordSchema = PasswordAndConfirmPasswordSchema

export async function loader({ request }: Route.LoaderArgs) {
	const resetPasswordEmail = await requireResetPasswordEmail(request)
	return { resetPasswordEmail }
}

export async function action({ request }: Route.ActionArgs) {
	const formData = await request.formData()
	await checkHoneypot(formData)
	return await handlePasswordReset(request, formData)
}

export default function ResetPasswordRoute({
	actionData,
	loaderData,
}: Route.ComponentProps) {
	// const metadata = generateMetadata({ title: "Reset Password" });
	const isUpdating = useIsPending()
	const [form, fields] = useForm({
		id: "reset-password",
		lastResult: actionData,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: ResetPasswordSchema })
		},
		shouldValidate: "onBlur",
	})
	return (
		<>
			{/* {metadata} */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
				className="mx-auto w-full max-w-lg"
			>
				<Card className="w-full bg-card/80 shadow-xl backdrop-blur-sm">
					<Form
						{...getFormProps(form)}
						method="post"
						className="mx-auto w-full space-y-6"
					>
						<HoneypotInputs />
						<CardHeader>
							<CardTitle>Password reset</CardTitle>
							<CardDescription>
								Reset your password {loaderData.resetPasswordEmail}
							</CardDescription>
						</CardHeader>
						<CardContent className="my-8 space-y-6">
							<div className="space-y-2">
								<Label htmlFor={fields.password.id}>New Password</Label>
								<Input
									{...getInputProps(fields.password, { type: "password" })}
									placeholder="••••••"
									className="h-12 border-border bg-background text-lg"
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
									placeholder="••••••"
									className="h-12 border-border bg-background text-lg"
								/>
								<FormError errors={fields.confirmPassword.errors} />
							</div>
							<FormError errors={form.errors} />
						</CardContent>
						<CardFooter>
							<div className="flex w-full justify-end">
								<div className="flex gap-4">
									<Link to={"/forgot-password"}>
										<Button
											type="button"
											variant={"outline"}
											disabled={isUpdating}
										>
											Cancel
										</Button>
									</Link>
									<Button type="submit" disabled={isUpdating}>
										Update{" "}
										{isUpdating ? (
											<Icons.loader2 className="ml-2 animate-spin" />
										) : null}
									</Button>
								</div>
							</div>
						</CardFooter>
					</Form>
				</Card>
			</motion.div>
		</>
	)
}
