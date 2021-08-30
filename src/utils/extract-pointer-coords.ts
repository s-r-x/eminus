import React from 'react';

type Event = TouchEvent | MouseEvent | React.MouseEvent | React.TouchEvent;

export const extractPointerCoords = (e: Event) => {
  if ('touches' in e) {
    return {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  }
  return {
    x: e.clientX,
    y: e.clientY,
  };
};
