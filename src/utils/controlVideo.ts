import { RefObject } from "react";

export function controlVideo(videoRef: RefObject<HTMLVideoElement>) {
  const currentVideo = videoRef.current;
  if (currentVideo)
    if (!currentVideo.paused) {
      currentVideo.pause();
    } else {
      currentVideo.play();
    }
}

export function muteVideo(videoRef: RefObject<HTMLVideoElement>) {
  const currentVideo = videoRef.current;
  if (currentVideo)
    if (currentVideo.muted) {
      videoRef.current.muted = false;
    } else {
      videoRef.current.muted = true;
    }
}

export function addVideoEventListener(
  videoRef: RefObject<HTMLVideoElement>,
  setPlayedVideo: (bool: boolean) => void,
  setIsMuted: (bool: boolean) => void
) {
  const currentVideo = videoRef.current;
  if (currentVideo) {
    currentVideo.addEventListener("play", () => {
      setPlayedVideo(true);
    });
    currentVideo.addEventListener("pause", () => {
      setPlayedVideo(false);
    });
    currentVideo.addEventListener("volumechange", () => {
      if (currentVideo.muted) {
        setIsMuted(true);
      } else {
        setIsMuted(false);
      }
    });

    return () => {
      currentVideo.removeEventListener("play", () => {});
      currentVideo.removeEventListener("pause", () => {});
      currentVideo.removeEventListener("volumechange", () => {});
    };
  }
}
