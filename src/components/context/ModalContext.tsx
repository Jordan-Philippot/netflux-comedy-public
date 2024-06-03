import { ChannelType } from "api/channel.type";
import { useResume } from "hooks/useResume";
import { VideoDataType } from "api/video.type";
import { useAuth } from "hooks/useAuth";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { ResumeType } from "api/resume.type";

interface ModalContextProps {
  isModalOpen: boolean;
  openModal: (video: VideoDataType, channel: ChannelType, resume?: ResumeType) => void;
  closeModal: (resumeTimeVideo?: number) => void;
  selectedVideo: VideoDataType | undefined;
  selectedChannel: ChannelType | undefined;
  resume?: ResumeType;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export function ModalProvider({ children }: PropsWithChildren) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoDataType>();
  const [selectedChannel, setSelectedChannel] = useState<ChannelType>();
  const [resume, setResume] = useState<ResumeType>()
  const { user } = useAuth();
  const { addResume } = useResume();

  const openModal = (video: VideoDataType, channel: ChannelType, resume?: ResumeType) => {
    setIsModalOpen(true);
    setSelectedVideo(video);
    setSelectedChannel(channel);
    setResume(resume)
  };

  const closeModal = (resumeTimeVideo?: number) => {
    if (resumeTimeVideo && user && selectedVideo) {
      addResume(selectedVideo.videoId, resumeTimeVideo);
    }
    setIsModalOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        openModal,
        closeModal,
        selectedVideo,
        selectedChannel,
        resume
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
