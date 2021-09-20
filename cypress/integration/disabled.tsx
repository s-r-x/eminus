import React from 'react';
import { mount } from '../utils/mount';
import { Uncontrolled as Eminus } from '../../src';
import { $getCtrl, $getRoot } from '../helpers';

it('Disabled', () => {
  mount(<Eminus defaultValue={[0, 50]} disabled />);
  $getRoot()
    .should('have.class', 'Eminus--disabled')
    .should('have.css', 'pointer-events', 'none');
  $getCtrl().each($ctrl => {
    cy.wrap($ctrl).should('not.have.attr', 'tab-index');
    cy.wrap($ctrl).should('have.css', 'pointer-events', 'none');
  });
});
