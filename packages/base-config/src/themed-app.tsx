"use client"

import type React from "react"

import { type Theme, ThemeProvider } from "remix-themes"

export function ThemedApp({
	children,
	theme,
}: {
	children: React.ReactNode
	theme: Theme | null
}) {
	return (
		<ThemeProvider
			disableTransitionOnThemeChange={true}
			specifiedTheme={theme}
			themeAction="/set-theme"
		>
			{children}
		</ThemeProvider>
	)
}
