import React, { RefObject, useRef, FC, useEffect } from "react";
import { createPortal } from "react-dom";

import { useTooltip } from "./UseTooltip";

type TooltipProperties = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  elementRef: RefObject<HTMLElement>;
  mouseTrack?: boolean;
  offset?: number;
  position?: "top" | "bottom" | "right" | "left";
  style?: object;
};

export const Tooltip: FC<TooltipProperties> = ({
  children,
  className,
  delay,
  elementRef,
  mouseTrack = false,
  offset,
  position,
  style,
}) => {
  const tooltipReference = useRef<HTMLDivElement>(null);

  const { tooltipPosition, showTooltip, onMouseEnter, onMouseLeave } =
    useTooltip({
      delay,
      mouseTrack,
      offset,
      position,
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

  if (!showTooltip) {
    return null;
  }

  return (
    <>
      {createPortal(
        <div
          ref={tooltipReference}
          className={className ? className : `tooltip-container ${position}`}
          style={{
            top: tooltipPosition.top,
            left: tooltipPosition.left,
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
