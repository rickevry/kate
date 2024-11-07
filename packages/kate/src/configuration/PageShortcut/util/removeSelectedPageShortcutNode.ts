import { removeNodes, TEditor, Value } from '@udecode/plate-core';
import { ELEMENT_PAGE_SHORTCUT } from '../constants';

export const removeSelectedPageShortcutNode = (editor: TEditor<Value>) =>
  removeNodes(editor, {
    match(node) {
      return node.type === ELEMENT_PAGE_SHORTCUT;
    },
  });
