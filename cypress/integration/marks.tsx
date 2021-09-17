import React from 'react';
import { mount } from '../utils/mount';
import { Uncontrolled as Eminus } from '../../src';
import { $getMarks } from '../helpers';
import { EnhancedMark, SimpleMark } from '../../src/typings/root-props';

describe('Marks', () => {
  it('Simple marks', () => {
    const marks: SimpleMark[] = [25, 75];
    mount(<Eminus defaultValue={[0, 50]} marks={marks} />);
    $getMarks().each(($mark, idx) => {
      expect($mark).to.have.text(String(marks[idx]));
    });
  });
  it('Enhanced marks', () => {
    const marks: EnhancedMark[] = [25, 75].map(value => ({
      value,
      label: value + '%',
    }));
    mount(<Eminus defaultValue={[0, 50]} marks={marks} />);
    $getMarks().each(($mark, idx) => {
      expect($mark).to.have.text(String(marks[idx].label));
    });
  });
  it('Mark label formatter with simple marks', () => {
    const marks: SimpleMark[] = [25, 75];
    mount(
      <Eminus
        defaultValue={[0, 50]}
        marks={marks}
        markLabelFormatter={mark => (
          <div className="my-class">mark {mark as SimpleMark}</div>
        )}
      />
    );
    $getMarks().each(($mark, idx) => {
      cy.wrap($mark)
        .find('.my-class')
        .should('exist')
        .should('have.text', `mark ${marks[idx]}`);
    });
  });
  it('Mark label formatter with enhanced marks', () => {
    const marks: EnhancedMark[] = [25, 75].map(value => ({
      value,
      label: value + '%',
    }));
    mount(
      <Eminus
        defaultValue={[0, 50]}
        marks={marks}
        markLabelFormatter={mark => (
          <div className="my-class">mark {(mark as EnhancedMark).label}</div>
        )}
      />
    );
    $getMarks().each(($mark, idx) => {
      cy.wrap($mark)
        .find('.my-class')
        .should('exist')
        .should('have.text', `mark ${marks[idx].label}`);
    });
  });
  it('Active status', () => {
    const marks: SimpleMark[] = [25, 75];
    mount(<Eminus defaultValue={[0, 50]} marks={marks} />);
    $getMarks().first().should('have.class', 'Eminus-mark--active');
    $getMarks().last().should('not.have.class', 'Eminus-mark--active');
  });
});
