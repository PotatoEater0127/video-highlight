import type { Clip } from "../../../types";

type TimelineProps = {
  duration: number;
  currentTime: number;
  highlightClips: Clip[];
};

// Render the timeline with highlight markers
export const Timeline: React.FC<TimelineProps> = ({
  currentTime,
  duration,
  highlightClips,
}) => {
  const renderHighlightClip = (clip: Clip) => {
    const startPosition = (clip.startTime / duration) * 100;
    const width = ((clip.endTime - clip.startTime) / duration) * 100;

    return (
      <div
        key={clip.id}
        className="absolute h-full bg-blue-500 rounded-xs"
        style={{ left: `${startPosition}%`, width: `${width}%` }}
      />
    );
  };

  return (
    <div className="relative h-8 bg-gray-800 rounded overflow-hidden">
      {/* Highlight clips */}
      {highlightClips.map(renderHighlightClip)}

      {/* Current time indicator */}
      <div
        className={`absolute left-0 right-0 top-0 bottom-0 will-change-transform`}
        style={{ transform: `translateX(${(currentTime / duration) * 100}%)` }}
      >
        <div className={`absolute left-0 h-full w-0.5 bg-red-500`} />
      </div>
    </div>
  );
};
