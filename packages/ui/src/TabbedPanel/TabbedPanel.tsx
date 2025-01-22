import React, { useEffect, useMemo, useRef, useState } from "react";

import { getStorage } from "../utils";
import { getOrientation, onTabDown } from "./utils";

import type { Properties } from "./types";

const TabbedPanel: React.FC<Properties> = ({
  defaultActiveIndex = 0,
  position = "top",
  id = "",
  persistState = true,
  persistStateStorage = "localStorage",
  tabs,
}) => {
  const [active, setActive] = useState<number | null>(null);
  const tabReferences = useRef<(HTMLButtonElement | null)[]>([]);
  const activeTabStorageKey = useMemo(() => `tab-${id}-active-index`, [id]);

  const storage = useMemo(
    () => getStorage(persistStateStorage),
    [persistStateStorage],
  );

  useEffect(() => {
    if (persistState && id) {
      const activeTabIndex = storage.getItem(activeTabStorageKey);
      if (activeTabIndex !== null) {
        setActive(Number(activeTabIndex));
      } else {
        setActive(defaultActiveIndex);
      }
    } else {
      setActive(defaultActiveIndex);
    }
  }, [id, persistState, defaultActiveIndex]);

  useEffect(() => {
    if (persistState && id) {
      storage.setItem(activeTabStorageKey, String(active));
    }
  }, [active, id, persistState]);

  const handleFocus = (index: number) => {
    const tab = tabReferences.current[index];
    if (tab) {
      tab.focus();
    }
  };

  if (active === null || !tabs || tabs.length === 0) {
    return null;
  }

  return (
    <div className={`tabbed-panel ${position}`}>
      <div role="tablist" aria-orientation={getOrientation(position)}>
        {tabs.map((item, index) => {
          const isActive = active === index;
          const title = item.label;
          const icon = item.icon;
          const key = id ? `${id}-${index}` : index;

          return (
            <button
              onKeyDown={(event) => {
                onTabDown(
                  active,
                  event,
                  tabs.length,
                  handleFocus,
                  getOrientation(position),
                );
              }}
              onFocus={() => setActive(index)}
              ref={(element) => (tabReferences.current[index] = element)}
              onClick={() => setActive(index)}
              key={key}
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
      <div role="tabpanel">{tabs && tabs[active].children}</div>
    </div>
  );
};

export default TabbedPanel;
