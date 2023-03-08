import { TElement } from '@udecode/plate-core';

export interface IConditionalData {
  text: string;
  conditional: string;
}

export interface TConditionalElement extends TElement {
  conditional: IConditionalData;
  type: string;
  text: string;
}

export interface IConditionalConfigItemOptions {
  getData: () => Promise<IConditionalData>;
  updateData: (data: IConditionalData) => Promise<IConditionalData>;
}
