import { createStore } from '@udecode/plate-core';

export const floatingConditionalMenuStore = createStore('floatingConditionalMenu')({
  open: false,
}).extendActions((set) => ({
  show: () => {
    set.open(true);
  },
  hide: () => {
    set.open(false);
  },
}));

export const floatingConditionalMenuActions = floatingConditionalMenuStore.set;
export const floatingConditionalMenuSelectors = floatingConditionalMenuStore.get;
export const useFloatingConditionalMenuSelectors = () =>
  floatingConditionalMenuStore.use;
