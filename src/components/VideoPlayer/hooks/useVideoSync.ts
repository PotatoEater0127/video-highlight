import { useEffect } from "react";

const SYNC_THRESHOLD = 0.3;

type UseVideoSyncProps = {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  currentTime: number;
  isPlaying: boolean;
};

/**
 *  Syncs the video element playback time with the video state
 */
export const useVideoSync = ({
  videoRef,
  currentTime,
  isPlaying,
}: UseVideoSyncProps) => {
  // Sync video element playback time with currentTime state
  useEffect(() => {
    if (videoRef.current) {
      const delta = Math.abs(videoRef.current.currentTime - currentTime);
      // Only update if there's a significant difference to avoid jitter
      if (delta > SYNC_THRESHOLD) {
        videoRef.current.currentTime = currentTime;
      }
    }
  }, [currentTime, videoRef]);

  // Sync video element playback with isPlaying state
  useEffect(() => {
    if (!videoRef.current) {
      return;
    }
    if (isPlaying) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying, videoRef]);
};
