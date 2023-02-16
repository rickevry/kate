import { findNode, TEditor, Value } from '@udecode/plate-core';
import { ELEMENT_DOCUMENT } from '../constants';

export const getSelectedDocumentNode = (editor: TEditor<Value>) => {
  return findNode(editor, {
    match(node) {
      return node.type === ELEMENT_DOCUMENT;
    },
  });
};
