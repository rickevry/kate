import { KateEditor } from '../plateTypes';

export interface IKateConfigItem {
  overrideComponents?: {
    [key: string]: any;
  };
  plugins: any[];
  renderButtons: (editor: KateEditor) => JSX.Element[];
  withUi?: {
    key?: string;
    keys?: string[];
    styles: any;
  }[];
}
