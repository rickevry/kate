import { TEditor, Value } from '@udecode/plate-core';
import { KateEditor } from '../../../plateTypes';
import { IDocumentData } from '../types';
import { insertDocument } from './insertDocument';
import { removeSelectedDocumentNode } from './removeSelectedDocumentNode';

export const replaceDocument = (
  editor: TEditor<Value>,
  newData: IDocumentData
) => {
  removeSelectedDocumentNode(editor);

  insertDocument(editor as KateEditor, newData);
};
