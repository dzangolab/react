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
  mouseTrack,
  offset,
  position,
  style,
}) => {
  const tooltipReference = useRef<HTMLDivElement>(null);

  const {
    tooltipPosition,
    showTooltip,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
  } = useTooltip({
    delay,
    mouseTrack,
    offset,
    position,
    ref: elementRef,
    tooltipReference,
  });

  const calculateClassName = (mouseTrack: boolean, position?: string) => {
    if (mouseTrack) {
      return "tooltip-container";
    } else {
      return `tooltip-container ${position}`;
    }
  };

  useEffect(() => {
    const element = elementRef?.current;

    if (element) {
      element.addEventListener("mouseenter", onMouseEnter);
      element.addEventListener("mouseleave", onMouseLeave);
      element.addEventListener("mousemove", onMouseMove);
    }

    return () => {
      if (element) {
        element.removeEventListener("mouseenter", onMouseEnter);
        element.removeEventListener("mouseleave", onMouseLeave);
        element.removeEventListener("mousemove", onMouseMove);
      }
    };
  }, [elementRef, onMouseEnter, onMouseLeave, onMouseMove]);

  if (!showTooltip) {
    return null;
  }

  const calculatedClassName = calculateClassName(mouseTrack || false, position);

  return (
    <>
      {createPortal(
        <div
          ref={tooltipReference}
          className={className ? className : calculatedClassName}
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
