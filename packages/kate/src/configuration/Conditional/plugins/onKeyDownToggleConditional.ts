import { KeyboardHandlerReturnType, PlateEditor, ToggleMarkPlugin, Value, WithPlatePlugin } from '@udecode/plate-core';
import isHotkey from 'is-hotkey';
import { toggleConditional } from '../transforms/toggleConditional';


export const onKeyDownToggleConditional = <
  V extends Value = Value,
  E extends PlateEditor<V> = PlateEditor<V>
>(
  editor: E,
  { type, options: { hotkey, clear } }: WithPlatePlugin<ToggleMarkPlugin, V, E>
): KeyboardHandlerReturnType => (e) => {
  if (!hotkey) return;

  if (isHotkey(hotkey, e as any)) {
    e.preventDefault();

    toggleConditional(editor, { key: type as any, clear, value: "nammo_sweden;nara" });
  }
};
