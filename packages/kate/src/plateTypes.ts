import { AutoformatRule } from '@udecode/plate-autoformat';
import { ELEMENT_BLOCKQUOTE } from '@udecode/plate-block-quote';
import {
  ELEMENT_CODE_BLOCK,
  ELEMENT_CODE_LINE,
} from '@udecode/plate-code-block';
import {
  createPlateEditor,
  CreatePlateEditorOptions,
  createPluginFactory,
  createPlugins,
  createTEditor,
  Decorate,
  DecorateEntry,
  DOMHandler,
  EDescendant,
  EElement,
  EElementEntry,
  EElementOrText,
  EMarks,
  ENode,
  ENodeEntry,
  EText,
  ETextEntry,
  getPlateActions,
  getPlateEditorRef,
  getPlateSelectors,
  getTEditor,
  InjectComponent,
  InjectProps,
  KeyboardHandler,
  NoInfer,
  OnChange,
  OverrideByKey,
  PlateEditor,
  PlatePlugin,
  PlatePluginComponent,
  PlatePluginInsertData,
  PlatePluginProps,
  PlateProps,
  PluginOptions,
  SerializeHtml,
  TElement,
  TNodeEntry,
  TReactEditor,
  TText,
  useEditorRef,
  useEditorState,
  usePlateEditorRef,
  usePlateEditorState,
  usePlateSelectors,
  WithOverride,
} from '@udecode/plate-core';
import { ELEMENT_H1, ELEMENT_H2, ELEMENT_H3 } from '@udecode/plate-heading';
import { ELEMENT_HR } from '@udecode/plate-horizontal-rule';
import { ELEMENT_IMAGE, TImageElement } from '@udecode/plate-image';
import { ELEMENT_LINK, TLinkElement } from '@udecode/plate-link';
import {
  ELEMENT_LI,
  ELEMENT_OL,
  ELEMENT_TODO_LI,
  ELEMENT_UL,
  TTodoListItemElement,
} from '@udecode/plate-list';
import {
  ELEMENT_MEDIA_EMBED,
  TMediaEmbedElement,
} from '@udecode/plate-media-embed';
import {
  ELEMENT_MENTION,
  ELEMENT_MENTION_INPUT,
  TMentionElement,
  TMentionInputElement,
} from '@udecode/plate-mention';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import {
  ELEMENT_TABLE,
  ELEMENT_TD,
  ELEMENT_TR,
  TTableElement,
} from '@udecode/plate-table';
import { CSSProperties } from 'styled-components';

/**
 * Text
 */

export type EmptyText = {
  text: '';
};

export type PlainText = {
  text: string;
};

export interface RichText extends TText {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  kbd?: boolean;
  subscript?: boolean;
  backgroundColor?: CSSProperties['backgroundColor'];
  fontFamily?: CSSProperties['fontFamily'];
  color?: CSSProperties['color'];
  fontSize?: CSSProperties['fontSize'];
  fontWeight?: CSSProperties['fontWeight'];
}

/**
 * Inline Elements
 */

export interface KateLinkElement extends TLinkElement {
  type: typeof ELEMENT_LINK;
  children: RichText[];
}

export interface KateMentionInputElement extends TMentionInputElement {
  type: typeof ELEMENT_MENTION_INPUT;
  children: [PlainText];
}

export interface KateMentionElement extends TMentionElement {
  type: typeof ELEMENT_MENTION;
  children: [EmptyText];
}

export type KateInlineElement =
  | KateLinkElement
  | KateMentionElement
  | KateMentionInputElement;
export type KateInlineDescendant = KateInlineElement | RichText;
export type KateInlineChildren = KateInlineDescendant[];

/**
 * Block props
 */

export interface KateIndentProps {
  indent?: number;
}

export interface KateIndentListProps extends KateIndentProps {
  listStart?: number;
  listStyleType?: string;
}

export interface KateLineHeightProps {
  lineHeight?: CSSProperties['lineHeight'];
}

export interface KateAlignProps {
  textAlign?: CSSProperties['textAlign'];
}

export interface KateBlockElement
  extends TElement,
    KateIndentListProps,
    KateLineHeightProps {
  id?: string;
}

/**
 * Blocks
 */

export interface KateParagraphElement extends KateBlockElement {
  type: typeof ELEMENT_PARAGRAPH;
  children: KateInlineChildren;
}

export interface KateH1Element extends KateBlockElement {
  type: typeof ELEMENT_H1;
  children: KateInlineChildren;
}

export interface KateH2Element extends KateBlockElement {
  type: typeof ELEMENT_H2;
  children: KateInlineChildren;
}

export interface KateH3Element extends KateBlockElement {
  type: typeof ELEMENT_H3;
  children: KateInlineChildren;
}

export interface KateBlockquoteElement extends KateBlockElement {
  type: typeof ELEMENT_BLOCKQUOTE;
  children: KateInlineChildren;
}

export interface KateCodeBlockElement extends KateBlockElement {
  type: typeof ELEMENT_CODE_BLOCK;
  children: KateCodeLineElement[];
}

export interface KateCodeLineElement extends TElement {
  type: typeof ELEMENT_CODE_LINE;
  children: PlainText[];
}

export interface KateTableElement extends TTableElement, KateBlockElement {
  type: typeof ELEMENT_TABLE;
  children: KateTableRowElement[];
}

export interface KateTableRowElement extends TElement {
  type: typeof ELEMENT_TR;
  children: KateTableCellElement[];
}

export interface KateTableCellElement extends TElement {
  type: typeof ELEMENT_TD;
  children: KateNestableBlock[];
}

