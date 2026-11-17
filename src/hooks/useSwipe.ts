import { useRef } from "react";

export function useSwipe(
  onPrev: () => void,
  onNext: () => void,
  threshold = 50,
) {
  const startX = useRef(0);

  return {
    onTouchStart: (e: React.TouchEvent) => {
      startX.current = e.touches[0].clientX;
    },

    onTouchEnd: (e: React.TouchEvent) => {
      const diff = e.changedTouches[0].clientX - startX.current;
      if (diff > threshold) onPrev();
      else if (diff < -threshold) onNext();
    },
  };
}
