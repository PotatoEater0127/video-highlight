import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { Transcript, VideoMetadata } from "../types";

export interface RootStore {
  video: VideoMetadata | null;
  isProcessing: boolean;
  currentTime: number;
  transcript: Transcript | null;

  actions: {
    setVideo: (video: VideoMetadata) => void;
    setProcessing: (isProcessing: boolean) => void;
    setCurrentTime: (time: number) => void;
    setTranscript: (transcript: Transcript) => void;
    toggleClip: (clipId: string) => void;
  };
}

export const useRootStore = create<RootStore>()(
  immer((set) => ({
    // Initial state
    video: null,
    isProcessing: false,
    currentTime: 0,
    transcript: null,

    actions: {
      setVideo: (video: VideoMetadata) => set({ video }),

      setProcessing: (isProcessing: boolean) => set({ isProcessing }),

      setCurrentTime: (currentTime: number) => set({ currentTime }),

      setTranscript: (transcript: Transcript) => set({ transcript }),

      toggleClip: (clipId: string) =>
        set((state: RootStore) => {
          if (!state.transcript) return state;

          const clips = state.transcript.sections.flatMap(
            (section) => section.clips
          );
          const clip = clips.find((clip) => clip.id === clipId);

          if (!clip) {
            return;
          }

          clip.selected = !clip.selected;
        }),
    },
  }))
);

export const useRootActions = () => useRootStore((state) => state.actions);
