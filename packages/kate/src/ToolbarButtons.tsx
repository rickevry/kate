// import React, {
//     CSSProperties,
//     useEffect,
//     useMemo,
//     useRef,
//     useState,
// } from 'react';
// import {
//     BorderAll,
//     BorderBottom,
//     BorderClear,
//     BorderLeft,
//     BorderRight,
//     BorderTop,
//     Check,
//     Code,
//     FontDownload,
//     FormatAlignCenter,
//     FormatAlignJustify,
//     FormatAlignLeft,
//     FormatAlignRight,
//     FormatBold,
//     FormatColorText,
//     FormatIndentDecrease,
//     FormatIndentIncrease,
//     FormatItalic,
//     FormatListBulleted,
//     FormatListNumbered,
//     FormatQuote,
//     FormatStrikethrough,
//     FormatUnderlined,
//     Image,
//     LineWeight,
//     Link,
//     Looks3,
//     Looks4,
//     Looks5,
//     Looks6,
//     LooksTwo,
//     OndemandVideo,
//     Subscript,
//     Superscript,
// } from '@styled-icons/material';
// import { LooksOne } from '@styled-icons/material/LooksOne';
// import { TippyProps } from '@tippyjs/react';
// import {
//     MARK_BOLD,
//     MARK_CODE,
//     MARK_ITALIC,
//     MARK_STRIKETHROUGH,
//     MARK_SUBSCRIPT,
//     MARK_SUPERSCRIPT,
//     MARK_UNDERLINE,
// } from '@udecode/plate-basic-marks';
// import { ELEMENT_BLOCKQUOTE } from '@udecode/plate-block-quote';
// import { ELEMENT_CODE_BLOCK } from '@udecode/plate-code-block';
// import { getPluginType } from '@udecode/plate-core';
// import { MARK_BG_COLOR, MARK_COLOR } from '@udecode/plate-font';
// import {
//     ELEMENT_H1,
//     ELEMENT_H2,
//     ELEMENT_H3,
//     ELEMENT_H4,
//     ELEMENT_H5,
//     ELEMENT_H6,
// } from '@udecode/plate-heading';
// import { indent, outdent } from '@udecode/plate-indent';
// import { ELEMENT_OL, ELEMENT_UL } from '@udecode/plate-list';
// import {
//     deleteColumn,
//     deleteRow,
//     deleteTable,
//     insertTable,
// } from '@udecode/plate-table';
// import { AlignToolbarButton } from '@udecode/plate-ui-alignment';
// import { CodeBlockToolbarButton } from '@udecode/plate-ui-code-block';
// import { ColorPickerToolbarDropdown } from '@udecode/plate-ui-font';
// import { ImageToolbarButton } from '@udecode/plate-ui-image';
// import { LinkToolbarButton } from '@udecode/plate-ui-link';
// import { ListToolbarButton } from '@udecode/plate-ui-list';
// import { MediaEmbedToolbarButton } from '@udecode/plate-ui-media-embed';
// import { TableToolbarButton } from '@udecode/plate-ui-table';
// import {
//     BlockToolbarButton,
//     MarkToolbarButton,
//     ToolbarButton,
// } from '@udecode/plate-ui-toolbar';
import { useMyPlateEditorRef } from './plateTypes';

