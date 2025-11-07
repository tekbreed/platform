import { Link } from "react-router"

import { Button } from "@repo/ui/components/button"
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/card"
import { Header } from "@repo/ui/composed/page-header"
import { useChat } from "@repo/utils/providers/chat"

export default function SupportRoute() {
	const { toggleChat } = useChat()
	return (
		<>
			<Header
				title="Support Center"
				description="Get help with your account, billing, and technical issues."
			/>

			<div className="container mx-auto my-20 w-full max-w-6xl space-y-12">
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<span className="text-2xl">📧</span>
								Email Support
							</CardTitle>
						</CardHeader>
						<CardContent className="flex flex-1 flex-col">
							<p className="mb-4 text-muted-foreground">
								Send us an email and we&apos;ll get back to you within 24 hours.
							</p>
							<Button variant="outline" className="mt-auto w-full" asChild>
								<Link to="mailto:support@tekbreed.com" target="_blank">
									Send Email
								</Link>
							</Button>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<span className="text-2xl">💬</span>
								Live Chat
							</CardTitle>
						</CardHeader>
						<CardContent className="flex flex-1 flex-col">
							<p className="mb-4 text-muted-foreground">
								Chat with our support team in real-time.
							</p>
							<Button onClick={toggleChat} variant="outline" className="w-full">
								Start Chat
							</Button>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<span className="text-2xl">📞</span>
								Phone Support
							</CardTitle>
						</CardHeader>
						<CardContent className="flex flex-1 flex-col">
							<p className="mb-4 text-muted-foreground">
								Phone support available for team accounts and enterprise
								customers.
							</p>
							<div className="mt-auto flex items-center justify-center">
								<span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm font-medium text-muted-foreground">
									Teams Only
								</span>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</>
	)
}
