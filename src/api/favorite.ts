import { getAuthenticationConfig } from "./app";
import { FavoriteType } from "./favorite.type";

const BASE_URL = process.env.REACT_APP_API_URL_SYMFONY;

export const getUserFavoriteList = async (): Promise<FavoriteType[]> => {
  const response = await fetch(
    `${BASE_URL}auth/favorite/list`,
    getAuthenticationConfig()
  );
  const data = await response.json();
  return data.list;
};

export const addFavorite = async (
  videoId: string,
): Promise<{ added: boolean }> => {
  const response = await fetch(`${BASE_URL}auth/favorite/add`, {
    ...getAuthenticationConfig(),
    method: "POST",
    body: JSON.stringify(videoId),
  });
  const data = await response.json();
  return data.added;
};

export const removeFavorite = async (
  videoId: string
): Promise<{ removed: boolean }> => {
  const response = await fetch(`${BASE_URL}auth/favorite/remove`, {
    ...getAuthenticationConfig(),
    method: "POST",
    body: JSON.stringify(videoId),
  });
  const data = await response.json();
  return data.removed;
};
