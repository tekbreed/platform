import { getHomePageContent } from "../utils/content/utils"
import type { Route } from "./+types/index"
import { ActionVideo } from "./action-video"
import { Features } from "./features"
import { Hero } from "./hero"
import { PricingSection } from "./pricing-section"
// import { SubscriptionForm } from "./suscription-form";
// import { FeaturedCourses } from "./featured-courses";
// import { FeaturedTutorials } from "./featured-tutorials";
// import { FeaturedArticles } from "./featured-articles";

export async function loader() {
	const content = getHomePageContent()
	return { content }
}

export default function Home({ loaderData }: Route.ComponentProps) {
	return (
		<div className="mx-auto flex flex-col">
			<Hero content={loaderData.content} />
			<Features content={loaderData.content} />
			<ActionVideo />

			{/* <Stats /> */}
			{/* <FeaturedCourses />
      <FeaturedTutorials />
      <FeaturedArticles /> */}
			<PricingSection />
			{/* <SubscriptionForm /> */}
		</div>
	)
}
