/** biome-ignore-all lint/suspicious/noExplicitAny: allow */
"use client"

import { useState } from "react"

import { Bot, Check, Zap } from "lucide-react"

import { Badge } from "@repo/ui/components/badge"
import { Button } from "@repo/ui/components/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/card"
import { Input } from "@repo/ui/components/input"
import { Label } from "@repo/ui/components/label"
import { Switch } from "@repo/ui/components/switch"
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@repo/ui/components/tabs"

const individualPlans = [
	{
		name: "Basic",
		description: "Perfect for beginners",
		price: 19,
		priceWithAI: 29,
		period: "month",
		features: [
			"Access to basic courses",
			"Community support",
			"Progress tracking",
			"Basic certificates",
		],
		aiFeatures: ["Basic AI assistance", "Code suggestions"],
		popular: false,
	},
	{
		name: "Premium",
		description: "Best for serious learners",
		price: 39,
		priceWithAI: 59,
		period: "month",
		features: [
			"All Basic features",
			"Premium courses & specializations",
			"1-on-1 mentoring sessions",
			"Priority support",
			"Advanced certificates",
			"Project reviews",
		],
		aiFeatures: [
			"Advanced AI assistant",
			"Personalized learning paths",
			"AI-powered code reviews",
		],
		popular: true,
	},
	{
		name: "Pro",
		description: "For professional developers",
		price: 79,
		priceWithAI: 119,
		period: "month",
		features: [
			"All Premium features",
			"Exclusive content",
			"Live workshops",
			"Career guidance",
			"Industry certifications",
			"Portfolio reviews",
		],
		aiFeatures: [
			"Pro AI assistant",
			"AI-powered project generation",
			"Advanced analytics",
		],
		popular: false,
	},
]

const teamPlans = [
	{
		name: "Starter",
		description: "Perfect for small teams",
		price: 199,
		priceWithAI: 299,
		period: "month",
		features: [
			"Up to 10 team members",
			"Team dashboard",
			"Basic analytics",
			"Shared learning paths",
			"Team certificates",
		],
		aiFeatures: ["Team AI assistant", "Collaborative AI features"],
		popular: false,
	},
	{
		name: "Pro",
		description: "For growing organizations",
		price: 399,
		priceWithAI: 599,
		period: "month",
		features: [
			"Up to 50 team members",
			"Advanced analytics",
			"Custom learning paths",
			"SSO integration",
			"Bulk certificates",
			"Dedicated support",
		],
		aiFeatures: ["Advanced team AI", "AI-powered team insights"],
		popular: true,
	},
	{
		name: "Enterprise",
		description: "For large organizations",
		price: "Contact us",
		priceWithAI: "Contact us",
		period: "",
		features: [
			"Unlimited team members",
			"Custom branding",
			"Dedicated account manager",
			"API access",
			"Custom integrations",
			"24/7 priority support",
		],
		aiFeatures: ["Enterprise AI solutions", "Custom AI training"],
		popular: false,
		isContact: true,
	},
]

const aiOnlyPlans = [
	{
		name: "Basic",
		description: "AI assistance for individuals",
		price: 15,
		period: "month",
		features: [
			"Basic AI code assistance",
			"Code suggestions",
			"Error explanations",
			"Learning recommendations",
		],
		popular: false,
	},
	{
		name: "Pro",
		description: "Advanced AI for professionals",
		price: 35,
		period: "month",
		features: [
			"All Basic features",
			"Advanced AI code reviews",
			"Personalized learning paths",
			"AI-powered project generation",
			"Advanced analytics",
			"Priority AI support",
		],
		popular: true,
	},
]

