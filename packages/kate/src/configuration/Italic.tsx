import React from 'react';
import { FormatItalic } from '@styled-icons/material';
import { createItalicPlugin, MARK_ITALIC } from '@udecode/plate-basic-marks';
import { getPluginType } from '@udecode/plate-core';
import { MarkToolbarButton } from '@udecode/plate-ui-toolbar';
import { KateEditor } from '../plateTypes';
import { IKateConfigItem } from './types';
import { getDefaultTippyTooltip } from '../ToolbarButtons';

export const createItalicConfig = (): IKateConfigItem => {
  return {
    plugins: [createItalicPlugin()],
    renderButtons: (editor: KateEditor) => [
      <MarkToolbarButton
        type={getPluginType(editor, MARK_ITALIC)}
        icon={<FormatItalic />}
        tooltip={getDefaultTippyTooltip("Italic")}
      />,
    ],
  };
};
