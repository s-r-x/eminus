import React from 'react';
import { mount } from '../utils/mount';
import { Uncontrolled as Eminus } from '../../src';

it('renders learn react link', () => {
  mount(<Eminus defaultValue={[1, 10]} />);
  const $root = cy.get('.Eminus');
  $root.should('exist');
});
