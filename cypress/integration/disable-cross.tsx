import React from 'react';
import { mount } from '../utils/mount';
import { Uncontrolled as Eminus } from '../../src';
import {
  $getBody,
  $getFirstCtrl,
  $getLastCtrl,
  $getRoot,
  triggerPointerMoveToValue,
} from '../helpers';

describe('Disable cross', () => {
  it('Keyboard', () => {
    mount(<Eminus defaultValue={[45, 50]} disableCross step={10} />);
    $getFirstCtrl()
      .focus()
      .trigger('keydown', { key: 'ArrowRight' })
      .should('have.attr', 'aria-valuenow', '50')
      .trigger('keydown', { key: 'ArrowRight', force: true })
      .should('have.attr', 'aria-valuenow', '50')
      .trigger('keydown', { key: 'ArrowLeft', force: true })
      .should('have.attr', 'aria-valuenow', '40');
    $getLastCtrl()
      .focus()
      .trigger('keydown', { key: 'ArrowRight' })
      .should('have.attr', 'aria-valuenow', '60')
      .trigger('keydown', { key: 'ArrowLeft' })
      .trigger('keydown', { key: 'ArrowLeft' })
      .should('have.attr', 'aria-valuenow', '40')
      .trigger('keydown', { key: 'ArrowLeft' })
      .should('have.attr', 'aria-valuenow', '40');
    $getFirstCtrl()
      .focus()
      .trigger('keydown', { key: 'ArrowRight', force: true })
      .should('have.attr', 'aria-valuenow', '40');
  });
  it('Mouse', () => {
    mount(<Eminus defaultValue={[45, 50]} disableCross />);

    $getRoot().then($root => {
      $getFirstCtrl().trigger('mousedown');
      const rect = $root[0].getBoundingClientRect();
      triggerPointerMoveToValue({ value: 60, rect });
      $getFirstCtrl().should('have.attr', 'aria-valuenow', '50');
      $getLastCtrl().should('have.attr', 'aria-valuenow', '50');
      triggerPointerMoveToValue({ value: 65, rect });
      $getFirstCtrl().should('have.attr', 'aria-valuenow', '50');
      $getLastCtrl().should('have.attr', 'aria-valuenow', '50');
      triggerPointerMoveToValue({ value: 30, rect });
      $getFirstCtrl().should('have.attr', 'aria-valuenow', '30');
      $getLastCtrl().should('have.attr', 'aria-valuenow', '50');
      $getBody().trigger('mouseup');
      $getLastCtrl().trigger('mousedown');
      triggerPointerMoveToValue({ value: 25, rect });
      $getFirstCtrl().should('have.attr', 'aria-valuenow', '30');
      $getLastCtrl().should('have.attr', 'aria-valuenow', '30');
      $getBody().trigger('mouseup');
    });
  });
});
