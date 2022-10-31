import React from 'react';
import { FormatListBulleted, FormatListNumbered } from '@styled-icons/material';
import { getPluginType } from '@udecode/plate-core';
import { createListPlugin, ELEMENT_OL, ELEMENT_UL } from '@udecode/plate-list';
import { ListToolbarButton } from '@udecode/plate-ui';
import { KateEditor } from '../plateTypes';
import { IKateConfigItem } from './types';

type ListType = 'ol' | 'ul';

export const createListConfig = (
  listTypes: ListType[] = ['ol', 'ul']
): IKateConfigItem => {
  return {
    plugins: [createListPlugin()],
    renderButtons: (editor: KateEditor) =>
      [
        listTypes.includes('ul') && (
          <ListToolbarButton
            type={getPluginType(editor, ELEMENT_UL)}
            icon={<FormatListBulleted />}
          />
        ),
        listTypes.includes('ol') && (
          <ListToolbarButton
            type={getPluginType(editor, ELEMENT_OL)}
            icon={<FormatListNumbered />}
          />
        ),
      ].filter((x) => !!x) as JSX.Element[],
  };
};
