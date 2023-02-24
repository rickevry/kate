import { EMarks, getMarks, isText, SetNodesOptions, TEditor, unsetNodes, Value } from '@udecode/plate-core';
import { castArray } from 'lodash';
import { Range } from 'slate';

export interface RemoveMarkOptions<
  V extends Value = Value,
  K extends keyof EMarks<V> = keyof EMarks<V>
> extends Omit<SetNodesOptions<V>, 'match' | 'split'> {
  /**
   * Mark or the array of marks that will be removed
   */
  key: K | K[];

  /**
   * When location is not a Range,
   * setting this to false can prevent the onChange event of the editor to fire
   * @default true
   */
  shouldChange?: boolean;

  /**
   * Range where the mark(s) will be removed
   */
  at?: Range;
}

/**
 * Remove mark and trigger `onChange` if collapsed selection.
 */
export const removeConditional = <V extends Value, K extends keyof EMarks<V>>(
  editor: TEditor<V>,
  { key, at, shouldChange = true, ...rest }: RemoveMarkOptions<V, K>
) => {
  const selection = at ?? editor.selection;
  key = castArray(key);

  if (selection) {
    if (Range.isRange(selection) && Range.isExpanded(selection)) {
      unsetNodes(editor, (key as any) as string, {
        at: selection,
        match: isText,
        split: true,
        ...rest,
      });
    } else if (editor.selection) {
      const marks: Partial<EMarks<V>> = { ...(getMarks(editor) || {}) };
      key.forEach((k) => {
        delete marks[k];
      });
      editor.marks = marks;
      shouldChange && editor.onChange();
    }
  }
};
