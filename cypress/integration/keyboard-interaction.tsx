import React from 'react';
import { mount } from '../utils/mount';
import { Uncontrolled as Eminus } from '../../src';
import { $getFirstCtrl, $getLastCtrl } from '../helpers';

it('Keyboard interaction', () => {
  mount(<Eminus defaultValue={[0, 50]} step={10} />);
  $getFirstCtrl().focus();
  cy.focused()
    .should('have.attr', 'data-idx', '0')
    .trigger('keydown', { key: 'ArrowRight' })
    .trigger('keydown', { key: 'ArrowRight' })
    .should('have.attr', 'aria-valuenow', '20')
    .trigger('keydown', { key: 'ArrowLeft' })
    .should('have.attr', 'aria-valuenow', '10');

  $getLastCtrl().focus();
  cy.focused()
    .should('have.attr', 'data-idx', '1')
    .trigger('keydown', { key: 'ArrowLeft' })
    .trigger('keydown', { key: 'ArrowLeft' })
    .should('have.attr', 'aria-valuenow', '30')
    .trigger('keydown', { key: 'ArrowRight' })
    .should('have.attr', 'aria-valuenow', '40');
});
