import { COLOR_BLACK, COLOR_WHITE } from "utils/colors";

export default function Arobase({ inverted }: { inverted?: boolean }) {
  return (
    <svg
      width="400"
      height="400"
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M200 275C161.73 275 130.7 243.97 130.7 205.7V194.3C130.7 156.03 161.73 125 200 125C238.27 125 269.3 156.03 269.3 194.3V205.7C269.3 243.97 238.27 275 200 275Z"
        stroke={inverted ? COLOR_WHITE : COLOR_BLACK}
        strokeWidth="30"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M269.3 202.83V236C269.3 254.85 287.55 272 307 272C333 272 344 253 347.54 232.16C349.32 221.7 350 211.04 350 200C350 117.16 282.84 50 200 50C117.16 50 50 117.16 50 200C50 282.84 117.16 350 200 350C225 350 248.57 343.88 269.3 333.07"
        stroke={inverted ? COLOR_WHITE : COLOR_BLACK}
        strokeWidth="30"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
