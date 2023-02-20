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
  floatingLinkUrlMenuActions,
  useFloatingUrlLinkMenuSelectors,
} from '../stores/floatingUrlLinkMenuStore';
import { ELEMENT_URL_LINK } from '../constants';

export const useFloatingUrlLinkMenu = (props: any): HTMLPropsAs<'div'> => {
  const editor = useEditorRef();
  const keyEditor = usePlateSelectors(editor.id).keyEditor();
  const open = useFloatingUrlLinkMenuSelectors().open();
  // eslint-disable-next-line no-console
  console.log('useFloatingUrlLinkMenu open', open);
  const getBoundingClientRect = useCallback(() => {
    const entry = getAboveNode(editor, {
      match: { type: getPluginType(editor, ELEMENT_URL_LINK) },
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
        'useFloatingUrlLinkMenu useVirtualFloating onOpenChange',
        args
      );
      floatingLinkUrlMenuActions.open(...args);
    },
    middleware: [
      offset(4),
      offset({ crossAxis: -5 }),
      flip({
        padding: 0,
      }),
    ],
  });

  useEffect(() => {
    const hasSelected =
      editor.selection &&
      someNode(editor, {
        match: { type: getPluginType(editor, ELEMENT_URL_LINK) },
      });
    // eslint-disable-next-line no-console
    console.log('useFloatingUrlLinkEdit useEffect', hasSelected);
    if (hasSelected) {
      floatingLinkUrlMenuActions.show();
      update();
      return;
    }

    floatingLinkUrlMenuActions.hide();
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
