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
      <title>Waitlist | TekBreed</title>
      <meta name="keywords" content="TekBreed, Software, AI, Learning" />
      <meta
        name="description"
        content="Breeding the next generation of software engineers."
      />
      {/* Open Graph */}
      <meta property="og:title" content="Waitlist | TekBreed" />
      <meta
        property="og:description"
        content="Breeding the next generation of software engineers."
      />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/wl.jpg" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Waitlist | TekBreed" />
      <meta
        name="twitter:description"
        content="Breeding the next generation of software engineers."
      />
      <meta name="twitter:image" content="/wl.jpg" />
      <HeroSection />
      <LaunchDateSection />
      <FeaturesSection />
      <AboutSection />
      <FounderQuoteSection />
      <FormSection />
    </>
  );
}
