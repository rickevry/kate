import { createPluginFactory } from '@udecode/plate-core';
import { Conditional } from '../components/Conditional';
import { ELEMENT_CONDITIONAL } from '../constants';

export const createConditionalPlugin = createPluginFactory({
  key: ELEMENT_CONDITIONAL,
  isElement: true,
  isInline: true,
  isVoid: true,
  component: Conditional,
  then: (editor, { key }) => ({
    options: {
      id: key,
    },
  }),
});
