import React from 'react';
import { useEditorRef } from '@udecode/plate-core';
import { css } from 'styled-components';
import tw from 'twin.macro';
import { documentSettingsStoreSelectors } from '../stores/documentSettingStore';
import { getSelectedDocumentNode } from '../util/getSelectedDocumentNode';
import { removeSelectedDocumentNode } from '../util/removeSelectedDocumentNode';
import { replaceDocument } from '../util/replaceDocument';
import { LaunchIcon } from './icons/LaunchIcon';
import { LinkOffIcon } from './icons/LinkOffIcon';
import { DocumentEditButton } from './DocumentEditButton';
import { FloatingDocumentMenuRoot } from './FloatingDocumentMenuRoot';

const floatingMenuRootCss = css`
  ${tw`bg-white !z-20`};

  border-radius: 4px;
  box-shadow: rgb(15 15 15 / 5%) 0 0 0 1px, rgb(15 15 15 / 10%) 0 3px 6px,
    rgb(15 15 15 / 20%) 0 9px 24px;
`;

export const floatingMenuButtonCss = [
  tw`relative inline-flex justify-center items-center text-center max-w-full p-0`,
  tw`border-0 font-medium cursor-pointer`,
  tw`bg-white hover:bg-gray-100 active:bg-gray-200`,
  tw`px-2.5 py-1`,
  css`
    font-family: inherit;
    font-size: 14px;
    border-radius: 3px;
    min-width: 0;
    margin: 0;

    color: inherit;

    :active {
      color: inherit;
    }

    :visited {
      color: inherit;
    }
  `,
];

const VerticalDivider = () => <div tw="w-px h-5 bg-gray-200 mx-2" />;

export const DocumentFloatingMenu = () => {
  const editor = useEditorRef();

  const handleUnlinkClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    removeSelectedDocumentNode(editor);
  };

  const handleClickEdit: React.MouseEventHandler<HTMLButtonElement> = async () => {
    const node = getSelectedDocumentNode(editor);
    if (!node) return;

    try {
      const newData = await documentSettingsStoreSelectors
        .settings()
        ?.updateData(node[0].documentData as any);

      replaceDocument(editor, newData);
    } catch (ex) {
      console.error('Error on edit', ex);
    }
  };

  const handleOpenClick = () => {
    const node = getSelectedDocumentNode(editor);
    if (!node) return;

    documentSettingsStoreSelectors
      .settings()
      ?.open(node[0].documentData as any);
  };

  return (
    <FloatingDocumentMenuRoot css={floatingMenuRootCss}>
      <div tw="w-auto px-2 py-1 flex flex-row items-center">
        <DocumentEditButton
          onClick={handleClickEdit}
          css={floatingMenuButtonCss}
        >
          Edit document
        </DocumentEditButton>
        <VerticalDivider />
        <DocumentEditButton
          onClick={handleOpenClick}
          css={floatingMenuButtonCss}
        >
          <LaunchIcon width={18} />
        </DocumentEditButton>
        <VerticalDivider />
        <DocumentEditButton
          onClick={handleUnlinkClick}
          css={floatingMenuButtonCss}
        >
          <LinkOffIcon width={18} />
        </DocumentEditButton>
      </div>
    </FloatingDocumentMenuRoot>
  );
};
