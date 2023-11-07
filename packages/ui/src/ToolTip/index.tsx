import React, { useState } from "react";
import { createPortal } from "react-dom";

interface Properties {
  message: string;
  children: React.ReactNode;
  position: { top: number; left: number; };
  className: string;
}

const ToolTip = ({ message, children, position, className}: Properties) => {
  const [visible, setVisible] = useState(false);
  const [toolTipPosition, setToolTipPositions] = useState(position);

  const showTooltip = (event: any) => {
    const rect = event.target.getBoundingClientRect();
    console.log(position)
    setToolTipPositions({
      top: rect.bottom + position.top,
      left: rect.left + position.left,
    });
   console.log(toolTipPosition)
    setVisible(true);
  };

  const hideTooltip = () => {
    setVisible(false);
  };

  return (
    <div
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      className="tooltip-container"
    >
      {children}
      {visible &&
        createPortal(
          <div
            style={{
              top: toolTipPosition.top,
              left: toolTipPosition.left,
            }}
            className="tooltip"
          >
            {message}
          </div>,
          document.body,
        )}
    </div>
  );
};

export default ToolTip;
