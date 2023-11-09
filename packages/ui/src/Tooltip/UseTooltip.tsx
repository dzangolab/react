import { useState, RefObject, useCallback, useEffect } from "react";

type Position = {
  top?: number;
  left?: number;
};

type UseTooltipProperties = {
  ref: RefObject<HTMLElement>;
  tooltipReference: RefObject<HTMLDivElement>;
};

export function useTooltip({ ref, tooltipReference }: UseTooltipProperties) {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({});

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (showTooltip) {
      const { left, width, top } = ref.current.getBoundingClientRect();

      const tooltipWidth =
        tooltipReference?.current?.getBoundingClientRect().width || 0;

      const tooltipHeight =
        tooltipReference?.current?.getBoundingClientRect().height || 0;

      const middle = left + width / 2 - tooltipWidth / 2;

      setPosition({
        top: top - tooltipHeight,
        left: middle,
      });
    }

    if (!showTooltip) {
      setPosition({});
    }
  }, [showTooltip, ref]);

  const onMouseEnter = useCallback(() => {
    setShowTooltip(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setShowTooltip(false);
  }, []);

  return {
    position: {
      top: position.top ?? 0,
      left: position.left ?? 0,
    },
    showTooltip,
    onMouseEnter,
    onMouseLeave,
  };
}
