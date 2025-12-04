import { generateMetadata } from "@repo/utils/meta"

import { getHomePageContent } from "../../utils/content/utils"
import type { Route } from "./+types/index"
import { Features } from "./features"
import { Hero } from "./hero"
import { SubscriptionForm } from "./suscription-form"
// import { FeaturedTutorials } from "./featured-tutorials";
// import { FeaturedArticles } from "./featured-articles";

export async function loader() {
	const content = getHomePageContent()
	return { content }
}

export default function Home({ loaderData }: Route.ComponentProps) {
	return (
		<div className="px-8">
			{generateMetadata({})}
			<div className="mx-auto flex flex-col">
				<Hero content={loaderData.content} />
				<Features content={loaderData.content} />
				<SubscriptionForm />

				{/* <Stats /> */}
				{/* <ActionVideo /> */}

				{/* <FeaturedCourses />
      <FeaturedTutorials />
      <FeaturedArticles /> */}
				{/* <PricingSection /> */}
			</div>
		</div>
	)
}
