import { KateEditor } from '../plateTypes';

export interface IKateConfigItem {
  plugins: any[];
  renderButtons: (editor: KateEditor) => JSX.Element[];
  withUi?: {
    key?: string;
    keys?: string[];
    styles: any;
  }[];
}
