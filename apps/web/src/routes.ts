import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home/index.tsx"),
  route("set-theme", "routes/set-theme.ts"),

  route("legal/:pageSlug", "routes/legal.tsx"),
  route("about", "routes/about/index.tsx"),
  route("faqs", "routes/faqs/index.tsx"),
  route("support", "routes/support.tsx"),
  route("authors/:authorSlug", "routes/author.tsx"),
  route("roadmap", "routes/roadmap/index.tsx"),
  route("*", "routes/not-found.tsx"),

  // SEO
  route("robots.txt", "routes/seo/robots[.]txt.ts"),
  route("sitemap.xml", "routes/seo/sitemap[.]xml.ts"),

  // Resource routes
  // route("set-theme", "routes/resources/set-theme.ts"),
  // route("discord", "routes/resources/discord.ts"),
  // route("subscribe", "routes/resources/subscribe.tsx"),
  // route("content/webhook", "routes/resources/sanity-webhook.ts"),
  // route("download-user-data", "routes/resources/download-user-data.ts"),

  //Subscription
  // ...prefix("subscription", [
  //   index("routes/subscription/index.tsx"),
  //   route("checkout", "routes/subscription/checkout.ts"),
  //   route("portal", "routes/subscription/portal.ts"),
  //   route("success", "routes/subscription/success.tsx"),
  //   route("webhook", "routes/subscription/webhook.ts"),
  // ]),

  // ...prefix("profile", [
  //   index("routes/profile/index.tsx"),
  //   route("password/change", "routes/profile/change-password.tsx"),
  //   route("password/create", "routes/profile/create-password.tsx"),
  //   route("change-email", "routes/profile/change-email.tsx"),
  //   route("change-photo", "routes/profile/change-photo.tsx"),
  // ]),

  ...prefix("auth", [
    route("signup", "routes/auth/signup/index.tsx"),
    route("signin", "routes/auth/signin/index.tsx"),
    route("signout", "routes/auth/signout.ts"),
    route("verify", "routes/auth/verify.tsx"),
    route(":provider", "routes/auth/provider/index.ts"),
    route(":provider/callback", "routes/auth/provider/callback.ts"),
    route("forgot-password", "routes/auth/forgot-password.tsx"),
    route("reset-password", "routes/auth/reset-password/index.tsx"),
    route("onboarding", "routes/auth/onboarding/index.tsx"),
    route("onboarding/:provider", "routes/auth/onboarding/provider.tsx"),
  ]),

  // ...prefix("articles", [
  //   index("routes/articles/index.tsx"),
  //   route(":articleSlug", "routes/articles/article.tsx"),
  // ]),
] satisfies RouteConfig;
