import styled from "styled-components";
import {
  COLOR_BLACK,
  COLOR_BUTTON_SECONDARY,
  COLOR_RED,
  COLOR_WHITE,
} from "utils/colors";

export type buttonColor = "light" | "dark" | "red";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  icon?: React.ReactElement;
  style?: React.CSSProperties;
  link?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  color: buttonColor;
  name?: string;
}

type StyledButtonProps = Omit<ButtonProps, "label" | "icon">;

const handleTypeStyle = (color: buttonColor) => {
  switch (color) {
    case "light":
      return {
        backgroundColor: COLOR_WHITE,
        color: COLOR_BLACK,
        backgroundHover: "#dedddc",
      };
    case "dark":
      return {
        backgroundColor: COLOR_BUTTON_SECONDARY,
        color: COLOR_WHITE,
        backgroundHover: "rgba(109, 109, 110, 0.9)",
      };
    case "red":
      return {
        backgroundColor: COLOR_RED,
        color: COLOR_WHITE,
        backgroundHover: COLOR_RED + "e6",
      };
  }
};

export const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  font-size: 20px;
  padding: 5px 25px 5px 20px;
  margin-right: 10px;
  appearance: none;
  white-space: no-wrap;
  width: min-content;
  border: 0;
  border-radius: 4px;
  background-color: ${(props) => handleTypeStyle(props.color)?.backgroundColor};
  color: ${(props) => handleTypeStyle(props.color)?.color};
  font-weight: 700;
  width: auto;
  svg {
    height: 100%;
    width: 100%;
    margin-right: 10px;
  }
  :hover {
    background-color: ${(props) =>
      handleTypeStyle(props.color)?.backgroundHover};
    cursor: pointer;
  }

  :disabled {
    opacity: 0.2;
    cursor: not-allowed;
  }
`;

function Button({
  label,
  icon,
  disabled = false,
  onClick,
  style,
  link,
  color = "light",
  name
}: ButtonProps) {
  return (
    <StyledButton
      disabled={disabled}
      color={color}
      style={style}
      link={link}
      onClick={link ? () => (window.location.href = link) : onClick}
      name={name}
    >
      {icon} {label}
    </StyledButton>
  );
}

export default Button;
