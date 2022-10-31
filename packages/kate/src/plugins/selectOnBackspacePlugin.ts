import {
    ELEMENT_HR,
  } from '@udecode/plate-horizontal-rule';

  import {
    ELEMENT_IMAGE,
  } from '@udecode/plate-image';

  import {
    SelectOnBackspacePlugin,
  } from '@udecode/plate-select';

  

  import { KatePlatePlugin } from '../plateTypes';
  
  export const selectOnBackspacePlugin: Partial<
    KatePlatePlugin<SelectOnBackspacePlugin>
  > = {
    options: {
      query: {
        allow: [ELEMENT_IMAGE, ELEMENT_HR],
      },
    },
  };
  