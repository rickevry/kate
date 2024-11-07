import { TEditor, Value } from '@udecode/plate-core';
import { KateEditor } from '../../../plateTypes';
import { IPageShortcutData } from '../types';
import { insertPageShortcut } from './insertPageShortcut';
import { removeSelectedPageShortcutNode } from './removeSelectedPageShortcutNode';

export const replacePageShortcut = (
  editor: TEditor<Value>,
  newData: IPageShortcutData
) => {
  removeSelectedPageShortcutNode(editor);

  insertPageShortcut(editor as KateEditor, newData);
};
