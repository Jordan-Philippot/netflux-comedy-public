import { getDefaultConfig } from "./app";
import { ChannelData } from "./channel.type";

const BASE_URL = process.env.REACT_APP_API_URL_SYMFONY;

export const getChannelVideos = async (
  channelId: string
): Promise<ChannelData> => {
  const response = await fetch(
    `${BASE_URL}channel/videos/${channelId}`,
    getDefaultConfig()
  );
  const data = await response.json();
  return data.channelVideos;
};

export const getChannelsVideos = async (): Promise<ChannelData[]> => {
  const response = await fetch(
    `${BASE_URL}channels/videos`,
    getDefaultConfig()
  );
  const data = await response.json();
  return data.channelsVideos;
};
