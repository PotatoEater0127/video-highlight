import { useEffect, useRef } from "react";
import { useShallow } from "zustand/shallow";
import { useRootActions, useRootStore } from "../../store/root";
import { Clip, Section } from "../../types";
import { Sentence } from "./components/Sentence";
import { TimeStamp } from "./components/TimeStamp";

export const TranscriptEditor: React.FC = () => {
  const [transcript, currentTime] = useRootStore(
    useShallow((state) => [state.transcript, state.currentTime])
  );
  const { setCurrentTime, toggleClip } = useRootActions();
  const editorRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the current clip based on video playback time
  useEffect(() => {
    if (!transcript || !editorRef.current) return;

    // Find the current clip being played
    const allClips = transcript.sections.flatMap((section) => section.clips);
    const currentClip = allClips.find(
      (clip) => currentTime >= clip.startTime && currentTime <= clip.endTime
    );

    if (currentClip) {
      const sentenceEl = document.getElementById(currentClip.id);
      if (sentenceEl) {
        sentenceEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [currentTime, transcript]);

  const renderSentence = (clip: Clip) => {
    const isSentenceActive =
      currentTime >= clip.startTime && currentTime <= clip.endTime;

    const handleSentenceClick = () => {
      const isPlayingThisClip =
        currentTime >= clip.startTime && currentTime <= clip.endTime;

      // If the clip is playing,  don't toggle it
      if (isPlayingThisClip) {
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
    <div ref={editorRef} className="h-full overflow-y-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Transcript</h2>
      {transcript.sections.map(renderSection)}
    </div>
  );
};
