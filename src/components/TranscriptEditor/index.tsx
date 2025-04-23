import { useShallow } from "zustand/shallow";
import { useRootActions, useRootStore } from "../../store/root";
import { currentHighlightClipSelector } from "../../store/selectors";
import { Clip, Section } from "../../types";
import { Sentence } from "./components/Sentence";
import { TimeStamp } from "./components/TimeStamp";
import { useScrollToClip } from "./hooks/useScrollToClip";

export const TranscriptEditor: React.FC = () => {
  const [transcript, currentTime] = useRootStore(
    useShallow((state) => [state.transcript, state.currentTime])
  );
  const currentClip = useRootStore(useShallow(currentHighlightClipSelector));
  const { setCurrentTime, toggleClip } = useRootActions();

  useScrollToClip(currentClip?.id);

  const renderSentence = (clip: Clip) => {
    const isSentenceActive =
      currentTime >= clip.startTime && currentTime <= clip.endTime;

    const handleSentenceClick = () => {
      // If the clip is currently playing, don't toggle it
      if (clip.id === currentClip?.id) {
        return;
      }
      toggleClip(clip.id);
    };

    const timeStamp = (
      <TimeStamp
        clipTime={clip.startTime}
        onClick={() => {
          setCurrentTime(clip.startTime);
          // also select the clip if it's not already selected
          if (!clip.selected) {
            toggleClip(clip.id);
          }
        }}
      />
    );

    return (
      <Sentence
        key={clip.id}
        isActive={isSentenceActive}
        clip={clip}
        onClick={handleSentenceClick}
        timeStamp={timeStamp}
      />
    );
  };

  const renderSection = (section: Section) => {
    return (
      <div key={section.id} className="mb-6">
        <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
        <div className="pl-2 border-l-2 border-gray-200">
          {section.clips.map((clip) => renderSentence(clip))}
        </div>
      </div>
    );
  };

  if (!transcript) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Upload a video to view transcript
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Transcript</h2>
      {transcript.sections.map(renderSection)}
    </div>
  );
};
