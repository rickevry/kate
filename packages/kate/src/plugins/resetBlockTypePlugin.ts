import {
    ELEMENT_BLOCKQUOTE,
  } from '@udecode/plate-block-quote';


  import {
    ELEMENT_PARAGRAPH,
  } from '@udecode/plate-paragraph';

  import {
    isBlockAboveEmpty,
    isSelectionAtBlockStart,
  } from '@udecode/plate-core';

  import {
    ELEMENT_TODO_LI,
  } from '@udecode/plate-list';

  import {
    ResetNodePlugin,
  } from '@udecode/plate-reset-node';


  import { KatePlatePlugin } from '../plateTypes';
  
  const resetBlockTypesCommonRule = {
    types: [ELEMENT_BLOCKQUOTE, ELEMENT_TODO_LI],
    defaultType: ELEMENT_PARAGRAPH,
  };
  
  export const resetBlockTypePlugin: Partial<KatePlatePlugin<ResetNodePlugin>> = {
    options: {
      rules: [
        {
          ...resetBlockTypesCommonRule,
          hotkey: 'Enter',
          predicate: isBlockAboveEmpty,
        },
        {
          ...resetBlockTypesCommonRule,
          hotkey: 'Backspace',
          predicate: isSelectionAtBlockStart,
        },
      ],
    },
  };
  