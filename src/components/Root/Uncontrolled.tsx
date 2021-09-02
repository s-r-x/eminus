import React, { Component } from 'react';
import { OnChangeFn } from '../../typings/event-fns';
import { UncontrolledRootProps } from '../../typings/root-props';
import Eminus from './';

type Props = UncontrolledRootProps;
type State = {
  value: number[];
};
class EminusUncontrolled extends Component<Props, State> {
  static defaultProps: Omit<Props, 'defaultValue'> = {
    min: 0,
    max: 100,
    step: 1,
    disableCross: false,
    marks: [],
    ariaLabel: [],
    ariaLabelledBy: [],
    ariaDescribedBy: [],
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      value: props.defaultValue,
    };
  }
  onChange: OnChangeFn = value => {
    this.setState({ value });
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  };
  render() {
    const { defaultValue: _d, ...props } = this.props;
    return (
      <Eminus value={this.state.value} onChange={this.onChange} {...props} />
    );
  }
}
export default EminusUncontrolled;
