import { COLOR_BLACK, COLOR_WHITE } from 'utils/colors'

export default function Minus({ inverted = false }: { inverted?: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="minus">
      <path
        fill={inverted ? COLOR_BLACK : COLOR_WHITE}
        d="M19,11H5a1,1,0,0,0,0,2H19a1,1,0,0,0,0-2Z"
      >
        {''}
      </path>
    </svg>
  )
}
