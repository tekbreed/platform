import type { Route } from "./+types/index";
import { PricingSection } from "./pricing-section";
import { Stats } from "./stats";
import { ActionVideo } from "./action-video";
import { Features } from "./features";
import { Hero } from "./hero";
import { getHomePageContent } from "../utils/content/utils";
// import { FeaturedCourses } from "./featured-courses";
// import { FeaturedTutorials } from "./featured-tutorials";
// import { FeaturedArticles } from "./featured-articles";

export type Content = {
  latestFeature: string;
  features: {
    icon: string;
    name: string;
    released: boolean;
    description: string;
  }[];
};

export async function loader() {
  const content = getHomePageContent();
  return { content };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div className="mx-auto flex flex-col">
      <Hero content={loaderData.content} />
      {/* <ActionVideo /> */}
      <Features content={loaderData.content} />
      {/* <Stats /> */}
      {/* <FeaturedCourses />
      <FeaturedTutorials />
      <FeaturedArticles /> */}
      {/* <PricingSection /> */}
    </div>
  );
}
