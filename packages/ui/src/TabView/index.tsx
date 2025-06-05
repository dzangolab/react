import React, { useEffect, useMemo, useState } from "react";

import { getStorage } from "../utils";
import { getOrientation } from "./utils";

import type { Properties, Tab } from "./types";

const TabView: React.FC<Properties> = ({
  activeKey,
  id = "",
  isControlled = false,
  lazy = true,
  persistState = true,
  persistStateStorage = "localStorage",
  position = "top",
  tabs,
  visibleTabs: _visibleTabs,
  onActiveTabChange,
  onVisibleTabsChange,
  onTabClose,
}) => {
  const [initialized, setInitialized] = useState(false);
  const [visibleTabs, setVisibleTabs] = useState(
    _visibleTabs?.length ? _visibleTabs : tabs.map((tab) => tab.key),
  );
  const [activeTab, setActiveTab] = useState(() => {
    if (activeKey) return activeKey;

    if (_visibleTabs?.length) return _visibleTabs[0];

    return tabs[0]?.key;
  });
  const currentActiveKey = !isControlled ? activeTab : activeKey;

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
    if (onActiveTabChange && !isControlled) {
      onActiveTabChange(activeTab);
    }
  }, [activeTab]);

  useEffect(() => {
    if (persistState && id && !isControlled) {
      const storedState = storage.getItem(id);

      if (storedState) {
        const parsedState = JSON.parse(storedState);
        setActiveTab(parsedState.activeTab);
        setVisibleTabs(parsedState.visibleTabs);
      }
    }

    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized && _visibleTabs?.length && !isControlled) {
      setVisibleTabs(_visibleTabs);
    }
  }, [_visibleTabs]);

  useEffect(() => {
    if (initialized && activeKey && !isControlled) {
      setActiveTab(activeKey);
    }
  }, [activeKey]);

  useEffect(() => {
    if (id && persistState && !isControlled) {
      storage.setItem(
        id,
        JSON.stringify({
          activeTab: activeTab,
          visibleTabs: visibleTabs,
        }),
      );
    }
  }, [visibleTabs, activeTab, id, persistState, storage]);

  const visibletabkeys = !isControlled ? visibleTabs : _visibleTabs;

  const filteredTabs = visibletabkeys?.length
    ? visibletabkeys
        .map((key) => tabs.find((tab) => tab.key === key))
        .filter((tab): tab is Tab => tab !== undefined)
    : tabs;

  const handleTabSwitch = (key: string) => {
    if (currentActiveKey === key) return;

    if (isControlled) {
      onActiveTabChange?.(key);
    } else {
      setActiveTab(key);
    }
  };

  const handleTabClose = (key: string) => {
    if (isControlled && onTabClose) {
      onTabClose(key);

      return;
    }

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
          const isActive = currentActiveKey === item.key;
          const title = item.label;
          const icon = item.icon;
          const key = index;

          return (
            <button
              onClick={() => handleTabSwitch(item.key)}
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
        {lazy ? (
          <div className="tab-panel-content">
            {filteredTabs.find((tab) => tab.key === currentActiveKey)?.children}
          </div>
        ) : (
          filteredTabs.map((tab) => (
            <div
              key={tab.key}
              className={`tab-panel-content ${
                tab.key === currentActiveKey ? "active" : "hidden"
              }`.trimEnd()}
            >
              {tab.children}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TabView;
