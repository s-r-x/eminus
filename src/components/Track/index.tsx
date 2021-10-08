import React from 'react';
import { RootProps } from '../../typings/root-props';
import { Range } from '../../typings/shared';
import { mapNumberToPercent } from '../../utils/map-number';

type Props = Pick<RootProps, 'disabled' | 'hideTrack'> & {
  range: Range;
  vertical?: boolean;
  min: number;
  max: number;
};

class Track extends React.Component<Props> {
  get range(): Range {
    const { range, min, max } = this.props;
    return [
      mapNumberToPercent(range[0], min, max),
      mapNumberToPercent(range[1], min, max),
    ];
  }
  get progressStyle(): React.CSSProperties {
    const { range } = this;
    return {
      [this.props.vertical ? 'top' : 'left']: range[0] + '%',
      [this.props.vertical ? 'height' : 'width']: range[1] - range[0] + '%',
    };
  }
  render() {
    if (this.props.hideTrack) {
      return <div className="Eminus-track" />;
    }
    return (
      <div className="Eminus-track">
        <div className="Eminus-track-progress" style={this.progressStyle} />
      </div>
    );
  }
}

export default Track;
