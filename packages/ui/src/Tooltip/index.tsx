import React, { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface Properties {
  message: string;
  children: React.ReactNode;
  position?: "top" | "right" | "bottom" | "left";
  className?: string;
}

export const ToolTip = ({
  message,
  children,
  position = "top",
  className = "tooltip",
}: Properties) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [toolTipPosition, setToolTipPosition] = useState({ top: 0, left: 0 });

  const tooltipReference = useRef<HTMLDivElement | null>(null);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (tooltipReference.current) {
      setWidth(tooltipReference.current.offsetWidth);
      setHeight(tooltipReference.current.offsetHeight);
    }
  }, [showTooltip, position]);

  const handleMouseEnter = (event: any) => {
    setShowTooltip(true);
    const rect = event.target.getBoundingClientRect();
    switch (position) {
      case "top":
        setToolTipPosition({
          top: rect.top - height,
          left: rect.left,
        });
        break;
      case "right":
        setToolTipPosition({
          top: rect.top,
          left: rect.right + 5,
        });
        break;
      case "bottom":
        setToolTipPosition({
          top: rect.bottom + 5,
          left: rect.left,
        });
        break;
      case "left":
        setToolTipPosition({
          top: rect.top,
          left: rect.left - width,
        });
        break;
      default:
        break;
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="tooltip-container"
    >
      {" "}
      {children}
      {showTooltip &&
        createPortal(
          <div
            style={{
              top: toolTipPosition.top,
              left: toolTipPosition.left,
            }}
            className={className}
            ref={tooltipReference}
          >
            {message}
          </div>,
          document.body,
        )}
    </div>
  );
};
