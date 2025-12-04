"use client"

import { useFetcher } from "react-router"

import { HoneypotInputs } from "remix-utils/honeypot/react"

import { getFormProps, getInputProps, useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod/v4"

import { Button } from "@repo/ui/components/button"
import { Input } from "@repo/ui/components/input"
import { FormError } from "@repo/ui/composed/form-error"
import { Icons } from "@repo/ui/composed/icons"
import { SubscriptionSchema } from "@repo/ui/composed/subscription-forms"
import { cn } from "@repo/ui/lib/utils"

export function SubscriptionForm() {
	const fetcher = useFetcher()
	const isSubscribed = fetcher.data?.response?.status === "success"

	const [form, fields] = useForm({
		id: "waitlist-form",
		lastResult: fetcher?.data?.result,
		defaultValue: {
			intent: "waitlist",
		},
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: SubscriptionSchema })
		},
		shouldValidate: "onSubmit",
	})

	return (
		<section className={cn("relative overflow-hidden py-24")} id="waitlist">
			<div className="container relative z-10 mx-auto px-4">
				<div className="mx-auto max-w-3xl rounded-lg text-center">
					{!isSubscribed ? (
						<>
							<div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/50 px-4 py-2 backdrop-blur-sm">
								<Icons.sparkles className="h-4 w-4 text-primary" />
								<span className="font-medium text-sm">Join the Waitlist</span>
							</div>

							<h2 className="mb-4 font-bold text-3xl tracking-tight sm:text-4xl">
								Be the First to Experience the Future of Learning
							</h2>

							<p className="mb-8 text-lg text-muted-foreground">
								Get early access to our AI-powered learning platform. Join
								thousands of developers already on the waitlist.
							</p>
						</>
					) : null}

					{isSubscribed ? (
						<div className="mx-auto max-w-md rounded-2xl border bg-background/80 backdrop-blur-sm">
							<div className="mb-4 flex justify-center">
								<div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
									<Icons.check className="h-8 w-8 text-green-500" />
								</div>
							</div>
							<h3 className="mb-2 font-semibold text-xl">
								You're on the list!
							</h3>
							<p className="text-muted-foreground text-sm">
								We'll notify you when we launch. Check your email for
								confirmation.
							</p>
						</div>
					) : (
						<fetcher.Form
							{...getFormProps(form)}
							action="/subscribe"
							className="mx-auto max-w-md space-y-4"
							method="post"
						>
							<HoneypotInputs />

							<div className="flex flex-col gap-3 sm:flex-row">
								<div className="flex-1">
									<Input
										{...getInputProps(fields.name, { type: "text" })}
										className="h-12"
										placeholder="Your name (optional)"
									/>
									<FormError errors={fields.name.errors} />
								</div>
							</div>

							<div className="flex flex-col gap-3 sm:flex-row">
								<div className="flex-1">
									<Input
										{...getInputProps(fields.email, { type: "email" })}
										className="h-12"
										placeholder="Enter your email"
									/>
									<FormError errors={fields.email.errors} />
								</div>
								<Button
									className="h-12 px-8"
									disabled={fetcher.state !== "idle"}
									type="submit"
								>
									{fetcher.state !== "idle" ? (
										<>
											<Icons.spinner className="-ml-1 mr-2 h-4 w-4" />
											Joining...
										</>
									) : (
										"Join Waitlist"
									)}
								</Button>
							</div>

							<p className="text-muted-foreground text-xs">
								By joining, you agree to receive updates about our platform.
								Unsubscribe anytime.
							</p>
							<FormError errors={form.allErrors.root || form.errors} />
						</fetcher.Form>
					)}
				</div>
			</div>
		</section>
	)
}
