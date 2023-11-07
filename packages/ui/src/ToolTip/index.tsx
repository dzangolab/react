import React, { useState } from "react";
import { createPortal } from "react-dom";

interface Properties {
  message: string;
  children: React.ReactNode;
  position: { top: number; left: number };
  className?: string;
}

export const ToolTip = ({
  message,
  children,
  position,
  className,
}: Properties) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [toolTipPosition, setToolTipPositions] = useState(position);

  const handleMouseEnter = (event: any) => {
    const rect = event.target.getBoundingClientRect();

    setToolTipPositions({
      top: rect.bottom + position.top,
      left: rect.left + position.left,
    });

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
