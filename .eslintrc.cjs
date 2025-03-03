module.exports = {
   root: true,
   ignorePatterns: ["dist", ".eslintrc.cjs"],
   parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      ecmaFeatures: {
         jsx: true,
      },
   },
   settings: {
      react: {
         version: "detect",
      },
      "import/resolver": {
         node: {
            paths: ["src"],
            extensions: [".js", ".jsx"],
         },
      },
   },
   env: { browser: true, es2020: true },
   extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:jsx-a11y/recommended",
      "plugin:react-hooks/recommended",
   ],
   plugins: [
      "react-refresh",
      "simple-import-sort",
      "prettier",
      "unused-imports",
   ],
   rules: {
      "unused-imports/no-unused-imports": "error",
      "react-refresh/only-export-components": [
         "warn",
         { allowConstantExport: true },
      ],
      "react/react-in-jsx-scope": "off",
      "jsx-a11y/accessible-emoji": "off",
      "react/prop-types": "off",
      "simple-import-sort/imports": [
         "error",
         {
            groups: [
               [
                  "^react",
                  "^@?\\w",
                  "^(@|components|modules|utils)(/.*|$)",
                  "^\\u0000",
                  "^\\.\\.(?!/?$)",
                  "^\\.\\./?$",
                  "^\\./(?=.*/)(?!/?$)",
                  "^\\.(?!/?$)",
                  "^\\./?$",
                  "^/",
               ],
               [
                  "^.+\\.s?css$",
               ],
            ],
         },
      ],
      "simple-import-sort/exports": "error",
      "jsx-a11y/anchor-is-valid": [
         "error",
         {
            components: ["Link"],
            specialLink: ["hrefLeft", "hrefRight"],
            aspects: ["invalidHref", "preferButton"],
         },
      ],
   },
};
