import React, { useState } from "react";
import { createPortal } from "react-dom";

interface Properties {
  text: string;
  children: React.ReactNode;
}

const Tooltip = ({ text, children }: Properties) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const showTooltip = (event: any) => {
    const rect = event.target.getBoundingClientRect();
    setPosition({
      top: rect.bottom + 5,
      left: rect.left,
    });
    setVisible(true);
  };

  const hideTooltip = () => {
    setVisible(false);
  };

  return (
    <div
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      style={{ position: "relative", display: "inline-block" }}
    >
      {children}
      {visible &&
        createPortal(
          <div
            style={{
              position: "absolute",
              top: position.top,
              left: position.left,
              background: "rgba(0, 0, 0, 0.7)",
              color: "white",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            {text}
          </div>,
          document.body,
        )}
    </div>
  );
};

export default Tooltip;
