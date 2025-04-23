import { useEffect } from "react";

// Update video playback time when currentTime changes
export const useVideoSync = (
  videoRef: React.RefObject<HTMLVideoElement | null>,
  currentTime: number
) => {
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = currentTime;
    }
  }, [currentTime, videoRef]);
};
