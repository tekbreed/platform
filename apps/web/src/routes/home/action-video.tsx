import { Iframe } from "@repo/ui/composed/markdown/components/media"

export function ActionVideo() {
	return (
		<section className="w-full bg-muted/30 py-16">
			<div className="container mx-auto w-full">
				<div className="mx-auto max-w-4xl text-center">
					<h2 className="mb-4 text-3xl font-bold tracking-tight">
						See our AI Learning Assistant in Action
					</h2>
					<p className="mb-8 text-lg text-muted-foreground">
						Watch how our AI-powered platform transforms your learning
						experience
					</p>
					<Iframe videoId="pBASqUbZgkY" type="youtube" className="rounded-md" />
				</div>
			</div>
		</section>
	)
}
