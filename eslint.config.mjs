import js from "@eslint/js";
import next from "eslint-config-next";

const eslintConfig = [
  // Base JS rules
  js.configs.recommended,

  // Next.js recommended rules
  ...next,

  // Project-specific overrides
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      // Allow unused args starting with _
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],

      // Common Next.js relaxations
      "@next/next/no-img-element": "off",
      "react/react-in-jsx-scope": "off",
    },
  },

  {
    languageOptions: {
      globals: {
        React: "writable",
      },
    },
  },

  {
    ignores: [".next/**", "dist/**", "node_modules/**"],
  },
];

export default eslintConfig;
