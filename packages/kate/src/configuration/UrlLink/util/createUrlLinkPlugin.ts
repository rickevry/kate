import { createPluginFactory } from '@udecode/plate-core';
import { UrlLink } from '../components/UrlLink';
import { ELEMENT_URL_LINK } from '../constants';

export const createUrlLinkPlugin = createPluginFactory({
  key: ELEMENT_URL_LINK,
  isElement: true,
  isInline: true,
  isVoid: true,
  component: UrlLink,
  then: (editor, { key }) => ({
    options: {
      id: key,
    },
  }),
});
