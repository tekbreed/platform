import { useFetcher, useLoaderData } from "react-router"

import { HoneypotInputs } from "remix-utils/honeypot/react"

import { getFormProps, getInputProps, useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod/v4"
import { CheckCircle, Loader2 } from "lucide-react"

import { Button } from "@repo/ui/components/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/card"
import { Input } from "@repo/ui/components/input"
import { FormError } from "@repo/ui/composed/form-error"
import { SubscriptionSchema } from "@repo/ui/composed/subscription-forms"

import type { Route } from "../+types/home"

export function FormSection() {
	const loaderData = useLoaderData<Route.ComponentProps["loaderData"]>()
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
		<section className="bg-background py-24 sm:py-32" id="waitlist">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="text-balance font-bold text-3xl text-foreground tracking-tight. sm:text-4xl">
						Be the first to experience the future
					</h2>
					<p className="mt-6 text-pretty text-lg text-muted-foreground leading-8">
						Join our exclusive waitlist and get early access to the platform
						that will transform how you build software. Plus, receive a special
						launch discount when we go live
					</p>
				</div>

				<div className="mx-auto mt-16 max-w-xl">
					<Card className="border-border bg-card shadow-xl">
						{!isSubscribed ? (
							<CardHeader className="text-center">
								<CardTitle className="font-bold text-2xl text-foreground">
									Join the Waitlist
								</CardTitle>
								<CardDescription className="text-muted-foreground">
									Get notified when we launch and receive exclusive early access
								</CardDescription>
							</CardHeader>
						) : null}
						<CardContent>
							{isSubscribed ? (
								<div className="py-8 text-center">
									<CheckCircle className="mx-auto mb-4 h-16 w-16 text-primary" />
									<h3 className="mb-2 font-semibold text-foreground text-xl">
										You&apos;re on the list!
									</h3>
									<p className="text-muted-foreground">
										We&apos;ll notify you as soon as we launch. Thanks for your
										interest!
									</p>
								</div>
							) : (
								<fetcher.Form
									{...getFormProps(form)}
									action="/?index"
									className="space-y-6"
									method="post"
								>
									<HoneypotInputs />
									<div className="space-y-4">
										<div className="w-full">
											<Input
												{...getInputProps(fields.name, { type: "text" })}
												className="mb-2 flex h-12 w-full rounded-lg border-2 px-6 py-2 text-sm file:border-0 file:bg-transparent file:font-medium file:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed"
												placeholder="Tony Max"
											/>
											<FormError errors={fields.name.errors} />
										</div>
										<div className="w-full">
											<Input
												{...getInputProps(fields.email, { type: "email" })}
												className="mb-2 flex h-12 w-full rounded-lg border-2 px-6 py-2 text-sm file:border-0 file:bg-transparent file:font-medium file:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed"
												placeholder="tonymax@tekbreed.com"
											/>
											<FormError errors={fields.email.errors} />
										</div>
									</div>

									<Button
										className="h-12 w-full bg-primary font-semibold text-base text-primary-foreground hover:bg-primary/90"
										disabled={fetcher.state !== "idle"}
										type="submit"
									>
										Join the Waitlist
										{fetcher.state !== "idle" ? (
											<Loader2 className="ml-2 animate-spin" />
										) : null}
									</Button>

									<p className="text-center text-muted-foreground text-xs">
										By joining, you agree to receive updates about our platform.
										We respect your privacy and will never spam you.
									</p>
									<FormError errors={form.allErrors.root || form.errors} />
								</fetcher.Form>
							)}
						</CardContent>
					</Card>
				</div>

				<div className="mx-auto mt-16 max-w-4xl">
					<div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
						<div className="text-center">
							<div className="font-bold text-3xl text-primary">
								{loaderData.subscribers &&
								"data" in loaderData.subscribers &&
								loaderData.subscribers.data &&
								"data" in loaderData.subscribers.data &&
								Array.isArray(loaderData.subscribers.data.data) &&
								loaderData.subscribers.data.data.length
									? loaderData.subscribers.data.data.length.toLocaleString()
									: "13"}
							</div>
							<div className="text-muted-foreground text-sm">
								Developer
								{loaderData.subscribers?.data?.data?.length === 1 ? "" : "s"}{" "}
								waiting
							</div>
						</div>
						<div className="text-center">
							<div className="font-bold text-3xl text-primary">100%</div>
							<div className="text-muted-foreground text-sm">
								Launch discount
							</div>
						</div>
						<div className="text-center">
							<div className="font-bold text-3xl text-primary">Q1 2026</div>
							<div className="text-muted-foreground text-sm">
								Expected launch
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
