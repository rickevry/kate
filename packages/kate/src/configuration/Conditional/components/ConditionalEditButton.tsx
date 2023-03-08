import {
  AsProps,
  createComponentAs,
  createElementAs,
} from '@udecode/plate-core';

export const ConditionalEditButton = createComponentAs<AsProps<'button'>>(
  (props) => {
    return createElementAs('button', {
      type: "button",
      ...props,
    });
  }
);
