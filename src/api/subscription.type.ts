import { ChannelData } from "./channel.type";
import { UserType } from "./user.type";
import { VideoDataType } from "./video.type";

export interface SubscriptionType {
  id: number;
  channel: ChannelData;
  user: UserType;
  videos: VideoDataType[];
  createdAt: string;
  latestVideos?: VideoDataType[];
}

export interface SubscriptionResponseType {
  subscriptions: SubscriptionType[];
  latestVideos: VideoDataType[];
}
