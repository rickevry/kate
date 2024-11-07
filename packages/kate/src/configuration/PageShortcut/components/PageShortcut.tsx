import React from 'react';
import { PlatePluginComponent, useEditorRef } from '@udecode/plate-core';
import { pageShortcutSettingsStoreSelectors } from '../stores/pageShortcutSettingStore';
import { replacePageShortcut } from '../util/replacePageShortcut';
import { css } from 'styled-components';
import { TPageShortcutElement } from '../types';

const wrapperCss = css`
  display: inline-flex;
  gap: 0.25em;
  align-items: center;
  user-select: none;
  cursor: pointer;
  margin: 2px 2px 2px 2px;
  padding-left: 2px;
  padding-right: 2px;
  border-radius: 3px;
  background-color: #e8e8e8;
`;

export const PageShortcut: PlatePluginComponent<{
  children: any;
  element: TPageShortcutElement;
  attributes: { [key: string]: any };
}> = ({ children, element, attributes }) => {
  const editor = useEditorRef();

  const handlePageShortcutDoubleClick = async () => {
    try {
      const newData = await pageShortcutSettingsStoreSelectors
        .settings()
        ?.updateData(element.pageData as any);

      replacePageShortcut(editor, {
        ...newData,
        uid: element.pageData?.uid
      });
    } catch (ex) {
      console.error('test');
    }
  };

  return (
    <span
      contentEditable={false}
      onDoubleClick={handlePageShortcutDoubleClick}
      css={wrapperCss}
      {...attributes}
    >
      {children}
      <span>{element.pageData?.title ?? ""}</span>
    </span>
  );
};
