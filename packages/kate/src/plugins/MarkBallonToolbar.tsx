import React from 'react';
import { FormatBold } from '@styled-icons/material/FormatBold';
import { FormatItalic } from '@styled-icons/material/FormatItalic';
import { FormatUnderlined } from '@styled-icons/material/FormatUnderlined';
import { TippyProps } from '@tippyjs/react';

import {
  getPluginType,
} from '@udecode/plate-core';

import {
  BalloonToolbar,
  MarkToolbarButton,
} from '@udecode/plate-ui-toolbar';

import {
  MARK_BOLD,
  MARK_UNDERLINE,
  MARK_ITALIC,
} from '@udecode/plate-basic-marks';

import { useMyPlateEditorRef } from '../plateTypes';

export const MarkBalloonToolbar = () => {
  const editor = useMyPlateEditorRef()!;

  const arrow = false;
  const theme = 'dark';
  const tooltip: TippyProps = {
    arrow: true,
    delay: 0,
    duration: [200, 0],
    hideOnClick: false,
    offset: [0, 17],
    placement: 'top',
  };

  const boldTooltip: TippyProps = { content: 'Bold (⌘B)', ...tooltip };
  const italicTooltip: TippyProps = { content: 'Italic (⌘I)', ...tooltip };
  const underlineTooltip: TippyProps = {
    content: 'Underline (⌘U)',
    ...tooltip,
  };

  return (
    <BalloonToolbar theme={theme} arrow={arrow}>
      <MarkToolbarButton
        type={getPluginType(editor, MARK_BOLD)}
        icon={<FormatBold />}
        tooltip={boldTooltip}
      />
      <MarkToolbarButton
        type={getPluginType(editor, MARK_ITALIC)}
        icon={<FormatItalic />}
        tooltip={italicTooltip}
      />
      <MarkToolbarButton
        type={getPluginType(editor, MARK_UNDERLINE)}
        icon={<FormatUnderlined />}
        tooltip={underlineTooltip}
      />
    </BalloonToolbar>
  );
};
