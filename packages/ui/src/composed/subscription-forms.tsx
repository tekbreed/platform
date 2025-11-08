import React from "react"

import { useFetcher } from "react-router"

import { HoneypotInputs } from "remix-utils/honeypot/react"

import { getFormProps, getInputProps, useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod/v4"
import { Loader } from "lucide-react"
import { toast } from "sonner"
import { z } from "zod/v4"

import { Button } from "../components/button"
import { Input } from "../components/input"
import { FormError } from "./form-error"

export const SubscriptionSchema = z.object({
	name: z
		.string({ error: "Name is required" })
		.min(2, `Name must be at least 2 characters.`)
		.max(100, `Name must be at most 100 characters.`),
	email: z.email({
		error: "Invalid email address",
	}),
	intent: z.string().optional(),
})

export function SubscriptionForm() {
	const fetcher = useFetcher()
	const [form, fields] = useForm({
		id: "subscription",
		lastResult: fetcher?.data?.result,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: SubscriptionSchema })
		},
		shouldValidate: "onSubmit",
	})

	// biome-ignore lint/correctness/useExhaustiveDependencies: Ignore
	React.useEffect(() => {
		if (fetcher.data?.response?.status === "success") {
			window.setTimeout(() => {
				toast.success("Thank you for subscribing!", {
					description: "Check your email to confirm your subscription.",
				})
				form.reset()
			}, 0)
		}
	}, [fetcher.data?.response?.status])

	return (
		<div className="rounded-2xl border border-border bg-card p-8 shadow-lg md:p-12">
			<h2 className="mb-4 font-bold text-3xl">Stay Updated</h2>
			<p className="mb-4 text-lg text-muted-foreground">
				Subscribe to get notified about new content.
			</p>

			<fetcher.Form
				{...getFormProps(form)}
				action="/subscribe"
				className="mx-auto max-w-lg gap-4 sm:flex-row"
				method="post"
			>
				<HoneypotInputs />
				<div className="mx-auto mb-4 flex flex-col gap-4 md:flex-row">
					<div className="w-full">
						<Input
							{...getInputProps(fields.name, { type: "text" })}
							className="mb-2 flex h-12 w-full rounded-full border-2 px-6 py-2 text-sm file:border-0 file:bg-transparent file:font-medium file:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed"
							name="name"
							placeholder="Tony Max"
						/>
						<FormError errors={fields.name.errors} />
					</div>
					<div className="w-full">
						<Input
							{...getInputProps(fields.email, { type: "email" })}
							className="mb-2 flex h-12 w-full rounded-full border-2 px-6 py-2 text-sm file:border-0 file:bg-transparent file:font-medium file:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed"
							name="email"
							placeholder="tonymax@tekbreed.com"
						/>
						<FormError errors={fields.email.errors} />
					</div>
				</div>
				<Button
					className="h-12 rounded-full px-8"
					disabled={fetcher.state !== "idle"}
					type="submit"
				>
					Subscribe{" "}
					{fetcher.state !== "idle" ? (
						<Loader className="ml-2 animate-spin" />
					) : null}
				</Button>
				<FormError errors={form.allErrors.root || form.errors} />
			</fetcher.Form>

			<p className="mt-4 text-muted-foreground/80 text-sm">
				We respect your privacy. Unsubscribe at any time.
			</p>
		</div>
	)
}
