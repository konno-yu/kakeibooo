module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-react-i18next',
    '@storybook/addon-interactions',
  ],
  staticDirs: ['./public'],
  babel: async (options) => ({
    ...options,
    presets: [...options.presets, '@emotion/babel-preset-css-prop'],
  }),
  features: {
    interactionsDebugger: true,
  },
  framework: '@storybook/react',
};
