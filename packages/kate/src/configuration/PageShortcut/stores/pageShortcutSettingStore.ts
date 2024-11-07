import { createStore } from '@udecode/plate-core';
import { IPageShortcutConfigItemOptions } from '../types';

export const pageShortcutSettingsStore = createStore('pageShortcutSettings')({
  settings: {} as IPageShortcutConfigItemOptions,
});

export const pageShortcutSettingsStoreActions = pageShortcutSettingsStore.set;
export const pageShortcutSettingsStoreSelectors = pageShortcutSettingsStore.get;
export const usePageShortcutSettingsStoreSelectors = () =>
  pageShortcutSettingsStore.use;
