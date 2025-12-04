import { Iframe } from "@repo/ui/composed/markdown/components/media"

export function ActionVideo() {
	return (
		<section className="w-full bg-muted/30 py-16">
			<div className="container mx-auto w-full">
				<div className="mx-auto max-w-4xl text-center">
					<h2 className="mb-4 font-bold text-3xl tracking-tight">
						See our AI Learning Assistant in Action
					</h2>
					<p className="mb-8 text-lg text-muted-foreground">
						Watch how our AI-powered platform transforms your learning
						experience
					</p>
					<Iframe className="rounded-md" type="youtube" videoId="pBASqUbZgkY" />
				</div>
			</div>
		</section>
	)
}
