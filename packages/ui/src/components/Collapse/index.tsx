import React, { useEffect, useRef, useState } from "react";

import type { ReactNode } from "react";
import "./collapse.css";

interface Properties {
  children: ReactNode;
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
    <div className="collapse" ref={contentReference} style={{ height }}>
      {children}
    </div>
  );
};
export default Collapse;
