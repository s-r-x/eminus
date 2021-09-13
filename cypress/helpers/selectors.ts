const $get = cy.get.bind(cy);
export const $getBody = () => $get('body');
export const $getRoot = () => $get('.Eminus').as('root');
export const $getCtrl = () => $get('.Eminus-control');
export const $getCtrlByIdx = (idx: number | string) =>
  $get(`.Eminus-control[data-idx="${idx}"]`);
export const $getFirstCtrl = () => $getCtrl().first();
export const $getLastCtrl = () => $getCtrl().last();
export const $getTooltip = () => $get('.Eminus-tooltip');
