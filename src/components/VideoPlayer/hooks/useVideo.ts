import { useCallback, useEffect, useState } from "react";
import { useHighlightStore } from "../../../store";

const useVideoControls = (
  videoRef: React.RefObject<HTMLVideoElement | null>
) => {
  const { currentTime, setCurrentTime } = useHighlightStore();
  const [isPlaying, setIsPlaying] = useState(false);

  // Handle time update event from video player
  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  }, [setCurrentTime, videoRef]);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const togglePlayPause = useCallback(() => {
    if (videoRef.current && isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current?.play();
    }
  }, [isPlaying, videoRef]);

  return {
    isPlaying,
    currentTime,
    handleTimeUpdate,
    handlePlay,
    handlePause,
    togglePlayPause,
  };
};

// Update video time position when currentTime changes from external sources
const useVideoSync = (
  videoRef: React.RefObject<HTMLVideoElement | null>,
  currentTime: number
) => {
  useEffect(() => {
    if (
      videoRef.current &&
      Math.abs(videoRef.current.currentTime - currentTime) > 0.5
    ) {
      videoRef.current.currentTime = currentTime;
    }
  }, [currentTime, videoRef]);
};

export const useVideo = (
  videoRef: React.RefObject<HTMLVideoElement | null>
) => {
  const {
    isPlaying,
    currentTime,
    handleTimeUpdate,
    handlePlay,
    handlePause,
    togglePlayPause,
  } = useVideoControls(videoRef);

  useVideoSync(videoRef, currentTime);

  return {
    isPlaying,
    currentTime,
    handleTimeUpdate,
    handlePlay,
    handlePause,
    togglePlayPause,
  };
};
