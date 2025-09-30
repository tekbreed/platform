import { defineConfig, globalIgnores } from "eslint/config";
import reactInternalConfig from "./react-internal.js";

/**
 * React Router-specific ESLint configuration.
 * Extends the react-internal config and adds React Router-specific ignores and rules.
 *
 * Use this for:
 * - Applications using React Router
 * - Packages that need React Router-specific rule adjustments
 */
export default defineConfig([
  ...reactInternalConfig,
  {
    rules: {
      "no-empty-pattern": "off", // Allow empty destructuring in route meta functions
      "@typescript-eslint/no-namespace": "off", // Allow namespaces for route types
      // CSS-in-JS or CSS modules specific
      "at-rule-no-unknown": [
        "off",
        {
          ignoreAtRules: ["custom-variantcss"],
        },
      ],
    },
  },
]);
