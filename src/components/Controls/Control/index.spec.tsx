import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Control, { Props } from '.';

const genBaseProps = (props: Partial<Props>): Props => ({
  value: 10,
  min: 0,
  max: 100,
  step: 1,
  idx: 0,
  onBlur: jest.fn(),
  onFocus: jest.fn(),
  onPointerDown: jest.fn(),
  onMouseEnter: jest.fn(),
  onMouseLeave: jest.fn(),
  disabled: false,
  ...props,
});
describe('Control', () => {
  it('should render and react to user input', () => {
    const props = genBaseProps({
      ariaLabel: 'label',
      ariaLabelledBy: 'aria-labelled-by',
      ariaDescribedBy: 'aria-described-by',
      ariaValueText: 'aria-value-text',
    });

    render(<Control {...props} />);
    const ctrl = screen.getByRole('slider');
    expect(ctrl).toBeInTheDocument();

    expect(ctrl).toHaveAttribute('data-idx', String(props.idx));
    expect(ctrl).toHaveAttribute('aria-orientation', 'horizontal');
    expect(ctrl).toHaveAttribute('aria-label', props.ariaLabel);
    expect(ctrl).toHaveAttribute('aria-labelledby', props.ariaLabelledBy);
    expect(ctrl).toHaveAttribute('aria-describedby', props.ariaDescribedBy);
    expect(ctrl).toHaveAttribute('aria-valuemin', String(props.min));
    expect(ctrl).toHaveAttribute('aria-valuemax', String(props.max));
    expect(ctrl).toHaveAttribute('aria-valuenow', String(props.value));
    expect(ctrl).toHaveAttribute('tabIndex', '0');
    expect(ctrl).toHaveAttribute('aria-disabled', 'false');
    expect(ctrl).toHaveAttribute('aria-valuetext', props.ariaValueText);
    expect(ctrl).toHaveStyle({ left: `${props.value}%`, cursor: 'grab' });

    ctrl.focus();
    expect(ctrl).toHaveFocus();
    expect(props.onFocus).toBeCalledWith(expect.anything(), props.idx);

    ctrl.blur();
    expect(props.onBlur).toBeCalledWith(expect.anything(), props.idx);

    fireEvent.mouseDown(ctrl);
    expect(props.onPointerDown).toBeCalledWith(expect.anything(), props.idx);

    fireEvent.touchStart(ctrl);
    expect(props.onPointerDown).toBeCalledTimes(2);
    expect(props.onPointerDown).toHaveBeenLastCalledWith(
      expect.anything(),
      props.idx
    );

    fireEvent.mouseEnter(ctrl);
    expect(props.onMouseEnter).toBeCalledWith(props.idx);

    fireEvent.mouseLeave(ctrl);
    expect(props.onMouseLeave).toBeCalled();
  });
  it('should render in vertical mode', () => {
    const props = genBaseProps({
      vertical: true,
    });
    render(<Control {...props} />);
    const ctrl = screen.getByRole('slider');
    expect(ctrl).toHaveAttribute('aria-orientation', 'vertical');
    expect(ctrl).toHaveStyle({ top: `${props.value}%`, cursor: 'grab' });
  });
  it('should clamp the value to max if it is too big', () => {
    {
      const props = genBaseProps({
        value: 76,
        min: 25,
        max: 75,
      });
      render(<Control {...props} />);
      const ctrl = screen.getByRole('slider');
      expect(ctrl).toHaveStyle({ left: '100%' });
      expect(ctrl).toHaveAttribute('aria-valuenow', String(props.max));
    }
  });
  it('should clamp the value to min if it is too small', () => {
    {
      const props = genBaseProps({
        value: 24,
        min: 25,
        max: 75,
      });
      render(<Control {...props} />);
      const ctrl = screen.getByRole('slider');
      expect(ctrl).toHaveStyle({ left: '0%', cursor: 'grab' });
      expect(ctrl).toHaveAttribute('aria-valuenow', String(props.min));
    }
  });
});
