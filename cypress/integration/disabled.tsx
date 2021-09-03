import React from 'react';
import { mount } from '../utils/mount';
import { Uncontrolled as Eminus } from '../../src';
import { $getCtrl, $getRoot } from '../helpers';

it('Disabled', () => {
  mount(<Eminus defaultValue={[0, 50]} disabled />);
  const $root = $getRoot();
  $root.should('have.class', 'Eminus--disabled');
  $root.should('have.css', 'pointer-events', 'none');
  const $ctrls = $getCtrl();
  $ctrls.each($ctrl => {
    expect($ctrl).to.not.have.attr('tab-index');
  });
});
