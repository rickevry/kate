import React from 'react';
import {
  FormatIndentDecrease,
  FormatIndentIncrease,
} from '@styled-icons/material';

import { createIndentPlugin, indent, outdent } from '@udecode/plate-indent';
import { ToolbarButton } from '@udecode/plate-ui-toolbar';
import { KateEditor } from '../plateTypes';
import { indentPlugin } from '../plugins/indentPlugin';
import { IKateConfigItem } from './types';
import { getDefaultTippyTooltip } from '../ToolbarButtons';

export const createIndentConfig = (): IKateConfigItem => {
  return {
    plugins: [createIndentPlugin(indentPlugin)],
    renderButtons: (editor: KateEditor) => [
      <ToolbarButton
        onMouseDown={(e) => {
          console.log("editor", editor)
          if (!editor) return;
          outdent(editor);
          e.preventDefault();
        }}
        icon={<FormatIndentDecrease />}
        tooltip={getDefaultTippyTooltip("Decrease indentation")}
      />,
      <ToolbarButton
        onMouseDown={(e) => {
          console.log("editor", editor)
          if (!editor) return;
          indent(editor);
          e.preventDefault();
        }}
        icon={<FormatIndentIncrease />}
        tooltip={getDefaultTippyTooltip("Increase indentation")}
      />,
    ],
  };
};
