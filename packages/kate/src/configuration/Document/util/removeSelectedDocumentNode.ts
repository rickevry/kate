import { removeNodes, TEditor, Value } from '@udecode/plate-core';
import { ELEMENT_DOCUMENT } from '../constants';

export const removeSelectedDocumentNode = (editor: TEditor<Value>) =>
  removeNodes(editor, {
    match(node) {
      return node.type === ELEMENT_DOCUMENT;
    },
  });
