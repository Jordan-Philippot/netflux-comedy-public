import { COLOR_BLACK, COLOR_WHITE } from "utils/colors";

export default function Stop({
  inverted,
  style,
}: {
  inverted?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 28 28"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={style}
    >
      <g
        id="Page-1"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Icon-Set-Filled"
          transform="translate(-520.000000, -571.000000)"
          fill={inverted ? COLOR_BLACK : COLOR_WHITE}
        >
          <path
            d="M546,571 L522,571 C520.896,571 520,571.896 520,573 L520,597 C520,598.104 520.896,599 522,599 L546,599 C547.104,599 548,598.104 548,597 L548,573 C548,571.896 547.104,571 546,571"
            id="stop"
          ></path>
        </g>
      </g>
    </svg>
  );
}
