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
const Track = ({ range, hideTrack, min, max, vertical }: Props) => {
  if (hideTrack) {
    return <div className="Eminus-track" />;
  }
  const mappedRange = [
    mapNumberToPercent(range[0], min, max),
    mapNumberToPercent(range[1], min, max),
  ];
  return (
    <div className="Eminus-track">
      <div
        className="Eminus-track-progress"
        style={{
          [vertical ? 'top' : 'left']: mappedRange[0] + '%',
          [vertical ? 'height' : 'width']:
            mappedRange[1] - mappedRange[0] + '%',
        }}
      />
    </div>
  );
};
export default Track;
