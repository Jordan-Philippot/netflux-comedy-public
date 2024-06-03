import { FieldErrors } from "hooks/useAuth";
import { getAuthenticationConfig, getDefaultConfig } from "./app";
import { LoginType, ProfileType, RegisterType, UserType } from "./user.type";

const BASE_URL = process.env.REACT_APP_API_URL_SYMFONY;

export const register = async (
  register: RegisterType
): Promise<{ registered: boolean; errors: FieldErrors | undefined }> => {
  const response = await fetch(`${BASE_URL}user/register`, {
    ...getDefaultConfig(),
    method: "POST",
    body: JSON.stringify(register),
  });
  const data = await response.json();
  return data;
};

export const login = async (login: LoginType): Promise<{ token: string }> => {
  const response = await fetch(`${BASE_URL}login_check`, {
    ...getDefaultConfig(),
    method: "POST",
    body: JSON.stringify(login),
  });
  const data = await response.json();
  return { token: data.token };
};

export const getUser = async (): Promise<UserType> => {
  const response = await fetch(
    `${BASE_URL}auth/user`,
    getAuthenticationConfig()
  );
  const data = await response.json();

  if (data.user) {
    return data.user;
  } else {
    return {} as UserType;
  }
};

export const setProfile = async (
  user: ProfileType
): Promise<{ user: UserType; errors: FieldErrors | undefined }> => {
  const response = await fetch(`${BASE_URL}auth/profile`, {
    ...getAuthenticationConfig(),
    method: "POST",
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return data;
};
