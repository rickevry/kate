/* eslint-disable no-console */
import React from 'react';
import { Link } from '@styled-icons/material';
import { createLinkPlugin } from '@udecode/plate-link';
import { LinkToolbarButton, PlateFloatingLink } from '@udecode/plate-ui';
import { IKateConfigItem } from './types';

export const createLinkConfig = (): IKateConfigItem => {
  console.log('createLinkConfig');

  return {
    plugins: [
      createLinkPlugin({
        renderAfterEditable: PlateFloatingLink,
      }),
    ],
    renderButtons: () => [<LinkToolbarButton icon={<Link />} />],
  };
};
