import promisify from 'cypress-promise';
import { mapNumber } from '../../src/utils/map-number';

const $get = cy.get.bind(cy);
export const $getBody = () => $get('body');
export const $getRoot = () => $get('.Eminus');
export const $getCtrl = () => $get('.Eminus-control');
export const getRootRect = () => {
  return promisify($getRoot().then($el => $el[0].getBoundingClientRect()));
};
export const triggerPointerMoveToValue = async (
  value: number,
  event: 'touchmove' | 'mousemove' = 'mousemove',
  isVertical = false,
  min = 0,
  max = 100
) => {
  const rootRect = await getRootRect();
  const size = Math.abs(
    isVertical ? rootRect.top - rootRect.bottom : rootRect.left - rootRect.right
  );
  const mapped = mapNumber(value, min, max, 0, size);
  const clickPoint = isVertical
    ? mapped + rootRect.top
    : mapped + rootRect.left;
  return promisify(
    $getBody().trigger(event, {
      [isVertical ? 'clientY' : 'clientX']: clickPoint,
    })
  );
};
