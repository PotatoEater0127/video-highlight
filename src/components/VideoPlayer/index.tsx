import { useRef } from "react";
import { useRootStore } from "../../store/root";
import { useVideo } from "./hooks/useVideo";

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
  } = useVideo(videoRef);

  if (!video) {
    return <Fallback />;
  }

  return (
    <div className="h-full flex flex-col bg-gray-800 text-white p-2 sm:p-4">
      <h2 className="hidden sm:block text-2xl font-bold mb-4">Preview</h2>
      <div className="relative bg-black overflow-hidden">
        <video
          playsInline
          controls={false}
          ref={videoRef}
          src={video.src}
          className="w-full h-full object-contain"
          onTimeUpdate={handleTimeUpdate}
        />

        {/* Transcript for the playing clip */}
        {currentHighlightClip && (
          <div className="absolute bottom-1 sm:bottom-4 left-0 right-0 text-center px-1 sm:px-4">
            <div className="inline-block bg-black/40 text-white text-sm/4 sm:text-base p-1 sm:p-3 rounded text-lg">
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
