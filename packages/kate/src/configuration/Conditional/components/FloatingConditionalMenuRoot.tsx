import { createComponentAs, createElementAs } from '@udecode/plate-core';
import { useFloatingConditionalMenu } from '../hooks/useFloatingConditionalEdit';

export const FloatingConditionalMenuRoot = createComponentAs<any>((props: any) => {
  const htmlProps = useFloatingConditionalMenu(props);

  if (htmlProps.style?.display === 'none') {
    return null;
  }

  return createElementAs('div', htmlProps);
});
