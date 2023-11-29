import React, { useState, useEffect, useRef, ReactNode } from "react";
import { createPortal } from "react-dom";

export interface PopupProperties {
  trigger: ReactNode;
  content: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

export const Popup: React.FC<PopupProperties> = ({
  trigger,
  content,
  position = "bottom",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popupReference = useRef<HTMLDivElement>(null);
  const triggerReference = useRef<HTMLDivElement>(null);

  const togglePopup = () => {
    setIsOpen((previousIsOpen) => !previousIsOpen);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      popupReference.current &&
      triggerReference.current &&
      !popupReference.current.contains(event.target as Node) &&
      !triggerReference.current.contains(event.target as Node)
    ) {
      closePopup();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const portalRoot = document.getElementById("portal-root") || document.body;

  const calculatePosition = () => {
    if (triggerReference.current) {
      const triggerRect = triggerReference.current.getBoundingClientRect();
      const offset = 10; // Adjust as needed

      const positionStyles: React.CSSProperties = {
        top: triggerRect.bottom + offset,
        left: triggerRect.left - offset,
      };

      return positionStyles;
    }
  };

  const renderPopupContent = () => {
    return createPortal(
      <div
        className={`popup-content position-${position}`}
        ref={popupReference}
        style={calculatePosition()}
      >
        {content}
      </div>,
      portalRoot,
    );
  };

  return (
    <div className="popup-container">
      <div
        className="popup-trigger"
        onClick={togglePopup}
        ref={triggerReference}
      >
        {trigger}
      </div>
      {isOpen && renderPopupContent()}
    </div>
  );
};
