import { findNode, TEditor, Value } from '@udecode/plate-core';
import { ELEMENT_CONDITIONAL } from '../constants';

export const getSelectedConditionalNode = (editor: TEditor<Value>) => {
  return findNode(editor, {
    match(node) {
      return node.type === ELEMENT_CONDITIONAL;
    },
  });
};
