import React, { useEffect, useId, useRef, useState } from "react";

import { getOrientation, onTabDown } from "./helper";

import type { Properties } from "./types";

const TabbedPanel: React.FC<Properties> = ({
  children,
  defaultActiveIndex = 0,
  position = "top",
  tabId = "",
  persistState = false,
}) => {
  const id = useId();
  const [active, setActive] = useState<number | null>(null);
  const tabReferences = useRef<(HTMLButtonElement | null)[]>([]);
  const childNodes = Array.isArray(children) ? children : [children];

  useEffect(() => {
    if (persistState && tabId) {
      const activeTabIndex = localStorage.getItem(
        `tab-active-${tabId}`.trimEnd(),
      );

      if (activeTabIndex !== null) {
        setActive(Number(activeTabIndex));
      } else {
        setActive(defaultActiveIndex);
      }
    } else {
      setActive(defaultActiveIndex);
    }

    return () => {
      if (persistState && tabId) {
        localStorage.removeItem(`tab-active-${tabId}`.trimEnd());
      }
    };
  }, [tabId, persistState, defaultActiveIndex]);

  useEffect(() => {
    if (persistState && tabId) {
      localStorage.setItem(`tab-active-${tabId}`.trimEnd(), String(active));
    }
  }, [active, tabId, persistState]);

  const handleFocus = (index: number) => {
    const tab = tabReferences.current[index];
    if (tab) {
      tab.focus();
    }
  };

  if (!children) {
    throw new Error("TabbedPanel needs at least one child");
  }

  if (active === null) {
    return null;
  }

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
