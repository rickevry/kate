import { EMarks, getEndPoint, getParentNode, getStartPoint, isMarkActive, select, setNodes, setSelection, TEditor, ToggleMarkPlugin, unsetNodes, Value, withoutNormalizing } from '@udecode/plate-core';
import castArray from 'lodash/castArray';
import { ELEMENT_CONDITIONAL } from '..';
import { getValidConditionalNodeEntry } from '../utils/getValidConditionalNode';
import { removeConditional } from './removeConditional';

export interface ToggleConditionalOptions<
  V extends Value = Value,
  K extends keyof EMarks<V> = keyof EMarks<V>
> extends Pick<ToggleMarkPlugin<V, K>, 'clear'> {
  key: K;
  value: any;
}

/**
 * Add/remove marks in the selection.
 * @param editor
 * @param key mark to toggle
 * @param clear marks to clear when adding mark
 */
export const toggleConditional = <
  V extends Value = Value,
  K extends keyof EMarks<V> = keyof EMarks<V>
>(
  editor: TEditor<V>,
  { key, clear, value }: ToggleConditionalOptions<V, K>
) => {
  // Tagging of higher up nodes
  const validNodeEntry = getValidConditionalNodeEntry(editor);

  console.log("toggleConditional", {key, clear, value, editor, validNodeEntry, selection: editor.selection});

  if (!validNodeEntry) return;

  const [validNode, path] = validNodeEntry;

  withoutNormalizing(editor, () => {
    if (validNode[ELEMENT_CONDITIONAL]) {
      unsetNodes(editor, ELEMENT_CONDITIONAL, { at: path });
    }
    else {
      setNodes(editor, { [ELEMENT_CONDITIONAL]: value } as any, { at: path });
    }
  });


  // // Marking normally
  // withoutNormalizing(editor, () => {
  //   const isActive = isMarkActive(editor, key);

  //   if (isActive) {
  //     removeConditional(editor, { key });
  //     return;
  //   }

  //   if (clear) {
  //     const clears: K[] = castArray(clear);
  //     removeConditional(editor, { key: clears });
  //   }

  //   editor.addMark(key as string, value);
  // });
};
