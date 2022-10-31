import { ELEMENT_BLOCKQUOTE } from '@udecode/plate-block-quote';
import { ELEMENT_CODE_BLOCK } from '@udecode/plate-code-block';
import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
} from '@udecode/plate-heading';
import { IndentPlugin } from '@udecode/plate-indent';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { KatePlatePlugin } from '../plateTypes';

export const indentPlugin: Partial<KatePlatePlugin<IndentPlugin>> = {
  inject: {
    props: {
      validTypes: [
        ELEMENT_PARAGRAPH,
        ELEMENT_H1,
        ELEMENT_H2,
        ELEMENT_H3,
        ELEMENT_H4,
        ELEMENT_H5,
        ELEMENT_H6,
        ELEMENT_BLOCKQUOTE,
        ELEMENT_CODE_BLOCK,
      ],
    },
  },
};
