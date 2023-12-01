import { OffsetsFunction } from "@popperjs/core/lib/modifiers/offset";
import React, { useState, ReactNode, LegacyRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";

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
}) => {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);

  const setOffset: OffsetsFunction = useCallback(({ placement }) => {
    if (placement === "bottom" || placement === "top") {
      return [offset, 0];
    } else {
      return [0, offset];
    }
  }, []);

  console.log(referenceElement, popperElement);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
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
  });

  const portalRoot = document.getElementById("portal-root") || document.body;

  const renderPopupContent = () => {
    return createPortal(
      <div
        className={`popup-content`}
        ref={setPopperElement as LegacyRef<HTMLDivElement>}
        style={styles.popper}
        {...attributes.popper}
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
        ref={setReferenceElement as LegacyRef<HTMLDivElement>}
      >
        {trigger}
      </div>
      {renderPopupContent()}
    </div>
  );
};
