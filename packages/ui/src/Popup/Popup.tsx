import React, { useState, useEffect, useRef, ReactNode } from "react";
import { createPortal } from "react-dom";

export interface PopupProperties {
  trigger: ReactNode;
  content: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  offset?: number;
  margin?: number;
}

export const Popup: React.FC<PopupProperties> = ({
  trigger,
  content,
  position = "bottom",
  offset = 10,
  margin = 10,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popupReference = useRef<HTMLDivElement>(null);
  const triggerReference = useRef<HTMLDivElement>(null);
  const [popupContentPosition, setPopupContentPosition] = useState<
    React.CSSProperties | undefined
  >();
  const [viewportDimension, setViewportDimension] = useState<{
    width: number;
    height: number;
  }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

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

  useEffect(() => {
    window.addEventListener("resize", () => {
      setViewportDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    });

    return () => {
      window.removeEventListener("resize", () => {
        setViewportDimension({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      });
    };
  }, []);

  useEffect(() => {
    if (!triggerReference.current) {
      return;
    }

    if (isOpen) {
      const { left, right, top, bottom, height, width } =
        triggerReference.current.getBoundingClientRect();

      const popupContentWidth =
        popupReference?.current?.getBoundingClientRect().width || 0;

      const popupContentHeight =
        popupReference?.current?.getBoundingClientRect().height || 0;

      const horizontalCenter = left + width / 2 - popupContentWidth / 2;

      const verticalCenter = top + height / 2 - popupContentHeight / 2;

      let newPosition = {} as { top: number; left: number };

      switch (position) {
        case "top":
          newPosition = {
            top: top - popupContentHeight - offset,
            left: horizontalCenter,
          };
          break;
        case "bottom":
          newPosition = {
            top: bottom + offset,
            left: horizontalCenter,
          };
          break;
        case "right":
          newPosition = {
            top: verticalCenter,
            left: right + offset,
          };
          break;
        case "left":
          newPosition = {
            top: verticalCenter,
            left: left - popupContentWidth - offset,
          };
          break;
        default:
          break;
      }

      // Adjust the position to stay within the screen boundaries
      const viewportWidth = viewportDimension.width;
      const viewportHeight = viewportDimension.height;

      if (
        newPosition.left + popupContentWidth > viewportWidth - margin ||
        newPosition.left < margin
      ) {
        newPosition.left = Math.min(
          Math.max(margin, newPosition.left),
          viewportWidth - popupContentWidth - margin,
        );
      }

      if (
        newPosition.top + popupContentHeight > viewportHeight - margin ||
        newPosition.top < margin
      ) {
        newPosition.top = Math.min(
          Math.max(margin, newPosition.top),
          viewportHeight - popupContentHeight - margin,
        );
      }

      setPopupContentPosition(newPosition);
    }

    if (!isOpen) {
      setPopupContentPosition({});
    }
  }, [isOpen, triggerReference, position, popupReference, viewportDimension]);

  const portalRoot = document.getElementById("portal-root") || document.body;

  const renderPopupContent = () => {
    return createPortal(
      <div
        className={`popup-content position-${position}`}
        ref={popupReference}
        style={popupContentPosition}
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
