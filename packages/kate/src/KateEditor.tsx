/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
// import './style.css';
import React, { CSSProperties, useMemo, useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createAutoformatPlugin } from '@udecode/plate-autoformat';
import { ELEMENT_CODE_BLOCK } from '@udecode/plate-code-block';
import { Plate, TEditableProps } from '@udecode/plate-core';
import { createMentionPlugin } from '@udecode/plate-mention';
import { createParagraphPlugin } from '@udecode/plate-paragraph';
import { createDeserializeCsvPlugin } from '@udecode/plate-serializer-csv';
import { createDeserializeDocxPlugin } from '@udecode/plate-serializer-docx';
import { createDeserializeMdPlugin } from '@udecode/plate-serializer-md';
import { StyledElement } from '@udecode/plate-styled-components';
import { createPlateUI, Toolbar } from '@udecode/plate-ui';
import { IKateConfigItem } from './configuration/types';
import { CursorOverlayContainer } from './plugins/CursorOverlayContainer';
import { MarkBalloonToolbar } from './plugins/MarkBallonToolbar';
import { withStyledDraggables } from './plugins/withStyledDraggables';
import {
  createMyPlugins,
  KateEditor as IKateEditor,
  KateValue,
} from './plateTypes';
import { ToolbarButtons } from './ToolbarButtons';

const createEditableProps = (readOnly: boolean, placeholder: string) =>
({
  placeholder: placeholder ?? 'Type here ...',
  spellCheck: false,
  readOnly,
} as TEditableProps<KateValue>);

const components = createPlateUI({
  [ELEMENT_CODE_BLOCK]: StyledElement,
});

const styles: Record<string, CSSProperties> = {
  container: { position: 'relative' },
};

type KateEditorProps = {
  value: any;
  onChange: any;
  onClick: any;
  readOnly: boolean;
  placeholder: string;
  config: IKateConfigItem[];
};

const KateEditor = (props: KateEditorProps) => {
  const { plugins, toolbarButtonRenderFuncs } = useMemo(() => {
    return {
      plugins: createMyPlugins(
        [
          createParagraphPlugin(),
          createAutoformatPlugin(),
          createDeserializeMdPlugin(),
          createDeserializeCsvPlugin(),
          createDeserializeDocxPlugin(),
          ...props.config.flatMap((x) => x.plugins),
        ],
        {
          components: withStyledDraggables(
            components, 
            props.config.flatMap((x) => x.withUi).filter(x => !!x)
          ),
        }
      ),
      toolbarButtonRenderFuncs: props.config.flatMap((x) => x.renderButtons),
    };
  }, [props.config]);

  // const plugins = useMemo(
  //   () =>
  //     createMyPlugins(
  //       [
  //         // createParagraphPlugin(),
  //         // createBlockquotePlugin(),
  //         // createTodoListPlugin(),
  //         // createImagePlugin(),
  //         // createHorizontalRulePlugin(),
  //         // createLinkPlugin(),
  //         // createListPlugin(),
  //         // createTablePlugin(),
  //         // createMediaEmbedPlugin(),
  //         // createCodeBlockPlugin(),
  //         // createAlignPlugin(alignPlugin),
  //         // createBoldPlugin(),
  //         // createCodePlugin(),
  //         // createItalicPlugin(),
  //         // createHighlightPlugin(),
  //         // createUnderlinePlugin(),
  //         // createStrikethroughPlugin(),
  //         // createSubscriptPlugin(),
  //         // createSuperscriptPlugin(),
  //         // createFontColorPlugin(),
  //         // createFontBackgroundColorPlugin(),
  //         // createFontSizePlugin(),
  //         // createKbdPlugin(),
  //         // createNodeIdPlugin(),
  //         // createDndPlugin(),
  //         // dragOverCursorPlugin,
  //         // createIndentPlugin(indentPlugin),
  // late.createAutoformatPlugin<
  //   AutoformatPlugin<MyValue, MyEditor>,
  //   MyValue,
  //   MyEditor
  // >(autoformatPlugin),
  //         // createResetNodePlugin(resetBlockTypePlugin),
  //         // createSoftBreakPlugin(softBreakPlugin),
  //         // createExitBreakPlugin(exitBreakPlugin),
  //         // // createNormalizeTypesPlugin(forcedLayoutPlugin),
  //         // createTrailingBlockPlugin(trailingBlockPlugin),
  //         // createSelectOnBackspacePlugin(selectOnBackspacePlugin),
  //         // createComboboxPlugin(),
  //         // // plate.createMentionPlugin(),

  //         // createMentionPlugin({
  //         //   key: '{',
  //         //   component: (props: any) => {
  //         //     console.log('mention', props);
  //         //     return (
  //         //       <span
  //         //         style={{
  //         //           backgroundColor: '#000',
  //         //           color: '#fff',
  //         //           padding: '0.25rem',
  //         //         }}
  //         //       >
  //         //         {props.element.value}
  //         //       </span>
  //         //     );
  //         //   },
  //         //   options: {
  //         //     trigger: '{',

  //         //     inputCreation: { key: 'creationId', value: 'main' },
  //         //   },
  //         // }),
  //         // createJuicePlugin() as MyPlatePlugin,
  //       ],
  //       {
  //         components: withStyledDraggables(components),
  //       }
  //     ),
  //   []
  // );
  const containerRef = useRef(null);

  const [editableProps, setEditableProps] = useState<any>(
    createEditableProps(props.readOnly, props.placeholder)
  );

  console.log('editableProps', editableProps);
  if (editableProps.readOnly === true && props.readOnly === false) {
    console.log('change1', props.readOnly);
    setEditableProps(createEditableProps(props.readOnly, props.placeholder));
  } else if (editableProps.readOnly === false && props.readOnly === true) {
    console.log('change2', props.readOnly);
    setEditableProps(createEditableProps(props.readOnly, props.placeholder));
  }

  const [value, setValue] = useState<any>(props.value);

  const handleChange = (nv: KateValue) => {
    setValue(nv);
    if (props.onChange) {
      props.onChange(nv);
    }
  };

  return (
    <div className="App">
      <div
        className={props.readOnly ? 'KateEditorReadOnly' : 'KateEditor'}
        onClick={() => props.onClick && props.onClick(value)}
      >
        <DndProvider backend={HTML5Backend}>
          {props.readOnly ? null : (
            <Toolbar>
              <ToolbarButtons
                toolbarButtonRenderFuncs={toolbarButtonRenderFuncs}
              />
            </Toolbar>
          )}
          <div ref={containerRef} style={styles.container}>
            <Plate<KateValue, IKateEditor>
              value={value}
              onChange={handleChange}
              plugins={plugins}
              editableProps={editableProps}
            >
              <MarkBalloonToolbar />
              <CursorOverlayContainer containerRef={containerRef} />
            </Plate>
          </div>
          </DndProvider>
      </div>
    </div>
  );
};

export { KateEditor };
