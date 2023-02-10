module.exports = {
  "stories": [
    "../packages/layout/src/**/*.stories.@(tsx)",
    "../packages/ui/src/**/*.stories.@(tsx)",
  ],
  "addons": ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
  "framework": {
    name: "@storybook/react-vite",
    options: {}
  },
  "features": {
    "storyStoreV7": true
  },
  docs: {
    autodocs: true
  }
};
