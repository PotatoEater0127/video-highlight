import { useEffect, useRef } from "react";
import { useShallow } from "zustand/shallow";
import { useRootActions, useRootStore } from "../store/root";
import { Clip, Section } from "../types";
import { formatTime } from "../utils/formatTime";

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
      const sentenceEl = document.getElementById(`sentence-${currentClip.id}`);
      if (sentenceEl) {
        sentenceEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [currentTime, transcript]);

  if (!transcript) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Upload a video to view transcript
      </div>
    );
  }

  const renderSentence = (clip: Clip, sectionId: string) => {
    const isActive =
      currentTime >= clip.startTime && currentTime <= clip.endTime;

    return (
      <div
        key={clip.id}
        id={`sentence-${clip.id}`}
        className={`p-2 my-1 rounded transition-colors flex items-start ${
          isActive ? "bg-yellow-100" : clip.selected ? "bg-blue-50" : ""
        }`}
      >
        <button
          onClick={() => setCurrentTime(clip.startTime)}
          className="text-gray-500 mr-2 hover:text-blue-500 transition-colors cursor-pointer"
        >
          {formatTime(clip.startTime)}
        </button>
        <div className="flex-grow">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={clip.selected}
              onChange={() => toggleClip(sectionId, clip.id)}
              className="hidden"
            />
            <span
              className={`${clip.selected ? "text-black" : "text-gray-700"}`}
            >
              {clip.text}
            </span>
          </label>
        </div>
      </div>
    );
  };

  const renderSection = (section: Section) => {
    return (
      <div key={section.id} className="mb-6">
        <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
        <div className="pl-2 border-l-2 border-gray-200">
          {section.clips.map((clip) => renderSentence(clip, section.id))}
        </div>
      </div>
    );
  };

  return (
    <div ref={editorRef} className="h-full overflow-y-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Transcript</h2>
      {transcript.sections.map(renderSection)}
    </div>
  );
};
