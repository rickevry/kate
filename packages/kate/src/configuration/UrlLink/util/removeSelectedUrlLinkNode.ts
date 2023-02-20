import { removeNodes, TEditor, Value } from '@udecode/plate-core';
import { ELEMENT_URL_LINK } from '../constants';

export const removeSelectedUrlLinkNode = (editor: TEditor<Value>) =>
  removeNodes(editor, {
    match(node) {
      return node.type === ELEMENT_URL_LINK;
    },
  });
