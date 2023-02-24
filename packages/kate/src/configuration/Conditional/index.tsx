import React from 'react';
import { createPluginFactory, findHtmlParentElement, getPluginType, getPreventDefaultHandler, isMarkActive, withProps } from '@udecode/plate-core';
import { MarkToolbarButton, ToolbarButton } from '@udecode/plate-ui-toolbar';
import { KateEditor } from '../../plateTypes';
import { AddDocumentIcon } from '../Document/components/icons/AddDocumentIcon';
import { IKateConfigItem } from '../types';
import { FormatBold } from '@styled-icons/material';
import { onKeyDownToggleConditional } from './plugins/onKeyDownToggleConditional';
import { toggleConditional } from './transforms/toggleConditional';
import { IConditionalConfigItem } from './types';
import { StyledLeaf } from '@udecode/plate-styled-components';

export const ELEMENT_CONDITIONAL = "conditional";

const createConditionalPlugin = createPluginFactory({
  key: ELEMENT_CONDITIONAL,
  isLeaf: true,
  deserializeHtml: {
    rules: [
      {
        validNodeName: '*',
      },
      // {
      //   validStyle: {
      //     border: '2px dashed #ccc',
      //     padding: '5px'
      //   },
      // },
      {
        validAttribute: 'data-conditional'
      }
      // {
      //   validStyle: {
      //     fontFamily: 'Consolas',
      //   },
      // },
    ],
    query(el) {
      const blockAbove = findHtmlParentElement(el, 'P');
      console.log("deserializeHtml query", {el, blockAbove});
      if (blockAbove?.dataset["conditional"]) return false;

      return !findHtmlParentElement(el, 'PRE');
    },
  },
  handlers: {
    onKeyDown: onKeyDownToggleConditional,
  },
  options: {
    hotkey: 'mod+o',
  },
});

export const createConditionalConfig = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  settings: IConditionalConfigItem
): IKateConfigItem => {
  return {
    plugins: [createConditionalPlugin({})],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    renderButtons: (editor: KateEditor) => [
      // <ToolbarButton icon={<AddDocumentIcon />} />,
      <ToolbarButton
        active={!!editor?.selection && isMarkActive(editor, ELEMENT_CONDITIONAL!)}
        onMouseDown={
          editor
            ? getPreventDefaultHandler(toggleConditional, editor, { key: ELEMENT_CONDITIONAL, clear: undefined, value: { "org": "sweden"} })
            : undefined
        }
        icon={<FormatBold />}
      />
    ],
  };
};
