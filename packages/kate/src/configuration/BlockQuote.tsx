import React from 'react';
import { FormatQuote } from '@styled-icons/material';
import {
  createBlockquotePlugin,
  ELEMENT_BLOCKQUOTE,
} from '@udecode/plate-block-quote';
import { getPluginType } from '@udecode/plate-core';
import { BlockToolbarButton } from '@udecode/plate-ui-toolbar';
import { KateEditor } from '../plateTypes';
import { IKateConfigItem } from './types';

export const createBlockQuoteConfig = (): IKateConfigItem => {
  return {
    plugins: [createBlockquotePlugin()],
    renderButtons: (editor: KateEditor) => [
      <BlockToolbarButton
        type={getPluginType(editor, ELEMENT_BLOCKQUOTE)}
        // tooltip={{ content: 'Blockquote' } as TippyProps}
        icon={<FormatQuote />}
      />,
    ],
  };
};
