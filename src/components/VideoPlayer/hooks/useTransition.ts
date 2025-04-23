import { useCallback, useState } from "react";

/**
 * A hook to trigger a brief transition state, useful for applying visual effects
 * (e.g., smooth cut or fade) between video highlight clips.
 */
export const useTransition = (transitionTime: number = 300) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const triggerTransition = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), transitionTime);
  }, [transitionTime]);

  return {
    transitionTime,
    isTransitioning,
    triggerTransition,
  };
};
