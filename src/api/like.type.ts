import { UserType } from "./user.type";
import { VideoDataType } from "./video.type";

export interface LikeType {
  id: number;
  video: VideoDataType;
  user: UserType;
  type: LikeTypeType;
  createdAt: string;
}

export enum LikeTypeType {
  dislike = "dislike",
  like = "like",
  superlike = "superlike",
}
