/* eslint-disable no-console */
import React from 'react';
import { Link } from '@styled-icons/material';
import {
  createPluginFactory,
  getParentNode,
  insertNodes,
  moveSelection,
  PlateEditor,
  PlatePluginComponent,
  TElement,
  Value,
  withoutNormalizing,
} from '@udecode/plate-core';
import {
  createMentionPlugin,
  KeyboardEventHandler,
  MoveSelectionByOffsetOptions,
} from '@udecode/plate-mention';
import { createParagraphPlugin } from '@udecode/plate-paragraph';
import { ToolbarButton } from '@udecode/plate-ui-toolbar';
import isHotkey from 'is-hotkey';
import { Range } from 'slate';
import { KateEditor } from '../plateTypes';
import { IKateConfigItem } from './types';

const ELEMENT_DOCUMENT = 'document';

const moveSelectionByOffsetForDocument: <V extends Value>(
  editor: PlateEditor<V>,
  options?: MoveSelectionByOffsetOptions<V>
) => KeyboardEventHandler = (editor, { query = () => true } = {}) => (
  event
) => {
  const { selection } = editor;

  if (!selection || Range.isExpanded(selection) || !query(editor)) {
    console.log('is not');
    return false;
  }

  if (isHotkey('left', event)) {
    console.log('is left');
    event.preventDefault();
    moveSelection(editor, { unit: 'offset', reverse: true, distance: 2 });
    return true;
  }

  if (isHotkey('right', event)) {
    console.log('is right');
    event.preventDefault();
    moveSelection(editor, { unit: 'offset', distance: 2 });
    return true;
  }
};

export const buildIconUrl = (fileName: string): string => {
  if (!fileName) return '';

  fileName = fileName.toLowerCase();
  const lastDot = fileName.lastIndexOf('.');
  if (lastDot === -1 || fileName.length - lastDot > 5) {
    return 'https://spoprod-a.akamaihd.net/files/fabric/assets/item-types/20/folder.svg?v6';
  }

  let docType = fileName.substring(fileName.lastIndexOf('.') + 1);

  if (docType === 'doc') docType = 'docx';
  if (docType === 'ppt') docType = 'pptx';
  if (docType === 'xls') docType = 'xlsx';
  if (docType === 'xlsm') docType = 'xlsx';

  if (docType === 'aspx')
    return 'https://spoprod-a.akamaihd.net/files/odsp-next-prod_2017-11-10-sts_20171116.001/odsp-media/images/itemtypes/16/spo.png';
  if (docType === 'mht')
    return 'https://spoprod-a.akamaihd.net/files/odsp-next-prod_2017-11-10-sts_20171116.001/odsp-media/images/itemtypes/16/html.png';
  if (docType === 'pdf')
    return 'https://spoprod-a.akamaihd.net/files/odsp-next-prod_2017-11-10-sts_20171116.001/odsp-media/images/itemtypes/16/pdf.png';

  return `https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/svg/${docType}_16x1.svg`;
};

const FileIcon = ({ fileName }: { fileName: string }) => {
  return (
    <img
      alt={fileName}
      style={{ width: '1em', height: '1em' }}
      src={buildIconUrl(fileName)}
    />
  );
};

const Document: PlatePluginComponent = ({ children, element }) => {
  return (
    <>
      <span
        contentEditable={false}
        style={{
          background: '#ccc',
          padding: '0.25em 0.5em',
          display: 'inline-flex',
          gap: '0.25em',
          fontSize: '0.8em',
          alignItems: 'center',
        }}
      >
        <FileIcon fileName={element.documentData.name} />
        <span>{element.documentData.name}</span>
      </span>
      {children}
    </>
  );
};

const createDocumentPlugin = createPluginFactory({
  key: ELEMENT_DOCUMENT,
  isElement: true,
  isInline: true,
  isVoid: true,
  handlers: {
    onKeyDown: (editor) => {
      console.log('onKeyDown???', editor);
      const f = moveSelectionByOffsetForDocument(editor, {});
      return (event) => {
        console.log('onKeyDown???', event);

        return f(event);
      };
    },
  },
  component: Document,
  then: (editor, { key }) => ({
    options: {
      id: key,
    },
  }),
});

interface IDocumentData {
  id: string;
  name: string;
  metadata: { [key: string]: any };
}

interface IDocumentConfigItemOptions {
  getData: () => Promise<IDocumentData>;
}

export interface TDocumentElement extends TElement {
  documentData: IDocumentData;
  type: string;
  text: string;
}

const insertDocument = (editor: KateEditor, documentData: IDocumentData) => {
  if (!editor.selection) return;
  const selectionParentEntry = getParentNode(editor, editor.selection);
  if (!selectionParentEntry) return;
  const [, path] = selectionParentEntry;

  console.log('insertDocument', editor.selection, path, documentData);

  withoutNormalizing(editor, () => {
    insertNodes(editor, {
      type: ELEMENT_DOCUMENT,
      documentData,
      children: [{ text: '' }],
    } as TDocumentElement);
  });
};

const onMouseDownHandlerFactory = (
  editor: KateEditor,
  options: IDocumentConfigItemOptions
): React.MouseEventHandler<HTMLSpanElement> => {
  return async (event) => {
    if (!editor || !options.getData) return;

    event.preventDefault();

    const data = await options.getData();

    insertDocument(editor, data);
  };
};

export const createDocumentConfig = (
  options: IDocumentConfigItemOptions
): IKateConfigItem => {
  return {
    plugins: [createDocumentPlugin()],
    renderButtons: (editor: KateEditor) => [
      <ToolbarButton
        icon={<Link />}
        onMouseDown={onMouseDownHandlerFactory(editor, options)}
      />,
    ],
  };
};
