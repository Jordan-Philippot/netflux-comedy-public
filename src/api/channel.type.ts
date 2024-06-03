
import { VideoDataType, ThumbnailType } from "./video.type";

export interface ChannelData {
  id: number;
  title: string;
  description?: string;
  customUrl?: string;
  publishedAt?: string;
  thumbnails?: {
    high?: ThumbnailType;
    medium?: ThumbnailType;
    default?: ThumbnailType;
  };
  country?: string;
  viewCount?: string;
  subscriberCount?: string;
  hiddenSubscriberCount?: boolean;
  videoCount?: string;
  madeForKids?: boolean;
  channelId: string;
  videos: VideoDataType[];
}

export interface ChannelType {
  id: number;
  title: string;
  description?: string;
  customUrl?: string;
  publishedAt?: string;
  thumbnails?: {
    high?: ThumbnailType;
    medium?: ThumbnailType;
    default?: ThumbnailType;
  };
  country?: string;
  viewCount?: string;
  subscriberCount?: string;
  hiddenSubscriberCount?: boolean;
  videoCount?: string;
  madeForKids?: boolean;
  channelId: string;
}
