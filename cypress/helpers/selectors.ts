const $get = cy.get.bind(cy);
export const $getBody = () => $get('body');
export const $getRoot = () => $get('.Eminus').as('root');
export const $getCtrl = () => $get('.Eminus-control');
