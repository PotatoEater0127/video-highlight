import { useEffect, useRef } from "react";
import { useHighlightStore } from "../store";
import { Section, Sentence } from "../types";

export const TranscriptEditor: React.FC = () => {
  const { transcript, currentTime, jumpToTime, toggleSentence } =
    useHighlightStore();
  const editorRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the current sentence based on video playback time
  useEffect(() => {
    if (!transcript || !editorRef.current) return;

    // Find the current sentence being played
    const allSentences = transcript.sections.flatMap(
      (section) => section.sentences
    );
    const currentSentence = allSentences.find(
      (sentence) =>
        currentTime >= sentence.startTime && currentTime <= sentence.endTime
    );

    if (currentSentence) {
      const sentenceEl = document.getElementById(
        `sentence-${currentSentence.id}`
      );
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

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const renderSentence = (sentence: Sentence, sectionId: string) => {
    const isActive =
      currentTime >= sentence.startTime && currentTime <= sentence.endTime;

    return (
      <div
        key={sentence.id}
        id={`sentence-${sentence.id}`}
        className={`p-2 my-1 rounded transition-colors flex items-start ${
          isActive ? "bg-yellow-100" : sentence.selected ? "bg-blue-50" : ""
        }`}
      >
        <button
          onClick={() => jumpToTime(sentence.startTime)}
          className="text-xs text-gray-500 mr-2 mt-1 hover:text-blue-500 transition-colors"
        >
          {formatTime(sentence.startTime)}
        </button>
        <div className="flex-grow">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={sentence.selected}
              onChange={() => toggleSentence(sectionId, sentence.id)}
              className="mr-2 h-4 w-4 text-blue-600 rounded"
            />
            <span
              className={`${
                sentence.selected ? "text-black" : "text-gray-700"
              }`}
            >
              {sentence.text}
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
          {section.sentences.map((sentence) =>
            renderSentence(sentence, section.id)
          )}
        </div>
      </div>
    );
  };

  return (
    <div ref={editorRef} className="h-full overflow-y-auto p-4">
      <h2 className="text-xl font-bold mb-4">Transcript</h2>
      {transcript.sections.map(renderSection)}
    </div>
  );
};
