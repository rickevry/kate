import { findNode, TEditor, Value } from '@udecode/plate-core';
import { ELEMENT_URL_LINK } from '../constants';

export const getSelectedUrlLinkNode = (editor: TEditor<Value>) => {
  return findNode(editor, {
    match(node) {
      return node.type === ELEMENT_URL_LINK;
    },
  });
};
