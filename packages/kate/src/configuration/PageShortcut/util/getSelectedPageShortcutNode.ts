import { findNode, TEditor, Value } from '@udecode/plate-core';
import { ELEMENT_PAGE_SHORTCUT } from '../constants';
import { TPageShortcutElement } from '../types';

export const getSelectedPageShortcutNode = (editor: TEditor<Value>): TPageShortcutElement[] | undefined => {
  return findNode(editor, {
    match(node) {
      return node.type === ELEMENT_PAGE_SHORTCUT;
    },
  }) as unknown as TPageShortcutElement[];
};
