import { data } from "react-router";
import type { Route } from "./+types/home";
import { z } from "zod";
import { StatusCodes } from "http-status-codes";
import { checkHoneypot } from "@repo/utils/honeypot.server";
import { parseWithZod } from "@conform-to/zod/v4";
import { SubscriptionSchema } from "@repo/ui/composed/subscription-forms";
import { sendEmail, subscribeUser } from "@repo/utils/email.server";
import { WaitlistEmail } from "@repo/ui/email/waitlist";
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

export async function action({ request }: Route.ActionArgs): Promise<unknown> {
  const formData = await request.formData();
  await checkHoneypot(formData);
  const submission = await parseWithZod(formData, {
    schema: SubscriptionSchema.transform(async (data, ctx) => {
      const { name, email } = data;
      const response = await subscribeUser({ name, email });
      if (response.status !== "success") {
        ctx.addIssue({
          path: ["root"],
          code: "custom",
          message: "Invalid credentials.",
        });
        return z.NEVER;
      }
      void sendEmail({
        to: email,
        subject: "Welcome to TekBreed - You're on the waitlist!",
        react: <WaitlistEmail firstName={name?.split(" ")[0] || "Developer"} />,
      });
      return { response };
    }),
    async: true,
  });

  if (submission.status !== "success") {
    return data(
      {
        result: { status: "error", ...submission.reply() },
        response: null,
      } as const,
      {
        status:
          submission.status === "error"
            ? StatusCodes.BAD_REQUEST
            : StatusCodes.OK,
      },
    );
  }

  if (!submission.value.response) {
    return data(
      {
        result: { status: "error", ...submission.reply() },
        response: null,
      } as const,
      {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      },
    );
  }

  return data({ result: null, response: submission.value.response });
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
