import React from 'react';
import { mount } from '../utils/mount';
import { Uncontrolled as Eminus } from '../../src';
import { $getBody, $getCtrl, triggerPointerMoveToValue } from '../helpers';

describe('Pointer interaction', () => {
  it('Mouse', async () => {
    mount(<Eminus defaultValue={[0]} step={1} />);
    $getCtrl().trigger('mousedown');
    $getBody().should('have.class', 'EminusGlobal--dragging');
    await triggerPointerMoveToValue(50);
    $getCtrl().should('have.attr', 'aria-valuenow', '50');
    await triggerPointerMoveToValue(25);
    $getCtrl().should('have.attr', 'aria-valuenow', '25');
    await triggerPointerMoveToValue(100);
    $getCtrl().should('have.attr', 'aria-valuenow', '100');
    await triggerPointerMoveToValue(0);
    $getCtrl().should('have.attr', 'aria-valuenow', '0');
    $getBody().trigger('mouseup');
    $getBody().should('not.have.class', 'EminusGlobal--dragging');
  });
  it('Touch', async () => {
    mount(<Eminus defaultValue={[0]} step={1} />);
    $getCtrl().trigger('touchstart');
    $getBody().should('have.class', 'EminusGlobal--dragging');
    await triggerPointerMoveToValue(50, 'touchmove');
    $getCtrl().should('have.attr', 'aria-valuenow', '50');
    await triggerPointerMoveToValue(25, 'touchmove');
    $getCtrl().should('have.attr', 'aria-valuenow', '25');
    await triggerPointerMoveToValue(100, 'touchmove');
    $getCtrl().should('have.attr', 'aria-valuenow', '100');
    await triggerPointerMoveToValue(0, 'touchmove');
    $getCtrl().should('have.attr', 'aria-valuenow', '0');
    $getBody().trigger('touchend');
    $getBody().should('not.have.class', 'EminusGlobal--dragging');
  });
});
