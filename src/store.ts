import { create } from "zustand";
import { Transcript, VideoMetadata } from "./types";

interface HighlightStore {
  // Video state
  video: VideoMetadata | null;
  isProcessing: boolean;
  currentTime: number;

  // Transcript state
  transcript: Transcript | null;

  // Actions
  setVideo: (video: VideoMetadata) => void;
  setProcessing: (isProcessing: boolean) => void;
  setCurrentTime: (time: number) => void;
  setTranscript: (transcript: Transcript) => void;
  toggleSentence: (sectionId: string, sentenceId: string) => void;
  jumpToTime: (time: number) => void;
}

export const useHighlightStore = create<HighlightStore>((set) => ({
  // Initial state
  video: null,
  isProcessing: false,
  currentTime: 0,
  transcript: null,

  // Actions
  setVideo: (video: VideoMetadata) => set({ video }),

  setProcessing: (isProcessing: boolean) => set({ isProcessing }),

  setCurrentTime: (currentTime: number) => set({ currentTime }),

  setTranscript: (transcript: Transcript) => set({ transcript }),

  toggleSentence: (sectionId: string, sentenceId: string) =>
    set((state) => {
      if (!state.transcript) return state;

      const updatedSections = state.transcript.sections.map((section) => {
        if (section.id !== sectionId) return section;

        const updatedSentences = section.sentences.map((sentence) => {
          if (sentence.id !== sentenceId) return sentence;
          return { ...sentence, selected: !sentence.selected };
        });

        return { ...section, sentences: updatedSentences };
      });

      return { transcript: { sections: updatedSections } };
    }),

  jumpToTime: (time: number) => set({ currentTime: time }),
}));
