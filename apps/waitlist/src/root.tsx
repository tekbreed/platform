import type { Route } from "./+types/root";
import { data } from "react-router";

import appStyles from "./styles/app.css?url";
import fontStyles from "@repo/ui/fonts.css?url";

import { useToast } from "@repo/utils/hooks/use-toast";
import { AppWithProviders } from "@repo/base-config/app";
import { RootErrorBoundary } from "@repo/base-config/root-error-boundary";
import { getAppLoaderData } from "@repo/base-config/utils.server";

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/favicon.png" },
  { rel: "stylesheet", href: appStyles },
  { rel: "stylesheet", href: fontStyles },
];

export async function loader({ request }: Route.LoaderArgs) {
  return data(await getAppLoaderData(request));
}

export default function App({ loaderData }: Route.ComponentProps) {
  const { toastSession, ...restData } = loaderData;
  useToast(toastSession);
  return <AppWithProviders {...restData} />;
}

export function ErrorBoundary() {
  return <RootErrorBoundary />;
}
