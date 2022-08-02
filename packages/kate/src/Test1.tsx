import React from 'react';
import { ELEMENT_CODE_BLOCK } from '@udecode/plate-code-block';

import {
  createComponentAs,
  createElementAs,
  TEditableProps
} from '@udecode/plate-core';

import { StyledElement } from '@udecode/plate-styled-components';
import { Toolbar } from '@udecode/plate-ui-toolbar';
import { createPlateUI } from '@udecode/plate-ui';
import { MentionCombobox } from '@udecode/plate-ui';
import { Plate } from '@udecode/plate-core';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createJuicePlugin } from '@udecode/plate-juice';

import { createMyPlugins, MyEditor, MyPlatePlugin, MyValue } from './plateTypes';

import { ToolbarButtons } from './ToolbarButtons';
import { MarkBalloonToolbar } from './plugins/MarkBallonToolbar';
import { withStyledDraggables } from './plugins/withStyledDraggables';
import { dragOverCursorPlugin } from './plugins/dragOverCursorPlugin';
import { CursorOverlayContainer } from './plugins/CursorOverlayContainer';

function Test1() {
  let b: TEditableProps | undefined = undefined;
  let a = [ ToolbarButtons, CursorOverlayContainer, dragOverCursorPlugin, withStyledDraggables, MarkBalloonToolbar, createMyPlugins, createJuicePlugin, DndProvider,HTML5Backend,  Plate, ELEMENT_CODE_BLOCK, createElementAs, StyledElement, Toolbar, createPlateUI, MentionCombobox,createComponentAs];
  if (!createElementAs) {
    console.log(a, b);
  }
} 

export {
  Test1
} 
