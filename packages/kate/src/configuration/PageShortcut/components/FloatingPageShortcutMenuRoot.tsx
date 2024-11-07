import { createComponentAs, createElementAs, useEditorRef } from '@udecode/plate-core';
import { useFloatingPageShortcutMenu } from '../hooks/useFloatingPageShortcutEdit';
import { getSelectedPageShortcutNode } from '../util/getSelectedPageShortcutNode';

export const FloatingShortcutMenuRoot = createComponentAs<any>((props: any) => {
  const htmlProps = useFloatingPageShortcutMenu(props);

  return createElementAs('div', htmlProps);
});
