import React from 'react';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

const Component = () => <div role="button">42</div>;

test('test', () => {
  render(<Component />);

  const btn = screen.getByRole('button');
  expect(btn).toHaveTextContent('42');
});
