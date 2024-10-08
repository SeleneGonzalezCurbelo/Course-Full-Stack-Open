import globals from "globals";
import pluginReact from "eslint-plugin-react";
import stylisticJs from '@stylistic/eslint-plugin';

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules : {
      "indent": ["error", 2],
      "linebreak-style": ["error", "windows"],
      "quotes": ["error", "single"], 
      "semi": ["error", "never"], 
      "no-extra-semi": "error", 
    }
  },
  {
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: "detect", // Detectar automáticamente la versión de React
      },
    }
  },
  {
    ignores: [
      'node_modules/',
      'dist/',
    ]
  },
];