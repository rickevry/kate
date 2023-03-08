import {
  getParentNode,
  insertNodes,
  withoutNormalizing,
} from '@udecode/plate-core';
import { KateEditor } from '../../../plateTypes';
import { ELEMENT_CONDITIONAL } from '../constants';
import { IConditionalData, TConditionalElement } from '../types';

export const insertConditional = (
  editor: KateEditor,
  conditional: IConditionalData
) => {
  if (!editor.selection) return;
  const selectionParentEntry = getParentNode(editor, editor.selection);
  if (!selectionParentEntry) return;

  withoutNormalizing(editor, () => {
    insertNodes(editor, {
      type: ELEMENT_CONDITIONAL,
      conditional,
      children: [{ text: '' }],
    } as TConditionalElement);
  });
};
