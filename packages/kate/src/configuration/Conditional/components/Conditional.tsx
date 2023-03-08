import React from 'react';
import { PlatePluginComponent, useEditorRef } from '@udecode/plate-core';
import { conditionalSettingsStoreSelectors } from '../stores/conditionalSettingStore';
import { replaceConditional } from '../util/replaceConditional';
import { ConditionalIcon } from './icons/ConditionalIcon';

export const Conditional: PlatePluginComponent<{
  children: any;
  element: any;
  attributes: { [key: string]: any };
}> = ({ children, element, attributes }) => {
  const editor = useEditorRef();

  const handleDoubleClick = async () => {
    try {
      const newData = await conditionalSettingsStoreSelectors
        .settings()
        ?.updateData(element.conditional as any);

      replaceConditional(editor, newData);
    } catch (ex) {
      console.error('test');
    }
  };
  let nodeTitle: string = element.text;

  if (element.conditional) {
    nodeTitle = element.conditional.text;
  }

  return (
    <span
      contentEditable={false}
      onDoubleClick={handleDoubleClick}
      style={{
        background: '#ccc',
        padding: '0.25em 0.5em',
        display: 'inline-flex',
        gap: '0.25em',
        fontSize: '0.8em',
        alignItems: 'center',
        userSelect: 'none',
        cursor: 'pointer',
        margin: '2px 2px 2px 2px'
      }}
      {...attributes}
    >
      <ConditionalIcon style={{ width: "1em", height: "1em" }} />
      {children}
      <span>{nodeTitle}</span>
    </span>
  );
};
