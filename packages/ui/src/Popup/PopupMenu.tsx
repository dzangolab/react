import { Placement } from "@popperjs/core";
import { OffsetsFunction } from "@popperjs/core/lib/modifiers/offset";
import { FC, LegacyRef, ReactNode, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";

interface PopupMenuProperties {
  className?: string;
  content: ReactNode;
  offset?: number;
  position?: Placement;
  referenceElement: Element | null;
  toggle?: () => void;
}

export const PopupMenu: FC<PopupMenuProperties> = ({
  className = "",
  content,
  offset = 10,
  position = "bottom-start",
  referenceElement,
  toggle,
}) => {
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const portalRoot = document.getElementById("portal-root") || document.body;

  const setOffset: OffsetsFunction = useCallback(() => {
    return [0, offset];
  }, [offset]);

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

  return createPortal(
    <div
      className={`popup-menu ${className}`.trim()}
      ref={setPopperElement as LegacyRef<HTMLDivElement>}
      style={{
        ...styles.popper,
        ...styles,
        width: referenceElement?.getBoundingClientRect().width,
      }}
      onClick={toggle}
      {...attributes.popper}
    >
      {content}
    </div>,
    portalRoot,
  );
};
