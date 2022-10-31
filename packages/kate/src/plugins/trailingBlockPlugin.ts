import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { TrailingBlockPlugin } from '@udecode/plate-trailing-block';

import { KatePlatePlugin } from '../plateTypes';

export const trailingBlockPlugin: Partial<
  KatePlatePlugin<TrailingBlockPlugin>
> = {
  options: { type: ELEMENT_PARAGRAPH },
};
