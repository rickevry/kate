import React from 'react';
import { PlatePluginComponent, useEditorRef } from '@udecode/plate-core';
import { documentSettingsStoreSelectors } from '../stores/documentSettingStore';
import { replaceDocument } from '../util/replaceDocument';
import { FileIcon } from './icons/FileIcon';

export const Document: PlatePluginComponent<{
  children: any;
  element: any;
  attributes: { [key: string]: any };
}> = ({ children, element, attributes }) => {
  const editor = useEditorRef();

  const handleDocumentDoubleClick = async () => {
    try {
      const newData = await documentSettingsStoreSelectors
        .settings()
        ?.updateData(element.documentData as any);

      replaceDocument(editor, newData);
    } catch (ex) {
      console.error('test');
    }
  };

  return (
    <span
      contentEditable={false}
      onDoubleClick={handleDocumentDoubleClick}
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
      <FileIcon fileName={element.documentData.name} />
      {children}
      <span>{element.documentData.title || element.documentData.name}</span>
    </span>
  );
};
