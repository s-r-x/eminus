import React from 'react';
import { mount } from '../utils/mount';
import { Uncontrolled as Eminus } from '../../src';
import {
  $getFirstCtrl,
  $getLastCtrl,
  $getRoot,
  triggerPointerMoveToValue,
} from '../helpers';

describe('Min dist', () => {
  it('Mouse', () => {
    mount(<Eminus defaultValue={[0, 50]} minDist={10} disableCross />);
    $getRoot().then($root => {
      const rect = $root[0].getBoundingClientRect();
      $getFirstCtrl().trigger('mousedown');
      triggerPointerMoveToValue({
        value: 45,
        rect,
      });
      $getFirstCtrl()
        .should('have.attr', 'aria-valuenow', '40')
        .should('be.focused')
        .trigger('mouseup');
      $getLastCtrl().trigger('mousedown');
      triggerPointerMoveToValue({
        value: 10,
        rect,
      });
      $getLastCtrl()
        .should('have.attr', 'aria-valuenow', '50')
        .should('be.focused')
        .trigger('mouseup');
    });
  });
  it('Keyboard', () => {
    mount(
      <Eminus defaultValue={[30, 50]} minDist={10} disableCross step={20} />
    );
    $getFirstCtrl()
      .focus()
      .trigger('keydown', { key: 'ArrowRight' })
      .should('have.attr', 'aria-valuenow', '40')
      .should('be.focused');
    $getLastCtrl()
      .focus()
      .trigger('keydown', { key: 'ArrowLeft' })
      .should('have.attr', 'aria-valuenow', '50')
      .should('be.focused');
  });
  it('Should ignore minDist if cross is allowed', () => {
    mount(<Eminus defaultValue={[40, 50]} minDist={10} step={20} />);
    $getFirstCtrl()
      .focus()
      .trigger('keydown', { key: 'ArrowRight' })
      .should('have.attr', 'aria-valuenow', '50')
      .should('not.be.focused');
    $getLastCtrl()
      .should('be.focused')
      .should('have.attr', 'aria-valuenow', '60')
      .trigger('keydown', { key: 'ArrowLeft' })
      .should('have.attr', 'aria-valuenow', '50')
      .should('not.be.focused');
  });
});
