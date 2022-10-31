import React from 'react';
import {
  Looks3,
  Looks4,
  Looks5,
  Looks6,
  LooksOne,
  LooksTwo,
} from '@styled-icons/material';
import { TippyProps } from '@tippyjs/react';
import { getPluginType } from '@udecode/plate-core';
import {
  createHeadingPlugin,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
} from '@udecode/plate-heading';
import { BlockToolbarButton } from '@udecode/plate-ui-toolbar';
import { KateEditor } from '../plateTypes';
import { IKateConfigItem } from './types';

type HTypes = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
const headingsDefaultValue: HTypes[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

export const createHeadingConfig = (
  headings = headingsDefaultValue
): IKateConfigItem => {
  return {
    plugins: [createHeadingPlugin()],
    renderButtons: (editor: KateEditor) => {
      const foundButtons = [];
      if (headings.includes('h1'))
        foundButtons.push(
          <BlockToolbarButton
            type={getPluginType(editor, ELEMENT_H1)}
            // tooltip={{ content: 'Header 1' } as TippyProps}
            icon={<LooksOne />}
          />
        );
      if (headings.includes('h2'))
        foundButtons.push(
          <BlockToolbarButton
            type={getPluginType(editor, ELEMENT_H2)}
            // tooltip={{ content: 'Header 2' } as TippyProps}
            icon={<LooksTwo />}
          />
        );
      if (headings.includes('h3'))
        foundButtons.push(
          <BlockToolbarButton
            type={getPluginType(editor, ELEMENT_H3)}
            // tooltip={{ content: 'Header 3' } as TippyProps}
            icon={<Looks3 />}
          />
        );
      if (headings.includes('h4'))
        foundButtons.push(
          <BlockToolbarButton
            type={getPluginType(editor, ELEMENT_H4)}
            // tooltip={{ content: 'Header 4' } as TippyProps}
            icon={<Looks4 />}
          />
        );
      if (headings.includes('h5'))
        foundButtons.push(
          <BlockToolbarButton
            type={getPluginType(editor, ELEMENT_H5)}
            // tooltip={{ content: 'Header 5' } as TippyProps}
            icon={<Looks5 />}
          />
        );
      if (headings.includes('h6'))
        foundButtons.push(
          <BlockToolbarButton
            type={getPluginType(editor, ELEMENT_H6)}
            //  tooltip={{ content: 'Header 6' } as TippyProps}
            icon={<Looks6 />}
          />
        );

      return foundButtons;
    },
    withUi: [
      {
        key: ELEMENT_H1,
        styles: {
          gutterLeft: {
            padding: '2em 0 4px',
            fontSize: '1.875em',
          },
          blockToolbarWrapper: {
            height: '1.3em',
          },
        },
      },
      {
        key: ELEMENT_H2,
        styles: {
          gutterLeft: {
            padding: '1.4em 0 1px',
            fontSize: '1.5em',
          },
          blockToolbarWrapper: {
            height: '1.3em',
          },
        },
      },
      {
        key: ELEMENT_H3,
        styles: {
          gutterLeft: {
            padding: '1em 0 1px',
            fontSize: '1.25em',
          },
          blockToolbarWrapper: {
            height: '1.3em',
          },
        },
      },
      {
        keys: [ELEMENT_H4, ELEMENT_H5, ELEMENT_H6],
        styles: {
          gutterLeft: {
            padding: '0.75em 0 0',
            fontSize: '1.1em',
          },
          blockToolbarWrapper: {
            height: '1.3em',
          },
        },
      },
    ],
  };
};
