import { cn } from "@repo/ui/lib/utils"

export function SubscriptionForm() {
	return (
		<section className={cn("relative overflow-hidden bg-background py-24")}>
			<div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-background" />
			<div className="container relative z-10 mx-auto px-4">
				<div className="mx-auto max-w-3xl text-center">
					<SubscriptionForm />
				</div>
			</div>
		</section>
	)
}
