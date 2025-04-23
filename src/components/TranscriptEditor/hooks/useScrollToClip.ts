import { useEffect } from "react";

// Auto-scroll to the clip if the clipId changes
export const useScrollToClip = (clipId?: string) => {
  useEffect(() => {
    if (clipId) {
      const sentenceEl = document.getElementById(clipId);
      if (sentenceEl) {
        sentenceEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [clipId]);
};
