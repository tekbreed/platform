import { data, Form, useSearchParams } from "react-router"

// import { generateMetadata } from "~/utils/meta";
import { HoneypotInputs } from "remix-utils/honeypot/react"

import { getFormProps, getInputProps, useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod/v4"
import { motion } from "framer-motion"
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

import { requireAnonymous } from "@repo/utils/auth.server"
import { getImgSrc, useIsPending } from "@repo/utils/misc"
import { RememberMeSchema } from "@repo/utils/user-validation"
import { verifySessionStorage } from "@repo/utils/verification.server"

import type { Route } from "./+types/index"
import { handleProviderOnboarding, requireData } from "./provider.server"

export const providerIdKey = "providerId"
export const prefilledProfileKey = "prefilledProfile"

export const OnboardingSchema = z.object({
	imageUrl: z.string().optional(),
	name: z.string({ error: "Name is required" }),
	redirectTo: z.string().optional(),
	rememberMe: RememberMeSchema,
})

export async function loader({ request, params }: Route.LoaderArgs) {
	await requireAnonymous(request)
	const { email } = await requireData({ request, params })
	const verifySession = await verifySessionStorage.getSession(
		request.headers.get("cookie"),
	)
	const prefilledProfile = verifySession.get(prefilledProfileKey)

	return data({
		email,
		status: "idle",
		submission: {
			initialValue: (prefilledProfile ?? {}) as Record<string, unknown>,
		},
	})
}

export async function action({ request, params }: Route.ActionArgs) {
	return handleProviderOnboarding(request, params)
}

export default function OnboardingProvider({
	actionData,
	loaderData,
}: Route.ComponentProps) {
	// const metadata = generateMetadata({ title: "Onboarding" });
	const isSubmitting = useIsPending()
	const [searchParams] = useSearchParams()
	const redirectTo = searchParams.get("redirectTo")
	const email = loaderData.email

	const [form, fields] = useForm({
		id: "onboarding-provider",
		lastResult: actionData,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: OnboardingSchema })
		},
		shouldValidate: "onSubmit",
		defaultValue: { redirectTo },
	})

	return (
		<>
			{/* {metadata} */}
			<div className="flex min-h-screen items-center justify-center">
				<motion.div
					animate={{ opacity: 1, y: 0 }}
					className="relative z-10 w-full max-w-md"
					initial={{ opacity: 0, y: 20 }}
					transition={{ duration: 0.5 }}
				>
					<Card className="border-0 bg-card/80 shadow-xl backdrop-blur-sm">
						<CardHeader className="text-center">
							<div className="mx-auto flex w-full items-center justify-center pb-4">
								<img
									alt="TekBreed"
									className="size-10"
									src={getImgSrc({ fileKey: "tekbreedlogo.png" })}
								/>
							</div>
							<CardTitle className="text-xl">Welcome aboard {email}</CardTitle>
							<CardDescription>Please enter your details</CardDescription>
						</CardHeader>

						<CardContent className="space-y-6">
							<Form {...getFormProps(form)} className="space-y-4" method="post">
								<input
									{...getInputProps(fields.redirectTo, { type: "hidden" })}
								/>
								<HoneypotInputs />
								<div className="space-y-2">
									<Label htmlFor={fields.name.id}>Name</Label>
									<Input
										{...getInputProps(fields.name, { type: "text" })}
										placeholder="Tony Max"
									/>
									<FormError errors={fields.name.errors} />
								</div>
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
								</div>
								<Button
									aria-label="Create account"
									className="w-full"
									disabled={isSubmitting}
									type="submit"
								>
									Create account{" "}
									{isSubmitting ? (
										<Icons.loader2 className="ml-2 animate-spin" />
									) : null}
								</Button>
								<FormError errors={form.allErrors.root || form.errors} />
							</Form>
						</CardContent>
					</Card>
				</motion.div>
			</div>
		</>
	)
}
