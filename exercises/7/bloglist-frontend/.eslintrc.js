module.exports = {
  "env": {
      "browser": true,
      "es6": true,
      "jest/globals": true,
      "cypress/globals": true

  },
  "extends": [ 
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:cypress/recommended"

  ],
  "parserOptions": {
      "ecmaFeatures": {
          "jsx": true
      },
      "ecmaVersion": 2020,
      "sourceType": "module"
  },
  "plugins": [
      "react", "jest", "cypress","react-hooks"
  ],
  "rules": {
      "indent": [
          "error",
          2  
      ],
      "linebreak-style": [
          "error",
          "unix"
      ],
      "quotes": [
          "error",
          "single"
      ],
      "semi": [
          "error",
          "never"
      ],
      "eqeqeq": "error",
      "no-trailing-spaces": "error",
      "object-curly-spacing": [
          "error", "always"
      ],
      "arrow-spacing": [
          "error", { "before": true, "after": true }
      ],
      "react-hooks/rules-of-hooks": "warn",
      "react-hooks/exhaustive-deps": "warn",
      "no-console": 0,
      "react/prop-types": 0,
      "linebreak-style":0
    },
    "settings": {
        "react": {
            "version": "detect",
        },
    }
}