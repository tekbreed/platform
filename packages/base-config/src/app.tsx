import { Outlet, useLocation } from "react-router";
import { useTheme, type Theme } from "remix-themes";

import { HoneypotProvider } from "remix-utils/honeypot/react";

import type { Toast } from "@repo/utils/toast.server";
import { useToast } from "@repo/utils/hooks/use-toast";
import { useNonce } from "@repo/utils/providers/nonce";
import { ChatProvider } from "@repo/utils/providers/chat";
import { DiscordProvider } from "@repo/utils/providers/discord";
import { MobileNavProvider } from "@repo/utils/providers/mobile-nav";
import type { HoneypotInputProps } from "@repo/utils/honeypot.server";

import { Toaster } from "@repo/ui/components/sonner";
import { Header } from "@repo/ui/composed/header/index";

import { ThemedApp } from "./themed-app";

import { Document } from "./document";

export function App({
  nonce,
  theme,
  env,
}: {
  nonce: string;
  theme: Theme | null;
  env?: Record<string, string | undefined> | undefined;
}) {
  const [currentTheme] = useTheme();
  const location = useLocation();
  const excludedRoutes = ["signin", "signup"];
  return (
    <Document currentTheme={currentTheme} theme={theme} env={env} nonce={nonce}>
      {excludedRoutes.some((r) => !location.pathname.includes(r)) ? (
        <Header />
      ) : null}
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Toaster position="top-right" richColors />
    </Document>
  );
}

export function AppWithProviders({
  env,
  theme,
  toastSession,
  honeypotInputProps,
}: {
  env?: Record<string, string | undefined>;
  theme: Theme | null;
  toastSession: Toast | null;
  honeypotInputProps: HoneypotInputProps;
}) {
  useToast(toastSession);
  const nonce = useNonce();
  return (
    <HoneypotProvider {...honeypotInputProps}>
      <MobileNavProvider>
        <ChatProvider>
          <DiscordProvider>
            <ThemedApp theme={theme}>
              <App theme={theme} nonce={nonce} env={env} />
            </ThemedApp>
          </DiscordProvider>
        </ChatProvider>
      </MobileNavProvider>
    </HoneypotProvider>
  );
}
