import React from 'react';
import { useEditorRef } from '@udecode/plate-core';
import { css } from 'styled-components';
import tw from 'twin.macro';
import { pageShortcutSettingsStoreSelectors } from '../stores/pageShortcutSettingStore';
import { getSelectedPageShortcutNode } from '../util/getSelectedPageShortcutNode';
import { removeSelectedPageShortcutNode } from '../util/removeSelectedPageShortcutNode';
import { replacePageShortcut } from '../util/replacePageShortcut';
import { LaunchIcon } from './icons/LaunchIcon';
import { LinkOffIcon } from './icons/LinkOffIcon';
import { PageShortcutEditButton } from './PageShortcutEditButton';
import { FloatingShortcutMenuRoot } from './FloatingPageShortcutMenuRoot';
import { TPageShortcutElement } from '../types';

const floatingMenuRootCss = css`
  ${tw`bg-white !z-20`};

  border-radius: 4px;
  box-shadow: rgb(15 15 15 / 5%) 0 0 0 1px, rgb(15 15 15 / 10%) 0 3px 6px,
    rgb(15 15 15 / 20%) 0 9px 24px;
`;

const inputCss = css`
  border-radius: 3px;
  outline: none;
  border: 1px solid gray;
  padding: 3px;
`;

export const floatingMenuButtonCss = [
  tw`relative inline-flex justify-center items-center text-center max-w-full p-0`,
  tw`border-0 font-medium cursor-pointer`,
  tw`bg-white hover:bg-gray-100 active:bg-gray-200`,
  tw`px-2.5 py-1`,
  css`
    font-family: inherit;
    font-size: 14px;
    border-radius: 3px;
    min-width: 0;
    margin: 0;

    color: inherit;

    :active {
      color: inherit;
    }

    :visited {
      color: inherit;
    }
  `,
];

const VerticalDivider = () => <div tw="w-px h-5 bg-gray-200 mx-2" />;

interface IProps {
  nodeData: TPageShortcutElement | null;
}

const timeout = 500;
const interval = 10;

export const PageShortcutFloatingMenu = (props: IProps) => {
  const editor = useEditorRef();
  const inputRef = React.useRef<HTMLInputElement>(null);

  let intervalTimer: any;
  let counter: number;

  React.useEffect(() => {
    if (intervalTimer) {
      clearInterval(intervalTimer);
    }

    counter = 0;

    intervalTimer = setInterval(() => {
      if (counter > timeout) {
        clearInterval(intervalTimer);
      }

      if (inputRef.current?.offsetParent) {
        clearInterval(intervalTimer);
        inputRef.current.focus();
        inputRef.current.value = props.nodeData?.pageData?.title ?? "";
        inputRef.current.select();
      }

      counter += interval;
    }, interval);
  }, [props.nodeData?.pageData?.uid ?? "", inputRef.current]);

  console.log("PageShortcutFloatingMenu", { props });

  const handleUnlinkClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    removeSelectedPageShortcutNode(editor);
  };

  const handleClickEdit: React.MouseEventHandler<HTMLButtonElement> = async () => {
    const node = getSelectedPageShortcutNode(editor);
    if (!node) return;

    try {
      const newData = await pageShortcutSettingsStoreSelectors
        .settings()
        ?.updateData(node[0].pageData as any);

      replacePageShortcut(editor, {
        ...newData,
        uid: node[0].pageData?.uid
      });
    } catch (ex) {
      console.error('Error on edit', ex);
    }
  };

  const handleOpenClick = () => {
    const node = getSelectedPageShortcutNode(editor);
    if (!node) return;

    pageShortcutSettingsStoreSelectors
      .settings()
      ?.open(node[0].pageData as any);
  };

  const handleTextBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const node = getSelectedPageShortcutNode(editor);
    if (!node) return;

    if (!(e.target as HTMLInputElement).value) {
      removeSelectedPageShortcutNode(editor);
      return;
    }
  };
  const handleTextKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key?.toLowerCase() === "enter") {
      e.preventDefault();
    }
  };
  const handleTextKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const node = getSelectedPageShortcutNode(editor);
    if (!node) return;

    if (e.key?.toLowerCase() === "enter") {
      e.preventDefault();
      return;
    }

    const newValue = (e.target as HTMLInputElement).value;
    const newData = {
      ...node[0].pageData,
      title: newValue
    };
    replacePageShortcut(editor, newData);
  };

  return (
    <FloatingShortcutMenuRoot css={floatingMenuRootCss}>
      <div tw="px-2 py-1 flex flex-col gap-x-4">
        <div tw="w-auto">
          <input type="text" placeholder={"Title"} onKeyDown={e => handleTextKeyDown(e)} onKeyUp={e => handleTextKeyUp(e)} onBlur={e => handleTextBlur(e)} css={inputCss} defaultValue={props.nodeData?.pageData?.title ?? ""} ref={inputRef} />
        </div>
        <div tw="w-auto flex flex-row items-center">
          <PageShortcutEditButton
            onClick={handleClickEdit}
            css={floatingMenuButtonCss}
          >
            Edit page shortcut
          </PageShortcutEditButton>
          <VerticalDivider />
          <PageShortcutEditButton
            onClick={handleOpenClick}
            css={floatingMenuButtonCss}
          >
            <LaunchIcon width={18} />
          </PageShortcutEditButton>
          <VerticalDivider />
          <PageShortcutEditButton
            onClick={handleUnlinkClick}
            css={floatingMenuButtonCss}
          >
            <LinkOffIcon width={18} />
          </PageShortcutEditButton>
        </div>
      </div>
    </FloatingShortcutMenuRoot>
  );
};
