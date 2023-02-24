import { IKateConfigItem } from "../types";

export interface IConditionalConfigItem extends IKateConfigItem {
    getConditionalValue: () => Promise<any>;
}