export interface KateBulletedListElement extends TElement, KateBlockElement {
  type: typeof ELEMENT_UL;
  children: KateListItemElement[];
}

export interface KateNumberedListElement extends TElement, KateBlockElement {
  type: typeof ELEMENT_OL;
  children: KateListItemElement[];
}

export interface KateListItemElement extends TElement, KateBlockElement {
  type: typeof ELEMENT_LI;
  children: KateInlineChildren;
}

export interface KateTodoListElement
  extends TTodoListItemElement,
    KateBlockElement {
  type: typeof ELEMENT_TODO_LI;
  children: KateInlineChildren;
}

export interface KateImageElement extends TImageElement, KateBlockElement {
  type: typeof ELEMENT_IMAGE;
  children: [EmptyText];
}

export interface KateMediaEmbedElement
  extends TMediaEmbedElement,
    KateBlockElement {
  type: typeof ELEMENT_MEDIA_EMBED;
  children: [EmptyText];
}

export interface KateHrElement extends KateBlockElement {
  type: typeof ELEMENT_HR;
  children: [EmptyText];
}

export type KateNestableBlock = KateParagraphElement;

export type KateBlock = Exclude<KateElement, KateInlineElement>;
export type KateBlockEntry = TNodeEntry<KateBlock>;

export type KateRootBlock =
  | KateParagraphElement
  | KateH1Element
  | KateH2Element
  | KateH3Element
  | KateBlockquoteElement
  | KateCodeBlockElement
  | KateTableElement
  | KateBulletedListElement
  | KateNumberedListElement
  | KateTodoListElement
  | KateImageElement
  | KateMediaEmbedElement
  | KateHrElement;

export type KateValue = KateRootBlock[];

/**
 * Editor types
 */

export type KateEditor = PlateEditor<KateValue> & { isDragging?: boolean };
export type KateReactEditor = TReactEditor<KateValue>;
export type KateNode = ENode<KateValue>;
export type KateNodeEntry = ENodeEntry<KateValue>;
export type KateElement = EElement<KateValue>;
export type KateElementEntry = EElementEntry<KateValue>;
export type KateText = EText<KateValue>;
export type KateTextEntry = ETextEntry<KateValue>;
export type KateElementOrText = EElementOrText<KateValue>;
export type KateDescendant = EDescendant<KateValue>;
export type KateMarks = EMarks<KateValue>;
export type KateMark = keyof KateMarks;

/**
 * Plate types
 */

export type KateDecorate<P = PluginOptions> = Decorate<
  P,
  KateValue,
  KateEditor
>;
export type KateDecorateEntry = DecorateEntry<KateValue>;
export type KateDOMHandler<P = PluginOptions> = DOMHandler<
  P,
  KateValue,
  KateEditor
>;
export type KateInjectComponent = InjectComponent<KateValue>;
export type KateInjectProps = InjectProps<KateValue>;
export type KateKeyboardHandler<P = PluginOptions> = KeyboardHandler<
  P,
  KateValue,
  KateEditor
>;
export type KateOnChange<P = PluginOptions> = OnChange<
  P,
  KateValue,
  KateEditor
>;
export type KateOverrideByKey = OverrideByKey<KateValue, KateEditor>;
export type KatePlatePlugin<P = PluginOptions> = PlatePlugin<
  P,
  KateValue,
  KateEditor
>;
export type KatePlatePluginInsertData = PlatePluginInsertData<KateValue>;
export type KatePlatePluginProps = PlatePluginProps<KateValue>;
export type KatePlateProps = PlateProps<KateValue, KateEditor>;
export type KateSerializeHtml = SerializeHtml<KateValue>;
export type KateWithOverride<P = PluginOptions> = WithOverride<
  P,
  KateValue,
  KateEditor
>;

/**
 * Plate store, Slate context
 */

export const getMyEditor = (editor: KateEditor) =>
  getTEditor<KateValue, KateEditor>(editor);
export const useMyEditorRef = () => useEditorRef<KateValue, KateEditor>();
export const useMyEditorState = () => useEditorState<KateValue, KateEditor>();
export const useMyPlateEditorRef = (id?: string) =>
  usePlateEditorRef<KateValue, KateEditor>(id);
export const getMyPlateEditorRef = (id?: string) =>
  getPlateEditorRef<KateValue, KateEditor>(id);
export const useMyPlateEditorState = (id?: string) =>
  usePlateEditorState<KateValue, KateEditor>(id);
export const useMyPlateSelectors = (id?: string) =>
  usePlateSelectors<KateValue, KateEditor>(id);
export const getMyPlateSelectors = (id?: string) =>
  getPlateSelectors<KateValue, KateEditor>(id);
export const getMyPlateActions = (id?: string) =>
  getPlateActions<KateValue, KateEditor>(id);

/**
 * Utils
 */
export const createMyEditor = () => createTEditor() as KateEditor;
export const createMyPlateEditor = (
  options: CreatePlateEditorOptions<KateValue, KateEditor> = {}
) => createPlateEditor<KateValue, KateEditor>(options);
export const createMyPluginFactory = <P = PluginOptions>(
  defaultPlugin: PlatePlugin<NoInfer<P>, KateValue, KateEditor>
) => createPluginFactory(defaultPlugin);
export const createMyPlugins = (
  plugins: KatePlatePlugin[],
  options?: {
    components?: Record<string, PlatePluginComponent>;
    overrideByKey?: KateOverrideByKey;
  }
) => createPlugins<KateValue, KateEditor>(plugins, options);

export type KateAutoformatRule = AutoformatRule<KateValue, KateEditor>;
