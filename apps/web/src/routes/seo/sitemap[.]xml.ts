import { generateRemixSitemap } from "@forge42/seo-tools/remix/sitemap";
import type { Route } from "./+types/sitemap[.]xml";
import { getDomainUrl } from "@repo/utils/misc";
import { href } from "react-router";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { routes } = await import("virtual:react-router/server-build");

  const ignoredRoutes = [
    // href("/profile"),
    // href("/subscription"),
    // href("/roadmap"),
    // href("/teams"),
    // href("/auth/:provider", { provider: "github" }),
    // href("/auth/:provider/callback", { provider: "github" }),
    // href("/onboarding"),
    // href("/onboarding/:provider", { provider: "github" }),
    // href("/legal/:pageSlug", { pageSlug: "terms" }),
    // href("/legal/:pageSlug", { pageSlug: "privacy" }),
    // href("/verify"),
    href("/auth/signup"),
    // href("/signin"),
    // href("/signout"),
    // href("/forgot-password"),
    // href("/color-scheme"),
    // href("/set-theme"),
    // href("/discord"),
    // href("/content/webhook"),
    // href("/download-user-data"),
    // href("/faqs"),
    // href("/support"),
    // href("/about"),
  ];
  const sitemap = await generateRemixSitemap({
    domain: getDomainUrl(request),
    ignore: [...ignoredRoutes],
    routes,
  });

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
