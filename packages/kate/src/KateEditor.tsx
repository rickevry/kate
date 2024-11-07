/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
// import './style.css';
import React, {
  CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createAutoformatPlugin } from '@udecode/plate-autoformat';
import { ELEMENT_CODE_BLOCK } from '@udecode/plate-code-block';
import { Plate, TEditableProps } from '@udecode/plate-core';
import { createParagraphPlugin } from '@udecode/plate-paragraph';
import { createDeserializeCsvPlugin } from '@udecode/plate-serializer-csv';
import { createDeserializeDocxPlugin } from '@udecode/plate-serializer-docx';
import { createDeserializeMdPlugin } from '@udecode/plate-serializer-md';
import { StyledElement } from '@udecode/plate-styled-components';
import { createPlateUI, Toolbar } from '@udecode/plate-ui';
import { version } from '../package.json';
import { IKateConfigItem } from './configuration/types';
import { createNodeIdPlugin } from './plugins/CreateNodeId';
import { CursorOverlayContainer } from './plugins/CursorOverlayContainer';
import {
  createMyPlugins,
  KateEditor as IKateEditor,
  KateValue,
} from './plateTypes';
import { ToolbarButtons } from './ToolbarButtons';

console.log(`KateEditor version ${version}`);

const createEditableProps = (readOnly: boolean, placeholder: string) =>
({
  placeholder: placeholder ?? 'Type here ...',
  spellCheck: false,
  readOnly,
} as TEditableProps<KateValue>);

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
  id?: string;
  customStyles?: Record<string, React.CSSProperties>;
};
export function generateUUID() {
  // Public Domain/MIT
  let d = new Date().getTime(); // Timestamp
  let d2 =
    (typeof performance !== 'undefined' &&
      performance.now &&
      performance.now() * 1000) ||
    0; // Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = Math.random() * 16; // random number between 0 and 16
    if (d > 0) {
      // Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      // Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

const KateEditor = (props: KateEditorProps) => {
  const [id] = useState(props.id ?? generateUUID());
  console.log('kateeditor id', id);
  const { plugins, toolbarButtonRenderFuncs } = useMemo(() => {
    const components = createPlateUI({
      [ELEMENT_CODE_BLOCK]: StyledElement,
      ...props.config.reduce(
        (prev, curr) => ({ ...prev, ...(curr.overrideComponents || {}) }),
        {}
      ),
    });
    console.log('props.config.', props.config);
    return {
      plugins: createMyPlugins(
        [
          createParagraphPlugin(),
          createAutoformatPlugin(),
          createDeserializeMdPlugin(),
          createDeserializeCsvPlugin(),
          createDeserializeDocxPlugin(),

          createNodeIdPlugin(),
          ...props.config.flatMap((x) => x.plugins),
        ],
        {
          components: { ...components },
        }
      ),
      toolbarButtonRenderFuncs: props.config.flatMap((x) => x.renderButtons),
    };
  }, [props.config]);

  const containerRef = useRef<HTMLDivElement>(null);

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

  const [value, setValue] = useState<any>(props.value ?? [
    {
      type: "p",
      children: [
        {
          text: ""
        }
      ]
    }
  ]);

  const handleChange = (nv: KateValue) => {
    setValue(nv);
    if (props.onChange) {
      props.onChange(nv);
    }
  };

  const checkForEditorNode = () => {
    const editorDiv = containerRef.current?.querySelector(
      'div[data-slate-editor="true"]'
    ) as HTMLDivElement;

    if (editorDiv) {
      console.log('checkForEditorNode found ', { editorDiv });

      editorDiv.style.minHeight = 'inherit';

      if (props.customStyles?.editor) {
        Object.keys(props.customStyles.editor).forEach((key) => {
          editorDiv.style[key] = props.customStyles?.editor[key];
        });
      }

      return true;
    }

    setTimeout(() => checkForEditorNode(), 10);
  };

  useEffect(() => {
    checkForEditorNode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <div
            ref={containerRef}
            style={{
              ...styles.container,
              ...(props.customStyles?.container ?? {}),
            }}
          >
            <Plate<KateValue, IKateEditor>
              id={id}
              value={value}
              onChange={handleChange}
              plugins={plugins}
              editableProps={editableProps}
            >
              <CursorOverlayContainer containerRef={containerRef} />
            </Plate>
          </div>
        </DndProvider>
      </div>
    </div>
  );
};

export { KateEditor };
