import React, { useEffect, useRef, useState } from "react";

import type { ReactNode } from "react";
import "./collapse.css";

interface Properties {
  children: ReactNode;
  direction?: "horizontal" | "vertical";
  isOpen: boolean;
}

const Collapse = ({ children, direction, isOpen }: Properties) => {
  const contentReference = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({});

  useEffect(() => {
    switch (isOpen) {
      case true: {
        const { current } = contentReference;
        if (!current) return;
        if (direction === "vertical") {
          setStyle({ height: `${current.scrollHeight}px` });
        } else {
          setStyle({ width: `100%` });
        }

        break;
      }

      default: {
        if (direction === "vertical") {
          setStyle({ height: "0px" });
        } else {
          setStyle({ width: "0px" });
        }
        break;
      }
    }
  }, [isOpen, direction]);

  return (
    <div className="collapse" ref={contentReference} style={style}>
      {children}
    </div>
  );
};

Collapse.defaultProps = {
  direction: "vertical",
};

export default Collapse;
