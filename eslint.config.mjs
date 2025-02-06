import jsPkg from "@eslint/js";
const { configs: jsConfigs } = jsPkg;
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
const { configs: reactConfigs } = reactPlugin;
import importPlugin from "eslint-plugin-import";
import globals from "globals";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],

    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.browser
      }
    },

    plugins: {
      "@typescript-eslint": tsPlugin,
      react: reactPlugin,
      import: importPlugin
    },

    settings: {
      react: {
        version: "detect"
      },
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json"
        }
      }
    },

    rules: {
      ...jsConfigs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      ...reactConfigs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "no-explicit-any": "off",
      "import/no-unresolved": "warn",
      "import/named": "warn",
      "import/no-duplicates": "warn",
      "no-multiple-empty-lines": [
        "warn",
        {
          "max": 1,
          "maxEOF": 1,
          "maxBOF": 0
        }
      ],
      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          pathGroups: [
            {
              pattern: "components/**",
              group: "internal"
            },
            {
              pattern: "common/**",
              group: "internal"
            },
            {
              pattern: "routes/**",
              group: "internal"
            },
            {
              pattern: "assets/**",
              group: "internal",
              position: "after"
            }
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          alphabetize: {
            order: "asc",
            caseInsensitive: true
          }
        }
      ]
    }
  }
];