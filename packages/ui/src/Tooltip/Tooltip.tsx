import { VirtualElement } from "@popperjs/core";
import { OffsetsFunction } from "@popperjs/core/lib/modifiers/offset";
import React, {
  RefObject,
  FC,
  useEffect,
  useCallback,
  useState,
  useMemo,
} from "react";
import { createPortal, findDOMNode } from "react-dom";
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
  } = { ...tooltipConfig, ...tooltipProperties };
  const [tooltipReference, setTooltipReference] =
    useState<HTMLDivElement | null>();

  const {
    mousePosition,
    showTooltip,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
  } = useTooltip({
    delay,
    mouseTrack,
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

  const renderedClassName = renderClassName(mouseTrack, position);

  const setOffset: OffsetsFunction = useCallback(() => {
    return [0, offset];
  }, []);

  const virtualElement = useMemo(() => {
    return {
      getBoundingClientRect: () => ({
        width: 0,
        height: 0,
        top: mousePosition.top,
        right: mousePosition.left,
        bottom: mousePosition.top,
        left: mousePosition.left,
      }),
    };
  }, [mousePosition]);

  const { styles, attributes } = usePopper(
    mouseTrack
      ? (virtualElement as VirtualElement)
      : (findDOMNode(elementRef.current) as Element),
    tooltipReference,
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

  if (!showTooltip) {
    return null;
  }

  return (
    <>
      {createPortal(
        <div
          ref={setTooltipReference}
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
