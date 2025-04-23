import { RootStore } from "./root";

export const allClipsSelector = (state: RootStore) => {
  const { transcript } = state;
  if (!transcript) return [];
  return transcript.sections.flatMap((section) => section.clips);
};

export const highlightClipsSelector = (state: RootStore) => {
  const allClips = allClipsSelector(state);
  return allClips.filter((clip) => clip.selected);
};

export const currentHighlightClipSelector = (state: RootStore) => {
  const { currentTime } = state;
  const allClips = highlightClipsSelector(state);
  return allClips.find(
    (clip) => currentTime >= clip.startTime && currentTime <= clip.endTime
  );
};
