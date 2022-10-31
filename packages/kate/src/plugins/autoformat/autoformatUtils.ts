import { AutoformatBlockRule } from '@udecode/plate-autoformat';
import {
  ELEMENT_CODE_BLOCK,
  ELEMENT_CODE_LINE,
} from '@udecode/plate-code-block';
import { getParentNode, isElement, isType } from '@udecode/plate-core';
import { toggleList, unwrapList } from '@udecode/plate-list';
import { KateEditor, KateValue } from '../../plateTypes';

export const preFormat: AutoformatBlockRule<KateValue, KateEditor>['preFormat'] = (
  editor
) => unwrapList(editor);

export const format = (editor: KateEditor, customFormatting: any) => {
  if (editor.selection) {
    const parentEntry = getParentNode(editor, editor.selection);
    if (!parentEntry) return;
    const [node] = parentEntry;
    if (
      isElement(node) &&
      !isType(editor, node, ELEMENT_CODE_BLOCK) &&
      !isType(editor, node, ELEMENT_CODE_LINE)
    ) {
      customFormatting();
    }
  }
};

export const formatList = (editor: KateEditor, elementType: string) => {
  format(editor, () =>
    toggleList(editor, {
      type: elementType,
    })
  );
};

export const formatText = (editor: KateEditor, text: string) => {
  format(editor, () => editor.insertText(text));
};
