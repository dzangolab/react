import React, { RefObject, useRef, FC, useEffect } from "react";
import { createPortal } from "react-dom";

import { useTooltip } from "./UseTooltip";

type TooltipProperties = {
  children: React.ReactNode;
  className?: string;
  elementRef: RefObject<HTMLElement>;
  style?: object;
};

export const TooltipWrapper: FC<TooltipProperties> = ({
  children,
  className,
  elementRef,
  style,
}) => {
  const tooltipReference = useRef<HTMLDivElement>(null);

  const { position, isVisible, onMouseEnter, onMouseLeave } = useTooltip({
    ref: elementRef,
    tooltipReference,
  });

  useEffect(() => {
    const element = elementRef?.current;

    if (element) {
      element.addEventListener("mouseenter", onMouseEnter);
      element.addEventListener("mouseleave", onMouseLeave);
    }

    return () => {
      if (element) {
        element.removeEventListener("mouseenter", onMouseEnter);
        element.removeEventListener("mouseleave", onMouseLeave);
      }
    };
  }, [elementRef, onMouseEnter, onMouseLeave]);

  if (!isVisible) {
    return null;
  }

  return (
    <>
      {isVisible &&
        createPortal(
          <div
            ref={tooltipReference}
            className={className ? className : "tooltip-container"}
            style={{
              top: position.top,
              left: position.left,
              ...style,
            }}
          >
            {children}
          </div>,
          document.body,
        )}
    </>
  );
};
