"use client"

import { useState } from "react"

import { useFetcher } from "react-router"

import { Mail, Sparkles } from "lucide-react"

import { Button } from "@repo/ui/components/button"
import { Input } from "@repo/ui/components/input"
import { cn } from "@repo/ui/lib/utils"

export function SubscriptionForm() {
	const fetcher = useFetcher()
	const [email, setEmail] = useState("")
	const [name, setName] = useState("")
	const [submitted, setSubmitted] = useState(false)

	const isSubmitting = fetcher.state === "submitting"

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		// Mock submission - in production, this would call your API
		setTimeout(() => {
			setSubmitted(true)
			setEmail("")
			setName("")

			// Reset success message after 5 seconds
			setTimeout(() => setSubmitted(false), 5000)
		}, 1000)
	}

	return (
		<section
			className={cn(
				"relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 py-24",
			)}
		>
			<div className="absolute inset-0 bg-[size:20px_20px] bg-grid-white/5" />
			<div className="container relative z-10 mx-auto px-4">
				<div className="mx-auto max-w-3xl text-center">
					<div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/50 px-4 py-2 backdrop-blur-sm">
						<Sparkles className="h-4 w-4 text-primary" />
						<span className="font-medium text-sm">Join the Waitlist</span>
					</div>

					<h2 className="mb-4 font-bold text-3xl tracking-tight sm:text-4xl">
						Be the First to Experience the Future of Learning
					</h2>

					<p className="mb-8 text-lg text-muted-foreground">
						Get early access to our AI-powered learning platform. Join thousands
						of developers already on the waitlist.
					</p>

					{submitted ? (
						<div className="mx-auto max-w-md rounded-2xl border bg-background/80 p-8 backdrop-blur-sm">
							<div className="mb-4 flex justify-center">
								<div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
									<svg
										className="h-8 w-8 text-green-500"
										fill="none"
										stroke="currentColor"
										strokeWidth={2}
										viewBox="0 0 24 24"
									>
										<title>Success checkmark</title>
										<path
											d="M5 13l4 4L19 7"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
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
						<form
							className="mx-auto max-w-md space-y-4"
							onSubmit={handleSubmit}
						>
							<div className="flex flex-col gap-3 sm:flex-row">
								<div className="relative flex-1">
									<Input
										className="h-12 pr-4 pl-10"
										onChange={(e) => setName(e.target.value)}
										placeholder="Your name (optional)"
										type="text"
										value={name}
									/>
									<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
										<svg
											className="h-5 w-5 text-muted-foreground"
											fill="none"
											stroke="currentColor"
											strokeWidth={2}
											viewBox="0 0 24 24"
										>
											<title>User icon</title>
											<path
												d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</div>
								</div>
							</div>

							<div className="flex flex-col gap-3 sm:flex-row">
								<div className="relative flex-1">
									<Input
										className="h-12 pr-4 pl-10"
										onChange={(e) => setEmail(e.target.value)}
										placeholder="Enter your email"
										required
										type="email"
										value={email}
									/>
									<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
										<Mail className="h-5 w-5 text-muted-foreground" />
									</div>
								</div>
								<Button
									className="h-12 px-8"
									disabled={isSubmitting || !email}
									size="lg"
									type="submit"
								>
									{isSubmitting ? (
										<>
											<svg
												className="-ml-1 mr-2 h-4 w-4 animate-spin"
												fill="none"
												viewBox="0 0 24 24"
											>
												<title>Loading spinner</title>
												<circle
													className="opacity-25"
													cx="12"
													cy="12"
													r="10"
													stroke="currentColor"
													strokeWidth="4"
												/>
												<path
													className="opacity-75"
													d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
													fill="currentColor"
												/>
											</svg>
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
						</form>
					)}
				</div>
			</div>
		</section>
	)
}
