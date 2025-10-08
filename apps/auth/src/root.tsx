import type { Route } from "./+types/root";
import { data, Outlet, useLoaderData } from "react-router";
import { useTheme } from "remix-themes";
import { HoneypotProvider } from "remix-utils/honeypot/react";

import appStyles from "./styles/app.css?url";
import fontStyles from "@repo/ui/fonts.css?url";

import { Toaster } from "@repo/ui/components/sonner";
import { getToast } from "@repo/utils/toast.server";
import { useToast } from "@repo/utils/hooks/use-toast";
import { useNonce } from "@repo/utils/providers/nonce";
import { themeSessionResolver } from "@repo/utils/theme.server";
import { honeypot } from "@repo/utils/honeypot.server";
import { Document } from "@repo/base-config/document";
import { ThemedApp } from "@repo/base-config/themed-app";
import { RootErrorBoundary } from "@repo/base-config/root-error-boundary";

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/favicon.png" },
  { rel: "stylesheet", href: appStyles },
  { rel: "stylesheet", href: fontStyles },
];

export async function loader({ request }: Route.LoaderArgs) {
  const honeypotInputProps = honeypot.getInputProps();
  const { getTheme } = await themeSessionResolver(request);
  const { toast: toastSession } = await getToast(request);

  return data({
    toastSession,
    theme: getTheme(),
    env: undefined,
    honeypotInputProps,
  });
}

function App() {
  const [currentTheme] = useTheme();
  const nonce = useNonce();
  const { theme, toastSession, env } =
    useLoaderData<Route.ComponentProps["loaderData"]>();
  useToast(toastSession);

  return (
    <Document currentTheme={currentTheme} theme={theme} env={env} nonce={nonce}>
      <Outlet />
      <Toaster position="top-right" richColors />
    </Document>
  );
}

export default function AppWithProviders({ loaderData }: Route.ComponentProps) {
  const {
    theme,
    //  honeyProps
    honeypotInputProps,
  } = loaderData;
  return (
    <HoneypotProvider {...honeypotInputProps}>
      <ThemedApp theme={theme}>
        <App />
      </ThemedApp>
    </HoneypotProvider>
  );
}

export function ErrorBoundary() {
  return <RootErrorBoundary />;
}
