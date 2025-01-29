import React, { useMemo } from 'react';
import { ToolbarButton } from '@udecode/plate-ui-toolbar';
import { KateEditor } from '../../plateTypes';
import { IKateConfigItem } from '../types';
import { PageShortcutFloatingMenu } from './components/PageShortcutFloatingMenu';
import { AddPageShortcutIcon } from './components/icons/AddPageShortcutIcon';
import { pageShortcutSettingsStore } from './stores/pageShortcutSettingStore';
import { createPageShortcutPlugin } from './util/createPageShortcutPlugin';
import { insertPageShortcut } from './util/insertPageShortcut';
import { IPageShortcutConfigItemOptions } from './types';
import { findNode, useEditorRef, usePlateEditorRef, usePlateSelection } from '@udecode/plate-core';
import { getSelectedPageShortcutNode } from './util/getSelectedPageShortcutNode';
import { getDefaultTippyTooltip } from '../../ToolbarButtons';

export const createPageShortcutConfig = (
  settings: IPageShortcutConfigItemOptions
): IKateConfigItem => {
  pageShortcutSettingsStore.set.settings(settings);


  return {
    plugins: [
      createPageShortcutPlugin({
        renderAfterEditable: () => {
          const editor = usePlateEditorRef();
          const selection = usePlateSelection();

          // Memoize the node data to avoid re-rendering unnecessarily
          const nodeData = useMemo(() => {
            if (selection && editor) {
              const node = getSelectedPageShortcutNode(editor);
              
              return node?.[0] ?? null;
            }
            return null;
          }, [editor, selection]);

          return <PageShortcutFloatingMenu nodeData={nodeData} />;
        }
      }),
    ],
    renderButtons: (editor: KateEditor) => [
      <ToolbarButton
        icon={<AddPageShortcutIcon />}
        tooltip={getDefaultTippyTooltip("Page shortcut")}
        onMouseDown={async (event) => {
          if (!editor || !settings.getData) return;

          event.preventDefault();

          try {
            const data = await settings.getData();

            insertPageShortcut(editor, data);
          } catch (ex) {
            console.error(ex);
          }
        }}
      />,
    ],
  };
};
