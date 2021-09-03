import React from 'react';
import { mount } from '../utils/mount';
import { Uncontrolled as Eminus } from '../../src';

it('Disabled', () => {
  mount(<Eminus defaultValue={[0, 50]} disabled />);
  const $root = cy.get('.Eminus');
  $root.should('have.class', 'Eminus--disabled');
  $root.should('have.css', 'pointer-events', 'none');
  const $ctrls = $root.get('.Eminus-control');
  $ctrls.each($ctrl => {
    expect($ctrl).to.not.have.attr('tab-index');
  });
});
