import React from 'react';
import { ToolbarButton } from '@udecode/plate-ui-toolbar';
import { KateEditor } from '../../plateTypes';
import { IKateConfigItem } from '../types';
import { ConditionalFloatingMenu } from './components/ConditionalFloatingMenu';
import { conditionalSettingsStore } from './stores/conditionalSettingStore';
import { createConditionalPlugin } from './util/createConditionalPlugin';
import { insertConditional } from './util/insertConditional';
import { IConditionalConfigItemOptions } from './types';
import { Link } from '@styled-icons/material';
import { ConditionalIcon } from './components/icons/ConditionalIcon';
import { getDefaultTippyTooltip } from '../../ToolbarButtons';

export const createConditionalConfig = (
  settings: IConditionalConfigItemOptions
): IKateConfigItem => {
  conditionalSettingsStore.set.settings(settings);
  return {
    plugins: [
      createConditionalPlugin({
        renderAfterEditable: ConditionalFloatingMenu,
      }),
    ],
    renderButtons: (editor: KateEditor) => [
      <ToolbarButton
        icon={<ConditionalIcon />}
        tooltip={getDefaultTippyTooltip("Conditional")}
        onMouseDown={async (event) => {
          if (!editor || !settings.getData) return;

          event.preventDefault();

          try {
            const data = await settings.getData();

            insertConditional(editor, data);
          } catch (ex) {
            console.error(ex);
          }
        }}
      />,
    ],
  };
};
