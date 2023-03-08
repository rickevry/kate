import { removeNodes, TEditor, Value } from '@udecode/plate-core';
import { ELEMENT_CONDITIONAL } from '../constants';

export const removeSelectedConditionalNode = (editor: TEditor<Value>) =>
  removeNodes(editor, {
    match(node) {
      return node.type === ELEMENT_CONDITIONAL;
    },
  });
