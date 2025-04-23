import { useVideoState } from "./useVideoState";
import { useVideoSync } from "./useVideoSync";

export const useVideo = (
  videoRef: React.RefObject<HTMLVideoElement | null>
) => {
  const {
    currentTime,
    isPlaying,
    handleTimeUpdate,
    togglePlayPause,
    handleBackward,
    handleForward,
  } = useVideoState();

  useVideoSync({ videoRef, currentTime, isPlaying });

  return {
    currentTime,
    isPlaying,
    handleTimeUpdate,
    togglePlayPause,
    handleBackward,
    handleForward,
  };
};
