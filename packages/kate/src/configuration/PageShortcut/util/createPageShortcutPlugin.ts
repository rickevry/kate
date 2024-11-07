import { createPluginFactory } from '@udecode/plate-core';
import { PageShortcut } from '../components/PageShortcut';
import { ELEMENT_PAGE_SHORTCUT } from '../constants';

export const createPageShortcutPlugin = createPluginFactory({
  key: ELEMENT_PAGE_SHORTCUT,
  isElement: true,
  isInline: true,
  isVoid: true,
  isLeaf: false,
  component: PageShortcut,
  then: (editor, { key }) => ({
    options: {
      id: key,
    },
  }),

});
