module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
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
