import { useState, RefObject, useEffect, useRef } from "react";

type Position = {
  top?: number;
  left?: number;
};

type UseTooltipProperties = {
  delay?: number;
  mouseTrack?: boolean;
  offset?: number;
  position?: "top" | "bottom" | "right" | "left";
  ref: RefObject<HTMLElement>;
  tooltipReference: RefObject<HTMLDivElement>;
};

export function useTooltip({
  delay = 0,
  mouseTrack = false,
}: UseTooltipProperties) {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState<Position>({});
  const timeoutIdReference = useRef<ReturnType<typeof setTimeout>>();

  const onMouseEnter = () => {
    clearTimeout(timeoutIdReference.current);
    timeoutIdReference.current = setTimeout(() => {
      setShowTooltip(true);
    }, delay);
  };

  const onMouseLeave = () => {
    clearTimeout(timeoutIdReference.current);
    setShowTooltip(false);
  };

  const onMouseMove = (event: MouseEvent) => {
    if (mouseTrack) {
      setMousePosition({ top: event.clientY, left: event.clientX });
    }
  };

  return {
    mousePosition,
    showTooltip,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
  };
}
