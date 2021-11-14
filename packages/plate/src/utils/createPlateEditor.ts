/* eslint-disable react-hooks/rules-of-hooks */
import {
  createHistoryPlugin,
  createReactPlugin,
  PlateEditor,
  PlatePlugin,
  withPlate,
} from '@udecode/plate-core';
import { createEditor } from 'slate';

/**
 * Quick helper to create an editor with plugins.
 * - createEditor
 * - withPlate
 * - createReactPlugin
 * - createHistoryPlugin
 * - options
 * - components
 */
export const createPlateEditor = <T extends string = string>({
  editor = createEditor() as any,
  plugins = [],
}: {
  editor?: PlateEditor;
  plugins?: PlatePlugin[];
} = {}) => {
  return withPlate(editor, {
    plugins: [createReactPlugin(), createHistoryPlugin(), ...plugins],
  });
};