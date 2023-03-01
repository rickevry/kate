import { findEventRange } from '@udecode/plate-core';
import { KatePlatePlugin } from '../plateTypes';
import { cursorStore } from './cursorStore';

export const dragOverCursorPlugin: KatePlatePlugin = {
  key: 'drag-over-cursor',
  handlers: {
    onDragOver: (editor: any) => (event: any) => {
      if (editor.isDragging) return;

      const range = findEventRange(editor, event);
      if (!range) return;

      cursorStore.set.cursors({
        drag: {
          key: 'drag',
          data: {
            style: {
              backgroundColor: '#fc00ff',
              backgroundImage: 'linear-gradient(0deg, #fc00ff, #00dbde)',
              width: 3,
            },
          },
          selection: range,
        },
      });
    },
    onDragLeave: () => () => {
      cursorStore.set.cursors({});
    },
    onDragEnd: () => () => {
      cursorStore.set.cursors({});
    },
    onDrop: () => () => {
      cursorStore.set.cursors({});
    },
  },
};