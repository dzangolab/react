import React, { useRef } from "react";

import { getOrientation, onTabDown } from "./utils";

import type { Properties, Tab } from "./types";

const TabView: React.FC<Properties> = ({
  position = "top",
  tabs,
  visibleTabs,
  onTabClose,
  activeTab,
  setActiveTab,
}) => {
  const tabReferences = useRef<(HTMLButtonElement | null)[]>([]);

  if (!visibleTabs || !tabs) {
    throw new Error("Tabview needs at least one tab");
  }

  const filteredTabs = visibleTabs
    .map((visibleTab) => {
      return tabs.find((tab) => tab.key === visibleTab.key);
    })
    .filter((tab): tab is Tab => tab !== undefined);

  const handleTabClose = (key: string) => {
    if (onTabClose) {
      onTabClose(key);
    }
  };

  const handleFocus = (index: number) => {
    const tab = tabReferences.current[index];
    if (tab) {
      tab.focus();
    }
  };

  return (
    <div className={`tabbed-panel ${position}`}>
      <div role="tablist" aria-orientation={getOrientation(position)}>
        {filteredTabs.map((item, index) => {
          const isActive = activeTab === item.key;
          const title = item.label;
          const icon = item.icon;
          const key = index;

          return (
            <button
              onKeyDown={(event) => {
                onTabDown(
                  index,
                  event,
                  filteredTabs.length,
                  handleFocus,
                  getOrientation(position),
                );
              }}
              onFocus={() => setActiveTab(item.key)}
              ref={(element) => (tabReferences.current[index] = element)}
              onClick={() => setActiveTab(item.key)}
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
                <i
                  onClick={(event) => {
                    event.stopPropagation();
                    handleTabClose(item.key);
                  }}
                  className="pi pi-times"
                ></i>
              ) : null}
            </button>
          );
        })}
      </div>
      <div role="tabpanel">
        {filteredTabs.find((tab) => tab.key === activeTab)?.children}
      </div>
    </div>
  );
};

export default TabView;
