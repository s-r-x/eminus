import prettier from 'prettier/standalone';
import prettierBabel from 'prettier/parser-babel';

export const parameters = {
  layout: 'centered',
  options: {
    storySort: {
      method: '',
      order: ['Playground', 'Styling', 'Custom tooltip renderer'],
      locales: '',
    },
  },
  docs: {
    transformSource: input =>
      prettier.format(input, {
        parser: 'babel',
        plugins: [prettierBabel],
      }),
  },
};
