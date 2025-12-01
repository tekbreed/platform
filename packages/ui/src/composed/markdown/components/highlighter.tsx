import React from "react"

import { useTheme } from "remix-themes"

import ShikiHighlighter from "react-shiki"

import { cn } from "@/lib/utils"

/**
 * Available theme options for code highlighting
 */
const THEMES = {
	light: "one-light",
	dark: "night-owl",
} as const

export const Highlighter = React.memo(
	({
		language,
		// theme,
		code,
		showLanguage = false,
		className,
		...props
	}: {
		language: string
		// theme: string
		code: string
		showLanguage?: boolean
		className?: string
	}) => {
		const [theme] = useTheme()
		const isDark = theme === "dark"
		const currentTheme = isDark ? THEMES.dark : THEMES.light
		return (
			<ShikiHighlighter
				className={cn("m-0! p-2", className)}
				delay={150}
				language={language}
				showLanguage={showLanguage}
				theme={currentTheme}
				{...props}
			>
				{code}
			</ShikiHighlighter>
		)
	},
)
