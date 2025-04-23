import { RootStore } from "./root";

// Get all clips, whether they are selected or not
export const allClipsSelector = (state: RootStore) => {
  const { transcript } = state;
  if (!transcript) return [];
  return transcript.sections.flatMap((section) => section.clips);
};

// Get all clips that are selected
export const highlightClipsSelector = (state: RootStore) => {
  const allClips = allClipsSelector(state);
  return allClips.filter((clip) => clip.selected);
};

// Get the highlight clip that is currently playing
export const currentHighlightClipSelector = (state: RootStore) => {
  const { currentTime } = state;
  const allClips = highlightClipsSelector(state);
  return allClips.find(
    (clip) => currentTime >= clip.startTime && currentTime <= clip.endTime
  );
};
