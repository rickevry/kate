import { createStore } from '@udecode/plate-core';
import { IConditionalConfigItemOptions } from '../types';

export const conditionalSettingsStore = createStore('conditionalSettings')({
  settings: {} as IConditionalConfigItemOptions,
});

export const conditionalSettingsStoreActions = conditionalSettingsStore.set;
export const conditionalSettingsStoreSelectors = conditionalSettingsStore.get;
export const useConditionalSettingsStoreSelectors = () =>
  conditionalSettingsStore.use;
