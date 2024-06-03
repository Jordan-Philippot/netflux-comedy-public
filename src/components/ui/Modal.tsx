import ReactDOM from "react-dom";
import styled from "styled-components";
import type { PropsWithChildren } from "react";
import Overlay from "components/ui/Overlay";
import Cross from "components/icon/Cross";
import {
  COLOR_BLACK,
  COLOR_BLACK_LIGHT,
  COLOR_WHITE,
} from "utils/colors";
import { device } from "utils/breakpoints";

interface ModalProps {
  opened: boolean;
  onClose: () => void;
}

const StyledModal = styled.div`
  font-size: 10px;
  position: absolute;
  top: 5vh;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background: ${COLOR_BLACK};
  border-radius: 6px;
  width: 95vw;
  height: 95vh;
  overflow-y: auto;
  overflow-x: hidden;
  cursor: default;
  box-shadow: rgb(0 0 0 / 75%) 0px 3px 10px;
  transition: opacity 0.2s linear;

  @media ${device.mobile} {
    width: 90vw;
  }
  @media ${device.tablet} {
    width: 80vw;
  }
  @media ${device.laptop} {
    width: 70vw;
  }
  @media ${device.laptop} {
    width: 60vw;
  }
  @media ${device.desktop} {
    width: 50vw;
  }
`;

const StyledModalCross = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  margin: 1em;
  z-index: 2;
  cursor: pointer;
  background-color: ${COLOR_BLACK_LIGHT};
  color: white;
  border-radius: 50%;
  height: 24px;
  padding: 12px;
  width: 24px;
  border: 0;
  box-shadow: 0 0 1px 1px ${COLOR_WHITE}4D;
`;

function Modal({ children, opened, onClose }: PropsWithChildren<ModalProps>) {
  if (!opened) return null;

  return ReactDOM.createPortal(
    <Overlay onClick={onClose}>
      <StyledModal
        role="dialog"
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
      >
        <StyledModalCross className="close" onClick={onClose}>
          <Cross />
        </StyledModalCross>
        {children}
      </StyledModal>
    </Overlay>,
    document.body
  );
}

export default Modal;
