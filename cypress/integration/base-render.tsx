import React from 'react';
import { mount } from '../utils/mount';
import { Uncontrolled as Eminus, Props } from '../../src';
import { $getRoot } from '../helpers';

it('Base render', () => {
  const value = [1, 10];
  const ariaLabel: Props['ariaLabel'] = ['aria1', 'aria2'];
  const ariaLabelledBy: Props['ariaLabelledBy'] = [
    'labelled-by-1',
    'labelled-by-2',
  ];
  const ariaDescribedBy: Props['ariaDescribedBy'] = [
    'described-by-1',
    'described-by-2',
  ];
  const customClass = 'custom-class';
  const marks: Props['marks'] = [
    {
      value: 50,
      label: 'one',
    },
    {
      value: 100,
      label: 'hundred',
    },
  ];
  const min = 0,
    max = 100;
  const ariaValueTextFormatter: Props['ariaValueTextFormatter'] = value =>
    '' + value;
  mount(
    <Eminus
      className={customClass}
      defaultValue={value}
      marks={marks}
      min={min}
      max={max}
      ariaLabel={ariaLabel}
      ariaLabelledBy={ariaLabelledBy}
      ariaDescribedBy={ariaDescribedBy}
      ariaValueTextFormatter={ariaValueTextFormatter}
    />
  );
  $getRoot()
    .should('exist')
    .should('not.have.class', 'Eminus--vertical')
    .should('not.have.class', 'Eminus--disabled')
    .should('have.class', customClass)
    .get('.Eminus-track')
    .should('exist')
    .find('.Eminus-track-progress')
    .should('exist')
    .get('.Eminus-control')
    .should('have.length', value.length)
    .each(($ctrl, idx) => {
      cy.wrap($ctrl)
        .should('have.attr', 'data-idx', String(idx))
        .should('have.attr', 'aria-valuenow', String(value[idx]))
        .should('have.attr', 'aria-label', ariaLabel[idx])
        .should('have.attr', 'aria-valuemin', String(min))
        .should('have.attr', 'aria-valuemax', String(max))
        .should('have.attr', 'aria-labelledby', ariaLabelledBy[idx])
        .should('have.attr', 'aria-describedby', ariaDescribedBy[idx])
        .should('have.attr', 'aria-valuetext', String(value[idx]))
        .should('have.attr', 'tabindex', '0');
    })
    .get('.Eminus-mark')
    .each(($mark, idx) => {
      expect($mark.find('.Eminus-mark-label')).to.have.text(
        marks[idx].label as string
      );
    });
});
