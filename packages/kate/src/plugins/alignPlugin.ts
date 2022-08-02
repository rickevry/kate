
import {
    ELEMENT_PARAGRAPH,
} from '@udecode/plate-paragraph';

import {
    ELEMENT_H1,
    ELEMENT_H2,
    ELEMENT_H3,
    ELEMENT_H4,
    ELEMENT_H5,
    ELEMENT_H6,
} from '@udecode/plate-heading';

import { MyPlatePlugin } from '../plateTypes';

export const alignPlugin: Partial<MyPlatePlugin> = {
    inject: {
        props: {
            validTypes: [
                ELEMENT_PARAGRAPH,
                ELEMENT_H1,
                ELEMENT_H2,
                ELEMENT_H3,
                ELEMENT_H4,
                ELEMENT_H5,
                ELEMENT_H6,
            ],
        },
    },
};
