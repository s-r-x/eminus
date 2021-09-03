import React from 'react';
import { mount } from '../utils/mount';
import { Uncontrolled as Eminus } from '../../src';

it('Keyboard interaction', () => {
  mount(<Eminus defaultValue={[0, 50]} step={10} />);
  const $root = cy.get('.Eminus');
  const $ctrl1 = $root.get('.Eminus-control').first();
  $ctrl1.focus();
  cy.focused().should('have.attr', 'data-idx', '0');
  $ctrl1.trigger('keydown', { key: 'ArrowRight' });
  $ctrl1.trigger('keydown', { key: 'ArrowRight' });
  $ctrl1.should('have.attr', 'aria-valuenow', '20');
  $ctrl1.trigger('keydown', { key: 'ArrowLeft' });
  $ctrl1.should('have.attr', 'aria-valuenow', '10');

  const $ctrl2 = $root.get('.Eminus-control').last();
  $ctrl2.focus();
  cy.focused().should('have.attr', 'data-idx', '1');
  $ctrl2.trigger('keydown', { key: 'ArrowLeft' });
  $ctrl2.trigger('keydown', { key: 'ArrowLeft' });
  $ctrl2.should('have.attr', 'aria-valuenow', '30');
  $ctrl2.trigger('keydown', { key: 'ArrowRight' });
  $ctrl2.should('have.attr', 'aria-valuenow', '40');
});
