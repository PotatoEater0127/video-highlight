import { useVideoControls } from "./useVideoControls";
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
  } = useVideoControls(videoRef);

  useVideoSync(videoRef, currentTime);

  return {
    currentTime,
    isPlaying,
    handleTimeUpdate,
    togglePlayPause,
    handleBackward,
    handleForward,
  };
};
