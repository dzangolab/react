import { useState, RefObject, useCallback, useEffect } from "react";

type Position = {
  top?: number;
  left?: number;
};

type UseTooltipProperties = {
  ref: RefObject<HTMLElement>;
};

export function useTooltip({ ref }: UseTooltipProperties) {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({});

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (showTooltip) {
      const { left, bottom } = ref.current.getBoundingClientRect();
      setPosition({
        top: bottom,
        left: left,
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
