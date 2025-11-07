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

	React.useEffect(() => {
		if (fetcher.data?.response?.status === "success") {
			window.setTimeout(() => {
				toast.success("Thank you for subscribing!", {
					description: "Check your email to confirm your subscription.",
				})
				form.reset()
			}, 0)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fetcher.data?.response?.status])

	return (
		<div className="rounded-2xl border border-border bg-card p-8 shadow-lg md:p-12">
			<h2 className="mb-4 text-3xl font-bold">Stay Updated</h2>
			<p className="mb-4 text-lg text-muted-foreground">
				Subscribe to get notified about new content.
			</p>

			<fetcher.Form
				{...getFormProps(form)}
				method="post"
				action="/subscribe"
				className="mx-auto max-w-lg gap-4 sm:flex-row"
			>
				<HoneypotInputs />
				<div className="mx-auto mb-4 flex flex-col gap-4 md:flex-row">
					<div className="w-full">
						<Input
							{...getInputProps(fields.name, { type: "text" })}
							name="name"
							placeholder="Tony Max"
							className="mb-2 flex h-12 w-full rounded-full border-2 px-6 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed"
						/>
						<FormError errors={fields.name.errors} />
					</div>
					<div className="w-full">
						<Input
							{...getInputProps(fields.email, { type: "email" })}
							name="email"
							placeholder="tonymax@tekbreed.com"
							className="mb-2 flex h-12 w-full rounded-full border-2 px-6 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed"
						/>
						<FormError errors={fields.email.errors} />
					</div>
				</div>
				<Button
					type="submit"
					disabled={fetcher.state !== "idle"}
					className="h-12 rounded-full px-8"
				>
					Subscribe{" "}
					{fetcher.state !== "idle" ? (
						<Loader className="ml-2 animate-spin" />
					) : null}
				</Button>
				<FormError errors={form.allErrors.root || form.errors} />
			</fetcher.Form>

			<p className="mt-4 text-sm text-muted-foreground/80">
				We respect your privacy. Unsubscribe at any time.
			</p>
		</div>
	)
}
