import { Form, Link, useSearchParams } from "react-router"

import { HoneypotInputs } from "remix-utils/honeypot/react"

import { getFormProps, getInputProps, useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod/v4"
import { z } from "zod/v4"

import { Button } from "@repo/ui/components/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/card"
import { Input } from "@repo/ui/components/input"
import { Label } from "@repo/ui/components/label"
import { FormError } from "@repo/ui/composed/form-error"
import { Icons } from "@repo/ui/composed/icons"

import {
	AccountTypeSchema,
	EmailSchema,
	PasswordSchema,
	RememberMeSchema,
} from "@repo/utils/auth/user-validation"
import { useSmartGoBack } from "@repo/utils/hooks/use-smart-go-back"
import { getImgSrc, useIsPending } from "@repo/utils/misc"

import type { Route as SigninRoute } from "../routes/auth/signin/+types/index"
import type { Route as SignupRoute } from "../routes/auth/signup/+types/index"
import { ConnectionForm } from "./connection-form"
import { FormConsent } from "./form-consent"

const AuthFormSchema = z.object({
	email: EmailSchema,
	password: PasswordSchema.optional(),
	accountType: AccountTypeSchema.optional(),
	redirectTo: z.string().optional(),
	rememberMe: RememberMeSchema,
})

export const SignupSchema = AuthFormSchema.omit({
	password: true,
})

export const SigninSchema = AuthFormSchema.omit({
	accountType: true,
})

export type Action = "signin" | "signup"

const formContent = {
	title: {
		signin: "Welcome Back",
		signup: "Let's Begin",
	},
	description: {
		signin: "Please enter your credentials",
		signup: "Enter your email to continue",
	},
	redirect: {
		signin: "Don't have an account?",
		signup: "Already have an account?",
	},
	button: {
		signin: "Sign In",
		signup: "Submit",
	},
}

export function AuthForm({
	action,
	actionData,
}: {
	action: Action
	actionData:
		| SignupRoute.ComponentProps["actionData"]
		| SigninRoute.ComponentProps["actionData"]
}) {
	const isSignin = action === "signin"

	const isSubmitting = useIsPending()
	const goBack = useSmartGoBack()
	const [searchParams] = useSearchParams()

	const redirectTo = searchParams.get("redirectTo") ?? ""
	const [form, fields] = useForm({
		id: `${action}-form`,
		lastResult: actionData,
		defaultValue: { redirectTo },
		onValidate({ formData }) {
			return parseWithZod(formData, {
				schema: AuthFormSchema,
			})
		},
		shouldValidate: "onSubmit",
	})
	return (
		<div className="relative z-10 w-full max-w-md">
			<Button className="mb-4" onClick={() => goBack("/")} variant="link">
				<Icons.arrowLeft className="h-6 w-8" /> Back
			</Button>
			<Card className="border-0 bg-card/80 shadow-xl backdrop-blur-sm">
				<FormHeader action={action} />
				<CardContent className="space-y-4">
					<Form
						{...getFormProps(form)}
						action={`/auth/${action}`}
						className="space-y-4"
						method="post"
					>
						<HoneypotInputs />
						<input {...getInputProps(fields.redirectTo, { type: "hidden" })} />
						<div className="space-y-2">
							<Label htmlFor={fields.email.id}>Email</Label>
							<Input
								{...getInputProps(fields.email, { type: "email" })}
								placeholder="tonymax@tekbreed.com"
							/>
							<FormError errors={fields.email.errors} />
						</div>
						{isSignin ? (
							<div className="space-y-2">
								<Label htmlFor={fields.password.id}>Password</Label>

								<Input
									{...getInputProps(fields.password, {
										type: "password",
									})}
									placeholder="••••••"
								/>

								<FormError errors={fields.password.errors} />
							</div>
						) : null}
						{isSignin ? (
							<div className="flex justify-between">
								<Label
									className="flex items-center gap-2 text-muted-foreground text-sm"
									htmlFor={fields.rememberMe.id}
								>
									<input
										{...getInputProps(fields.rememberMe, {
											type: "checkbox",
										})}
										className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
									/>
									Remember Me
								</Label>

								<Link
									className="text-blue-700 text-sm dark:text-blue-500"
									to={"/auth/forgot-password"}
								>
									Forgot your password?
								</Link>
							</div>
						) : null}
						<Button
							aria-label={formContent.button[action]}
							className="w-full"
							disabled={isSubmitting}
							type="submit"
						>
							{formContent.button[action]}
							{isSubmitting ? (
								<Icons.loader2 className="ml-2 animate-spin" />
							) : null}
						</Button>
						<FormError
							className="-mt-3"
							errors={form.allErrors.root || form.errors}
						/>
					</Form>
					<FormFooter action={action} />
				</CardContent>
			</Card>
		</div>
	)
}

function FormHeader({ action }: { action: Action }) {
	return (
		<CardHeader className="text-center">
			<div className="mx-auto flex w-full items-center justify-center pb-4">
				<img
					alt="TekBreed"
					className="size-10"
					src={getImgSrc({ fileKey: "tekbreedlogo.png" })}
				/>
			</div>
			<CardTitle className="text-2xl">{formContent.title[action]}</CardTitle>
			<CardDescription>{formContent.description[action]}</CardDescription>
		</CardHeader>
	)
}

function FormFooter({ action }: { action: Action }) {
	return (
		<>
			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<div className="w-full border-border border-t"></div>
				</div>
				<div className="relative flex justify-center text-sm">
					<span className="rounded-md bg-background px-2 text-muted-foreground">
						OR
					</span>
				</div>
			</div>
			<div className="w-full">
				<ConnectionForm
					action={action}
					providerName="github"
					// redirectTo={redirectTo}
				/>
			</div>
			<div className="text-center">
				<p className="text-muted-foreground text-sm">
					{formContent.redirect[action]}{" "}
					<Link
						className="font-medium text-blue-600 hover:underline dark:text-blue-400"
						to={{
							pathname: action === "signin" ? "/auth/signup" : "/auth/signin",
						}}
					>
						{action === "signin" ? "Sign up" : "Sign in"}
					</Link>
				</p>
			</div>
			<FormConsent action={action} />
		</>
	)
}
