import { useState, RefObject, useCallback, useEffect } from "react";

type Position = {
  top?: number;
  left?: number;
};

type UseTooltipProps = {
  ref: RefObject<HTMLElement>;
};

export function useTooltip({ ref }: UseTooltipProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({});

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (isVisible) {
      const { left,bottom } = ref.current.getBoundingClientRect();
      setPosition({
        top: bottom,
        left: left,
      });
    }

    if (!isVisible) {
      setPosition({});
    }
  }, [isVisible, ref]);

  const onMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  return {
    position: {
      top: position.top ?? 0,
      left: position.left ?? 0,
    },
    isVisible,
    onMouseEnter,
    onMouseLeave,
  };
}

