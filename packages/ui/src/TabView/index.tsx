import React, { useEffect, useRef, useState } from "react";

import { getOrientation, onTabDown } from "./utils";

import type { Properties, Tab } from "./types";

const TabView: React.FC<Properties> = ({
  position = "top",
  tabs,
  visibleTabs: _visibleTabs,
  onClose,
  active,
  setActive,
}) => {
  const [visibleTabs, setVisibleTabs] = useState(_visibleTabs);

  useEffect(() => {
    setVisibleTabs(_visibleTabs);
  }, [_visibleTabs]);

  if (!visibleTabs || !tabs) {
    throw new Error("Tabview needs at least one tab");
  }

  const filteredTabs = visibleTabs
    .map((visibleTab) => {
      return tabs.find((tab) => tab.key === visibleTab.key);
    })
    .filter((tab): tab is Tab => tab !== undefined);

  if (!filteredTabs || active === null) {
    return null;
  }

  const handleTabClose = (key: string) => {
    const newVisibleTabs = visibleTabs.filter((tab) => tab.key !== key);
    setVisibleTabs(newVisibleTabs);
    setActive(newVisibleTabs[0].key);

    if (onClose) {
      onClose(key);
    }
  };

  return (
    <div className={`tabbed-panel ${position}`}>
      <div role="tablist" aria-orientation={getOrientation(position)}>
        {filteredTabs.map((item, index) => {
          const isActive = active === item.key;
          const title = item.label;
          const icon = item.icon;
          const key = index;

          return (
            <button
              onFocus={() => setActive(item.key)}
              onClick={() => setActive(item.key)}
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
      <div role="tabpanel">
        {filteredTabs.find((tab) => tab.key === active)?.children}
      </div>
    </div>
  );
};

export default TabView;
