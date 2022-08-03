import React, { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// import './Any4mRichText.css';
// import 'tippy.js/dist/tippy.css'

import { createTodoListPlugin } from '@udecode/plate-list';
import { createHeadingPlugin } from '@udecode/plate-heading';
import { createImagePlugin } from '@udecode/plate-image';
import { createHorizontalRulePlugin } from '@udecode/plate-horizontal-rule';
import { createLinkPlugin } from '@udecode/plate-link';
import { createListPlugin } from '@udecode/plate-list';
import { createTablePlugin } from '@udecode/plate-table';
import { createMediaEmbedPlugin } from '@udecode/plate-media-embed';
import { createCodeBlockPlugin } from '@udecode/plate-code-block';
import { createAlignPlugin } from '@udecode/plate-alignment';
import { createSuperscriptPlugin, createSubscriptPlugin, createStrikethroughPlugin, createUnderlinePlugin, createBoldPlugin, createCodePlugin, createItalicPlugin } from '@udecode/plate-basic-marks';
import { createHighlightPlugin } from '@udecode/plate-highlight';
import { createFontSizePlugin, createFontColorPlugin, createFontBackgroundColorPlugin } from '@udecode/plate-font';
import { createKbdPlugin } from '@udecode/plate-kbd';
import { createNodeIdPlugin } from '@udecode/plate-node-id';
import { createDndPlugin } from '@udecode/plate-ui-dnd';
import { createIndentPlugin } from '@udecode/plate-indent';
import { createResetNodePlugin } from '@udecode/plate-reset-node';
import { createExitBreakPlugin, createSoftBreakPlugin } from '@udecode/plate-break';
import { createNormalizeTypesPlugin } from '@udecode/plate-normalizers';
import { createTrailingBlockPlugin } from '@udecode/plate-trailing-block';
import { createSelectOnBackspacePlugin } from '@udecode/plate-select';
import { createComboboxPlugin } from '@udecode/plate-combobox';
import { createDeserializeMdPlugin } from '@udecode/plate-serializer-md';
import { createDeserializeCsvPlugin } from '@udecode/plate-serializer-csv';
import { createDeserializeDocxPlugin } from '@udecode/plate-serializer-docx';
import { createMentionPlugin } from '@udecode/plate-mention';
import { createParagraphPlugin } from '@udecode/plate-paragraph';
import { createBlockquotePlugin } from '@udecode/plate-block-quote';
import { createJuicePlugin } from '@udecode/plate-juice';

import { StyledElement } from '@udecode/plate-styled-components';
import { Toolbar } from '@udecode/plate-ui-toolbar';
import { createPlateUI } from '@udecode/plate-ui';
import { MentionCombobox } from '@udecode/plate-ui';
import { ELEMENT_CODE_BLOCK } from '@udecode/plate-code-block';
import { Plate, TEditableProps } from '@udecode/plate-core';
// import { AutoformatPlugin } from '@udecode/plate-editor-autoformat';

import { createMyPlugins, MyEditor, MyPlatePlugin, MyValue } from './plateTypes';
import { indentPlugin } from './plugins/indentPlugin';
import { alignPlugin } from './plugins/alignPlugin';
import { resetBlockTypePlugin } from './plugins/resetBlockTypePlugin';
import { softBreakPlugin } from './plugins/softBreakPlugin';
import { exitBreakPlugin } from './plugins/exitBreakPlugin';
// import { forcedLayoutPlugin } from './plugins/forcedLayoutPlugin';
import { trailingBlockPlugin } from './plugins/trailingBlockPlugin';
import { selectOnBackspacePlugin } from './plugins/selectOnBackspacePlugin';
import { ToolbarButtons } from './ToolbarButtons';
import { MarkBalloonToolbar } from './plugins/MarkBallonToolbar';
import { withStyledDraggables } from './plugins/withStyledDraggables';
import { dragOverCursorPlugin } from './plugins/dragOverCursorPlugin';
import { CursorOverlayContainer } from './plugins/CursorOverlayContainer';

const editableProps: TEditableProps<MyValue> = {
    placeholder: 'Type...',
    spellCheck: false
};

let components = createPlateUI({
    [ELEMENT_CODE_BLOCK]: StyledElement,

});

const styles: Record<string, CSSProperties> = {
    container: { position: 'relative' },
};

const mentions = [
    { key: "0", text: "Ayla Sekura" },
    { key: "0", text: "Obi-wan Henobi" }
]

function KateEditor() {

    const [formKeys, setFormKeys] = useState<string[]>([]);

    useEffect(() => {
        (async () => {
            console.log("KateEditor started");
            // const keys = await getProps("81333cbf-cbd6-4904-8c89-dfcdf1679d02");
            // setFormKeys(keys);
            // debugger
        })();
    }, []);

    const plugins = useMemo(() => createMyPlugins([
        createParagraphPlugin(),
        createBlockquotePlugin(),
        createTodoListPlugin(),
        createHeadingPlugin(),
        createImagePlugin(),
        createHorizontalRulePlugin(),
        createLinkPlugin(),
        createListPlugin(),
        createTablePlugin(),
        createMediaEmbedPlugin(),
        createCodeBlockPlugin(),
        createAlignPlugin(alignPlugin),
        createBoldPlugin(),
        createCodePlugin(),
        createItalicPlugin(),
        createHighlightPlugin(),
        createUnderlinePlugin(),
        createStrikethroughPlugin(),
        createSubscriptPlugin(),
        createSuperscriptPlugin(),
        createFontColorPlugin(),
        createFontBackgroundColorPlugin(),
        createFontSizePlugin(),
        createKbdPlugin(),
        createNodeIdPlugin(),
        createDndPlugin(),
        dragOverCursorPlugin,
        createIndentPlugin(indentPlugin),
        //   plate.createAutoformatPlugin<
        //     AutoformatPlugin<MyValue, MyEditor>,
        //     MyValue,
        //     MyEditor
        //   >(autoformatPlugin),
        createResetNodePlugin(resetBlockTypePlugin),
        createSoftBreakPlugin(softBreakPlugin),
        createExitBreakPlugin(exitBreakPlugin),
        // createNormalizeTypesPlugin(forcedLayoutPlugin),
        createTrailingBlockPlugin(trailingBlockPlugin),
        createSelectOnBackspacePlugin(selectOnBackspacePlugin),
        createComboboxPlugin(),
        // plate.createMentionPlugin(),
        createDeserializeMdPlugin(),
        createDeserializeCsvPlugin(),
        createDeserializeDocxPlugin(),
        createMentionPlugin({
            key: '{',
            component: (props: any) => {
                console.log("mention", props);
                return (
                    <span style={{ backgroundColor: "#000", color: "#fff", padding: "0.25rem" }}>
                        {props.element.value}
                    </span>
                )
            },
            options: {
                trigger: '{',

                inputCreation: { key: 'creationId', value: 'main' },
            },
        }),
        createJuicePlugin() as MyPlatePlugin,
    ], {
        components: withStyledDraggables(components)
    }), []);
    const containerRef = useRef(null);

    const [value, setValue] = useState<any>();
    const [html, setHtml] = useState<any>();

    // if (formKeys.length == 0)
    //     return null;

    return (
        <div className="App">
            <div>
                <DndProvider backend={HTML5Backend}>
                    <Toolbar>
                        <ToolbarButtons />
                    </Toolbar>
                    <div ref={containerRef} style={styles.container}>
                        <Plate<MyValue, MyEditor> onChange={(value) => {
                            setValue(value);
                            // setHtml()
                        }} plugins={plugins} editableProps={editableProps}>

                            <MarkBalloonToolbar />
                            {/* pluginKey has to be the same as the key in plugin above */}
                            {/* <MentionCombobox
                                prefixClassNames='blah-blah' key={"{"} trigger={"{"} pluginKey={"{"} items={formKeys.map(x => ({
                                    key: x,
                                    text: x
                                }))} /> */}
                            <CursorOverlayContainer containerRef={containerRef} />
                        </Plate>
                    </div>
                </DndProvider>
            </div>
            {/* <div style={{ boxSizing: "border-box", width: "50%", float: "left", borderLeft: "1px solid #ccc" }}>
                <pre>
                    {JSON.stringify(value, null, 2)}
                </pre>
            </div> */}
        </div>
    );
}
export {
    KateEditor
} 
