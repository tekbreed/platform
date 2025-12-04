/// <reference types="@vitest/browser/matchers" />

import path from "node:path"
import { playwright } from "@vitest/browser-playwright"
import tsconfigPaths from "vite-tsconfig-paths"
import { defineProject } from "vitest/config"

export default defineProject({
	test: {
		exclude: ["**/build/**", "**/dist/**", "**/node_modules/**", "**/e2e/**"],
		setupFiles: ["./packages/tests-config/src/setup-env.ts"],
		includeSource: ["**/src/**/*.{ts,tsx}"],
		
		projects: [
			{
				test: {
					name: "browser",
					include: [
						"**/tests/**/*.browser.{test,spec}.{ts,tsx}",
						"**/__tests__/**/*.browser.{test,spec}.{ts,tsx}",
					],
					setupFiles: ["./packages/tests-config/src/setup-env.ts"],
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
					exclude: [
						"**/tests/**/*.browser.{test,spec}.{ts,tsx}",
						"**/__tests__/**/*.browser.{test,spec}.{ts,tsx}",
					],
					setupFiles: ["./packages/tests-config/src/setup-env.ts"],
					environment: "node",
				},
			},
		],
	},
	plugins: [tsconfigPaths()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./packages/ui/src"),
		},
	},
	define: {
		"import.meta.vitest": "undefined",
	},
})