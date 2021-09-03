import React from 'react';
import { mount } from '../utils/mount';
import { Uncontrolled as Eminus } from '../../src';
import {
  $getFirstCtrl,
  $getRoot,
  $getTooltip,
  triggerPointerMoveToValue,
} from '../helpers';

describe('Tooltips', () => {
  it('Should show tooltip on mouseenter and hide on mouseleave', () => {
    mount(<Eminus defaultValue={[50]} />);
    $getFirstCtrl().trigger('mouseover');
    $getTooltip().should('exist').should('have.attr', 'data-value', '50');
    $getFirstCtrl().trigger('mouseout');
    $getTooltip().should('not.exist');
  });
  it('Should show tooltip on focus and hide on blur', () => {
    mount(<Eminus defaultValue={[50]} />);
    $getFirstCtrl().focus();
    $getTooltip().should('exist').should('have.attr', 'data-value', '50');
    $getFirstCtrl().blur();
    $getTooltip().should('not.exist');
  });
  it('Should keep tooltip visible while pointer is moving', () => {
    mount(<Eminus defaultValue={[0]} />);
    $getRoot().then($root => {
      const rect = $root[0].getBoundingClientRect();
      $getFirstCtrl().trigger('mousedown');
      $getTooltip().should('exist');
      triggerPointerMoveToValue({
        value: 100,
        rect,
      });
      $getTooltip().should('exist').should('have.attr', 'data-value', '100');
      $getFirstCtrl().trigger('mouseup');
      $getTooltip().should('not.exist');
    });
  });
  it('Should keep tooltip visible while control is moving by keyboard', () => {
    mount(<Eminus defaultValue={[0]} step={25} />);
    $getFirstCtrl().focus().trigger('keydown', { key: 'ArrowRight' });
    $getTooltip().should('exist').should('have.attr', 'data-value', '25');
    $getFirstCtrl().blur();
  });
});
