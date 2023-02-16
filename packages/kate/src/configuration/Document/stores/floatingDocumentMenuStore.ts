import { createStore } from '@udecode/plate-core';

export const floatingDocumentMenuStore = createStore('floatingDocumentMenu')({
  open: false,
}).extendActions((set) => ({
  show: () => {
    set.open(true);
  },
  hide: () => {
    set.open(false);
  },
}));

export const floatingDocumentMenuActions = floatingDocumentMenuStore.set;
export const floatingDocumentMenuSelectors = floatingDocumentMenuStore.get;
export const useFloatingDocumentMenuSelectors = () =>
  floatingDocumentMenuStore.use;
