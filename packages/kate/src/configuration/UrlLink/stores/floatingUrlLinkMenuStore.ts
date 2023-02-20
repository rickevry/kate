import { createStore } from '@udecode/plate-core';

export const floatingUrlLinkMenuStore = createStore('floatingUrlLinkMenu')({
  open: false,
}).extendActions((set) => ({
  show: () => {
    set.open(true);
  },
  hide: () => {
    set.open(false);
  },
}));

export const floatingLinkUrlMenuActions = floatingUrlLinkMenuStore.set;
export const floatingUrlLinkMenuSelectors = floatingUrlLinkMenuStore.get;
export const useFloatingUrlLinkMenuSelectors = () =>
  floatingUrlLinkMenuStore.use;