const apiPlans = [
	{
		name: "Developer",
		description: "For testing and small projects",
		price: 0,
		period: "month",
		basePrice: 0,
		features: [
			"1,000 free API calls/month",
			"$0.01 per additional call",
			"Rate limit: 60 req/min",
			"Basic support",
			"Standard SLA (99.5%)",
			"API documentation",
		],
		usageRate: 0.01,
		freeRequests: 1000,
		popular: false,
		isUsageBased: true,
	},
	{
		name: "Professional",
		description: "For production applications",
		price: "$49 + usage",
		period: "month",
		basePrice: 49,
		features: [
			"10,000 included calls/month",
			"$0.005 per additional call",
			"Rate limit: 600 req/min",
			"Priority support",
			"Enhanced SLA (99.9%)",
			"Webhooks & analytics",
		],
		usageRate: 0.005,
		includedRequests: 10000,
		popular: true,
		isUsageBased: true,
	},
	{
		name: "Enterprise",
		description: "For large-scale integrations",
		price: "Custom",
		period: "",
		features: [
			"Custom volume pricing",
			"Unlimited requests",
			"Custom rate limits",
			"Dedicated infrastructure",
			"24/7 premium support",
			"Custom SLA (99.99%)",
			"White-label options",
		],
		popular: false,
		isContact: true,
		isUsageBased: false,
	},
]

