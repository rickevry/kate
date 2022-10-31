import { ELEMENT_H1 } from '@udecode/plate-heading';
import { NormalizeTypesPlugin } from '@udecode/plate-normalizers';
import { KatePlatePlugin } from '../plateTypes';

export const forcedLayoutPlugin: Partial<
  KatePlatePlugin<NormalizeTypesPlugin>
> = {
  options: {
    rules: [{ path: [0], strictType: ELEMENT_H1 }],
  },
};
