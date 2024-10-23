import globals from "globals";
import pluginReact from "eslint-plugin-react";

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
    env: {
      browser: true,  
      node: true,    
      jest: true,     
    },
  },
  pluginReact.configs.flat.recommended, 
  {
    ignores: [
      'node_modules/',
      'dist/',
    ]
  },
]