import { ExitBreakPlugin} from '@udecode/plate-break';
import { KEYS_HEADING } from '@udecode/plate-heading';
import { KatePlatePlugin } from '../plateTypes';

export const exitBreakPlugin: Partial<KatePlatePlugin<ExitBreakPlugin>> = {
  options: {
    rules: [
      {
        hotkey: 'mod+enter',
      },
      {
        hotkey: 'mod+shift+enter',
        before: true,
      },
      {
        hotkey: 'enter',
        query: {
          start: true,
          end: true,
          allow: KEYS_HEADING,
        },
      },
    ],
  },
};
