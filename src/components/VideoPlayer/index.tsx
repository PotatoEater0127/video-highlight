import { useRef } from "react";
import { useRootStore } from "../../store/root";
import { useVideo } from "./hooks/useVideo";

import clsx from "clsx";
import { useShallow } from "zustand/shallow";
import {
  currentHighlightClipSelector,
  highlightClipsSelector,
} from "../../store/selectors";
import { formatTime } from "../../utils/formatTime";
import { Fallback } from "../Fallback";
import { ControlBar } from "./components/ControlBar";
import { Timeline } from "./components/Timeline";

export const VideoPlayer: React.FC = () => {
  const { video } = useRootStore();
  const currentTime = useRootStore((state) => state.currentTime);
  const highlightClips = useRootStore(useShallow(highlightClipsSelector));
  const currentHighlightClip = useRootStore(
    useShallow(currentHighlightClipSelector)
  );

  const videoRef = useRef<HTMLVideoElement>(null);
  const {
    isPlaying,
    handleTimeUpdate,
    togglePlayPause,
    handleBackward,
    handleForward,
    isTransitioning,
    transitionTime,
  } = useVideo(videoRef);

  if (!video) {
    return <Fallback />;
  }

  return (
    <div className="h-full flex flex-col bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Preview</h2>
      <div className="relative bg-black overflow-hidden">
        <video
          ref={videoRef}
          src={video.src}
          className={clsx(
            `w-full h-full object-contain transition-all duration-${transitionTime}`,
            isTransitioning ? "opacity-20" : "opacity-100"
          )}
          onTimeUpdate={handleTimeUpdate}
        />

        {/* Transcript for the playing clip */}
        {currentHighlightClip && (
          <div className="absolute bottom-4 left-0 right-0 text-center px-4">
            <div
              className={clsx(
                `inline-block bg-black/40 text-white p-3 rounded text-lg transition-all duration-${transitionTime}`,
                isTransitioning ? "opacity-20" : "opacity-100"
              )}
            >
              {currentHighlightClip.text}
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-900 p-4">
        <div className="flex justify-between text-white mb-2">
          <div>{formatTime(currentTime)}</div>
          <div>{formatTime(video.duration)}</div>
        </div>

        <Timeline
          duration={video.duration}
          currentTime={currentTime}
          highlightClips={highlightClips}
        />

        <ControlBar
          isPlaying={isPlaying}
          handleBackward={handleBackward}
          handleForward={handleForward}
          handlePlayPause={togglePlayPause}
        />
      </div>
    </div>
  );
};
