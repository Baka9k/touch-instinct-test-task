module.exports = {
  "extends": "standard",
  "plugins": [
    "react"
  ],
  "rules": {
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "no-trailing-spaces": ["error", { "skipBlankLines": true }],
    "padded-blocks": ["error", { "classes": "always" }]
  },
  "env": {
    "browser": true,
    "node": true
  }
};