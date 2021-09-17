import React from 'react';
import { mount } from '../utils/mount';
import { Uncontrolled as Eminus } from '../../src';
import { $getFirstCtrl, $getLastCtrl } from '../helpers';

describe('Clamping', () => {
  it('Controls', () => {
    mount(<Eminus defaultValue={[-100, 150]} />);
    $getFirstCtrl().should('have.attr', 'aria-valuenow', '0');
    $getLastCtrl().should('have.attr', 'aria-valuenow', '100');
  });
  it('Controls interaction', () => {
    mount(<Eminus defaultValue={[25, 50]} step={150} />);
    $getFirstCtrl()
      .focus()
      .trigger('keydown', { key: 'ArrowRight' })
      .should('have.attr', 'aria-valuenow', '50');
    $getLastCtrl()
      .should('have.attr', 'aria-valuenow', '100')
      .trigger('keydown', { key: 'ArrowLeft' })
      .should('have.attr', 'aria-valuenow', '50');
    $getFirstCtrl().should('have.attr', 'aria-valuenow', '0');
  });
});
