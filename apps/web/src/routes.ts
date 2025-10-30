import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

const routesRecord = {
  index: "routes/home/index.tsx",
  regular: {
    "*": "routes/not-found.tsx",
    support: "routes/support.tsx",
    faqs: "routes/faqs/index.tsx",
    about: "routes/about/index.tsx",
    roadmap: "routes/roadmap/index.tsx",
    "set-theme": "routes/set-theme.ts",
    "legal/:pageSlug": "routes/legal.tsx",

    //SEO
    "robots.txt": "routes/seo/robots[.]txt.ts",
    "sitemap.xml": "routes/seo/sitemap[.]xml.ts",

    //Resource routes
    // discord: "routes/resources/discord.ts",
    // subscribe: "routes/resources/subscribe.tsx",
    // "content/webhook": "routes/resources/sanity-webhook.ts",
    // "download-user-data": "routes/resources/download-user-data.ts",
  },

  prefixed: {
    auth: {
      index: null,
      routes: {
        signup: "routes/auth/signup/index.tsx",
        signin: "routes/auth/signin/index.tsx",
        signout: "routes/auth/signout.ts",
        verify: "routes/auth/verify.tsx",
        ":provider": "routes/auth/provider/index.ts",
        ":provider/callback": "routes/auth/provider/callback.ts",
        "forgot-password": "routes/auth/forgot-password.tsx",
        "reset-password": "routes/auth/reset-password/index.tsx",
        onboarding: "routes/auth/onboarding/index.tsx",
        "onboarding/:provider": "routes/auth/onboarding/provider.tsx",
      },
    },
    // profile: {
    //   index: "routes/profile/index.tsx",
    //   routes: {
    //     "password/change": "routes/profile/change-password.tsx",
    //     "password/create": "routes/profile/create-password.tsx",
    //     "change-email": "routes/profile/change-email.tsx",
    //     "change-photo": "routes/profile/change-photo.tsx",
    //   },
    // },
    // articles: {
    //   index: "routes/articles/index.tsx",
    //   routes: {
    //     ":articleSlug": "routes/articles/article.tsx",
    //   },
    // },
    // tutorials: {
    //   index: "routes/tutorials/index.tsx",
    //   routes: {
    //     ":tutorialSlug": "routes/tutorials/tutorial.tsx",
    //   },
    // },
    // subscription: {
    //   index: "routes/subscription/index.tsx",
    //   routes: {
    //     checkout: "routes/subscription/checkout.ts",
    //     portal: "routes/subscription/portal.ts",
    //     success: "routes/subscription/success.tsx",
    //     webhook: "routes/subscription/webhook.ts",
    //   },
    // },
  },
};

export default [
  index(routesRecord.index),
  // Regular routes
  ...Object.entries(routesRecord.regular).map(([routePath, filePath]) =>
    route(routePath, filePath),
  ),
  // Prefixed routes
  ...Object.entries(routesRecord.prefixed).flatMap(([prefixRoute, config]) => {
    const prefixRoutes = [
      ...(config.index ? [index(config.index)] : []),
      ...Object.entries(config.routes).map(([routePath, filePath]) =>
        route(routePath, filePath),
      ),
    ];
    return prefix(prefixRoute, prefixRoutes);
  }),
] satisfies RouteConfig;
