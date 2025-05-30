import { Placement } from "@popperjs/core";
import { OffsetsFunction } from "@popperjs/core/lib/modifiers/offset";
import { FC, LegacyRef, ReactNode, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";

// PopupMenu.tsx Component
interface PopupMenuProperties {
  referenceElement: Element | null;
  content: ReactNode;
  position?: Placement;
  offset?: number;
  toggle?: () => void;
}

export const PopupMenu: FC<PopupMenuProperties> = ({
  referenceElement,
  content,
  position,
  offset = 10,
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
      className="popup-content"
      ref={setPopperElement as LegacyRef<HTMLDivElement>}
      style={styles.popper}
      onClick={toggle}
      {...attributes.popper}
    >
      {content}
    </div>,
    portalRoot,
  );
};