export const ToolbarButtons = ({
  toolbarButtonRenderFuncs,
}: {
  toolbarButtonRenderFuncs: any;
}) => {
  const editor = useMyPlateEditorRef()!;
  // const colorTooltip: TippyProps = { content: 'Text color' };
  // const bgTooltip: TippyProps = { content: 'Text color' };

  return toolbarButtonRenderFuncs.flatMap((r: any) => r(editor));

  //   return (
  //     <>
  //       <BlockToolbarButton
  //         type={getPluginType(editor, ELEMENT_BLOCKQUOTE)}
  //         tooltip={{ content: 'Blockquote' } as TippyProps}
  //         icon={<FormatQuote />}
  //       />
  //       <CodeBlockToolbarButton
  //         type={getPluginType(editor, ELEMENT_CODE_BLOCK)}
  //         tooltip={{ content: 'Code block' } as TippyProps}
  //         icon={<Code />}
  //       />
  //       <ListToolbarButton
  //         type={getPluginType(editor, ELEMENT_UL)}
  //         icon={<FormatListBulleted />}
  //       />
  //       <ListToolbarButton
  //         type={getPluginType(editor, ELEMENT_OL)}
  //         icon={<FormatListNumbered />}
  //       />
  //       <ToolbarButton
  //         onMouseDown={(e) => {
  //           if (!editor) return;

  //           outdent(editor);
  //           e.preventDefault();
  //         }}
  //         icon={<FormatIndentDecrease />}
  //       />
  //       <ToolbarButton
  //         onMouseDown={(e) => {
  //           if (!editor) return;

  //           indent(editor);
  //           e.preventDefault();
  //         }}
  //         icon={<FormatIndentIncrease />}
  //       />
  //       <MarkToolbarButton
  //         type={getPluginType(editor, MARK_BOLD)}
  //         icon={<FormatBold />}
  //       />
  //       <MarkToolbarButton
  //         type={getPluginType(editor, MARK_ITALIC)}
  //         icon={<FormatItalic />}
  //       />
  //       {/*  */}
  //       <MarkToolbarButton
  //         type={getPluginType(editor, MARK_STRIKETHROUGH)}
  //         icon={<FormatStrikethrough />}
  //       />
  //       <MarkToolbarButton
  //         type={getPluginType(editor, MARK_CODE)}
  //         icon={<Code />}
  //       />
  //       <MarkToolbarButton
  //         type={getPluginType(editor, MARK_SUPERSCRIPT)}
  //         clear={getPluginType(editor, MARK_SUBSCRIPT)}
  //         icon={<Superscript />}
  //       />
  //       <MarkToolbarButton
  //         type={getPluginType(editor, MARK_SUBSCRIPT)}
  //         clear={getPluginType(editor, MARK_SUPERSCRIPT)}
  //         icon={<Subscript />}
  //       />
  //       <ColorPickerToolbarDropdown
  //         pluginKey={MARK_COLOR}
  //         icon={<FormatColorText />}
  //         selectedIcon={<Check />}
  //         tooltip={colorTooltip}
  //       />
  //       <ColorPickerToolbarDropdown
  //         pluginKey={MARK_BG_COLOR}
  //         icon={<FontDownload />}
  //         selectedIcon={<Check />}
  //         tooltip={bgTooltip}
  //       />
  //       {/* Does not work correctly, even in example */}
  //       {/* <LineHeightToolbarDropdown icon={<LineWeight />} /> */}
  //       <AlignToolbarButton value="left" icon={<FormatAlignLeft />} />
  //       <AlignToolbarButton value="center" icon={<FormatAlignCenter />} />
  //       <AlignToolbarButton value="right" icon={<FormatAlignRight />} />
  //       <AlignToolbarButton value="justify" icon={<FormatAlignJustify />} />
  //       <LinkToolbarButton icon={<Link />} />
  //       <ImageToolbarButton icon={<Image />} />
  //       <MediaEmbedToolbarButton icon={<OndemandVideo />} />
  //       <TableToolbarButton
  //         tooltip={{ content: 'Insert table' } as TippyProps}
  //         icon={<BorderAll />}
  //         transform={insertTable}
  //       />
  //       <TableToolbarButton
  //         tooltip={{ content: 'Remove table' } as TippyProps}
  //         icon={<BorderClear />}
  //         transform={deleteTable}
  //       />
  //       {/* <TableToolbarButton  tooltip={{ content: "Add row" } as TippyProps} icon={<BorderBottom />} transform={addRow} /> */}
  //       <TableToolbarButton
  //         tooltip={{ content: 'Remove row' } as TippyProps}
  //         icon={<BorderTop />}
  //         transform={deleteRow}
  //       />
  //       {/* <TableToolbarButton  tooltip={{ content: "Add column" } as TippyProps} icon={<BorderLeft />} transform={addColumn} /> */}
  //       <TableToolbarButton
  //         tooltip={{ content: 'Remove column' } as TippyProps}
  //         icon={<BorderRight />}
  //         transform={deleteColumn}
  //       />
  //     </>
  //   );
};
