import { createPluginFactory } from '@udecode/plate-core';
import { Document } from '../components/Document';
import { ELEMENT_DOCUMENT } from '../constants';

export const createDocumentPlugin = createPluginFactory({
  key: ELEMENT_DOCUMENT,
  isElement: true,
  isInline: true,
  isVoid: true,
  component: Document,
  then: (editor, { key }) => ({
    options: {
      id: key,
    },
  }),
});
