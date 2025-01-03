import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: { globals: globals.browser },
    ...pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginReact.configs.flat.recommended,
    rules: {
      "import/no-unresolved": "warn",
      "import/named": "warn",
      "import/no-duplicates": "warn",
      "import/order": [
        "warn",
        {
          "groups": [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index"
          ],
          "pathGroups": [
            {
              "pattern": "components/**",
              "group": "internal"
            },
            {
              "pattern": "common/**",
              "group": "internal"
            },
            {
              "pattern": "routes/**",
              "group": "internal"
            },
            {
              "pattern": "assets/**",
              "group": "internal",
              "position": "after"
            }
          ],
          "pathGroupsExcludedImportTypes": ["builtin"],
          "alphabetize": {
            "order": "asc",
            "caseInsensitive": true
          }
        }
      ]
    }
  }
];
