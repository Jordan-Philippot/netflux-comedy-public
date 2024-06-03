import React from "react";

import { COLOR_BLACK, COLOR_WHITE } from "utils/colors";

export default function Search({ inverted }: { inverted?: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="11.7666"
        cy="11.7666"
        r="8.98856"
        stroke={inverted ? COLOR_BLACK : COLOR_WHITE}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.0183 18.4851L21.5423 22"
        stroke={inverted ? COLOR_BLACK : COLOR_WHITE}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