export function PricingSection() {
	const [individualAIEnabled, setIndividualAIEnabled] = useState(false)
	const [teamAIEnabled, setTeamAIEnabled] = useState(false)
	const [apiRequests, setApiRequests] = useState(10000)

	const calculateAPIPrice = (plan: any, requests: number) => {
		if (plan.isContact) return "Custom"

		const basePrice = plan.basePrice || 0

		if (plan.name === "Pay As You Go") {
			const billableRequests = Math.max(0, requests - (plan.freeRequests || 0))
			const usageCost = billableRequests * plan.usageRate
			return basePrice + usageCost
		}

		if (plan.name === "Professional") {
			const billableRequests = Math.max(
				0,
				requests - (plan.includedRequests || 0),
			)
			const usageCost = billableRequests * plan.usageRate
			return basePrice + usageCost
		}

		return basePrice
	}

	const renderPlanCard = (
		plan: any,
		showAI: boolean = false,
		aiEnabled: boolean = false,
	) => (
		<Card
			className={`relative flex flex-col ${plan.popular ? "border-primary shadow-lg" : ""}`}
			key={plan.name}
		>
			{plan.popular && (
				<Badge className="-top-3 -translate-x-1/2 absolute left-1/2">
					Most Popular
				</Badge>
			)}
			<CardHeader>
				<CardTitle className="text-2xl">{plan.name}</CardTitle>
				<CardDescription>{plan.description}</CardDescription>
				<div className="mt-4">
					<span className="font-bold text-4xl">
						{plan.isContact
							? plan.price
							: plan.isUsageBased && !plan.isContact
								? `$${calculateAPIPrice(plan, apiRequests).toFixed(2)}`
								: `$${aiEnabled && showAI ? plan.priceWithAI : plan.price}`}
					</span>
					{!plan.isContact && !plan.isUsageBased && (
						<span className="text-muted-foreground">/{plan.period}</span>
					)}
					{plan.isUsageBased && !plan.isContact && (
						<span className="mt-1 block text-muted-foreground text-sm">
							{plan.basePrice > 0
								? `Base: $${plan.basePrice}/month + usage`
								: "Pay only for what you use"}
						</span>
					)}
				</div>
			</CardHeader>
			<CardContent className="flex-1">
				<ul className="space-y-3">
					{plan.features.map((feature: string) => (
						<li className="flex items-start space-x-3" key={feature}>
							<Check className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
							<span className="text-sm">{feature}</span>
						</li>
					))}
					{aiEnabled &&
						showAI &&
						plan.aiFeatures &&
						plan.aiFeatures.map((feature: string) => (
							<li className="flex items-start space-x-3" key={feature}>
								<Bot className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />
								<span className="text-blue-600 text-sm">{feature}</span>
							</li>
						))}
				</ul>
			</CardContent>
			<CardFooter>
				<Button
					className="w-full"
					variant={plan.popular ? "default" : "outline"}
				>
					{plan.isContact
						? "Contact Sales"
						: plan.isUsageBased
							? "Get API Key"
							: "Start Free Trial"}
				</Button>
			</CardFooter>
		</Card>
	)

	return (
		<section className="bg-linear-to-b from-background to-muted/20 py-24">
			<div className="container mx-auto px-4">
				<div className="mx-auto max-w-3xl text-center">
					<h2 className="font-bold text-3xl tracking-tight sm:text-4xl">
						Simple, Transparent Pricing
					</h2>
					<p className="mt-4 text-lg text-muted-foreground">
						Choose the plan that's right for you and start learning today
					</p>
				</div>

				<div className="mx-auto mt-16 max-w-7xl">
					<Tabs className="w-full" defaultValue="individual">
						<TabsList className="mb-8 grid h-auto w-full grid-cols-4">
							<TabsTrigger
								className="font-medium text-sm md:text-base"
								value="individual"
							>
								Individual Plans
							</TabsTrigger>
							<TabsTrigger
								className="font-medium text-sm md:text-base"
								value="team"
							>
								Team Plans
							</TabsTrigger>
							<TabsTrigger
								className="font-medium text-sm md:text-base"
								value="ai-only"
							>
								AI Only Plans
							</TabsTrigger>
							<TabsTrigger
								className="font-medium text-sm md:text-base"
								value="api-only"
							>
								API Plans
							</TabsTrigger>
						</TabsList>

						{/* Individual Plans */}
						<TabsContent className="space-y-6" value="individual">
							<div className="flex items-center justify-center space-x-2 rounded-lg bg-muted/50 p-2">
								<Switch
									checked={individualAIEnabled}
									id="individual-ai"
									onCheckedChange={setIndividualAIEnabled}
								/>
								<Label
									className="cursor-pointer font-medium text-sm"
									htmlFor="individual-ai"
								>
									Include AI Features (+$10-40/month)
								</Label>
							</div>
							<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
								{individualPlans.map((plan) =>
									renderPlanCard(plan, true, individualAIEnabled),
								)}
							</div>
						</TabsContent>

						{/* Team Plans */}
						<TabsContent className="space-y-6" value="team">
							<div className="flex items-center justify-center space-x-2 rounded-lg bg-muted/50 p-2">
								<Switch
									checked={teamAIEnabled}
									id="team-ai"
									onCheckedChange={setTeamAIEnabled}
								/>
								<Label
									className="cursor-pointer font-medium text-sm"
									htmlFor="team-ai"
								>
									Include AI Features (+$100-200/month)
								</Label>
							</div>
							<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
								{teamPlans.map((plan) =>
									renderPlanCard(plan, true, teamAIEnabled),
								)}
							</div>
						</TabsContent>

						{/* AI Only Plans */}
						<TabsContent value="ai-only">
							<div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
								{aiOnlyPlans.map((plan) => renderPlanCard(plan))}
							</div>
						</TabsContent>

						{/* API Only Plans */}
						<TabsContent className="space-y-8" value="api-only">
							<div className="mx-auto max-w-2xl">
								<Card>
									<CardHeader>
										<div className="flex items-center space-x-2">
											<Zap className="size-5 text-blue-600" />
											<CardTitle className="text-xl">
												Usage Calculator
											</CardTitle>
										</div>
										<CardDescription>
											Estimate your monthly API costs based on expected usage
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="space-y-2">
											<Label className="text-base" htmlFor="api-requests">
												Estimated monthly API requests
											</Label>
											<Input
												id="api-requests"
												min="0"
												onChange={(e) => setApiRequests(Number(e.target.value))}
												step="1000"
												type="number"
												value={apiRequests}
											/>
										</div>
										<div className="flex items-center justify-between rounded-lg border bg-background p-4">
											<span className="text-muted-foreground text-sm">
												{apiRequests.toLocaleString()} requests/month
											</span>
											<span className="text-muted-foreground text-xs">
												Prices update in cards below
											</span>
										</div>
									</CardContent>
								</Card>
							</div>

							<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
								{apiPlans.map((plan) => renderPlanCard(plan))}
							</div>

							<div className="mx-auto mt-8 max-w-4xl">
								<Card>
									<CardHeader>
										<CardTitle>API Documentation & Resources</CardTitle>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
											<Button className="justify-start" variant="outline">
												<Check className="mr-2 h-4 w-4" />
												View API Documentation
											</Button>
											<Button className="justify-start" variant="outline">
												<Zap className="mr-2 h-4 w-4" />
												API Playground
											</Button>
										</div>
										<p className="text-muted-foreground text-sm">
											All API plans include access to comprehensive
											documentation, code examples, and a testing playground.
										</p>
									</CardContent>
								</Card>
							</div>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</section>
	)
}
