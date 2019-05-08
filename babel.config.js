module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current"
        }
      }
    ]
  ],
  env: {
    test: {
      ignore: []
    },
    development: {
      ignore: ["**/__tests__", "**/*.spec.js", "**/*.test.js"]
    }
  }
};
