import { createComponentAs, createElementAs } from '@udecode/plate-core';
import { useFloatingDocumentMenu } from '../hooks/useFloatingDocumentEdit';

export const FloatingDocumentMenuRoot = createComponentAs<any>((props: any) => {
  const htmlProps = useFloatingDocumentMenu(props);

  if (htmlProps.style?.display === 'none') {
    return null;
  }

  return createElementAs('div', htmlProps);
});
