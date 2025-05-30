import { Placement } from "@popperjs/core";
import {
  FC,
  LegacyRef,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

import { PopupMenu } from "./PopupMenu";

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

  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (!referenceElement) {
        return;
      }

      const popperElement = document.querySelector(".popup-content");

      if (
        popperElement &&
        !popperElement.contains(event.target as Node) &&
        !referenceElement.contains(event.target as Node)
      ) {
        closePopup?.();
      }
    },
    [referenceElement, closePopup],
  );

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [handleOutsideClick]);

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
      {(isControlled ? isOpenControlled : isOpen) ? (
        <PopupMenu
          referenceElement={referenceElement}
          content={content}
          position={position}
          offset={offset}
          toggle={togglePopup}
        />
      ) : null}
    </div>
  );
};
