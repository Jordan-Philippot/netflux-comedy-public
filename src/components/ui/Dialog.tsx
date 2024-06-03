import styled from "styled-components";
import type { PropsWithChildren } from "react";

export type dialogPosition = "top" | "right" | "bottom" | "left";

export enum dialogBgColor {
  secondary = "#6d6d6eb3",
  primary = "#fefefe",
  sucess = "#27AE60",
  warning = "#FBBD00",
  error = "#e50914",
}

interface DialogProps {
  position: dialogPosition;
  bgColor?: dialogBgColor;
}

const offsetSize = "15px";

const handlePositionStyle = (position: dialogPosition) => {
  switch (position) {
    case "top":
      return {
        top: "0",
        right: "unset",
        bottom: "unset",
        left: "50%",
        transform:
          "translateX(-50%) translateY(calc(-100% - " + offsetSize + "))",
      };

    case "right":
      return {
        top: "50%",
        right: "unset",
        bottom: "unset",
        left: "100%",
        transform: "translateY(-50%) translateX( " + offsetSize + ")",
      };

    case "bottom":
      return {
        top: "100%",
        right: "unset",
        bottom: "unset",
        left: "50%",
        transform: "translateX(-50%) translateY(" + offsetSize + ")",
      };

    case "left":
      return {
        top: "50%",
        right: "100%",
        bottom: "unset",
        left: "unset",
        transform: "translateY(-50%) translateX(-" + offsetSize + ")",
      };
  }
};

const StyledDialog = styled.div<DialogProps>`
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 0px 0px 6px #b2b2b2;
  padding: 10px;
  width: fit-content;
  height: auto;
  top: ${(props) => handlePositionStyle(props.position)?.top};
  right: ${(props) => handlePositionStyle(props.position)?.right};
  bottom: ${(props) => handlePositionStyle(props.position)?.bottom};
  left: ${(props) => handlePositionStyle(props.position)?.left};
  transform: ${(props) => handlePositionStyle(props.position)?.transform};
  z-index: 100;
  position: absolute;
  background-color: ${(props) => props.bgColor};

  :hover {
    background-color: ${(props) => props.bgColor + "E6"};
  }
  :disabled {
    background-color: ${(props) => props.bgColor + "E6"};
    opacity: 0.2;
    cursor: not-allowed !important;
  }
`;
function Dialog({
  position = "top",
  bgColor = dialogBgColor.primary,
  children,
}: PropsWithChildren<DialogProps>) {
  return (
    <StyledDialog position={position} bgColor={bgColor} className="dialog">
      {children}
    </StyledDialog>
  );
}

export default Dialog;
