import { useEffect, useRef, useState } from "react";
import { useHighlightStore } from "../store";
import { Sentence } from "../types";

export const VideoPlayer: React.FC = () => {
  const { video, transcript, currentTime, setCurrentTime } =
    useHighlightStore();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSentence, setCurrentSentence] = useState<Sentence | null>(null);

  // Generate highlight clips
  const highlightClips =
    transcript?.sections
      .flatMap((section) => section.sentences)
      .filter((sentence) => sentence.selected)
      .sort((a, b) => a.startTime - b.startTime) || [];

  // Update video position when currentTime changes from external sources
  useEffect(() => {
    if (
      videoRef.current &&
      Math.abs(videoRef.current.currentTime - currentTime) > 0.5
    ) {
      videoRef.current.currentTime = currentTime;
    }
  }, [currentTime]);

  // Update current sentence based on playback time
  useEffect(() => {
    if (!transcript) return;

    const allSentences = transcript.sections.flatMap(
      (section) => section.sentences
    );
    const sentence = allSentences.find(
      (s) => currentTime >= s.startTime && currentTime <= s.endTime
    );

    if (sentence) {
      setCurrentSentence(sentence);
    } else {
      setCurrentSentence(null);
    }
  }, [currentTime, transcript]);

  // Handle time update event from video player
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  // Format time for display
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  if (!video) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500 bg-black">
        <div className="text-center">
          <p className="text-white text-xl mb-2">Video Preview</p>
          <p className="text-gray-400">Simply press this button to start.</p>
        </div>
      </div>
    );
  }

  // Render the timeline with highlight markers
  const renderTimeline = () => {
    const duration = video.duration;

    return (
      <div className="relative h-8 bg-gray-800 rounded overflow-hidden mt-2">
        {highlightClips.map((clip) => {
          const startPosition = (clip.startTime / duration) * 100;
          const width = ((clip.endTime - clip.startTime) / duration) * 100;

          return (
            <div
              key={clip.id}
              className="absolute h-full bg-blue-500"
              style={{
                left: `${startPosition}%`,
                width: `${width}%`,
              }}
            />
          );
        })}

        {/* Current time indicator */}
        <div
          className="absolute translate h-full w-0.5 bg-red-500 z-10"
          style={{ left: `${(currentTime / duration) * 100}%` }}
        />
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Preview</h2>
      <div className="relative bg-black">
        <video
          ref={videoRef}
          src={video.src}
          className="w-full h-full object-contain"
          onTimeUpdate={handleTimeUpdate}
          onPlay={handlePlay}
          onPause={handlePause}
        />

        {/* Overlay for the current sentence */}
        {currentSentence && currentSentence.selected && (
          <div className="absolute bottom-4 left-0 right-0 text-center px-4">
            <div className="inline-block bg-black/40 text-white p-3 rounded text-lg">
              {currentSentence.text}
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-900 p-4">
        <div className="flex justify-between text-white mb-2">
          <div>{formatTime(currentTime)}</div>
          <div>{formatTime(video.duration)}</div>
        </div>

        {renderTimeline()}

        <div className="flex justify-center mt-4 space-x-4">
          <button
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.currentTime = Math.max(0, currentTime - 10);
              }
            }}
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"
            onClick={togglePlayPause}
          >
            {isPlaying ? (
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
          </button>

          <button
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.currentTime = Math.min(
                  video.duration,
                  currentTime + 10
                );
              }
            }}
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
