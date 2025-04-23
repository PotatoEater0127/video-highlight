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
