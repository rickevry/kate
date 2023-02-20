import { createStore } from '@udecode/plate-core';
import { IUrlLinkConfigItemOptions } from '../types';

export const urlLinkSettingsStore = createStore('linkUrlSettings')({
  settings: {} as IUrlLinkConfigItemOptions,
});

export const urlLinkSettingsStoreActions = urlLinkSettingsStore.set;
export const urlLinkSettingsStoreSelectors = urlLinkSettingsStore.get;
export const useUrlLinkSettingsStoreSelectors = () =>
  urlLinkSettingsStore.use;
