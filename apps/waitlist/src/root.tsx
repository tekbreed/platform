import type { Route } from "./+types/root";

import appStyles from "./styles/app.css?url";
import fontStyles from "./styles/fonts.css?url";

import { AppWithProviders } from "@repo/base-config/app";
import { RootErrorBoundary } from "@repo/base-config/root-error-boundary";
import { getAppLoaderData } from "@repo/base-config/utils.server";

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/favicon.png" },
  { rel: "stylesheet", href: appStyles },
  { rel: "stylesheet", href: fontStyles },
];

export async function loader({ request }: Route.LoaderArgs) {
  return await getAppLoaderData(request);
}

export default function App({ loaderData }: Route.ComponentProps) {
  return <AppWithProviders {...loaderData} />;
}

export function ErrorBoundary() {
  return <RootErrorBoundary />;
}
