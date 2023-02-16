import { createStore } from '@udecode/plate-core';
import { IDocumentConfigItemOptions } from '../types';

export const documentSettingsStore = createStore('documentSettings')({
  settings: {} as IDocumentConfigItemOptions,
});

export const documentSettingsStoreActions = documentSettingsStore.set;
export const documentSettingsStoreSelectors = documentSettingsStore.get;
export const useDocumentSettingsStoreSelectors = () =>
  documentSettingsStore.use;
