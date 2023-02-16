import {
  AsProps,
  createComponentAs,
  createElementAs,
} from '@udecode/plate-core';

export const DocumentEditButton = createComponentAs<AsProps<'button'>>(
  (props) => {
    return createElementAs('button', {
      ...props,
    });
  }
);
