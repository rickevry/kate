
import { AutoformatPlugin } from '@udecode/plate-autoformat';
import { MyEditor, MyPlatePlugin, MyValue } from '../plateTypes';
import { autoformatRules } from './autoformat/autoformatRules';

export const autoformatPlugin: Partial<
  MyPlatePlugin<AutoformatPlugin<MyValue, MyEditor>>
> = {
  options: {
    rules: autoformatRules as any,
  },
};
