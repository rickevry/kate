import React, { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';

import {
    ColorPickerToolbarDropdown,
}
from "@udecode/plate-ui-font";

import {
    MARK_BG_COLOR,
    MARK_COLOR,
}
from "@udecode/plate-font";

import {
    indent,
    outdent,
}
from "@udecode/plate-indent";



import {
    ListToolbarButton,
}
from "@udecode/plate-ui-list";

import {
    LinkToolbarButton,
}
from "@udecode/plate-ui-link";


import {
    TableToolbarButton,
}
from "@udecode/plate-ui-table";

import {
    CodeBlockToolbarButton,
}
from "@udecode/plate-ui-code-block";

import {
    MediaEmbedToolbarButton,
}
from "@udecode/plate-ui-media-embed";

import {
    ImageToolbarButton,
}
from "@udecode/plate-ui-image";

import {
    ELEMENT_BLOCKQUOTE,
}
from "@udecode/plate-block-quote";

import {
    AlignToolbarButton,
}
from "@udecode/plate-ui-alignment";

import {
    ELEMENT_CODE_BLOCK,
}
from "@udecode/plate-code-block";

import {
    deleteColumn,
    insertTable,
    deleteRow, deleteTable,
}
from "@udecode/plate-table";

import {
    ELEMENT_OL,
    ELEMENT_UL,
}
from "@udecode/plate-list";

import {
    MARK_ITALIC,
    MARK_BOLD,
    MARK_CODE,
    MARK_STRIKETHROUGH,
    MARK_SUBSCRIPT,
    MARK_SUPERSCRIPT,
    MARK_UNDERLINE,
    }
        from "@udecode/plate-basic-marks";

import {
    ELEMENT_H1,
    ELEMENT_H2,
    ELEMENT_H3,
    ELEMENT_H4,
    ELEMENT_H5,
    ELEMENT_H6,
}
from "@udecode/plate-heading";

import {
    MarkToolbarButton,
    BlockToolbarButton,
    ToolbarButton,
}
from "@udecode/plate-ui-toolbar";


import {
    getPluginType,
}
from "@udecode/plate-core";

import { useMyPlateEditorRef } from "./plateTypes";

import { LooksOne } from '@styled-icons/material/LooksOne';
import { Check, Image, Code, FontDownload, FormatAlignCenter, FormatAlignJustify, FormatAlignLeft, FormatAlignRight, FormatBold, FormatColorText, FormatIndentDecrease, FormatIndentIncrease, FormatItalic, FormatStrikethrough, FormatUnderlined, LineWeight, Link, Subscript, Superscript, OndemandVideo, BorderAll, BorderBottom, BorderClear, BorderLeft, BorderRight, BorderTop, LooksTwo, Looks3, Looks4, Looks5, Looks6, FormatListBulleted, FormatListNumbered, FormatQuote } from "@styled-icons/material";
import { TippyProps } from '@tippyjs/react';

export const ToolbarButtons = () => {
    const editor = useMyPlateEditorRef()!;
    const colorTooltip: TippyProps = { content: 'Text color' };
    const bgTooltip: TippyProps = { content: 'Text color' };

    return (
        <>
            <BlockToolbarButton
                type={getPluginType(editor, ELEMENT_H1)}
                tooltip={{ content: "Header 1" } as TippyProps}
                icon={<LooksOne />}
            />
            <BlockToolbarButton
                type={getPluginType(editor, ELEMENT_H2)}
                tooltip={{ content: "Header 2" } as TippyProps}
                icon={<LooksTwo />}
            />
            <BlockToolbarButton
                type={getPluginType(editor, ELEMENT_H3)}
                tooltip={{ content: "Header 3" } as TippyProps}
                icon={<Looks3 />}
            />
            <BlockToolbarButton
                type={getPluginType(editor, ELEMENT_H4)}
                tooltip={{ content: "Header 4" } as TippyProps}
                icon={<Looks4 />}
            />
            <BlockToolbarButton
                type={getPluginType(editor, ELEMENT_H5)}
                tooltip={{ content: "Header 5" } as TippyProps}

                icon={<Looks5 />}
            />
            <BlockToolbarButton
                type={getPluginType(editor, ELEMENT_H6)}
                tooltip={{ content: "Header 6" } as TippyProps}

                icon={<Looks6 />}
            />
            <BlockToolbarButton
                type={getPluginType(editor, ELEMENT_BLOCKQUOTE)}
                tooltip={{ content: "Blockquote" } as TippyProps}
                icon={<FormatQuote />}
            />
            <CodeBlockToolbarButton
                type={getPluginType(editor, ELEMENT_CODE_BLOCK)}
                tooltip={{ content: "Code block" } as TippyProps}
                icon={<Code />}
            />
            <ListToolbarButton
                type={getPluginType(editor, ELEMENT_UL)}
                icon={<FormatListBulleted />}
            />
            <ListToolbarButton
                type={getPluginType(editor, ELEMENT_OL)}
                icon={<FormatListNumbered />}
            />
            <ToolbarButton
                onMouseDown={(e) => {
                    if (!editor) return;

                    outdent(editor);
                    e.preventDefault();
                }}
                icon={<FormatIndentDecrease />}
            />
            <ToolbarButton
                onMouseDown={(e) => {
                    if (!editor) return;

                    indent(editor);
                    e.preventDefault();
                }}
                icon={<FormatIndentIncrease />}
            />
            <MarkToolbarButton
                type={getPluginType(editor, MARK_BOLD)}
                icon={<FormatBold />}
            />
            <MarkToolbarButton
                type={getPluginType(editor, MARK_ITALIC)}
                icon={<FormatItalic />}
            />
            <MarkToolbarButton
                type={getPluginType(editor, MARK_UNDERLINE)}
                icon={<FormatUnderlined />}
            />
            <MarkToolbarButton
                type={getPluginType(editor, MARK_STRIKETHROUGH)}
                icon={<FormatStrikethrough />}
            />
            <MarkToolbarButton
                type={getPluginType(editor, MARK_CODE)}
                icon={<Code />}
            />
            <MarkToolbarButton
                type={getPluginType(editor, MARK_SUPERSCRIPT)}
                clear={getPluginType(editor, MARK_SUBSCRIPT)}
                icon={<Superscript />}
            />
            <MarkToolbarButton
                type={getPluginType(editor, MARK_SUBSCRIPT)}
                clear={getPluginType(editor, MARK_SUPERSCRIPT)}
                icon={<Subscript />}
            />
            <ColorPickerToolbarDropdown
                pluginKey={MARK_COLOR}
                icon={<FormatColorText />}
                selectedIcon={<Check />}
                tooltip={colorTooltip}
            />
            <ColorPickerToolbarDropdown
                pluginKey={MARK_BG_COLOR}
                icon={<FontDownload />}
                selectedIcon={<Check />}
                tooltip={bgTooltip}
            />
            {/* Does not work correctly, even in example */}
            {/* <LineHeightToolbarDropdown icon={<LineWeight />} /> */}
            <AlignToolbarButton value="left" icon={<FormatAlignLeft />} />
            <AlignToolbarButton value="center" icon={<FormatAlignCenter />} />
            <AlignToolbarButton value="right" icon={<FormatAlignRight />} />
            <AlignToolbarButton value="justify" icon={<FormatAlignJustify />} />
            <LinkToolbarButton icon={<Link />} />
            <ImageToolbarButton icon={<Image />} />
            <MediaEmbedToolbarButton icon={<OndemandVideo />} />
            <TableToolbarButton tooltip={{ content: "Insert table" } as TippyProps} icon={<BorderAll />} transform={insertTable} />
            <TableToolbarButton tooltip={{ content: "Remove table" } as TippyProps} icon={<BorderClear />} transform={deleteTable} />
            {/* <TableToolbarButton  tooltip={{ content: "Add row" } as TippyProps} icon={<BorderBottom />} transform={addRow} /> */}
            <TableToolbarButton tooltip={{ content: "Remove row" } as TippyProps} icon={<BorderTop />} transform={deleteRow} />
            {/* <TableToolbarButton  tooltip={{ content: "Add column" } as TippyProps} icon={<BorderLeft />} transform={addColumn} /> */}
            <TableToolbarButton tooltip={{ content: "Remove column" } as TippyProps} icon={<BorderRight />} transform={deleteColumn} />
        </>
    )
}