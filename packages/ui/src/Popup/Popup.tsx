import { OffsetsFunction } from "@popperjs/core/lib/modifiers/offset";
import React, {
  useState,
  ReactNode,
  LegacyRef,
  useCallback,
  useEffect,
} from "react";
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
  margin,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [referenceElement, setReferenceElement] = useState<Element | null>(
    null,
  );
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);

  const setOffset: OffsetsFunction = useCallback(() => {
    return [0, offset];
  }, []);

  const togglePopup = () => {
    setIsOpen((previousIsOpen) => !previousIsOpen);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (popperElement && referenceElement) {
      if (
        !popperElement.contains(event.target as Node) &&
        !referenceElement.contains(event.target as Node)
      )
        closePopup();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [handleOutsideClick]);

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
        onClick={togglePopup}
      >
        {trigger}
      </div>
      {isOpen ? renderPopupContent() : null}
    </div>
  );
};
