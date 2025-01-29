import React from 'react';
import { ToolbarButton } from '@udecode/plate-ui-toolbar';
import { KateEditor } from '../../plateTypes';
import { IKateConfigItem } from '../types';
import { UrlLinkFloatingMenu } from './components/UrlLinkFloatingMenu';
import { urlLinkSettingsStore } from './stores/urlLinkSettingStore';
import { createUrlLinkPlugin } from './util/createUrlLinkPlugin';
import { insertUrlLink } from './util/insertUrLink';
import { IUrlLinkConfigItemOptions } from './types';
import { Link } from '@styled-icons/material';
import { getDefaultTippyTooltip } from '../../ToolbarButtons';

export const createUrlLinkConfig = (
  setttings: IUrlLinkConfigItemOptions
): IKateConfigItem => {
  urlLinkSettingsStore.set.settings(setttings);
  return {
    plugins: [
      createUrlLinkPlugin({
        renderAfterEditable: UrlLinkFloatingMenu,
      }),
    ],
    renderButtons: (editor: KateEditor) => [
      <ToolbarButton
        icon={<Link />}
        tooltip={getDefaultTippyTooltip("URL links")}
        onMouseDown={async (event) => {
          if (!editor || !setttings.getData) return;

          event.preventDefault();

          try {
            const data = await setttings.getData();

            insertUrlLink(editor, data);
          } catch (ex) {
            console.error(ex);
          }
        }}
      />,
    ],
  };
};
