import {
  getParentNode,
  insertNodes,
  withoutNormalizing,
} from '@udecode/plate-core';
import { KateEditor } from '../../../plateTypes';
import { ELEMENT_DOCUMENT } from '../constants';
import { IDocumentData, TDocumentElement } from '../types';

export const insertDocument = (
  editor: KateEditor,
  documentData: IDocumentData
) => {
  if (!editor.selection) return;
  const selectionParentEntry = getParentNode(editor, editor.selection);
  if (!selectionParentEntry) return;

  withoutNormalizing(editor, () => {
    insertNodes(editor, {
      type: ELEMENT_DOCUMENT,
      documentData,
      children: [{ text: '' }],
    } as TDocumentElement);
  });
};
