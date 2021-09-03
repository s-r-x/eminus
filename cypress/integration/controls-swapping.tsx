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

describe('Controls swapping', () => {
  it('By mouse interaction', () => {
    mount(<Eminus defaultValue={[10, 50]} />);
    $getFirstCtrl().trigger('mousedown');
    $getRoot().then($root => {
      const rect = $root[0].getBoundingClientRect();
      triggerPointerMoveToValue({ value: 75, rect });
      cy.focused()
        .should('have.attr', 'data-idx', '1')
        .should('have.attr', 'aria-valuenow', '75');
      $getFirstCtrl()
        .should('have.attr', 'aria-valuenow', '50')
        .should('have.attr', 'data-idx', '0');
      triggerPointerMoveToValue({ value: 0, rect });
      cy.focused()
        .should('have.attr', 'data-idx', '0')
        .should('have.attr', 'aria-valuenow', '0');
      $getLastCtrl()
        .should('have.attr', 'data-idx', '1')
        .should('have.attr', 'aria-valuenow', '50');
      $getBody().trigger('mouseup');
    });
  });
  it('By keyboard interaction', () => {
    mount(<Eminus defaultValue={[40, 50]} step={20} />);
    $getFirstCtrl()
      .focus()
      .trigger('keydown', { key: 'ArrowRight' })
      .should('have.attr', 'aria-valuenow', '50');
    cy.focused()
      .should('have.attr', 'data-idx', '1')
      .should('have.attr', 'aria-valuenow', '60')
      .trigger('keydown', { key: 'ArrowLeft' })
      .should('have.attr', 'aria-valuenow', '50');
    cy.focused()
      .should('have.attr', 'data-idx', '0')
      .should('have.attr', 'aria-valuenow', '40');
  });
});
