import React from 'react';
import { DragIndicator } from '@styled-icons/material/DragIndicator';
import Tippy, { TippyProps } from '@tippyjs/react';
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
import { ELEMENT_IMAGE } from '@udecode/plate-image';
import { ELEMENT_OL, ELEMENT_TODO_LI, ELEMENT_UL } from '@udecode/plate-list';
import { ELEMENT_MEDIA_EMBED } from '@udecode/plate-media-embed';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { ELEMENT_TABLE } from '@udecode/plate-table';
import { withDraggables } from '@udecode/plate-ui-dnd';

const styles = {
  grabber: { fontSize: 12 },
  grabberText: { color: 'rgba(255, 255, 255, 0.45)' },
  dragButton: {
    width: 18,
    height: 18,
    color: 'rgba(55, 53, 47, 0.3)',
  },
};

const GrabberTooltipContent = () => (
  <div style={styles.grabber}>
    <div>
      Drag <span style={styles.grabberText}>to move</span>
    </div>
  </div>
);

export const grabberTooltipProps: TippyProps = {
  content: <GrabberTooltipContent />,
  placement: 'bottom',
  arrow: false,
  offset: [0, 0],
  delay: [300, 0],
  duration: [0, 0],
  hideOnClick: true,
  theme: 'small',
};

export const withStyledDraggables = (components: any, ui: any) => {
  return withDraggables(components, [
    {
      keys: [ELEMENT_PARAGRAPH, ELEMENT_UL, ELEMENT_OL],
      level: 0,
    },
    {
      keys: [
        ELEMENT_PARAGRAPH,
        ELEMENT_BLOCKQUOTE,
        ELEMENT_TODO_LI,
        ELEMENT_H1,
        ELEMENT_H2,
        ELEMENT_H3,
        ELEMENT_H4,
        ELEMENT_H5,
        ELEMENT_H6,
        ELEMENT_IMAGE,
        ELEMENT_OL,
        ELEMENT_UL,
        ELEMENT_TABLE,
        ELEMENT_MEDIA_EMBED,
        ELEMENT_CODE_BLOCK,
      ],
      onRenderDragHandle: () => {
        return (
          <Tippy {...grabberTooltipProps}>
            <button type="button" className="drag-button">
              <DragIndicator style={styles.dragButton} />
            </button>
          </Tippy>
        );
      },
    },
    {
      keys: [ELEMENT_PARAGRAPH, ELEMENT_UL, ELEMENT_OL],
      styles: {
        gutterLeft: {
          padding: '4px 0 0',
        },
      },
    },
    {
      key: ELEMENT_BLOCKQUOTE,
      styles: {
        gutterLeft: {
          padding: '18px 0 0',
        },
      },
    },
    {
      key: ELEMENT_CODE_BLOCK,
      styles: {
        gutterLeft: {
          padding: '12px 0 0',
        },
      },
    },
    ...ui
  ]);
};