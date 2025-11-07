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
		name: "Pay As You Go",
		description: "Perfect for testing and small projects",
		price: "Usage-based",
		period: "",
		basePrice: 0,
		features: [
			"$0.01 per API request",
			"5,000 free requests/month",
			"Rate limit: 100 req/min",
			"Basic support",
			"Standard SLA (99.5%)",
			"API documentation access",
		],
		usageRate: 0.01,
		freeRequests: 5000,
		popular: false,
		isUsageBased: true,
	},
	{
		name: "Professional",
		description: "For production applications",
		price: "$99 + usage",
		period: "month",
		basePrice: 99,
		features: [
			"$0.008 per API request",
			"50,000 included requests/month",
			"Rate limit: 1,000 req/min",
			"Priority support",
			"Enhanced SLA (99.9%)",
			"Custom webhooks",
			"Advanced analytics dashboard",
		],
		usageRate: 0.008,
		includedRequests: 50000,
		popular: true,
		isUsageBased: true,
	},
	{
		name: "Enterprise",
		description: "For large-scale integrations",
		price: "Custom",
		period: "",
		features: [
			"Volume-based discounts",
			"Unlimited requests",
			"Custom rate limits",
			"Dedicated infrastructure",
			"24/7 premium support",
			"Custom SLA (up to 99.99%)",
			"White-label options",
			"Dedicated account manager",
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
			key={plan.name}
			className={`relative flex flex-col ${plan.popular ? "border-primary shadow-lg" : ""}`}
		>
			{plan.popular && (
				<Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
					Most Popular
				</Badge>
			)}
			<CardHeader>
				<CardTitle className="text-2xl">{plan.name}</CardTitle>
				<CardDescription>{plan.description}</CardDescription>
				<div className="mt-4">
					<span className="text-4xl font-bold">
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
						<span className="mt-1 block text-sm text-muted-foreground">
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
						<li key={feature} className="flex items-start space-x-3">
							<Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
							<span className="text-sm">{feature}</span>
						</li>
					))}
					{aiEnabled &&
						showAI &&
						plan.aiFeatures &&
						plan.aiFeatures.map((feature: string) => (
							<li key={feature} className="flex items-start space-x-3">
								<Bot className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500" />
								<span className="text-sm text-blue-600">{feature}</span>
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
		<section className="bg-gradient-to-b from-background to-muted/20 py-24">
			<div className="container mx-auto px-4">
				<div className="mx-auto max-w-3xl text-center">
					<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
						Simple, Transparent Pricing
					</h2>
					<p className="mt-4 text-lg text-muted-foreground">
						Choose the plan that's right for you and start learning today
					</p>
				</div>

				<div className="mx-auto mt-16 max-w-7xl">
					<Tabs defaultValue="individual" className="w-full">
						<TabsList className="mb-8 grid h-auto w-full grid-cols-4">
							<TabsTrigger
								value="individual"
								className="text-sm font-medium md:text-base"
							>
								Individual Plans
							</TabsTrigger>
							<TabsTrigger
								value="team"
								className="text-sm font-medium md:text-base"
							>
								Team Plans
							</TabsTrigger>
							<TabsTrigger
								value="ai-only"
								className="text-sm font-medium md:text-base"
							>
								AI Only Plans
							</TabsTrigger>
							<TabsTrigger
								value="api-only"
								className="text-sm font-medium md:text-base"
							>
								API Plans
							</TabsTrigger>
						</TabsList>

						{/* Individual Plans */}
						<TabsContent value="individual" className="space-y-6">
							<div className="flex items-center justify-center space-x-2 rounded-lg bg-muted/50 p-2">
								<Switch
									id="individual-ai"
									checked={individualAIEnabled}
									onCheckedChange={setIndividualAIEnabled}
								/>
								<Label
									htmlFor="individual-ai"
									className="cursor-pointer text-sm font-medium"
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
						<TabsContent value="team" className="space-y-6">
							<div className="flex items-center justify-center space-x-2 rounded-lg bg-muted/50 p-2">
								<Switch
									id="team-ai"
									checked={teamAIEnabled}
									onCheckedChange={setTeamAIEnabled}
								/>
								<Label
									htmlFor="team-ai"
									className="cursor-pointer text-sm font-medium"
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
						<TabsContent value="api-only" className="space-y-8">
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
											<Label htmlFor="api-requests" className="text-base">
												Estimated monthly API requests
											</Label>
											<Input
												id="api-requests"
												type="number"
												value={apiRequests}
												onChange={(e) => setApiRequests(Number(e.target.value))}
												min="0"
												step="1000"
											/>
										</div>
										<div className="flex items-center justify-between rounded-lg border bg-background p-4">
											<span className="text-sm text-muted-foreground">
												{apiRequests.toLocaleString()} requests/month
											</span>
											<span className="text-xs text-muted-foreground">
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
											<Button variant="outline" className="justify-start">
												<Check className="mr-2 h-4 w-4" />
												View API Documentation
											</Button>
											<Button variant="outline" className="justify-start">
												<Zap className="mr-2 h-4 w-4" />
												API Playground
											</Button>
										</div>
										<p className="text-sm text-muted-foreground">
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
