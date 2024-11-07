import {
  getParentNode,
  getSelectionText,
  insertNodes,
  withoutNormalizing
} from '@udecode/plate-core';
import { generateUUID } from '../../../KateEditor';
import { KateEditor } from '../../../plateTypes';
import { ELEMENT_PAGE_SHORTCUT } from '../constants';
import { IPageShortcutData, TPageShortcutElement } from '../types';

export const insertPageShortcut = (
  editor: KateEditor,
  pageData: IPageShortcutData
) => {
  if (!editor.selection) return;
  const selectionParentEntry = getParentNode(editor, editor.selection);
  if (!selectionParentEntry) return;
  const text = getSelectionText(editor);

  if (!pageData) {
    pageData = {} as any;
  }

  if (!pageData.uid) {
    pageData.uid = generateUUID();
  }

  withoutNormalizing(editor, () => {
    insertNodes(editor, {
      type: ELEMENT_PAGE_SHORTCUT,
      pageData: pageData,
      children: [{ text: text ?? '' }],
    } as TPageShortcutElement);
  });
};
