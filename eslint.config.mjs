import js from "@eslint/js";
import next from "eslint-config-next";

export default [
  // Base JS rules
  js.configs.recommended,

  // Next.js recommended rules
  next(),

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
    ignores: [".next/**", "dist/**", "node_modules/**"],
  },
];
