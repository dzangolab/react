import React, { useEffect, useRef, useState } from "react";

import type { ReactNode } from "react";
import "./collapse.css";

interface Properties {
  children: ReactNode;
  label: string;
  isOpen: boolean;
}

const Collapse = ({ children, isOpen }: Properties) => {
  const contentReference = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    switch (isOpen) {
      case true: {
        const { current } = contentReference;
        if (current) setHeight(`${current.scrollHeight}px`);
        break;
      }

      default: {
        setHeight("0px");
        break;
      }
    }
  }, [isOpen]);

  return (
    <div
      className="collapse-content-parent"
      ref={contentReference}
      style={{ height }}
    >
      <div className="collapse-content">{children}</div>
    </div>
  );
};
export default Collapse;
