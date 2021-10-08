import React from 'react';
import { mount } from '../utils/mount';
import { Uncontrolled as Eminus } from '../../src';
import { $getRoot } from '../helpers';

describe('Track', () => {
  it('Should not render track when hideTrack prop has been passed', () => {
    mount(<Eminus hideTrack defaultValue={[0, 10]} />);
    $getRoot().get('.Eminus-track').should('not.exist');
  });
  it('Should not render track progress when hideTrackProgress prop has been passed', () => {
    mount(<Eminus hideTrackProgress defaultValue={[0, 10]} />);
    $getRoot()
      .get('.Eminus-track')
      .should('exist')
      .find('.Eminus-track-progress')
      .should('not.exist');
  });
});
