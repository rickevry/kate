import {
  getParentNode,
  insertNodes,
  withoutNormalizing,
} from '@udecode/plate-core';
import { KateEditor } from '../../../plateTypes';
import { ELEMENT_URL_LINK } from '../constants';
import { IUrlLinkData, TUrlLinkElement } from '../types';

export const insertUrlLink = (
  editor: KateEditor,
  linkData: IUrlLinkData
) => {
  if (!editor.selection) return;
  const selectionParentEntry = getParentNode(editor, editor.selection);
  if (!selectionParentEntry) return;

  withoutNormalizing(editor, () => {
    insertNodes(editor, {
      type: ELEMENT_URL_LINK,
      linkData: linkData,
      children: [{ text: '' }],
    } as TUrlLinkElement);
  });
};
