import React from 'react';
import { FormatUnderlined } from '@styled-icons/material';
import {
  createUnderlinePlugin,
  MARK_UNDERLINE,
} from '@udecode/plate-basic-marks';
import { getPluginType } from '@udecode/plate-core';
import { MarkToolbarButton } from '@udecode/plate-ui-toolbar';
import { KateEditor } from '../plateTypes';
import { IKateConfigItem } from './types';

export const createUnderlineConfig = (): IKateConfigItem => {
  return {
    plugins: [createUnderlinePlugin()],
    renderButtons: (editor: KateEditor) => [
      <MarkToolbarButton
        type={getPluginType(editor, MARK_UNDERLINE)}
        icon={<FormatUnderlined />}
      />,
    ],
  };
};
