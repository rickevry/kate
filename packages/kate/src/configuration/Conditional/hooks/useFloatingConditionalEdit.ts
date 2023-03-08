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
  floatingConditionalMenuActions,
  useFloatingConditionalMenuSelectors,
} from '../stores/floatingConditionalMenuStore';
import { ELEMENT_CONDITIONAL } from '../constants';

export const useFloatingConditionalMenu = (props: any): HTMLPropsAs<'div'> => {
  const editor = useEditorRef();
  const keyEditor = usePlateSelectors(editor.id).keyEditor();
  const open = useFloatingConditionalMenuSelectors().open();
  // eslint-disable-next-line no-console
  console.log('useFloatingConditionalMenu open', open);
  const getBoundingClientRect = useCallback(() => {
    const entry = getAboveNode(editor, {
      match: { type: getPluginType(editor, ELEMENT_CONDITIONAL) },
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
        'useFloatingConditionalMenu useVirtualFloating onOpenChange',
        args
      );
      floatingConditionalMenuActions.open(...args);
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
        match: { type: getPluginType(editor, ELEMENT_CONDITIONAL) },
      });
    // eslint-disable-next-line no-console
    console.log('useFloatingConditionalMenu useEffect', hasSelected);
    if (hasSelected) {
      floatingConditionalMenuActions.show();
      update();
      return;
    }

    floatingConditionalMenuActions.hide();
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
