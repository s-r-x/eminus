import { $getBody } from './selectors';
import { mapNumber } from '../../src/utils/map-number';

export type MovePointerToValueDto = {
  value: number;
  isVertical?: boolean;
  min?: number;
  max?: number;
  event?: PointerMoveEvent;
  rect: DOMRect;
};
export type PointerMoveEvent = 'touchmove' | 'mousemove';
export const triggerPointerMoveToValue = ({
  value,
  event = 'mousemove',
  isVertical = false,
  min = 0,
  max = 100,
  rect,
}: MovePointerToValueDto) => {
  const size = isVertical ? rect.height : rect.width;
  const mapped = mapNumber(value, min, max, 0, size);
  const clickPoint = isVertical ? mapped + rect.top : mapped + rect.left;
  return $getBody().trigger(event, {
    [isVertical ? 'clientY' : 'clientX']: clickPoint,
  });
};
