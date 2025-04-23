import { useCallback, useState } from "react";
import { useShallow } from "zustand/shallow";
import { useRootActions, useRootStore } from "../../../store/root";
import {
  currentHighlightClipSelector,
  highlightClipsSelector,
} from "../../../store/selectors";
import { useTransition } from "./useTransition";

/**
 *  Controls the the state for the video player
 */
export const useVideoState = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const currentTime = useRootStore((state) => state.currentTime);
  const highlightClips = useRootStore(useShallow(highlightClipsSelector));
  const currentHighlightClip = useRootStore(
    useShallow(currentHighlightClipSelector)
  );
  const { setCurrentTime } = useRootActions();

  const { isTransitioning, triggerTransition, transitionTime } =
    useTransition();

  const togglePlayPause = useCallback(() => {
    setIsPlaying((isPlaying) => !isPlaying);
  }, []);

  // Jump to next highlight clip,
  // if there's no next highlight clip, jump to the end of the current highlight clip.
  // if there's no current highlight clip, jump to the end of the video.
  const handleForward = useCallback(() => {
    const nextClip = highlightClips.find(
      (clip) => currentTime < clip.startTime
    );

    if (nextClip) {
      setCurrentTime(nextClip.startTime);

      triggerTransition();
    } else {
      setCurrentTime(currentHighlightClip?.endTime || 0);
    }
  }, [
    currentHighlightClip?.endTime,
    currentTime,
    highlightClips,
    setCurrentTime,
    triggerTransition,
  ]);

  // Jump to previous highlight clip,
  // if there's no previous highlight clip, jump to the start of the current highlight clip
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

    triggerTransition();
  }, [
    currentHighlightClip?.startTime,
    currentTime,
    highlightClips,
    setCurrentTime,
    triggerTransition,
  ]);

  // Handle onTimeUpdate event for video player
  const handleTimeUpdate = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
      // End the video if it is playing the last highlight clip
      // const nextClip = highlightClips.find(
      //   (clip) => currentTime < clip.startTime
      // );
      // if (!nextClip && currentTime > (currentHighlightClip?.endTime || 0)) {
      //   e.currentTarget.pause();
      //   setIsPlaying(false);
      // }

      // If the current clip is over
      if (!currentHighlightClip) {
        // Jump to the next highlight clip
        handleForward();
      } else {
        setCurrentTime(e.currentTarget.currentTime);
      }
    },
    [currentHighlightClip, handleForward, setCurrentTime]
  );

  return {
    currentTime,
    isPlaying,
    isTransitioning,
    triggerTransition,
    transitionTime,
    handleTimeUpdate,
    togglePlayPause,
    handleForward,
    handleBackward,
  };
};
