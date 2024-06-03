import { FieldErrors } from "hooks/useAuth";
import { getDefaultConfig } from "./app";

const BASE_URL = process.env.REACT_APP_API_URL_SYMFONY;

export const forgotPassword = async (
  email: string
): Promise<{ forgotPassword: boolean; errors: FieldErrors | undefined }> => {
  const response = await fetch(`${BASE_URL}forgotpassword`, {
    ...getDefaultConfig(),
    method: "POST",
    body: JSON.stringify(email),
  });
  const data = await response.json();
  return data;
};

export const resetPassword = async (
    password: string,
    passwordConfirm: string,
    token: string,
  ): Promise<{ resetPassword: boolean; errors: FieldErrors | undefined }> => {
    const response = await fetch(`${BASE_URL}resetpassword`, {
      ...getDefaultConfig(),
      method: "POST",
      body: JSON.stringify({token, password, passwordConfirm}),
    });
    const data = await response.json();
    return data;
  };
  