import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Control, { Props } from '.';

describe('Control', () => {
  it('should render correctly based on passed props', () => {
    const props: Props = {
      value: 10,
      min: 0,
      max: 100,
      step: 1,
      idx: 0,
      onBlur: jest.fn(),
      onFocus: jest.fn(),
      onMouseDown: jest.fn(),
      onMouseEnter: jest.fn(),
      onMouseLeave: jest.fn(),
      ariaLabel: 'label',
      ariaLabelledBy: 'aria-labelled-by',
      ariaDescribedBy: 'aria-described-by',
      vertical: true,
      disabled: false,
      ariaValueText: 'aria-value-text',
    };

    render(<Control {...props} />);
    const ctrl = screen.getByRole('slider');

    expect(ctrl).toHaveAttribute('data-idx', String(props.idx));
    expect(ctrl).toHaveAttribute('aria-orientation', 'vertical');
    expect(ctrl).toHaveAttribute('aria-label', props.ariaLabel);
    expect(ctrl).toHaveAttribute('aria-labelledby', props.ariaLabelledBy);
    expect(ctrl).toHaveAttribute('aria-describedby', props.ariaDescribedBy);
    expect(ctrl).toHaveAttribute('aria-valuemin', String(props.min));
    expect(ctrl).toHaveAttribute('aria-valuemax', String(props.max));
    expect(ctrl).toHaveAttribute('aria-valuenow', String(props.value));
    expect(ctrl).toHaveAttribute('tabIndex', '0');
    expect(ctrl).toHaveAttribute('aria-disabled', 'false');
    expect(ctrl).toHaveAttribute('aria-valuetext', props.ariaValueText);
    expect(ctrl).toHaveStyle({ top: '10%', cursor: 'grab' });

    ctrl.focus();
    expect(ctrl).toHaveFocus();
    expect(props.onFocus).toBeCalledWith(expect.anything(), props.idx);

    ctrl.blur();
    expect(props.onBlur).toBeCalledWith(expect.anything(), props.idx);

    fireEvent.mouseDown(ctrl);
    expect(props.onMouseDown).toBeCalledWith(props.idx);

    fireEvent.touchStart(ctrl);
    expect(props.onMouseDown).toBeCalledTimes(2);
    expect(props.onMouseDown).toHaveBeenLastCalledWith(props.idx);

    fireEvent.mouseEnter(ctrl);
    expect(props.onMouseEnter).toBeCalledWith(props.idx);

    fireEvent.mouseLeave(ctrl);
    expect(props.onMouseLeave).toBeCalled();
  });
});
