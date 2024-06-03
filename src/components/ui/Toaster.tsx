import { useState, useEffect } from "react";
import styled from "styled-components";
import type { CSSProperties } from "react";
import type { Status } from "redux/app";
import SvgButton from "components/ui/SvgButton";
import Text from "components/ui/Text";
import Cross from "components/icon/Cross";
import Alert from "components/ui/Alert";
import { COLOR_WHITE } from "utils/colors";

type toasterPosition = "left" | "right";
type toasterStatus = Status;

interface ToasterProps {
  message: string;
  status?: toasterStatus;
  position?: toasterPosition;
  duration?: number;
  style?: CSSProperties;
}

const handlePositionStyle = (position: toasterPosition) => {
  const left = position === "left" ? "30px" : "unset";
  const right = position === "right" ? "30px" : "unset";

  return { right, left };
};

const handleDirectionStyle = (position?: toasterPosition) => {
  switch (position) {
    case "left":
      return {
        transformFrom: "translateX(-50px)",
        transformTo: "translateX(0)",
      };
    case "right":
      return {
        transformFrom: "translateX(50px)",
        transformTo: "translateX(0)",
      };
  }
};

type StyledToasterProps = Omit<
  ToasterProps,
  "message" | "description" | "position"
> & {
  inTransition: boolean;
  opened: boolean;
  position: toasterPosition;
};

const StyledToaster = styled.div<StyledToasterProps>`
  position: absolute;
  z-index: 10;
  bottom: 30px;
  ${({ position }) => ({ ...handlePositionStyle(position) })}

  display: table;
  width: fit-content;
  border-radius: 8px;
  box-shadow: 5px 7px 10px 1px rgba(0, 0, 0, 0.2);
  overflow: hidden;

  animation: ${({ inTransition }) =>
    inTransition ? "fadein 0.5s" : "fadeout 0.5s forwards"};
  animation-timing-function: ease-in-out;

  @keyframes fadein {
    from {
      transform: ${({ position }) =>
        handleDirectionStyle(position)?.transformFrom};
      opacity: 0;
    }
    to {
      transform: ${({ position }) =>
        handleDirectionStyle(position)?.transformTo};
      opacity: 1;
    }
  }

  @keyframes fadeout {
    from {
      transform: ${({ position }) =>
        handleDirectionStyle(position)?.transformTo};
      opacity: 1;
    }
    to {
      transform: ${({ position }) =>
        handleDirectionStyle(position)?.transformFrom};
      opacity: 0;
      display: none;
    }
  }
`;

const StyledCrossContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const StyledProgressBar = styled.div<{ duration: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  transition: width 0.5s ease;
  background-color: ${COLOR_WHITE};
  animation: progress ${(props) => props.duration}ms ease-in-out forwards;

  @keyframes progress {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }
`;

function Toaster({
  message,
  status = "default",
  position = "left",
  duration = 5000,
  style,
}: ToasterProps) {
  const [opened, setOpened] = useState(true);
  const [inTransition, setInTransition] = useState(true);

  const closeToaster = () => {
    setInTransition(false);
    setTimeout(() => {
      setOpened(false);
    }, 500);
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (duration && duration > 0) {
      timer = setTimeout(() => {
        closeToaster();
      }, duration);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [duration]);

  if (!opened) return null;

  return (
    <StyledToaster
      position={position}
      duration={duration}
      opened={opened}
      inTransition={inTransition}
      style={style}
    >
      <Alert status={status} hasTitle>
        <Text style={{ paddingTop: 5 }}>{message}</Text>

        <StyledCrossContainer>
          <SvgButton
            onClick={closeToaster}
            style={{ width: "30px", height: "30px" }}
            title="Fermer modal"
          >
            <Cross />
          </SvgButton>
        </StyledCrossContainer>
      </Alert>

      {duration > 0 && <StyledProgressBar duration={duration} />}
    </StyledToaster>
  );
}

export default Toaster;
