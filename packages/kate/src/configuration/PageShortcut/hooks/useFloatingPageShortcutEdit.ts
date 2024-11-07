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
  floatingPageShortcutMenuActions,
  useFloatingPageShortcutMenuSelectors,
} from '../stores/floatingPageShortcutMenuStore';
import { ELEMENT_PAGE_SHORTCUT } from '../constants';

export const useFloatingPageShortcutMenu = (props: any): HTMLPropsAs<'div'> => {
  const editor = useEditorRef();
  const keyEditor = usePlateSelectors(editor.id).keyEditor();
  const open = useFloatingPageShortcutMenuSelectors().open();
  // eslint-disable-next-line no-console
  console.log('useFloatingPageShortcutMenu open', open);
  const getBoundingClientRect = useCallback(() => {
    const entry = getAboveNode(editor, {
      match: { type: getPluginType(editor, ELEMENT_PAGE_SHORTCUT) },
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
        'useFloatingPageShortcutMenu useVirtualFloating onOpenChange',
        args
      );
      floatingPageShortcutMenuActions.open(...args);
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
        match: { type: getPluginType(editor, ELEMENT_PAGE_SHORTCUT) },
      });
    // eslint-disable-next-line no-console
    console.log('useFloatingPageShortcutMenu useEffect', hasSelected);
    if (hasSelected) {
      floatingPageShortcutMenuActions.show();
      update();
      return;
    }

    floatingPageShortcutMenuActions.hide();
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
