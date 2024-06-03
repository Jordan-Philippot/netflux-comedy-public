import React from "react";
import styled from "styled-components";
import { device } from "utils/breakpoints";
import {
  COLOR_PRIMARY_1,
  COLOR_ERROR,
  COLOR_SUCCESS,
  COLOR_WARNING,
  COLOR_GREY_DARK,
  COLOR_GREY_LIGHT,
} from "utils/colors";

export type status = "default" | "error" | "success" | "warning";
type types = "text" | "email" | "password" | "date" | "search";

export interface InputProps {
  type?: types;
  autocomplete?: string;
  name?: string;
  value?: string;
  status?: status;
  disabled?: boolean;
  placeholder?: string;
  style?: React.CSSProperties;
  autoFocus?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const handleStyle = (status?: status) => {
  switch (status) {
    case "default":
      return COLOR_PRIMARY_1;
    case "warning":
      return COLOR_WARNING;
    case "success":
      return COLOR_SUCCESS;
    case "error":
      return COLOR_ERROR;
  }
};

const StyledInput = styled.input<InputProps>`
  box-sizing: border-box;
  padding: 10px 15px;
  border: none;
  border-bottom: 1px solid ${(props) => handleStyle(props.status)};
  border-radius: 5px;
  height: 48px;
  background-color: ${COLOR_GREY_DARK};
  color: ${COLOR_GREY_LIGHT};
  min-width: 250px;
  width: 100%;
  font-size: 16px;
  outline: 0;
  :disabled {
    opacity: 0.2;
  }
  @media ${device.laptop} {
    min-width: 320px;
  }
`;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
      autocomplete,
      name,
      value,
      status = "default",
      disabled,
      placeholder,
      style,
      autoFocus = false,
      onChange,
      onBlur,
    },
    ref
  ) => (
    <StyledInput
      ref={ref}
      type={type}
      name={name}
      value={value}
      status={status}
      disabled={disabled}
      placeholder={placeholder}
      onChange={onChange}
      autoComplete={autocomplete}
      onBlur={onBlur}
      style={style}
      autoFocus={autoFocus}
    />
  )
);

Input.displayName = "Input";

export default Input;
