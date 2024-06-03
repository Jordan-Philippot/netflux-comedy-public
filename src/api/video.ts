import { getDefaultConfig } from "./app";
import { VideoYoutubeType, VideoDataType } from "./video.type";

const BASE_URL = process.env.REACT_APP_API_URL_SYMFONY;
const BASE_URL_YOUTUBE = process.env.REACT_APP_API_URL_YOUTUBE;
const API_KEY = process.env.REACT_APP_API_URL_YOUTUBE_API_KEY;

export const getVidéoYoutubeById = async (
  videoId: string
): Promise<VideoYoutubeType> => {
  const response = await fetch(
    `${BASE_URL_YOUTUBE}videos?part=snippet,statistics,contentDetails&id=${videoId}&key=${API_KEY}`
  );
  const data = await response.json();
  const videoData = data.items[0].snippet;
  // console.log(videoData)
  return videoData;
};

export const getVidéoById = async (videoId: string): Promise<VideoDataType> => {
  const response = await fetch(
    `${BASE_URL}video/${videoId}`,
    getDefaultConfig()
  );
  const data = await response.json();
  return data.videoById;
};
