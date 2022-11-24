/* eslint-disable no-console */
import React from 'react';
import { Link } from '@styled-icons/material';
import { Value } from '@udecode/plate-core';
import {
  createLinkPlugin,
  ELEMENT_LINK,
  TLinkElement,
} from '@udecode/plate-link';
import {
  LinkElement,
  LinkToolbarButton,
  PlateFloatingLink,
  StyledElementProps,
} from '@udecode/plate-ui';
import { IKateConfigItem } from './types';

interface ICreateLinkConfig {
  overrideComponent?: (
    props: StyledElementProps<Value, TLinkElement>,
    defaultRender: (
      props: StyledElementProps<Value, TLinkElement>
    ) => JSX.Element
  ) => JSX.Element;
}

export const createLinkConfig = (
  configProps?: ICreateLinkConfig
): IKateConfigItem => {
  return {
    overrideComponents: {
      [ELEMENT_LINK]: (props: StyledElementProps<Value, TLinkElement>) => {
        if (configProps?.overrideComponent) {
          return configProps.overrideComponent(props, LinkElement);
        }

        // eslint-disable-next-line react/destructuring-assignment
        if (!props.attributes) props.attributes = {} as any;
        // eslint-disable-next-line react/destructuring-assignment
        (props.attributes as any).target = '_blank';

        return <LinkElement {...props} />;
      },
    },
    plugins: [
      createLinkPlugin({
        renderAfterEditable: PlateFloatingLink,
      }),
    ],
    renderButtons: () => [<LinkToolbarButton icon={<Link />} />],
  };
};
