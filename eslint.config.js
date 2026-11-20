import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";
import graftwork from "./tooling/eslint-plugin-graftwork.js";

export default tseslint.config(
  { ignores: [".next/**", "node_modules/**", "test-results/**", "playwright-report/**", "next-env.d.ts"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx,js,mjs}"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  { files: ["**/*.tsx"], ...jsxA11y.flatConfigs.strict },
  reactHooks.configs.flat.recommended,
  {
    plugins: { "@next/next": nextPlugin },
    rules: { ...nextPlugin.configs.recommended.rules, ...nextPlugin.configs["core-web-vitals"].rules },
  },
  {
    // Build only with @graftwork/ui and semantic tokens. See CLAUDE.md.
    files: ["**/*.{ts,tsx}"],
    plugins: { graftwork },
    rules: {
      "graftwork/no-outline-removal": "error",
      "graftwork/no-justified-text": "error",
      "graftwork/no-px-font-size": "error",
      "graftwork/no-raw-colour": "error",
      "no-restricted-syntax": [
        "error",
        {
          selector: "JSXAttribute[name.name='style']",
          message: "No one-off styles. Use @graftwork/ui components and semantic token classes.",
        },
      ],
    },
  },
);
