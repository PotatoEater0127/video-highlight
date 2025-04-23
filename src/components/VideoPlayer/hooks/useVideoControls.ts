import { useCallback, useState } from "react";
import { useShallow } from "zustand/shallow";
import { useRootActions, useRootStore } from "../../../store/root";
import {
  currentHighlightClipSelector,
  highlightClipsSelector,
} from "../../../store/selectors";

// Hook that provides utils to control the video player
export const useVideoControls = (
  videoRef: React.RefObject<HTMLVideoElement | null>
) => {
  const currentTime = useRootStore((state) => state.currentTime);
  const highlightClips = useRootStore(useShallow(highlightClipsSelector));
  const currentHighlightClip = useRootStore(
    useShallow(currentHighlightClipSelector)
  );

  const { setCurrentTime } = useRootActions();

  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = useCallback(() => {
    if (videoRef.current && isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current?.play();
      setIsPlaying(true);
    }
  }, [isPlaying, videoRef]);

  // Jum to next highlight clip, if there's no next highlight clip, do nothing.
  const handleForward = useCallback(() => {
    const nextClip = highlightClips.find(
      (clip) => currentTime < clip.startTime
    );

    if (nextClip) {
      setCurrentTime(nextClip.startTime);
    }
  }, [currentTime, highlightClips, setCurrentTime]);

  // Jump to previous highlight clip,
  // if there's no previous highlight clip, jump to the start of the current highlight clip,
  // if there's no current highlight clip, jump to the start of the video.
  const handleBackward = useCallback(() => {
    const pastClips = highlightClips.filter(
      (clip) => currentTime > clip.endTime
    );
    if (pastClips.length === 0) {
      setCurrentTime(currentHighlightClip?.startTime || 0);
      return;
    }
    const previousClip = pastClips[pastClips.length - 1];
    setCurrentTime(previousClip.startTime);
  }, [
    currentHighlightClip?.startTime,
    currentTime,
    highlightClips,
    setCurrentTime,
  ]);

  // Handle onTimeUpdate event for video player
  const handleTimeUpdate = useCallback(() => {
    if (!videoRef.current) {
      return;
    }

    // If the current clip is over, jump to the next highlight clip
    if (!currentHighlightClip) {
      handleForward();
    } else {
      setCurrentTime(videoRef.current.currentTime);
    }
  }, [currentHighlightClip, handleForward, setCurrentTime, videoRef]);

  return {
    currentTime,
    isPlaying,
    handleTimeUpdate,
    togglePlayPause,
    handleForward,
    handleBackward,
  };
};
