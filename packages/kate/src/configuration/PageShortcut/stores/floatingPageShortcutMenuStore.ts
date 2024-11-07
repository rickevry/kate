import { createStore } from '@udecode/plate-core';

export const floatingPageShortcutMenuStore = createStore('floatingPageShortcutMenu')({
  open: false,
}).extendActions((set) => ({
  show: () => {
    set.open(true);
  },
  hide: () => {
    set.open(false);
  },
}));

export const floatingPageShortcutMenuActions = floatingPageShortcutMenuStore.set;
export const floatingPageShortcutMenuSelectors = floatingPageShortcutMenuStore.get;
export const useFloatingPageShortcutMenuSelectors = () =>
  floatingPageShortcutMenuStore.use;
