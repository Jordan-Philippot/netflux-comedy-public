import React, { useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import type { dialogPosition, dialogBgColor } from "components/ui/Dialog";
import type { PropsWithChildren } from "react";
import Dialog from "components/ui/Dialog";

interface TooltipProps {
  label?: React.ReactElement;
  isClickable?: boolean;
  position: dialogPosition;
  bgColor?: dialogBgColor;
}

type StyledTooltipProps = Omit<
  TooltipProps,
  "label" | "children" | "position" | "bgColor"
>;

const StyledTooltip = styled.div<StyledTooltipProps>`
  width: fit-content;
  position: relative;
  cursor: pointer;
  &:nth-child(0) {
    position: relative;
  }

  .dialog {
    visibility: hidden;
    cursor: pointer;
    z-index: 100;
    min-width: 200px;
  }

  &.isHover .dialog {
    visibility: visible;
  }

  &.isActive .dialog {
    visibility: visible;
  }
`;

function Tooltip({
  label,
  children,
  isClickable = false,
  position = "top",
  bgColor,
}: PropsWithChildren<TooltipProps>) {
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleOpen = useCallback(() => {
    if (isClickable) {
      tooltipRef.current?.classList.add("isActive");
    }
  }, [isClickable]);

  const handleClose = useCallback(
    (event: MouseEvent) => {
      const currentRef = tooltipRef.current;
      if (isClickable) {
        if (!currentRef?.contains(event.target as Node)) {
          currentRef?.classList.remove("isActive");
        }
      }
    },
    [isClickable]
  );

  const handleMouseEnter = useCallback(() => {
    const currentRef = tooltipRef.current;
    if (!isClickable) {
      currentRef?.classList.add("isHover");
    }
  }, [isClickable]);

  const handleMouseLeave = useCallback(() => {
    const currentRef = tooltipRef.current;
    if (!isClickable) {
      if (currentRef?.classList.contains("isHover")) {
        currentRef?.classList.remove("isHover");
      }
    }
  }, [isClickable]);

  useEffect(() => {
    const currentRef = tooltipRef.current;
    const labelElement = tooltipRef?.current?.firstChild;

    if (isClickable) {
      labelElement?.addEventListener("click", handleOpen);
      document.addEventListener("click", handleClose);
    } else {
      currentRef?.addEventListener("mouseenter", handleMouseEnter);
      currentRef?.addEventListener("mouseleave", handleMouseLeave);
    }
  }, [
    tooltipRef,
    isClickable,
    handleOpen,
    handleClose,
    handleMouseEnter,
    handleMouseLeave,
  ]);

  return (
    <StyledTooltip isClickable={isClickable} ref={tooltipRef}>
      {label}
      {/* Children = Dialog*/}
      <Dialog position={position} bgColor={bgColor}>
        {children}
      </Dialog>
    </StyledTooltip>
  );
}

export default Tooltip;
