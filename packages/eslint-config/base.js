import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default defineConfig([
  globalIgnores([
    "node_modules/*",
    "dist/*",
    "build/*",
    "coverage/*",
    "public/*",
    ".react-router/*", // React Router build artifacts
    "eslint.config.mjs",
    "test-results/*",
    "playwright-report/*",
    "src/generated/*", // React Router generated files
  ]),
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  tseslint.configs.recommended,
  {
    plugins: {
      tseslint: tseslint,
    },
    rules: {
      "no-unused-vars": "error",
      "no-empty": "warn", // Warn instead of error for empty blocks
      "no-empty-pattern": "off", // Allow empty destructuring patterns
      "@typescript-eslint/no-namespace": "off", // Allow TypeScript namespaces
    },
  },
]);
