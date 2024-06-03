import { getAuthenticationConfig } from "./app";
import { LikeType, LikeTypeType } from "./like.type";

const BASE_URL = process.env.REACT_APP_API_URL_SYMFONY;

export const getUserLikeList = async (): Promise<LikeType[]> => {
  const response = await fetch(
    `${BASE_URL}auth/like/list`,
    getAuthenticationConfig()
  );
  const data = await response.json();
  return data.list;
};

export const addLike = async (
  videoId: string,
  type: LikeTypeType
): Promise<{ like: boolean }> => {
  const response = await fetch(`${BASE_URL}auth/like/add`, {
    ...getAuthenticationConfig(),
    method: "POST",
    body: JSON.stringify({ videoId, type }),
  });
  const data = await response.json();
  return data.like;
};

export const removeLike = async (
  videoId: string
): Promise<{ unlike: boolean }> => {
  const response = await fetch(`${BASE_URL}auth/like/remove`, {
    ...getAuthenticationConfig(),
    method: "POST",
    body: JSON.stringify(videoId),
  });
  const data = await response.json();
  return data.unlike;
};
