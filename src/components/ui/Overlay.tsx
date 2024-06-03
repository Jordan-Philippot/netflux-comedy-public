import styled from 'styled-components'
import type { PropsWithChildren, ReactNode } from 'react'

interface OverlayProps {
  children: ReactNode
  onClick?: () => void
}

const OverlayContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  cursor: pointer;
`

function Overlay({ children, onClick }: PropsWithChildren<OverlayProps>) {
  return (
    // use `onMouseDown` instead of `onClick` to avoid to close the modal
    // when mouse down into the modal and mouse up outside the modal
    <OverlayContainer className="overlay" onMouseDown={onClick}>
      {children}
    </OverlayContainer>
  )
}

export default Overlay
