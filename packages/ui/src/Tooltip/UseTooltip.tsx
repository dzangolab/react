import { useState, RefObject, useCallback, useEffect } from "react";

type Position = {
  top: number;
  left: number;
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
  ref,
  tooltipReference,
  offset = 5,
  position,
  mouseTrack = false,
}: UseTooltipProperties) {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [tooltipPosition, setTooltipPosition] = useState<Position>({
    top: 0,
    left: 0,
  });
  const [mousePosition, setMousePosition] = useState<Position>({
    top: 0,
    left: 0,
  });
  let timeoutId: ReturnType<typeof setTimeout>;

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (showTooltip) {
      if (mouseTrack && mousePosition) {
        setTooltipPosition({
          top: mousePosition.top + offset,
          left: mousePosition.left + 2 * offset,
        });
      } else {
        const { left, right, top, bottom, height, width } =
          ref.current.getBoundingClientRect();

        const tooltipWidth =
          tooltipReference?.current?.getBoundingClientRect().width || 0;

        const tooltipHeight =
          tooltipReference?.current?.getBoundingClientRect().height || 0;

        const horizontalCenter = left + width / 2 - tooltipWidth / 2;

        const verticalCenter = top + height / 2 - tooltipHeight / 2;

        switch (position) {
          case "top":
            setTooltipPosition({
              top: top - tooltipHeight - offset,
              left: horizontalCenter,
            });
            break;
          case "bottom":
            setTooltipPosition({
              top: bottom + offset,
              left: horizontalCenter,
            });
            break;
          case "right":
            setTooltipPosition({
              top: verticalCenter,
              left: right + offset,
            });
            break;
          case "left":
            setTooltipPosition({
              top: verticalCenter,
              left: left - tooltipWidth - offset,
            });
        }
      }
    }

    if (!showTooltip) {
      setTooltipPosition({ top: 0, left: 0 });
    }
  }, [showTooltip, ref, mousePosition]);

  const onMouseEnter = useCallback(() => {
    timeoutId = setTimeout(() => {
      setShowTooltip(true);
    }, delay);
    console.log("mouseenter");
  }, [delay]);

  const onMouseLeave = () => {
    clearTimeout(timeoutId);
    setShowTooltip(false);
    console.log("mouseleave");
  };

  const onMouseMove = (event: MouseEvent) => {
    if (mouseTrack) {
      setMousePosition({ top: event.clientY, left: event.clientX });
    }
  };

  return {
    tooltipPosition: {
      top: tooltipPosition.top,
      left: tooltipPosition.left,
    },
    showTooltip,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
  };
}
