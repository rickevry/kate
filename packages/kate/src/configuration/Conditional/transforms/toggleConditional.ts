import { EMarks, isMarkActive, TEditor, ToggleMarkPlugin, Value, withoutNormalizing } from '@udecode/plate-core';
import castArray from 'lodash/castArray';
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
  if (!editor.selection) return;

  withoutNormalizing(editor, () => {
    const isActive = isMarkActive(editor, key);

    if (isActive) {
      removeConditional(editor, { key });
      return;
    }

    if (clear) {
      const clears: K[] = castArray(clear);
      removeConditional(editor, { key: clears });
    }

    editor.addMark(key as string, value);
  });
};
