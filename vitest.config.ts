/// <reference types="@vitest/browser/matchers" />

import { playwright } from "@vitest/browser-playwright"
import { defineProject } from "vitest/config"

export default defineProject({
	test: {
		exclude: [
			"**/build/**",
			"**/dist/**",
			"**/node_modules/**",
			"**/e2e/**",
			"**/tests/*.e2e.{test,spec}.{ts,tsx,js,jsx}",
			"**/tests/e2e/**",
		],

		// setupFiles: ["./vitest.setup.ts"],
		includeSource: ["**/src/**/*.{ts,tsx}"],
		projects: [
			"apps/*",
			"packages/*",
			{
				test: {
					name: "browser",
					include: [
						"**/tests/**/*.browser.{test,spec}.{ts,tsx}",
						"**/__tests__/**/*.browser.{test,spec}.{ts,tsx}",
					],
					exclude: ["**/tests/e2e/**"],
					browser: {
						enabled: true,
						provider: playwright(),
						instances: [{ browser: "chromium" }],
					},
				},
			},
			{
				test: {
					name: "unit",
					include: [
						"**/tests/**/*.unit.{test,spec}.ts",
						"**/__tests__/**/*.unit.{test,spec}.ts",
					],
					exclude: ["**/tests/e2e/**"],
					environment: "node",
				},
			},
		],
	},
	define: {
		"import.meta.vitest": "undefined",
	},
})
