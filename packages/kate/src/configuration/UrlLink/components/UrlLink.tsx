import React from 'react';
import { PlatePluginComponent, useEditorRef } from '@udecode/plate-core';
import { urlLinkSettingsStoreSelectors } from '../stores/urlLinkSettingStore';
import { replaceUrlLink } from '../util/replaceUrlLink';
import { UrlIcon } from './icons/FileIcon';

export const UrlLink: PlatePluginComponent<{
  children: any;
  element: any;
  attributes: { [key: string]: any };
}> = ({ children, element, attributes }) => {
  const editor = useEditorRef();

  const handleDoubleClick = async () => {
    try {
      const newData = await urlLinkSettingsStoreSelectors
        .settings()
        ?.updateData(element.linkData as any);

      replaceUrlLink(editor, newData);
    } catch (ex) {
      console.error('test');
    }
  };
  let nodeTitle: string = "";
  
  if (element.linkData && element.linkData.metadata.length > 0) {
    if (element.linkData.metadata.length === 1) {
      nodeTitle = element.linkData.metadata[0].title;
    }
    else {
      nodeTitle = "(Multiple links)";
    }
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
      <UrlIcon />
      {children}
      <span>{nodeTitle}</span>
    </span>
  );
};
