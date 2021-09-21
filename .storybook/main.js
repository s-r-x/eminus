module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  async viteFinal(config, { configType }) {
    if (configType === 'PRODUCTION') {
      config.base = '/eminus/';
    }
    return config;
  },
  core: {
    builder: 'storybook-builder-vite',
  },
};
