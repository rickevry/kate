import { TElement } from '@udecode/plate-core';

export interface IDocumentData {
  id: string;
  name: string;
  metadata: { [key: string]: any };
}

export interface TDocumentElement extends TElement {
  documentData: IDocumentData;
  type: string;
  text: string;
}

export interface IDocumentConfigItemOptions {
  getData: () => Promise<IDocumentData>;
  updateData: (data: IDocumentData) => Promise<IDocumentData>;
  open: (data: IDocumentData) => void;
}
