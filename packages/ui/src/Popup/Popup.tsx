import { Placement } from "@popperjs/core";
import { OffsetsFunction } from "@popperjs/core/lib/modifiers/offset";
import {
  FC,
  LegacyRef,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";

interface UncontrolledProperties {
  trigger: ReactNode;
  content: JSX.Element;
  position?: Placement;
  offset?: number;
  className?: string;
}

export type PopupProperties = {
  isControlled?: boolean;
  toggle?: () => void;
  close?: () => void;
  isOpen?: boolean;
} & UncontrolledProperties;

export const Popup: FC<PopupProperties> = ({
  className = "",
  isControlled = false,
  toggle,
  close,
  isOpen: isOpenControlled,
  trigger,
  content,
  position,
  offset = 10,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [referenceElement, setReferenceElement] = useState<Element | null>(
    null,
  );
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);

  const setOffset: OffsetsFunction = useCallback(() => {
    return [0, offset];
  }, []);

  const togglePopup = isControlled
    ? toggle
    : () => {
        setIsOpen((previousIsOpen) => !previousIsOpen);
      };

  const closePopup = isControlled
    ? close
    : () => {
        setIsOpen(false);
      };

  const handleOutsideClick = (event: MouseEvent) => {
    if (popperElement && referenceElement) {
      if (
        !popperElement.contains(event.target as Node) &&
        !referenceElement.contains(event.target as Node)
      )
        closePopup?.();
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
        onClick={togglePopup}
        {...attributes.popper}
      >
        {content}
      </div>,
      portalRoot,
    );
  };

  return (
    <div className={`popup-container ${className}`.trim()}>
      <div
        className="popup-trigger"
        ref={setReferenceElement as LegacyRef<HTMLDivElement>}
        onClick={togglePopup}
        aria-controls="popup-content"
        aria-expanded={isControlled ? isOpenControlled : isOpen}
      >
        {trigger}
      </div>
      {(isControlled ? isOpenControlled : isOpen) ? renderPopupContent() : null}
    </div>
  );
};
