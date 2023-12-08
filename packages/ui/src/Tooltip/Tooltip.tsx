import { OffsetsFunction } from "@popperjs/core/lib/modifiers/offset";
import React, { RefObject, useRef, FC, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";

import { getTooltipConfig } from "./ConfigureTooltip";
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

export const Tooltip: FC<TooltipProperties> = (tooltipProperties) => {
  const tooltipConfig = getTooltipConfig();

  const {
    children,
    className,
    delay,
    elementRef,
    mouseTrack,
    offset,
    position,
    style,
  } = { ...tooltipConfig, ...tooltipProperties };

  const tooltipReference = useRef<HTMLDivElement>(null);

  const {
    mousePosition,
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

  const renderClassName = (mouseTrack?: boolean, position?: string) => {
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

  const renderedClassName = renderClassName(mouseTrack, position);

  const setOffset: OffsetsFunction = useCallback(() => {
    return [0, offset];
  }, []);

  const { styles, attributes } = usePopper(
    elementRef.current,
    tooltipReference.current,
    {
      modifiers: [
        {
          name: "offset",
          options: {
            offset: setOffset,
          },
        },
        {
          name: "hide",
        },
      ],
      placement: position,
    },
  );

  return (
    <>
      {createPortal(
        <div
          ref={tooltipReference}
          className={className ? className : renderedClassName}
          style={styles.popper}
          {...attributes}
        >
          {children}
        </div>,
        document.body,
      )}
    </>
  );
};
