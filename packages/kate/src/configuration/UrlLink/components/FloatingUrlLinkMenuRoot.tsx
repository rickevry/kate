import { createComponentAs, createElementAs } from '@udecode/plate-core';
import { useFloatingUrlLinkMenu } from '../hooks/useFloatingUrlLinkEdit';

export const FloatingUrlLinkMenuRoot = createComponentAs<any>((props: any) => {
  const htmlProps = useFloatingUrlLinkMenu(props);

  if (htmlProps.style?.display === 'none') {
    return null;
  }

  return createElementAs('div', htmlProps);
});
