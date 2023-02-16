/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { Link } from '@styled-icons/material';
import {
  createPluginFactory,
  findNode,
  getAboveNode,
  getNextNodeStartPoint,
  getParentNode,
  getPluginType,
  getPreviousNodeEndPoint,
  insertNodes,
  isCollapsed,
  isEndPoint,
  isStartPoint,
  mockPlugin,
  moveSelection,
  PlateEditor,
  PlatePluginComponent,
  select,
  TElement,
  toSlateNode,
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
import { Path, Range } from 'slate';
import { KateEditor } from '../../plateTypes';
import { IKateConfigItem } from '../types';
import { withRemoveEmptyNodes } from '@udecode/plate-normalizers';
import { DocumentFloatingLink, customFloatingLinkActions } from './PlateLink';
import { floatingLinkActions } from '@udecode/plate-link';

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

const DOCUMENT_WRAPPER_CLASSLIST = "kate-plugin-document";

const Document: PlatePluginComponent = (props) => {
  const { children, element, componentStyle, editor } = props;
  const [show, setShow] = React.useState<boolean>(false);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickHandler = (e: any) => {
      console.log("body mousedown", { e, wrapperRef, contains: wrapperRef.current?.contains(e.target) });

      if (e.target !== wrapperRef.current && !wrapperRef.current?.contains(e.target)) {
        const entry = findNode(editor, {
          match: {
            type: getPluginType(editor, ELEMENT_DOCUMENT)
          }
        });

        if (!entry) {
          console.log("body mousedown hide");
          // window["plate_kate_plate_link_hide"] && window["plate_kate_plate_link_hide"]();
        }
      }
    };

    document.body.addEventListener("mousedown", onClickHandler);

    return () => {
      document.body.removeEventListener("mousedown", onClickHandler);
    }
  }, []);

  console.log("document plate plugin", { props, children, element });
  return (
    <span className={DOCUMENT_WRAPPER_CLASSLIST} ref={wrapperRef}>
      <span
        contentEditable={false}
        style={Object.assign({
          background: '#ddd',
          padding: '0.25em 0.5em',
          // margin: '0 0.4em',
          display: 'inline-flex',
          gap: '0.25em',
          fontSize: '0.8em',
          alignItems: 'center',
          borderRadius: "4px"
        }, componentStyle)}
        css="margin: 2px 4px; :first-child { margin-left: 0 } :last-child { margin-right: 0 }"
        onMouseDown={e => {
          // e.preventDefault();
          // e.stopPropagation();
          // const test = toSlateNode(editor, e.target as Node);
          // console.log("tada!", { e, element, test, props });
          // setShow(true);
          floatingLinkActions.hide();
          window["plate_kate_plate_link_show"] && window["plate_kate_plate_link_show"](wrapperRef.current);
        }}
      >
        <FileIcon fileName={element.documentData.name} />
        <span>{element.documentData.name}</span>
      </span>
      {/* {show && <DocumentFloatingLink />} */}
      {children}
    </span>
  );
};

// const Document: PlatePluginComponent = ({ children, element }) => {
//   return (
//     <>
//       <span
//         contentEditable={false}
//         style={{
//           background: '#ccc',
//           padding: '0.25em 0.5em',
//           display: 'inline-flex',
//           gap: '0.25em',
//           fontSize: '0.8em',
//           alignItems: 'center',
//         }}
//       >
//         <FileIcon fileName={element.documentData.name} />
//         <span>{element.documentData.name}</span>
//       </span>
//       {children}
//     </>
//   );
// };


const createDocumentPlugin = (options: IDocumentConfigItemOptions, ...args: any[]) => createPluginFactory({
  key: ELEMENT_DOCUMENT,
  isElement: true,
  isInline: true,
  isVoid: true,
  // isLeaf: true,
  handlers: {
    onMouseDown: (editor, plugin) => {
      console.log("onMouseDown 1", { editor, plugin });
      return e => {
        let element: HTMLElement | null = e.target as HTMLElement;

        while (element) {
          if (element.classList.contains(DOCUMENT_WRAPPER_CLASSLIST)) {

            return false;
          }

          element = element.parentElement;
        }

        window["plate_kate_plate_link_hide"] && window["plate_kate_plate_link_hide"]();

        return false;
      }
    },
    onKeyDown: (editor) => {
      console.log('onKeyDown???', editor);
      const f = moveSelectionByOffsetForDocument(editor, {});
      return (event) => {
        console.log('onKeyDown???', event);

        return f(event);
      };
    },
  },
  props: options,
  component: Document,
  then: (editor, { key }) => ({
    options: {
      id: key,
    },
  }),
})(...args);

interface IDocumentData {
  id: string;
  name: string;
  metadata: { [key: string]: any };
}

interface IDocumentConfigItemOptions {
  getData: () => Promise<IDocumentData>;
  componentStyle?: React.CSSProperties;
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
    // plugins: [createDocumentPlugin(options)],
    plugins: [createDocumentPlugin(options, { renderAfterEditable: DocumentFloatingLink })],
    renderButtons: (editor: KateEditor) => [
      <ToolbarButton
        icon={<Link />}
        onMouseDown={onMouseDownHandlerFactory(editor, options)}
      />,
    ],
  };
};
