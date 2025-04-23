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
  toggleClip: (sectionId: string, clipId: string) => void;
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

  toggleClip: (sectionId: string, clipId: string) =>
    set((state) => {
      if (!state.transcript) return state;

      const updatedSections = state.transcript.sections.map((section) => {
        if (section.id !== sectionId) return section;

        const updatedClips = section.clips.map((clip) => {
          if (clip.id !== clipId) return clip;
          return { ...clip, selected: !clip.selected };
        });

        return { ...section, clips: updatedClips };
      });

      return { transcript: { sections: updatedSections } };
    }),

  jumpToTime: (time: number) => set({ currentTime: time }),
}));
