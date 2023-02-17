import React, { SVGProps } from 'react';

const color = '#444444';

export const AddDocumentIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    id="Layer_1"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 600 600"
    {...props}
  >
    <path
      d="M500.94,588.5H95.22c-18.35,0-33.22-12.13-33.22-27.09V38.59c0-14.96,14.87-27.09,33.22-27.09l356.78,.5,84,80-1.84,469.41c0,14.96-14.87,27.09-33.22,27.09Z"
      fill="none"
      stroke={color}
      strokeLinejoin="round"
      strokeWidth="50"
    />
    <line
      x1="351.73"
      y1="246.21"
      x2="247.61"
      y2="353.13"
      fill="none"
      stroke="#000"
      strokeLinecap="round"
      strokeMiterlimit="10"
      strokeWidth="20"
    />
    <g>
      <path
        d="M377.52,326.53l36.14-36.14c28.91-28.91,28.91-75.79,0-104.7h0c-28.91-28.91-75.79-28.91-104.7,0l-36.14,36.14"
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="20"
      />
      <path
        d="M221.82,272.82l-36.14,36.14c-28.91,28.91-28.91,75.79,0,104.7h0c28.91,28.91,75.79,28.91,104.7,0l36.14-36.14"
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="20"
      />
    </g>
    <path
      d="M471.29,92h64.71L452,12v61.63c0,10.14,8.63,18.37,19.29,18.37Z"
      fillRule="evenodd"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="20"
    />
  </svg>
);
