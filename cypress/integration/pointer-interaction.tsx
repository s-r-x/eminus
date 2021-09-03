import React from 'react';
import { mount } from '../utils/mount';
import { Uncontrolled as Eminus } from '../../src';
import {
  $getBody,
  $getCtrl,
  $getRoot,
  PointerMoveEvent,
  triggerPointerMoveToValue,
} from '../helpers';

const suites = [
  {
    name: 'Mouse',
    events: ['mousedown', 'mousemove', 'mouseup'],
  },
  {
    name: 'Touch',
    events: ['touchstart', 'touchmove', 'touchend'],
  },
];
describe('Pointer interaction', () => {
  suites.forEach(({ name, events }) => {
    it(name, () => {
      mount(<Eminus defaultValue={[10]} step={1} />);
      $getRoot();
      $getCtrl().as('ctrl').trigger(events[0]);
      $getBody().should('have.class', 'EminusGlobal--dragging');
      cy.get('@root').then($root => {
        const rect = $root[0].getBoundingClientRect();
        triggerPointerMoveToValue({
          value: 50,
          rect,
        });
        cy.get('@ctrl').should('have.attr', 'aria-valuenow', '50');
        triggerPointerMoveToValue({
          value: 25,
          event: events[1] as PointerMoveEvent,
          rect,
        });
        cy.get('@ctrl').should('have.attr', 'aria-valuenow', '25');
        triggerPointerMoveToValue({
          value: 100,
          rect,
        });
        cy.get('@ctrl').should('have.attr', 'aria-valuenow', '100');
        triggerPointerMoveToValue({
          value: 0,
          rect,
        });
        cy.get('@ctrl').should('have.attr', 'aria-valuenow', '0');
        $getBody().trigger(events[2]);
        $getBody().should('not.have.class', 'EminusGlobal--dragging');
      });
    });
  });
});
