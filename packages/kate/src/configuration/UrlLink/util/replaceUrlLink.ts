import { TEditor, Value } from '@udecode/plate-core';
import { KateEditor } from '../../../plateTypes';
import { IUrlLinkData } from '../types';
import { insertUrlLink } from './insertUrLink';
import { removeSelectedUrlLinkNode } from './removeSelectedUrlLinkNode';

export const replaceUrlLink = (
  editor: TEditor<Value>,
  newData: IUrlLinkData
) => {
  removeSelectedUrlLinkNode(editor);

  insertUrlLink(editor as KateEditor, newData);
};
