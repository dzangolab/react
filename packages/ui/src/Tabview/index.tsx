import React, { useEffect, useRef, useState } from "react";

import { getOrientation, onTabDown } from "./utils";

import type { Properties } from "./types";

const Tabview: React.FC<Properties> = ({
  activeTabIndex = 0,
  position = "top",
  tabs,
  visibleTabs: _visibleTabs = [],
  onClose,
}) => {
  const [visibleTabs, setVisibleTabs] = useState(_visibleTabs);
  const [active, setActive] = useState<number>(activeTabIndex);
  const tabReferences = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    setVisibleTabs(_visibleTabs);
  }, [_visibleTabs]);

  const handleFocus = (index: number) => {
    const tab = tabReferences.current[index];
    if (tab) {
      tab.focus();
    }
  };

  if (!visibleTabs) {
    throw new Error("Tabview needs at least one tab");
  }

  const filteredTabs = tabs?.filter((tab) =>
    visibleTabs?.some((visibleTab) => visibleTab.key === tab.key),
  );

  if (!filteredTabs || active === null) {
    return null;
  }

  const handleTabClose = (key: string) => {
    const newVisibleTabs = visibleTabs.filter((tab) => tab.key !== key);
    setVisibleTabs(newVisibleTabs);
    if (active === filteredTabs.findIndex((tab) => tab.key === key)) {
      if (newVisibleTabs.length > 0) {
        const newActiveIndex = Math.min(active, newVisibleTabs.length - 1);
        setActive(newActiveIndex);
      }
    }

    if (onClose) {
      onClose(key);
    }
  };

  return (
    <div className={`tabbed-panel ${position}`}>
      <div role="tablist" aria-orientation={getOrientation(position)}>
        {filteredTabs.map((item, index) => {
          const isActive = active === index;
          const title = item.label;
          const icon = item.icon;
          const key = index;

          return (
            <button
              onKeyDown={(event) => {
                onTabDown(
                  active,
                  event,
                  filteredTabs.length,
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
              {item.closable ? (
                <span
                  className="close-tab-icon"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleTabClose(item.key);
                  }}
                >
                  <i className="pi pi-times"></i>
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
      <div role="tabpanel">{filteredTabs[active]?.children}</div>
    </div>
  );
};

export default Tabview;
