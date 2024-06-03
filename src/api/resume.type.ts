import { UserType } from "./user.type";
import { VideoDataType } from "./video.type";

export interface ResumeType {
  id: number;
  user: UserType;
  video: VideoDataType;
  finished: boolean;
  resumeTime: number;
}
