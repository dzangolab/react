import React, { useEffect, useId, useRef, useState } from "react";

import { getOrientation, onTabDown } from "./helper";

import type { Properties } from "./types";

const TabbedPanel: React.FC<Properties> = ({
  children,
  defaultActiveIndex = 0,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onTabChange,
  position = "top",
}) => {
  const id = useId();
  const [active, setActive] = useState(defaultActiveIndex);
  const tabReferences = useRef<(HTMLButtonElement | null)[]>([]);
  const childNodes = Array.isArray(children) ? children : [children];

  const handleFocus = (index: number) => {
    const tab = tabReferences.current[index];
    if (tab) {
      tab.focus();
    }
  };

  if (!children) {
    throw new Error("TabbedPanel needs at least one children");
  }

  useEffect(() => {
    setActive(defaultActiveIndex);
  }, [defaultActiveIndex]);

  return (
    <div className={`tabbed-panel ${position}`}>
      <div role="tablist" aria-orientation={getOrientation(position)}>
        {childNodes.map((item, index) => {
          const isActive = active === index;
          const title = item.props.title;
          const icon = item.props.icon;

          return (
            <button
              onKeyDown={(event) => {
                onTabDown(
                  active,
                  event,
                  childNodes.length,
                  handleFocus,
                  getOrientation(position),
                );
              }}
              onFocus={() => setActive(index)}
              ref={(element) => (tabReferences.current[index] = element)}
              onClick={() => setActive(index)}
              key={`${id}-${index}`}
              role="tab"
              aria-label={title}
              aria-disabled={isActive}
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              className={isActive ? "active" : ""}
            >
              {icon ? (
                <img src={icon} alt="title icon" aria-hidden="true" />
              ) : null}
              <span>{title}</span>
            </button>
          );
        })}
      </div>
      <div role="tabpanel">{childNodes[active]}</div>
    </div>
  );
};

export default TabbedPanel;
