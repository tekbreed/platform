"use client";
import React from "react";
import { ThemeProvider, type Theme } from "remix-themes";

export function ThemedApp({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: Theme | null;
}) {
  return (
    <ThemeProvider
      specifiedTheme={theme}
      themeAction="/set-theme"
      disableTransitionOnThemeChange={true}
    >
      {children}
    </ThemeProvider>
  );
}
