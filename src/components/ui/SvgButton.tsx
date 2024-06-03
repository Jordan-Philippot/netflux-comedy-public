import styled from "styled-components";
import type { PropsWithChildren } from "react";

interface SvgButtonsProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  style?: React.CSSProperties;
  title?: string | null;
}

const StyledSvgButton = styled.button<SvgButtonsProps>`
  width: 42px;
  height: 42px;
  background-color: rgba(42, 42, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-width: 2px;
  color: white;
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  :disabled {
    opacity: 0.2;
    cursor: not-allowed;
  }
  svg {
    width: 24px;
    height: 24px;
  }
  :hover {
    border-color: color;
    background-color: rgba(42, 42, 42, 1);
  }
`;

export default function SvgButton({
  onClick,
  children,
  disabled,
  style,
  title,
}: PropsWithChildren<SvgButtonsProps>) {
  return (
    <StyledSvgButton
      onClick={onClick}
      disabled={disabled}
      className="svg-btn"
      style={style}
      type="button"
      title={title || undefined}
    >
      {children}
    </StyledSvgButton>
  );
}
