import { RefObject } from "react";

// ----- Show or hide password -----
export const showPassword = (inputRef: RefObject<HTMLInputElement>) => {
  if (inputRef.current)
    if (inputRef?.current.type === "password") {
      inputRef.current.type = "text";
    } else {
      inputRef.current.type = "password";
    }
};
