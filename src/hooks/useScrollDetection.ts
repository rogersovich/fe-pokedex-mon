// hooks/useScrollDetection.ts
import { useEffect, useCallback } from 'react';

interface UseScrollDetectionOptions {
  onScrollToBottom: () => void;
  scrollThreshold?: number; // Opsional, default 100
}

export const useScrollDetection = ({
  onScrollToBottom,
  scrollThreshold = 100,
}: UseScrollDetectionOptions) => {
  const handleScroll = useCallback(() => {
    const documentHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    const currentScrollY = window.scrollY;

    const isNearBottom = currentScrollY + viewportHeight >= documentHeight - scrollThreshold;

    if (isNearBottom) {
      onScrollToBottom();
    }
  }, [onScrollToBottom, scrollThreshold]); // onScrollToBottom adalah dependency

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);
};