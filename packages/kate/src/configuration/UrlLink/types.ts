import { TElement } from '@udecode/plate-core';

export interface IUrlLinkData {
  id: string;
  metadata: { [key: string]: any }[];
}

export interface TUrlLinkElement extends TElement {
  linkData: IUrlLinkData;
  type: string;
  text: string;
}

export interface IUrlLinkConfigItemOptions {
  getData: () => Promise<IUrlLinkData>;
  updateData: (data: IUrlLinkData) => Promise<IUrlLinkData>;
  open: (data: IUrlLinkData) => void;
}
