import { Quote } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/avatar"

export function FounderQuoteSection() {
	return (
		<section className="bg-card py-24 text-card-foreground">
			<div className="container mx-auto px-4">
				<div className="mx-auto max-w-4xl text-center">
					<Quote className="mx-auto mb-8 h-12 w-12 text-primary" />

					<blockquote className="mb-8 text-2xl leading-relaxed font-medium text-primary md:text-3xl">
						&quot;Every great developer started as a beginner. Our mission is to
						bridge that gap with AI-powered learning that adapts to your pace,
						challenges your thinking, and builds the confidence you need to
						excel in this ever-evolving field.&quot;
					</blockquote>

					<div className="flex flex-col items-center">
						<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
							<Avatar className="h-full w-full">
								<AvatarFallback>CAS</AvatarFallback>
								<AvatarImage src="/csc.png" alt="Christopher Sesugh Aondona" />
							</Avatar>
						</div>
						<cite className="not-italic">
							<div className="text-lg font-semibold text-card-foreground">
								Christopher S. Aondona
							</div>
							<div className="font-medium text-primary">
								Founder & Lead Developer
							</div>
						</cite>
					</div>
				</div>
			</div>
		</section>
	)
}
