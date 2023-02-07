import React, { useId, useState } from "react";

import { getOrientation, onTabDown } from "./helper";

import "./tabs.css";

import type { Properties } from "./types";

const TabbedPanel: React.FC<Properties> = ({ children, position = "top" }) => {
  const id = useId();
  const [active, setActive] = useState(0);
  const childNodes = Array.isArray(children) ? children : [children];

  const handleIndex = (index: number) => {
    setActive(index);
  };

  if (!children) {
    throw new Error("TabbedPanel needs at least one children");
  }

  return (
    <div className={`tabbed-panel ${position}`}>
      <div
        aria-label="tabs"
        role="tablist"
        aria-orientation={getOrientation(position)}
      >
        {childNodes.map((item, index) => (
          <button
            onKeyDown={(event) => {
              onTabDown(
                active,
                event,
                childNodes.length,
                handleIndex,
                getOrientation(position)
              );
            }}
            onClick={() => handleIndex(index)}
            key={`${id}-${index}`}
            role="tab"
            aria-selected={active === index}
            tabIndex={index === active ? 0 : -1}
            className={active === index ? "active" : ""}
          >
            {item.props.icon ? (
              <img src={item.props.icon} alt="title icon" />
            ) : null}
            <span>{item.props.title}</span>
          </button>
        ))}
      </div>
      <section role="tabpanel" tabIndex={0}>
        {childNodes[active]}
      </section>
    </div>
  );
};

export default TabbedPanel;
