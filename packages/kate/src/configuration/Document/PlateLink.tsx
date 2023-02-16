import React, { useEffect } from 'react';
import {
    FloatingLink,
    LaunchIcon,
    LinkIcon,
    LinkOffIcon,
    ShortTextIcon,
    // useFloatingLinkSelectors,
} from '@udecode/plate-link';
// import { createStore } from '@udecode/zustood';
import { plateButtonCss } from '@udecode/plate-ui-button';
import styled, { css } from 'styled-components';

const floatingLinkStore = (() => {
    let isOpen = false;

    return {
        get: {
            isOpen: () => isOpen
        },
        set: {
            show: () => {
                isOpen = true;
            }
        }
    }
})();

// const floatingLinkStore2 = createStore('floatingLink')({
//     open: false,
//     mouseDown: false,
//     updated: false,
//     url: '',
//     text: '',
//     mode: '',
//     isEditing: false
//   }).extendActions(set => ({
//     reset: () => {
//       set.url('');
//       set.text('');
//       set.mode('');
//       set.isEditing(false);
//     }
//   })).extendActions(set => ({
//     show: (mode: any) => {
//       set.mode(mode);
//       set.isEditing(false);
//       set.open(true);
//     },
//     hide: () => {
//       set.open(false);
//       set.reset();
//     }
//   }));
export const customFloatingLinkActions = floatingLinkStore.set;
export const customFloatingLinkSelectors = floatingLinkStore.get;

import tw from 'twin.macro';
import { useEditorRef } from '@udecode/plate-core';

const IconWrapper = styled.div`
  ${tw`flex items-center px-2 text-gray-400`};
`;

const InputWrapper = styled.div`
  ${tw`flex items-center py-1`};
`;

const inputCss = [
    tw`border-none bg-transparent h-8 flex-grow p-0`,
    tw`focus:outline-none`,
    css`
    line-height: 20px;
  `,
];

const VerticalDivider = () => <div tw="w-px h-5 bg-gray-200 mx-2" />;

const buttonCss = [...plateButtonCss, tw`px-1`, css`min-width: 0; margin: 0;`];

export const DocumentFloatingLink = () => {
    console.log("DocumentFloatingLink");
    // const isEditing = useFloatingLinkSelectors().isEditing();
    const isEditing = false;

    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const [show, setShow] = React.useState<boolean>(false);
    const [top, setTop] = React.useState<number>(0);
    const [left, setLeft] = React.useState<number>(0);

    const showPopup = (element: HTMLElement) => {
        console.log("DocumentFloatingLink showPopup");
        if (element && wrapperRef.current && wrapperRef.current.parentElement) {
            const boundingClientRect = element.getBoundingClientRect();
            // const wrapperClientRect = wrapperRef.current.getBoundingClientRect();
            const wrapperParentClientRect = wrapperRef.current.parentElement.getBoundingClientRect();

            console.log("DocumentFloatingLink showPopup", {element, clientHeight: element.clientHeight, boundingClientRect, wrapperParentClientRect: wrapperParentClientRect, wrapperDiv: wrapperRef.current.parentElement});

            setTop(boundingClientRect.top - wrapperParentClientRect.top + boundingClientRect.height + 12);
            setLeft(boundingClientRect.left - wrapperParentClientRect.left);
            setShow(true);
        }
    };

    const hidePopup = () => {
        console.log("DocumentFloatingLink hidePopup");
        
        setShow(false);
    };

    window["plate_kate_plate_link_show"] = showPopup;
    window["plate_kate_plate_link_hide"] = hidePopup;

    // const input = (
    //     <div tw="flex flex-col w-[330px]">
    //         <InputWrapper>
    //             <IconWrapper>
    //                 <LinkIcon width={18} />
    //             </IconWrapper>

    //             <FloatingLink.UrlInput css={inputCss} placeholder="Paste link" />
    //         </InputWrapper>

    //         <div tw="h-px bg-gray-200" />

    //         <InputWrapper>
    //             <IconWrapper>
    //                 <ShortTextIcon width={18} />
    //             </IconWrapper>
    //             <FloatingLink.TextInput css={inputCss} placeholder="Text to display" />
    //         </InputWrapper>
    //     </div>
    // );

    // const editContent = !isEditing ? (
    //     <div tw="w-auto px-2 py-1 flex flex-row items-center">
    //         <FloatingLink.EditButton css={plateButtonCss}>
    //             Edit document
    //         </FloatingLink.EditButton>

    //         <VerticalDivider />

    //         <FloatingLink.OpenLinkButton css={buttonCss}>
    //             <LaunchIcon width={18} />
    //         </FloatingLink.OpenLinkButton>

    //         <VerticalDivider />

    //         <FloatingLink.UnlinkButton css={buttonCss}>
    //             <LinkOffIcon width={18} />
    //         </FloatingLink.UnlinkButton>
    //     </div>
    // ) : (
    //     input
    // );

    let floatingLinkRootCss = css`
        ${tw`bg-white !z-20`};

        display: ${show ? "block" : "none"};
        border-radius: 4px;
        box-shadow: rgb(15 15 15 / 5%) 0 0 0 1px, rgb(15 15 15 / 10%) 0 3px 6px,
            rgb(15 15 15 / 20%) 0 9px 24px;
            top: ${top}px;
            left: ${left}px;
            position: absolute;
            width: fit-content;
        `;

    return (
        <div css={floatingLinkRootCss} ref={wrapperRef}>
            <div tw="w-auto px-2 py-1 flex flex-row items-center">
                <FloatingLink.EditButton css={plateButtonCss}>
                    Edit document
                </FloatingLink.EditButton>

                <VerticalDivider />

                {/* <FloatingLink.OpenLinkButton css={buttonCss}>
                    <LaunchIcon width={18} />
                </FloatingLink.OpenLinkButton> */}

                <a aria-label="Open link in a new tab" target="_blank" href="#" css={buttonCss}><svg viewBox="0 0 24 24" focusable="false" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="18"><path fill="none" d="M0 0h24v24H0z"></path><path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path></svg></a>

                <VerticalDivider />

                <FloatingLink.UnlinkButton css={buttonCss}>
                    <LinkOffIcon width={18} />
                </FloatingLink.UnlinkButton>
            </div>
        </div>
    );
};
