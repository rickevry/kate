import React from 'react';
import { FormatBold } from '@styled-icons/material';
import { createBoldPlugin, MARK_BOLD } from '@udecode/plate-basic-marks';
import { getPluginType } from '@udecode/plate-core';
import { MarkToolbarButton } from '@udecode/plate-ui-toolbar';
import { KateEditor } from '../plateTypes';
import { IKateConfigItem } from './types';
import { getDefaultTippyTooltip } from '../ToolbarButtons';

export const createBoldConfig = (): IKateConfigItem => {
  return {
    plugins: [createBoldPlugin()],
    renderButtons: (editor: KateEditor) => [
      <MarkToolbarButton
        type={getPluginType(editor, MARK_BOLD)}
        icon={<FormatBold />}
        tooltip={getDefaultTippyTooltip("Bold")}
      />,
    ],
  };
};
