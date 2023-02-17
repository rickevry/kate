import React from 'react';
import { Link, DocumentAdd } from '@styled-icons/material';
import { ToolbarButton } from '@udecode/plate-ui-toolbar';
import { KateEditor } from '../../plateTypes';
import { IKateConfigItem } from '../types';
import { DocumentFloatingMenu } from './components/DocumentFloatingMenu';
import { AddDocumentIcon } from './components/icons/AddDocumentIcon';
import { documentSettingsStore } from './stores/documentSettingStore';
import { createDocumentPlugin } from './util/createDocumentPlugin';
import { insertDocument } from './util/insertDocument';
import { IDocumentConfigItemOptions } from './types';

export const createDocumentConfig = (
  setttings: IDocumentConfigItemOptions
): IKateConfigItem => {
  documentSettingsStore.set.settings(setttings);
  return {
    plugins: [
      createDocumentPlugin({
        renderAfterEditable: DocumentFloatingMenu,
      }),
    ],
    renderButtons: (editor: KateEditor) => [
      <ToolbarButton
        icon={<AddDocumentIcon />}
        onMouseDown={async (event) => {
          if (!editor || !setttings.getData) return;

          event.preventDefault();

          try {
            const data = await setttings.getData();

            insertDocument(editor, data);
          } catch (ex) {
            console.error(ex);
          }
        }}
      />,
    ],
  };
};
