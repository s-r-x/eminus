import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Eminus from '../components/Root/Uncontrolled';

test('User defines callbacks', () => {
  const onBlur = jest.fn();
  const onFocus = jest.fn();
  const onChange = jest.fn();
  const onPointerDown = jest.fn();
  const onComplete = jest.fn();
  render(
    <Eminus
      step={5}
      defaultValue={[0, 10]}
      onFocus={onFocus}
      onBlur={onBlur}
      onComplete={onComplete}
      onPointerDown={onPointerDown}
      onChange={onChange}
    />
  );
  const [firstCtrl, secondCtrl] = screen.getAllByRole('slider');

  firstCtrl.focus();
  firstCtrl.blur();
  secondCtrl.focus();
  secondCtrl.blur();

  fireEvent.mouseDown(firstCtrl);
  fireEvent.mouseDown(secondCtrl);

  fireEvent.keyDown(secondCtrl, { key: 'ArrowRight' });

  fireEvent.mouseUp(secondCtrl);

  expect(onBlur).toBeCalledTimes(3);
  expect(onBlur).toHaveBeenNthCalledWith(1, expect.anything(), 0);
  expect(onBlur).toHaveBeenNthCalledWith(2, expect.anything(), 1);
  expect(onBlur).toHaveBeenNthCalledWith(3, expect.anything(), 0);

  expect(onFocus).toBeCalledTimes(4);
  expect(onFocus).toHaveBeenNthCalledWith(1, expect.anything(), 0);
  expect(onFocus).toHaveBeenNthCalledWith(2, expect.anything(), 1);
  expect(onFocus).toHaveBeenNthCalledWith(3, expect.anything(), 0);
  expect(onFocus).toHaveBeenNthCalledWith(4, expect.anything(), 1);

  expect(onPointerDown).toBeCalledTimes(2);
  expect(onPointerDown).toHaveBeenNthCalledWith(1, expect.anything(), 0);
  expect(onPointerDown).toHaveBeenNthCalledWith(2, expect.anything(), 1);

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith([0, 15]);

  expect(onComplete).toHaveBeenCalledTimes(1);
  expect(onComplete).toHaveBeenCalledWith([0, 15]);
});
