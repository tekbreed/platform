import { HeroSection } from "./components/hero";
import { LaunchDateSection } from "./components/launch-date";
import { FeaturesSection } from "./components/features";
import { AboutSection } from "./components/about";
import { FormSection } from "./components/form";
import { FounderQuoteSection } from "./components/quote";
import { listSubscribers } from "@repo/utils/email.server";

export async function loader() {
  return { subscribers: await listSubscribers() };
}

export default function WaitlistRoute() {
  return (
    <>
      <HeroSection />
      <LaunchDateSection />
      <FeaturesSection />
      <AboutSection />
      <FounderQuoteSection />
      <FormSection />
    </>
  );
}
