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
    isTransitioning,
    transitionTime,
  } = useVideoState();

  useVideoSync({ videoRef, currentTime, isPlaying });

  return {
    currentTime,
    isPlaying,
    isTransitioning,
    transitionTime,
    handleTimeUpdate,
    togglePlayPause,
    handleBackward,
    handleForward,
  };
};
