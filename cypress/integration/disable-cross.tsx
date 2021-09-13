import React from 'react';
import { mount } from '../utils/mount';
import { Uncontrolled as Eminus } from '../../src';
import {
  $getBody,
  $getCtrlByIdx,
  $getFirstCtrl,
  $getLastCtrl,
  $getRoot,
  triggerPointerMoveToValue,
} from '../helpers';

describe('Disable cross', () => {
  it('Controlled by keyboard', () => {
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
  it('Controlled by mouse', () => {
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
  describe('should avoid deadlock when selected control is at the min or max, and there are other controls with higher or lower indexes, which prevents moving selected controls in any direction', () => {
    it('All controls at the start', () => {
      const step = '5';
      mount(
        <Eminus defaultValue={[0, 0, 0]} disableCross step={Number(step)} />
      );
      $getCtrlByIdx(0)
        .focus()
        .trigger('keydown', { key: 'ArrowRight', force: true })
        .should('have.attr', 'aria-valuenow', '0');
      $getCtrlByIdx(2)
        .should('have.attr', 'aria-valuenow', step)
        .should('have.focus');
      $getCtrlByIdx(1).should('have.attr', 'aria-valuenow', '0');

      $getCtrlByIdx(0)
        .focus()
        .trigger('keydown', { key: 'ArrowRight', force: true })
        .should('have.attr', 'aria-valuenow', '0');
      $getCtrlByIdx(1)
        .should('have.attr', 'aria-valuenow', step)
        .should('have.focus');
    });
    it('All controls at the end', () => {
      const step = '5';
      mount(
        <Eminus
          defaultValue={[100, 100, 100]}
          disableCross
          step={Number(step)}
        />
      );
      $getCtrlByIdx(2)
        .focus()
        .trigger('keydown', { key: 'ArrowLeft', force: true })
        .should('have.attr', 'aria-valuenow', '100');
      $getCtrlByIdx(0)
        .should('have.attr', 'aria-valuenow', '95')
        .should('have.focus');
      $getCtrlByIdx(2)
        .should('have.attr', 'aria-valuenow', '100')
        .focus()
        .trigger('keydown', { key: 'ArrowLeft', force: true })
        .should('have.attr', 'aria-valuenow', '100');
      $getCtrlByIdx(1)
        .should('have.attr', 'aria-valuenow', '95')
        .should('have.focus')
        .trigger('keydown', { key: 'ArrowLeft', force: true })
        .should('have.attr', 'aria-valuenow', '95');
      $getCtrlByIdx(0)
        .focus()
        .trigger('keydown', { key: 'ArrowLeft', force: true })
        .should('have.attr', 'aria-valuenow', '90');
    });
  });
});
