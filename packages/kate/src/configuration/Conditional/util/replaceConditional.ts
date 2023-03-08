import { TEditor, Value } from '@udecode/plate-core';
import { KateEditor } from '../../../plateTypes';
import { IConditionalData } from '../types';
import { insertConditional } from './insertConditional';
import { removeSelectedConditionalNode } from './removeSelectedConditionalNode';

export const replaceConditional = (
  editor: TEditor<Value>,
  newData: IConditionalData
) => {
  removeSelectedConditionalNode(editor);

  insertConditional(editor as KateEditor, newData);
};
