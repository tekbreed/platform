import { Button } from '@repo/ui/components/button'
import { ThemeToggle } from '@repo/ui/composed/theme-toggle'
import { getImgSrc } from '@repo/utils/misc'
import { ArrowRight, Code2, GraduationCap } from 'lucide-react'

export function HeroSection() {
	const scrollToWaitlist = () => {
		document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
	}

	const scrollToLearnMore = () => {
		document.getElementById('learn-more')?.scrollIntoView({ behavior: 'smooth' })
	}

	return (
		<section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 py-20 sm:py-32">
			<div className="absolute inset-0 bg-[url('/wl.jpg')] opacity-5"></div>
			<div className="relative mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<div className="mb-8 flex justify-between gap-6 items-center">
						<div className="flex items-center gap-3 mb-6">
							<div className="flex size-16 p-2  items-center justify-center rounded-xl  ring-2 ring-gray-500">
								<img src={getImgSrc({ fileKey: 'tekbreedlogo.png' })} alt="TekBreed" />
							</div>
							<div className="text-left">
								<img
									src={getImgSrc({ fileKey: 'tekbreedtext.png' })}
									alt="TekBreed"
									className="h-8"
								/>
								<p className="text-sm text-muted-foreground italic">
									Breeding the next generation of software engineers
								</p>
							</div>
						</div>
						<ThemeToggle />
					</div>

					<div className="mb-8 flex justify-center">
						<div className="relative rounded-full px-3 py-1 text-sm leading-6 text-muted-foreground ring-1 ring-border hover:ring-primary/20 transition-colors">
							<span className="text-primary font-medium">Coming Soon</span> -
							AI-powered learning platform
						</div>
					</div>

					<h2 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-6xl">
						Transform Your{' '}
						<span className="text-muted-foreground">Coding Skills</span>
					</h2>

					<p className="mt-6 text-lg leading-8 text-muted-foreground max-w-3xl mx-auto text-pretty">
						Transform your coding skills with our AI-powered learning platform.
						Accelerate your journey from beginner to professional developer with our
						comprehensive AI learning ecosystem.
					</p>

					<p className="mt-4 text-base leading-7 text-muted-foreground max-w-4xl mx-auto text-pretty">
						Get contextually-aware tutorials and courses powered by RAG/CR technology,
						real-time code reviews, monthly coding challenges, and access to an
						advanced software engineering AI assistant trained on your learning
						progress.
					</p>

					<p className="mt-4 text-base leading-7 text-muted-foreground max-w-3xl mx-auto text-pretty">
						Whether you're starting out or advancing your career, our platform adapts
						to your pace and provides the depth serious developers need.
					</p>

					<div className="mt-10 flex items-center justify-center gap-x-6">
						<Button
							size="lg"
							onClick={scrollToWaitlist}
							className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold"
						>
							Join the Waitlist
							<ArrowRight className="ml-2 h-5 w-5" />
						</Button>
						<Button
							variant="outline"
							size="lg"
							className="px-8 py-3 text-lg bg-transparent"
							onClick={scrollToLearnMore}
						>
							<Code2 className="mr-2 h-5 w-5" />
							Learn More
						</Button>
					</div>

					<div className="mt-16 flow-root sm:mt-24">
						<div className="relative rounded-xl bg-card/50 p-2 ring-1 ring-border backdrop-blur-sm">
							<img
								src="/favicon.png"
								alt="Platform Preview"
								className="rounded-lg shadow-2xl ring-1 ring-border"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
