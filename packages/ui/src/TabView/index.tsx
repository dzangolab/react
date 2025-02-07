import React, { useEffect, useMemo, useState } from "react";

import { getStorage } from "../utils";
import { getOrientation } from "./utils";

import type { Properties, Tab } from "./types";

const TabView: React.FC<Properties> = ({
  activeKey,
  id = "",
  persistState = true,
  persistStateStorage = "localStorage",
  position = "top",
  tabs,
  visibleTabs: _visibleTabs,
  onActiveTabChange,
  onVisibleTabsChange,
}) => {
  const [initialized, setInitialized] = useState(false);
  const [visibleTabs, setVisibleTabs] = useState(_visibleTabs);
  const [activeTab, setActiveTab] = useState(activeKey);

  const storage = useMemo(
    () => getStorage(persistStateStorage),
    [persistStateStorage],
  );

  useEffect(() => {
    if (onVisibleTabsChange) {
      onVisibleTabsChange(visibleTabs);
    }
  }, [visibleTabs]);

  useEffect(() => {
    if (onActiveTabChange) {
      onActiveTabChange(activeTab);
    }
  }, [activeTab]);

  useEffect(() => {
    if (persistState && id) {
      const storedState = storage.getItem(id);

      if (storedState) {
        const parsedState = JSON.parse(storedState);

        setActiveTab(parsedState.activeTab || activeKey);
        setVisibleTabs(parsedState.visibleTabs || _visibleTabs);
      }
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      setVisibleTabs(_visibleTabs);
    }
  }, [_visibleTabs]);

  useEffect(() => {
    if (initialized) {
      setActiveTab(activeKey);
    }
  }, [activeKey]);

  useEffect(() => {
    if (id && persistState) {
      storage.setItem(
        id,
        JSON.stringify({
          activeTab: activeTab,
          visibleTabs: visibleTabs,
        }),
      );
    }
  }, [visibleTabs, activeTab, id, persistState, storage]);

  const filteredTabs = visibleTabs
    .map((visibleTab) => {
      return tabs.find((tab) => tab.key === visibleTab);
    })
    .filter((tab): tab is Tab => tab !== undefined);

  const handleTabClose = (key: string) => {
    const tabIndex = visibleTabs.findIndex((tab) => tab === key);
    const newVisibleTabs = visibleTabs.filter((tab) => tab !== key);

    let newActiveTab = "";
    if (tabIndex > 0) {
      newActiveTab = newVisibleTabs[tabIndex - 1];
    } else {
      newActiveTab = newVisibleTabs[0];
    }

    setActiveTab(newActiveTab);
    setVisibleTabs(newVisibleTabs);
  };

  if (!initialized) return null;

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
              onClick={() => setActiveTab(item.key)}
              key={key}
              role="tab"
              aria-label={title}
              aria-selected={isActive}
              tabIndex={0}
              className={isActive ? "active" : ""}
            >
              {icon && <i className={icon} />}
              <span title={title}>{title}</span>
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
