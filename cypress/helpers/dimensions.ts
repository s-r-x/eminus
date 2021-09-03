import promisify from 'cypress-promise';

export const getRect = ($el: Cypress.Chainable<JQuery<HTMLElement>>) => {
  return promisify($el.then($el => $el[0].getBoundingClientRect()));
};
