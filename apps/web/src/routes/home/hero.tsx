import React from "react"

import { Await } from "react-router"

import { Badge } from "@repo/ui/components/badge"
import { Button } from "@repo/ui/components/button"
import { BackgroundCanvas } from "@repo/ui/composed/background-canvas"
import { Icons } from "@repo/ui/composed/icons"
import { SmartLink } from "@repo/ui/composed/smart-link"
import { getModuleUrl } from "@repo/utils/constants/client"

import type { HomePageContent } from "../utils/content/types"

export function Hero({ content }: { content: Promise<HomePageContent> }) {
	return (
		<section className="relative min-h-screen overflow-hidden py-24 lg:py-32">
			<BackgroundCanvas />
			<div className="relative z-10 container mx-auto">
				<div className="mx-auto w-full max-w-4xl text-center">
					<React.Suspense
						fallback={
							<Badge variant="secondary" className="mb-8">
								🚀 In Flight
							</Badge>
						}
					>
						<Await resolve={content}>
							{({ latestFeature }) => (
								<Badge variant="secondary" className="mb-8">
									🚀 New: {latestFeature}
								</Badge>
							)}
						</Await>
					</React.Suspense>
					<h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
						Transform your coding skills with{" "}
						<span className="bg-gradient-to-r from-slate-400 to-slate-700 bg-clip-text text-transparent">
							AI-powered learning
						</span>
					</h1>
					<p className="mx-auto mt-12 max-w-2xl text-lg leading-8 text-muted-foreground">
						Transform your programming skills with our intelligent learning
						platform. Get personalized guidance, real-time feedback, and
						contextually-aware assistance powered by advanced RAG technology.
					</p>
					<div className="mt-10 flex flex-col items-center justify-center gap-4">
						{/* Primary CTA - Full width or centered */}
						<div className="flex flex-col gap-4 sm:flex-row">
							<Button size="lg" asChild>
								<SmartLink
									to={getModuleUrl("programs", "courses")}
									className="capitalize"
								>
									<Icons.bookOpen className="mr-2 h-4 w-4" />
									start learning
								</SmartLink>
							</Button>
							<Button variant="outline" size="lg" asChild>
								<SmartLink to="/about" className="flex items-center capitalize">
									learn more
									<Icons.arrowRight className="ml-2 h-4 w-4" />
								</SmartLink>
							</Button>
						</div>

						{/* Secondary CTAs - Balanced 3-column */}
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
							<Button variant="secondary" size="lg" asChild>
								<SmartLink to="/tutorials" className="capitalize">
									<Icons.code className="mr-2 h-4 w-4" />
									tutorials
								</SmartLink>
							</Button>
							<Button variant="secondary" size="lg" asChild>
								<SmartLink to="/articles" className="capitalize">
									<Icons.fileText className="mr-2 h-4 w-4" />
									articles
								</SmartLink>
							</Button>
							<Button variant="secondary" size="lg" asChild>
								<SmartLink
									to={getModuleUrl("challenges")}
									className="capitalize"
								>
									<Icons.trophy className="mr-2 h-4 w-4" />
									challenges
								</SmartLink>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
