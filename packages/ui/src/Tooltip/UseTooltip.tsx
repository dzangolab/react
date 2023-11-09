import { useState, RefObject, useCallback, useEffect } from "react";

type Position = {
  top?: number;
  left?: number;
};

type UseTooltipProperties = {
  ref: RefObject<HTMLElement>;
  tooltipReference: RefObject<HTMLDivElement>;
  offset?: number;
  position?: "top" | "bottom" | "right" | "left";
};

export function useTooltip({
  ref,
  tooltipReference,
  offset = 5,
  position,
}: UseTooltipProperties) {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [tooltipPosition, setTooltipPosition] = useState<Position>({});

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (showTooltip) {
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
          break;
        default:
          setTooltipPosition({
            top: top - tooltipHeight,
            left: horizontalCenter,
          });
      }
    }

    if (!showTooltip) {
      setTooltipPosition({});
    }
  }, [showTooltip, ref]);

  const onMouseEnter = useCallback(() => {
    setShowTooltip(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setShowTooltip(false);
  }, []);

  return {
    tooltipPosition: {
      top: tooltipPosition.top,
      left: tooltipPosition.left,
    },
    showTooltip,
    onMouseEnter,
    onMouseLeave,
  };
}
