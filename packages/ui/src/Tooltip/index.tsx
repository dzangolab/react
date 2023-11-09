import React, { RefObject, useRef, FC, useEffect } from "react";
import { createPortal } from "react-dom";

import { useTooltip } from "./UseTooltip";

type TooltipProperties = {
  children: React.ReactNode;
  className?: string;
  elementRef: RefObject<HTMLElement>;
  style?: object;
  position?: "top" | "bottom" | "right" | "left";
};

export const Tooltip: FC<TooltipProperties> = ({
  children,
  className,
  elementRef,
  style,
  position,
}) => {
  const tooltipReference = useRef<HTMLDivElement>(null);

  const { tooltipPosition, showTooltip, onMouseEnter, onMouseLeave } =
    useTooltip({
      ref: elementRef,
      tooltipReference,
      position,
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
          className={className ? className : "tooltip-container"}
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
