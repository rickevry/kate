import { useCallback, useEffect } from 'react';
import {
  getAboveNode,
  getEndPoint,
  getPluginType,
  getStartPoint,
  HTMLPropsAs,
  someNode,
  useComposedRef,
  useEditorRef,
  usePlateSelectors,
} from '@udecode/plate-core';
import {
  flip,
  getDefaultBoundingClientRect,
  getRangeBoundingClientRect,
  offset,
  useVirtualFloating,
} from '@udecode/plate-floating';
import {
  floatingDocumentMenuActions,
  useFloatingDocumentMenuSelectors,
} from '../stores/floatingDocumentMenuStore';

const ELEMENT_DOCUMENT = 'document';

export const useFloatingDocumentMenu = (props: any): HTMLPropsAs<'div'> => {
  const editor = useEditorRef();
  const keyEditor = usePlateSelectors(editor.id).keyEditor();
  const open = useFloatingDocumentMenuSelectors().open();
  // eslint-disable-next-line no-console
  console.log('useFloatingDocumentMenu open', open);
  const getBoundingClientRect = useCallback(() => {
    const entry = getAboveNode(editor, {
      match: { type: getPluginType(editor, ELEMENT_DOCUMENT) },
    });

    if (entry) {
      const [, path] = entry;
      const start = getStartPoint(editor, path);
      start.offset -= 1;
      return getRangeBoundingClientRect(editor, {
        anchor: start,
        focus: getEndPoint(editor, path),
      });
    }

    return getDefaultBoundingClientRect();
  }, [editor]);

  const { update, style, floating } = useVirtualFloating({
    open,
    getBoundingClientRect,
    placement: 'bottom-start',
    onOpenChange: (...args) => {
      // eslint-disable-next-line no-console
      console.log(
        'useFloatingDocumentMenu useVirtualFloating onOpenChange',
        args
      );
      floatingDocumentMenuActions.open(...args);
    },
    middleware: [
      offset(4),
      flip({
        padding: 0,
      }),
    ],
  });

  useEffect(() => {
    const hasSelected =
      editor.selection &&
      someNode(editor, {
        match: { type: getPluginType(editor, ELEMENT_DOCUMENT) },
      });
    // eslint-disable-next-line no-console
    console.log('useFloatingDocumentEdit useEffect', hasSelected);
    if (hasSelected) {
      floatingDocumentMenuActions.show();
      update();
      return;
    }

    floatingDocumentMenuActions.hide();
  }, [editor, keyEditor, update]);

  return {
    style: {
      ...style,
      zIndex: 1,
    },
    ...props,
    ref: useComposedRef<HTMLElement | null>(floating),
  };
};
