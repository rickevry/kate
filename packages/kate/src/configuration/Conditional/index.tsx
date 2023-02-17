import React from 'react';
import { createPluginFactory } from '@udecode/plate-core';
import { ToolbarButton } from '@udecode/plate-ui-toolbar';
import { KateEditor } from '../../plateTypes';
import { AddDocumentIcon } from '../Document/components/icons/AddDocumentIcon';
import { IKateConfigItem } from '../types';

interface ICondtionalConfigItem extends IKateConfigItem {}

const ELEMENT_CONDITIONAL = 'conditional';

const createConditionalPlugin = createPluginFactory({
  key: ELEMENT_CONDITIONAL,
  isElement: true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  component: ({ attributes, element, children }) => {
    console.log("createConditionalPlugin component", attributes, element, children);
    return (
      <div {...attributes} style={{ border: '3px solid #ccc', padding: '5px' }}>
        {children}
      </div>
    );
  },
  options: {},
});

export const createConditionalConfig = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setttings: ICondtionalConfigItem
): IKateConfigItem => {
  return {
    plugins: [createConditionalPlugin({})],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    renderButtons: (editor: KateEditor) => [
      <ToolbarButton icon={<AddDocumentIcon />} />,
    ],
  };
};
