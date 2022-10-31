
import { AutoformatPlugin } from '@udecode/plate-autoformat';
import { KateEditor, KatePlatePlugin, KateValue } from '../plateTypes';
import { autoformatRules } from './autoformat/autoformatRules';

export const autoformatPlugin: Partial<
  KatePlatePlugin<AutoformatPlugin<KateValue, KateEditor>>
> = {
  options: {
    rules: autoformatRules as any,
  },
};
