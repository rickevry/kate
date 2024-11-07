import { TElement } from '@udecode/plate-core';

export interface IPageShortcutData {
  name: string;
  title?: string;
  uid: string;
  metadata: { 
    pageGuid: string;
    [key: string]: any 
  };
}

export interface TPageShortcutElement extends TElement {
  pageData: IPageShortcutData;
  type: string;
  text: string;
}

export interface IPageShortcutConfigItemOptions {
  getData: () => Promise<IPageShortcutData>;
  updateData: (data: IPageShortcutData) => Promise<IPageShortcutData>;
  open: (data: IPageShortcutData) => void;
}
