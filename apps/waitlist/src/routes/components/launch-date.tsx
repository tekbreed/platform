import { Card, CardContent } from '@repo/ui/components/card'
import { Calendar, Clock, Users, Rocket } from 'lucide-react'

export function LaunchDateSection() {
	return (
		<div className="bg-background py-16">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-3xl text-center">
					<h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl text-balance">
						Official Platform Launch
					</h2>
					<p className="mt-4 text-lg text-muted-foreground text-pretty">
						Mark your calendar for the full TekBreed experience
					</p>
				</div>

				<div className="mt-12">
					<Card className="mx-auto max-w-2xl bg-card border-border shadow-lg">
						<CardContent className="p-8 text-center">
							<div className="flex justify-center mb-6">
								<div className="rounded-full bg-muted p-4">
									<Rocket className="h-8 w-8 text-primary" />
								</div>
							</div>

							<div className="space-y-2">
								<h3 className="text-2xl font-bold text-primary">February 1st, 2026</h3>
								<p className="text-muted-foreground">First Modules Launch</p>
							</div>

							<div className="mt-6 pt-6 border-t border-border">
								<p className="text-sm text-muted-foreground">
									Launch includes Articles, Tutorials, and AI Learning Assistant
								</p>
							</div>
						</CardContent>
					</Card>

					{/* Launch Details Grid */}
					<div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
						<Card className="bg-card border-border">
							<CardContent className="p-6 text-center">
								<Calendar className="h-6 w-6 text-primary mx-auto mb-3" />
								<h4 className="font-semibold text-primary mb-2">Launch Timeline</h4>
								<p className="text-sm text-muted-foreground">
									Early modules start in 4 months (February 1st, 2026)
								</p>
							</CardContent>
						</Card>

						<Card className="bg-card border-border">
							<CardContent className="p-6 text-center">
								<Users className="h-6 w-6 text-primary mx-auto mb-3" />
								<h4 className="font-semibold text-primary mb-2">Early Access</h4>
								<p className="text-sm text-muted-foreground">
									Waitlist members get priority access to beta features
								</p>
							</CardContent>
						</Card>

						<Card className="bg-card border-border">
							<CardContent className="p-6 text-center">
								<Clock className="h-6 w-6 text-primary mx-auto mb-3" />
								<h4 className="font-semibold text-primary mb-2">Stay Updated</h4>
								<p className="text-sm text-muted-foreground">
									Regular updates on development progress and feature releases
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	)
}
