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
  triggerEvent?: "click" | "mouseover";
  content: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  offset?: number;
  margin?: number;
}

export const Popup: React.FC<PopupProperties> = ({
  trigger,
  triggerEvent = "click",
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

  const handleOutsideEvent = (event: MouseEvent) => {
    if (popperElement && referenceElement) {
      if (
        !popperElement.contains(event.target as Node) &&
        !referenceElement.contains(event.target as Node)
      )
        closePopup();
    }
  };

  useEffect(() => {
    document.addEventListener(triggerEvent, handleOutsideEvent);

    return () => {
      document.removeEventListener(triggerEvent, handleOutsideEvent);
    };
  }, [handleOutsideEvent]);

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

  const triggerEventProperty = {
    [triggerEvent === "mouseover" ? "onMouseEnter" : "onClick"]: togglePopup,
  };

  return (
    <div className="popup-container">
      <div
        className="popup-trigger"
        ref={setReferenceElement as LegacyRef<HTMLDivElement>}
        {...triggerEventProperty}
      >
        {trigger}
      </div>
      {isOpen ? renderPopupContent() : null}
    </div>
  );
};
