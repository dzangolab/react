import { Placement } from "@popperjs/core";
import { OffsetsFunction } from "@popperjs/core/lib/modifiers/offset";
import { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";

import type { FC, LegacyRef, ReactNode } from "react";

interface PopupMenuProperties {
  className?: string;
  content: ReactNode;
  matchReferenceWidth?: boolean;
  offset?: number;
  position?: Placement;
  referenceElement: Element | null;
  toggle?: () => void;
}

export const PopupMenu: FC<PopupMenuProperties> = ({
  className = "",
  content,
  matchReferenceWidth = false,
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
        width: matchReferenceWidth
          ? referenceElement?.getBoundingClientRect().width
          : "auto",
      }}
      onClick={toggle}
      {...attributes.popper}
    >
      {content}
    </div>,
    portalRoot,
  );
};
