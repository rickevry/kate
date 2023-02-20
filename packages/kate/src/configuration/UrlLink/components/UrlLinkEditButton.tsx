import {
  AsProps,
  createComponentAs,
  createElementAs,
} from '@udecode/plate-core';

export const UrlLinkEditButton = createComponentAs<AsProps<'button'>>(
  (props) => {
    return createElementAs('button', {
      type: "button",
      ...props,
    });
  }
);
