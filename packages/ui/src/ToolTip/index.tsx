import React, { useState } from "react";
import { createPortal } from "react-dom";

interface Properties {
  message: string;
  children: React.ReactNode;
  position?: "top" | "right" | "bottom" | "left";
  className?: string;
  style?: object;
}

export const ToolTip = ({
  message,
  children,
  position,
  className,
  style,
}: Properties) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [toolTipPosition, setToolTipPosition] = useState({ top: 0, left: 0 });

  const handleMouseEnter = (event: any) => {
    const rect = event.target.getBoundingClientRect();

    switch (position) {
      case "top":
        setToolTipPosition({
          top: rect.top - 5,
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
          left: rect.left - 5,
        });
    }

    setShowTooltip(true);
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
      {children}
      {showTooltip &&
        createPortal(
          <div
            style={{
              top: toolTipPosition.top,
              left: toolTipPosition.left,
              ...style,
            }}
            className={className ? className : "tooltip"}
          >
            {message}
          </div>,
          document.body,
        )}
    </div>
  );
};
