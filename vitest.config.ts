/// <reference types="@vitest/browser/matchers" />
import { defineProject } from "vitest/config";

export default defineProject({
  test: {
    exclude: [
      "**/build/**",
      "**/dist/**",
      "**/node_modules/**",
      "**/e2e/**",
      "**/*.e2e.{test,spec}.{ts,tsx,js,jsx}",
    ],

    // setupFiles: ["./vitest.setup.ts"],
    projects: [
      "apps/*",
      "packages/*",
      {
        test: {
          name: { label: "browser", color: "blue" },
          include: ["**/tests/**/*.browser.{test,spec}.{ts,tsx,js,jsx}"],
          exclude: ["**/e2e/**"],
          browser: {
            enabled: true,
            provider: "playwright",
            instances: [{ browser: "chromium" }],
          },
        },
      },
      {
        test: {
          name: { label: "node", color: "green" },
          include: ["**/tests/**/*.{node}.test.{ts,js}"],
          exclude: ["**/e2e/**"],
          environment: "node",
        },
      },
    ],
  },
  define: {
    "import.meta.vitest": "undefined",
  },
});
