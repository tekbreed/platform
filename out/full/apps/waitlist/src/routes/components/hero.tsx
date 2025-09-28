import { Button } from '@repo/ui/components/button'
import { ThemeToggle } from '@repo/ui/composed/theme-toggle'
import { getImgSrc } from '@repo/utils/misc'
import { ArrowRight, Code2 } from 'lucide-react'

export function HeroSection() {
	const scrollToWaitlist = () => {
		document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
	}

	function scrollToLearnMore() {
		document.getElementById('learn-more')?.scrollIntoView({ behavior: 'smooth' })
	}

	return (
		<section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 py-12 sm:py-20 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-indigo-950/20">
			<div className="absolute inset-0 bg-[url('/wl.jpg')] opacity-5"></div>
			<div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-indigo-600/5"></div>
			<div className="relative mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-4xl text-center"></div>
				<div className="mb-8 flex items-center justify-evenly">
					<div className="mb-6 flex items-center gap-3">
						<div className="flex h-16 w-16 items-center justify-center rounded-xl shadow-lg ring-2 ring-blue-500/30">
							<img
								src={getImgSrc({ fileKey: 'tekbreedlogo.png' })}
								width={48}
								className="h-12 w-12"
							/>
						</div>
						<div className="text-left">
							<img src={getImgSrc({ fileKey: 'tekbreedtext.png' })} width={120} />

							<p className="text-muted-foreground text-sm italic">
								Breeding the next generation of software engineers
							</p>
						</div>
					</div>
					<ThemeToggle />
				</div>

				<div className="mb-8 flex justify-center">
					<div className="text-muted-foreground relative rounded-full bg-background px-4 py-2 text-sm leading-6 ring-1 ring-blue-500/30 transition-all duration-300 hover:shadow-lg hover:ring-blue-500/50 dark:from-blue-950/30 dark:to-purple-950/30">
						<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-semibold text-transparent">
							Coming Soon
						</span>{' '}
						- AI-powered learning platform
					</div>
				</div>

				<h2 className="text-foreground text-balance text-center text-3xl font-bold tracking-tight sm:text-4xl lg:text-6xl">
					Transform Your{' '}
					<span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
						Coding Skills
					</span>
				</h2>

				<p className="text-muted-background mx-auto mt-6 max-w-3xl text-pretty text-center text-lg leading-8">
					Accelerate your journey from beginner to professional developer with our
					comprehensive AI-powered learning ecosystem designed for serious
					developers.
				</p>

				<p className="text-muted-background mx-auto mt-4 max-w-3xl text-pretty text-center text-base leading-7">
					Get personalized tutorials and courses powered by advanced AI technology,
					monthly coding challenges, and access to an intelligent software
					engineering assistant that adapts to your learning progress.
				</p>

				<p className="text-muted-background mx-auto mt-4 max-w-3xl text-pretty text-center text-base leading-7">
					Whether you&apos;re starting out or advancing your career, our platform
					provides the depth and flexibility that serious developers need to succeed.
				</p>

				<div className="mt-10 flex items-center justify-center gap-x-6">
					<Button
						size="lg"
						onClick={scrollToWaitlist}
						className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
					>
						Join the Waitlist
						<ArrowRight className="ml-2 h-5 w-5" />
					</Button>
					<Button
						variant="outline"
						size="lg"
						className="border-2 border-blue-500/30 bg-transparent px-8 py-3 text-lg transition-all duration-300 hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-blue-950/20"
						onClick={scrollToLearnMore}
					>
						<Code2 className="mr-2 h-5 w-5" />
						Learn More
					</Button>
				</div>

				<div className="mt-16 flow-root sm:mt-24">
					<div className="relative rounded-xl bg-gradient-to-br from-blue-50/50 to-purple-50/50 p-2 shadow-xl ring-1 ring-blue-500/20 backdrop-blur-sm dark:from-blue-950/30 dark:to-purple-950/30">
						<img
							src="/favicon.png"
							alt="Platform Preview"
							className="rounded-lg shadow-2xl ring-1 ring-blue-500/20"
						/>
					</div>
				</div>
			</div>
		</section>
	)
}
