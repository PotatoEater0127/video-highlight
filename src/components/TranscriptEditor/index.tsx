import { useShallow } from "zustand/shallow";
import { useRootActions, useRootStore } from "../../store/root";
import { currentHighlightClipSelector } from "../../store/selectors";
import { Clip, Section } from "../../types";
import { Fallback } from "../Fallback";
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
        <h3 className="sticky top-0 sm-static bg-white sm:bg-transparent text-lg font-semibold mb-2">
          {section.title}
        </h3>
        <div className="p-0 sm:pl-2 border-l-0 sm:border-l-2 border-gray-200">
          {section.clips.map((clip) => renderSentence(clip))}
        </div>
      </div>
    );
  };

  if (!transcript) {
    return <Fallback />;
  }

  return (
    <div className="h-full p-2 sm:p-4">
      <h2 className="hidden sm:block text-2xl font-bold">Transcript</h2>
      {transcript.sections.map(renderSection)}
    </div>
  );
};
