import { UserType } from "./user.type";
import { VideoDataType } from "./video.type";

export interface FavoriteType {
  id: number;
  video: VideoDataType;
  user: UserType ;
  createdAt: string;
}

