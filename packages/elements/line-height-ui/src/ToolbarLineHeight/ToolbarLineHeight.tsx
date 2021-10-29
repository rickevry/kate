import * as React from 'react';
import { useCallback } from 'react';
import { isCollapsed, someNode } from '@udecode/plate-common';
import {
  getPlatePluginOptions,
  useEventEditorId,
  useStoreEditorState,
} from '@udecode/plate-core';
import {
  KEY_LINE_HEIGHT,
  LineHeightPluginOptions,
  setLineHeight,
} from '@udecode/plate-line-height';
import {
  ToolbarButton,
  ToolbarButtonProps,
  ToolbarDropdown,
} from '@udecode/plate-toolbar';
import { ReactEditor } from 'slate-react';

export const ToolbarLineHeight = (props: ToolbarButtonProps) => {
  const editor = useStoreEditorState(useEventEditorId('focus'));

  const { validNodeValues } = getPlatePluginOptions<
    Required<LineHeightPluginOptions>
  >(editor, KEY_LINE_HEIGHT);

  const selectHandler = useCallback(
    (lineHeight) => {
      if (editor) {
        ReactEditor.focus(editor);
        setLineHeight(editor, {
          value: lineHeight,
        });
      }
    },
    [editor]
  );
  return (
    <ToolbarDropdown
      control={
        <ToolbarButton
          active={
            isCollapsed(editor?.selection) &&
            someNode(editor!, { match: (n) => n.lineHeight !== undefined })
          }
          {...props}
        />
      }
    >
      {validNodeValues &&
        validNodeValues.map((lineHeight) => (
          <div
            style={{ cursor: 'pointer' }}
            key={lineHeight}
            onClick={() => selectHandler(lineHeight)}
          >
            {lineHeight}
          </div>
        ))}
    </ToolbarDropdown>
  );
};
