import { ChannelData } from "./channel.type";

export interface ThumbnailType {
  url: string;
  width: number;
  height: number;
}

interface LocalizedType {
  title: string;
  description: string;
}
// --------------
// Vidéo Type
// --------------
export interface VideoYoutubeType {
  publishedAt?: string;
  channelId?: string;
  title?: string;
  description?: string;
  thumbnails?: {
    default?: ThumbnailType;
    medium?: ThumbnailType;
    high?: ThumbnailType;
    standard?: ThumbnailType;
    maxres?: ThumbnailType;
  };
  channelTitle?: string;
  tags?: string[];
  categoryId?: string;
  liveBroadcastContent?: string;
  localized?: LocalizedType;
}

export type VideoDataType = {
  id: number;
  publishedAt?: string;
  channel: ChannelData;
  title: string;
  thumbnails?: {
    high?: ThumbnailType;
    maxres?: ThumbnailType;
    medium?: ThumbnailType;
    default?: ThumbnailType;
    standard?: ThumbnailType;
  };
  tags?: string[];
  categoryId?: string;
  liveBroadcastContent?: string;
  videoId: string;
  filePath: string;
  description?: string;
  viewCount?: string;
  likeCount?: string;
  commentCount?: string;
  duration: number;
};
